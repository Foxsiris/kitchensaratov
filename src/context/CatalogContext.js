import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { categories as initialCategoriesData } from '../data/catalogData';

const STORAGE_KEY = 'kitchensaratov_catalog';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const loadCategories = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    /* corrupted localStorage — fall back to defaults */
  }
  return deepClone(initialCategoriesData);
};

const toSlug = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0400-\u04FF-]/g, '');

const uniqueId = (base, existingIds) => {
  let id = base;
  let n = 1;
  while (existingIds.has(id)) {
    id = `${base}-${n++}`;
  }
  return id;
};

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [categories, setCategories] = useState(loadCategories);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      /* quota exceeded — silently fail */
    }
  }, [categories]);

  const findProductById = useCallback(
    (productId) => {
      for (const category of categories) {
        for (const brand of category.brands) {
          for (const sub of brand.subcategories) {
            const product = sub.products.find((p) => p.id === productId);
            if (product) {
              return {
                ...product,
                categoryId: category.id,
                categoryName: category.name,
                brandId: brand.id,
                brandName: brand.name,
                subcategoryName: sub.name,
              };
            }
          }
        }
      }
      return null;
    },
    [categories]
  );

  const getProductsByCategory = useCallback(
    (categoryId) => {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) return [];
      const products = [];
      for (const brand of category.brands) {
        for (const sub of brand.subcategories) {
          products.push(
            ...sub.products.map((p) => ({
              ...p,
              brandName: brand.name,
              subcategoryName: sub.name,
            }))
          );
        }
      }
      return products;
    },
    [categories]
  );

  const getAllProducts = useCallback(() => {
    const products = [];
    for (const category of categories) {
      for (const brand of category.brands) {
        for (const sub of brand.subcategories) {
          products.push(
            ...sub.products.map((p) => ({
              ...p,
              categoryId: category.id,
              categoryName: category.name,
              brandName: brand.name,
            }))
          );
        }
      }
    }
    return products;
  }, [categories]);

  const addCategory = useCallback(({ name, image }) => {
    const trimmedName = (name || '').trim();
    if (!trimmedName) return null;

    const baseSlug = toSlug(trimmedName) || 'category';

    let newId;
    setCategories((prev) => {
      const existingIds = new Set(prev.map((c) => c.id));
      newId = uniqueId(baseSlug, existingIds);
      return [
        ...prev,
        {
          id: newId,
          name: trimmedName,
          image:
            (image || '').trim() ||
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
          brands: [
            {
              id: 'default',
              name: 'Все бренды',
              subcategories: [{ id: 'all', name: 'Все модели', products: [] }],
            },
          ],
        },
      ];
    });

    return newId;
  }, []);

  const deleteCategory = useCallback((categoryId) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  }, []);

  const addProduct = useCallback((categoryId, brandId, subcategoryId, data) => {
    const trimmedName = (data.name || '').trim();
    if (!trimmedName) return null;

    const productId = `${toSlug(trimmedName)}-${Date.now().toString(36)}`;

    const newProduct = {
      id: productId,
      name: trimmedName,
      price: (data.price || '').trim() || 'По запросу',
      description: (data.description || '').trim(),
      image:
        (data.image || '').trim() ||
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      source: (data.source || '').trim() || 'Сайт',
    };

    setCategories((prev) => {
      const next = deepClone(prev);
      const cat = next.find((c) => c.id === categoryId);
      if (!cat) return prev;
      const brand = cat.brands.find((b) => b.id === brandId);
      if (!brand) return prev;
      const sub = brand.subcategories.find((s) => s.id === subcategoryId);
      if (!sub) return prev;
      sub.products.push(newProduct);
      return next;
    });

    return productId;
  }, []);

  const deleteProduct = useCallback((productId) => {
    setCategories((prev) => {
      const next = deepClone(prev);
      for (const cat of next) {
        for (const brand of cat.brands) {
          for (const sub of brand.subcategories) {
            const idx = sub.products.findIndex((p) => p.id === productId);
            if (idx !== -1) {
              sub.products.splice(idx, 1);
              return next;
            }
          }
        }
      }
      return prev;
    });
  }, []);

  const value = {
    categories,
    findProductById,
    getProductsByCategory,
    getAllProducts,
    addCategory,
    deleteCategory,
    addProduct,
    deleteProduct,
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
