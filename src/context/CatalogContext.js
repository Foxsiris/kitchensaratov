import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiUrl } from '../config/api';
import { useAuth } from './AuthContext';
import { prepareImageForUpload } from '../utils/prepareImageForUpload';

const CatalogContext = createContext(null);

async function parseError(res) {
  try {
    const j = await res.json();
    if (j?.error) return j.error;
  } catch {
    /* ignore */
  }
  return res.statusText || `Ошибка ${res.status}`;
}

export function CatalogProvider({ children }) {
  const { token, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);
    const path = token ? '/api/admin/catalog' : '/api/catalog';
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const res = await fetch(apiUrl(path), { headers });
      if (res.status === 401 && token) {
        logout();
        const pub = await fetch(apiUrl('/api/catalog'));
        if (!pub.ok) throw new Error(await parseError(pub));
        const data = await pub.json();
        setCategories(data.categories || []);
        setError('Сессия истекла. Войдите снова.');
        return;
      }
      if (!res.ok) throw new Error(await parseError(res));
      const data = await res.json();
      setCategories(Array.isArray(data.categories) ? data.categories : []);
    } catch (e) {
      setError(e.message || 'Не удалось загрузить каталог');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const adminFetch = useCallback(
    async (path, options = {}) => {
      if (!token) throw new Error('Нет авторизации');
      const res = await fetch(apiUrl(path), {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });
      if (res.status === 401) {
        logout();
        throw new Error('Сессия истекла');
      }
      if (!res.ok) throw new Error(await parseError(res));
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    },
    [token, logout]
  );

  const uploadStoredImage = useCallback(
    async (file) => {
      if (!token) throw new Error('Нет авторизации');
      const prepared = await prepareImageForUpload(file);
      const formData = new FormData();
      formData.append('file', prepared);
      const res = await fetch(apiUrl('/api/admin/upload'), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.status === 401) {
        logout();
        throw new Error('Сессия истекла');
      }
      if (!res.ok) throw new Error(await parseError(res));
      const body = await res.json();
      if (!body?.url) throw new Error('Пустой ответ сервера');
      return body.url;
    },
    [token, logout]
  );

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

  const addCategory = useCallback(
    async ({ name, image }) => {
      const trimmedName = (name || '').trim();
      if (!trimmedName) return null;
      const body = await adminFetch('/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({
          name: trimmedName,
          image: (image || '').trim(),
        }),
      });
      await loadCatalog();
      return body.id || null;
    },
    [adminFetch, loadCatalog]
  );

  const updateCategory = useCallback(
    async (categoryId, data) => {
      const payload = {};
      if (data.name !== undefined) payload.name = data.name;
      if (data.image !== undefined) payload.image = data.image;
      await adminFetch(`/api/admin/categories/${encodeURIComponent(categoryId)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      await loadCatalog();
    },
    [adminFetch, loadCatalog]
  );

  const deleteCategory = useCallback(
    async (categoryId) => {
      await adminFetch(`/api/admin/categories/${encodeURIComponent(categoryId)}`, {
        method: 'DELETE',
      });
      await loadCatalog();
    },
    [adminFetch, loadCatalog]
  );

  const addBrand = useCallback(
    async (categoryId, brandName, options = {}) => {
      const trimmed = (brandName || '').trim();
      if (!trimmed) return null;
      const payload = { name: trimmed };
      if (Object.prototype.hasOwnProperty.call(options, 'entitySlug')) {
        payload.entitySlug = options.entitySlug === '' ? '' : options.entitySlug;
      }
      const body = await adminFetch(`/api/admin/categories/${encodeURIComponent(categoryId)}/brands`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      await loadCatalog();
      return body.id || null;
    },
    [adminFetch, loadCatalog]
  );

  const updateDisplayGroup = useCallback(
    async (categoryId, brandSlug, data) => {
      await adminFetch(
        `/api/admin/categories/${encodeURIComponent(categoryId)}/brands/${encodeURIComponent(brandSlug)}`,
        {
          method: 'PATCH',
          body: JSON.stringify(data),
        }
      );
      await loadCatalog();
    },
    [adminFetch, loadCatalog]
  );

  const deleteDisplayGroup = useCallback(
    async (categoryId, brandSlug) => {
      const body = await adminFetch(
        `/api/admin/categories/${encodeURIComponent(categoryId)}/brands/${encodeURIComponent(brandSlug)}`,
        { method: 'DELETE' }
      );
      await loadCatalog();
      return body;
    },
    [adminFetch, loadCatalog]
  );

  const fetchBrandEntities = useCallback(async () => {
    const data = await adminFetch('/api/admin/brand-entities');
    return Array.isArray(data.brandEntities) ? data.brandEntities : [];
  }, [adminFetch]);

  const createBrandEntity = useCallback(
    async (payload) => {
      const body = await adminFetch('/api/admin/brand-entities', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return body.slug || null;
    },
    [adminFetch]
  );

  const updateBrandEntity = useCallback(
    async (slug, payload) => {
      await adminFetch(`/api/admin/brand-entities/${encodeURIComponent(slug)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
    },
    [adminFetch]
  );

  const deleteBrandEntity = useCallback(
    async (slug) => {
      await adminFetch(`/api/admin/brand-entities/${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });
    },
    [adminFetch]
  );

  const addSubcategory = useCallback(
    async (categoryId, brandId, subName) => {
      const trimmed = (subName || '').trim();
      if (!trimmed) return null;
      const body = await adminFetch(
        `/api/admin/categories/${encodeURIComponent(categoryId)}/brands/${encodeURIComponent(brandId)}/subcategories`,
        {
          method: 'POST',
          body: JSON.stringify({ name: trimmed }),
        }
      );
      await loadCatalog();
      return body.id || null;
    },
    [adminFetch, loadCatalog]
  );

  const addProduct = useCallback(
    async (categoryId, brandId, subcategoryId, data) => {
      const trimmedName = (data.name || '').trim();
      if (!trimmedName) return null;
      const body = await adminFetch(
        `/api/admin/categories/${encodeURIComponent(categoryId)}/brands/${encodeURIComponent(brandId)}/subcategories/${encodeURIComponent(subcategoryId)}/products`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: trimmedName,
            price: (data.price || '').trim(),
            description: (data.description || '').trim(),
            image: (data.image || '').trim(),
            source: (data.source || '').trim(),
            extraImages: Array.isArray(data.extraImages)
              ? data.extraImages.map((u) => String(u).trim()).filter(Boolean)
              : undefined,
          }),
        }
      );
      await loadCatalog();
      return body.id || null;
    },
    [adminFetch, loadCatalog]
  );

  const updateProduct = useCallback(
    async (productId, data) => {
      const payload = {};
      if (data.name !== undefined) payload.name = data.name;
      if (data.price !== undefined) payload.price = data.price;
      if (data.description !== undefined) payload.description = data.description;
      if (data.image !== undefined) payload.image = data.image;
      if (data.source !== undefined) payload.source = data.source;
      if (data.extraImages !== undefined) {
        payload.extraImages = Array.isArray(data.extraImages)
          ? data.extraImages.map((u) => String(u).trim()).filter(Boolean)
          : [];
      }
      await adminFetch(`/api/admin/products/${encodeURIComponent(productId)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      await loadCatalog();
    },
    [adminFetch, loadCatalog]
  );

  const deleteProduct = useCallback(
    async (productId) => {
      await adminFetch(`/api/admin/products/${encodeURIComponent(productId)}`, {
        method: 'DELETE',
      });
      await loadCatalog();
    },
    [adminFetch, loadCatalog]
  );

  const value = {
    categories,
    loading,
    error,
    refreshCatalog: loadCatalog,
    findProductById,
    getProductsByCategory,
    getAllProducts,
    addCategory,
    updateCategory,
    deleteCategory,
    addBrand,
    updateDisplayGroup,
    deleteDisplayGroup,
    fetchBrandEntities,
    createBrandEntity,
    updateBrandEntity,
    deleteBrandEntity,
    addSubcategory,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadStoredImage,
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
