import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { useCatalog } from '../../context/CatalogContext';
import { productCount as productCountWord, brandCount as brandCountWord } from '../../utils/pluralize';
import { FiPlus, FiChevronLeft, FiTrash2, FiEdit2, FiSearch } from 'react-icons/fi';
import {
  Card,
  PageTitle,
  PageHeader,
  SectionTitle,
  Label,
  Select,
  Button,
  BackLink,
  Empty,
  Text,
  Input,
} from './AdminUI';
import {
  ModalShell,
  ConfirmModal,
  ModalFormFooter,
  ProductFormFields,
  BrandEntityLinkSelect,
  CategoryFormFields,
  EditIconAction,
  DeleteIconAction,
  DisplayGroupsSection,
} from './components';

const SearchWrap = styled.div`
  position: relative;
  margin-bottom: ${(p) => p.theme.spacing.lg};
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(p) => p.theme.colors.gray};
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 38px;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 6px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.primary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

const ProductCard = styled.div`
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${(p) => p.theme.colors.grayLight};
  }
`;

const ProductImage = styled.div`
  height: 130px;
  background: url(${(p) => p.$src}) center/cover no-repeat;
  background-color: ${(p) => p.theme.colors.light};
`;

const ProductBody = styled.div`
  padding: 10px 12px;
`;

const ProductName = styled.div`
  font-weight: 500;
  font-size: ${(p) => p.theme.fontSizes.sm};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductMeta = styled.div`
  font-size: ${(p) => p.theme.fontSizes.xs};
  color: ${(p) => p.theme.colors.gray};
`;

const ActionCorner = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;

  ${ProductCard}:hover & {
    opacity: 1;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    opacity: 1;
    background: rgba(255, 255, 255, 0.95);
    padding: 4px;
    border-radius: 6px;
  }
`;

const BrandGroup = styled.div`
  margin-bottom: ${(p) => p.theme.spacing.xl};
  &:last-child {
    margin-bottom: 0;
  }
`;

const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  margin-bottom: 6px;
  flex-wrap: wrap;
`;

const BrandTitle = styled.h3`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes.md};
  font-weight: 400;
  margin: 0;
`;

const SubTitle = styled.div`
  font-size: ${(p) => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${(p) => p.theme.colors.gray};
  margin-bottom: ${(p) => p.theme.spacing.md};
`;

const DangerZone = styled(Card)`
  border-color: #e8c0c0;
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const AdminCategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext();
  const {
    categories,
    loading: catalogLoading,
    error: catalogError,
    updateCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteCategory,
    addBrand,
    addSubcategory,
    updateDisplayGroup,
    deleteDisplayGroup,
    fetchBrandEntities,
  } = useCatalog();

  const [brandEntities, setBrandEntities] = useState([]);

  const [categoryEditOpen, setCategoryEditOpen] = useState(false);
  const [catForm, setCatForm] = useState({ name: '', image: '' });
  const [catErrors, setCatErrors] = useState({});

  const [productAddOpen, setProductAddOpen] = useState(false);
  const [brandId, setBrandId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    source: '',
  });
  const [productFormErrors, setProductFormErrors] = useState({});

  const [editProduct, setEditProduct] = useState(null);
  const [editProductForm, setEditProductForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    source: '',
  });
  const [editProductErrors, setEditProductErrors] = useState({});

  const [displayGroupAddOpen, setDisplayGroupAddOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupEntityMode, setNewGroupEntityMode] = useState('__auto__');

  const [subcategoryModalBrand, setSubcategoryModalBrand] = useState(null);
  const [newSubName, setNewSubName] = useState('');

  const [editBrandGroup, setEditBrandGroup] = useState(null);
  const [editBrandName, setEditBrandName] = useState('');
  const [editBrandEntitySlug, setEditBrandEntitySlug] = useState('__none__');

  const [confirm, setConfirm] = useState(null);

  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchBrandEntities();
        if (!cancelled) setBrandEntities(rows);
      } catch {
        if (!cancelled) setBrandEntities([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchBrandEntities]);

  const openCategoryEdit = useCallback(() => {
    const c = categories.find((x) => x.id === id);
    if (!c) return;
    setCatForm({ name: c.name, image: c.image });
    setCatErrors({});
    setCategoryEditOpen(true);
  }, [categories, id]);

  const patchProductForm = useCallback((field, value) => {
    setProductForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const patchEditProductForm = useCallback((field, value) => {
    setEditProductForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const patchCatForm = useCallback((field, value) => {
    setCatForm((prev) => ({ ...prev, [field]: value }));
    setCatErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const category = categories.find((c) => c.id === id);

  const filteredBrands = useMemo(() => {
    if (!category) return [];
    const q = search.trim().toLowerCase();
    if (!q) return category.brands;
    return category.brands
      .map((brand) => ({
        ...brand,
        subcategories: brand.subcategories.map((sub) => ({
          ...sub,
          products: sub.products.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.price.toLowerCase().includes(q)
          ),
        })),
      }))
      .filter((brand) => brand.subcategories.some((s) => s.products.length > 0));
  }, [category, search]);

  if (!category) {
    return (
      <Card>
        <Empty>
          {catalogLoading ? 'Загрузка категории…' : catalogError || 'Категория не найдена.'}
        </Empty>
        <BackLink to="/admin/categories">
          <FiChevronLeft size={14} /> К списку
        </BackLink>
      </Card>
    );
  }

  const firstBrand = category.brands[0];
  const activeBrandId = brandId || firstBrand?.id;
  const activeBrand = category.brands.find((b) => b.id === activeBrandId);
  const firstSub = activeBrand?.subcategories?.[0];
  const activeSubId = subcategoryId || firstSub?.id;

  const resetProductForm = () => {
    setProductForm({ name: '', price: '', description: '', image: '', source: '' });
    setProductFormErrors({});
  };

  const openProductAdd = () => {
    resetProductForm();
    setBrandId('');
    setSubcategoryId('');
    setProductAddOpen(true);
  };

  const validateProduct = (form) => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Обязательное поле';
    if (form.image.trim() && !/^https?:\/\/.+/i.test(form.image.trim())) errors.image = 'Некорректный URL';
    return errors;
  };

  const handleProductAddSubmit = async (e) => {
    e.preventDefault();
    const errors = validateProduct(productForm);
    setProductFormErrors(errors);
    if (Object.keys(errors).length > 0 || !activeBrandId || !activeSubId) return;
    try {
      const pid = await addProduct(id, activeBrandId, activeSubId, productForm);
      if (pid) {
        showToast(`«${productForm.name.trim()}» добавлен в каталог`);
        resetProductForm();
        setProductAddOpen(false);
      }
    } catch (err) {
      showToast(err.message || 'Не удалось добавить товар', { type: 'error' });
    }
  };

  const openEditProduct = (product) => {
    setEditProduct(product);
    setEditProductForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      source: product.source,
    });
    setEditProductErrors({});
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    const errors = validateProduct(editProductForm);
    setEditProductErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      await updateProduct(editProduct.id, editProductForm);
      showToast(`«${editProductForm.name.trim()}» обновлён`);
      setEditProduct(null);
    } catch (err) {
      showToast(err.message || 'Не удалось сохранить', { type: 'error' });
    }
  };

  const requestDeleteProduct = (product) => {
    setConfirm({
      title: 'Удалить товар?',
      message: `Удалить «${product.name}»?`,
      onConfirm: async () => {
        try {
          await deleteProduct(product.id);
          showToast(`«${product.name}» удалён`);
          setConfirm(null);
        } catch (err) {
          showToast(err.message || 'Не удалось удалить', { type: 'error' });
          setConfirm(null);
        }
      },
    });
  };

  const validateCategory = () => {
    const e = {};
    if (!catForm.name.trim()) e.name = 'Обязательное поле';
    if (catForm.image.trim() && !/^https?:\/\/.+/i.test(catForm.image.trim())) e.image = 'Некорректный URL';
    setCatErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCategorySave = async (e) => {
    e.preventDefault();
    if (!validateCategory()) return;
    try {
      await updateCategory(id, { name: catForm.name, image: catForm.image });
      showToast('Категория обновлена');
      setCategoryEditOpen(false);
    } catch (err) {
      showToast(err.message || 'Не удалось сохранить', { type: 'error' });
    }
  };

  const requestDeleteCategory = () => {
    const totalProducts = category.brands.reduce(
      (acc, b) => acc + b.subcategories.reduce((s, sub) => s + sub.products.length, 0),
      0
    );
    setConfirm({
      title: 'Удалить категорию?',
      message: `Категория «${category.name}» и все ${totalProducts} ${productCountWord(totalProducts)} будут удалены безвозвратно.`,
      onConfirm: async () => {
        try {
          await deleteCategory(id);
          showToast(`Категория «${category.name}» удалена`);
          setConfirm(null);
          navigate('/admin/categories');
        } catch (err) {
          showToast(err.message || 'Не удалось удалить категорию', { type: 'error' });
          setConfirm(null);
        }
      },
    });
  };

  const handleDisplayGroupAdd = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    try {
      const opts = {};
      if (newGroupEntityMode === '__none__') opts.entitySlug = '';
      else if (newGroupEntityMode !== '__auto__') opts.entitySlug = newGroupEntityMode;
      await addBrand(id, newGroupName, opts);
      showToast(`Бренд «${newGroupName.trim()}» добавлен`);
      setNewGroupName('');
      setNewGroupEntityMode('__auto__');
      setDisplayGroupAddOpen(false);
    } catch (err) {
      showToast(err.message || 'Не удалось добавить бренд', { type: 'error' });
    }
  };

  const countProductsInBrand = (brand) =>
    brand.subcategories.reduce((acc, s) => acc + s.products.length, 0);

  const openEditBrand = (b) => {
    setEditBrandGroup(b);
    setEditBrandName(b.name);
    setEditBrandEntitySlug(b.entitySlug || '__none__');
  };

  const saveEditBrand = async (e) => {
    e.preventDefault();
    if (!editBrandGroup || !editBrandName.trim()) return;
    try {
      const payload = { name: editBrandName.trim() };
      if (editBrandGroup.id !== 'default') {
        payload.entitySlug = editBrandEntitySlug === '__none__' ? '' : editBrandEntitySlug;
      }
      await updateDisplayGroup(id, editBrandGroup.id, payload);
      showToast('Сохранено');
      setEditBrandGroup(null);
    } catch (err) {
      showToast(err.message || 'Не удалось сохранить', { type: 'error' });
    }
  };

  const requestDeleteBrand = (b) => {
    const n = countProductsInBrand(b);
    setConfirm({
      title: 'Удалить витринную группу?',
      message: `«${b.name}» и все товары внутри (${n} ${productCountWord(n)}) будут удалены безвозвратно.`,
      onConfirm: async () => {
        try {
          await deleteDisplayGroup(id, b.id);
          showToast(`Группа «${b.name}» удалена`);
          setConfirm(null);
        } catch (err) {
          showToast(err.message || 'Не удалось удалить', { type: 'error' });
          setConfirm(null);
        }
      },
    });
  };

  const handleSubcategoryAdd = async (e) => {
    e.preventDefault();
    if (!subcategoryModalBrand || !newSubName.trim()) return;
    try {
      await addSubcategory(id, subcategoryModalBrand.id, newSubName);
      showToast(`Подкатегория «${newSubName.trim()}» добавлена`);
      setNewSubName('');
      setSubcategoryModalBrand(null);
    } catch (err) {
      showToast(err.message || 'Не удалось добавить подкатегорию', { type: 'error' });
    }
  };

  const totalProducts = category.brands.reduce(
    (acc, b) => acc + b.subcategories.reduce((s, sub) => s + sub.products.length, 0),
    0
  );

  const isKitchens = id === 'kitchens';
  const addLabel = isKitchens ? 'Добавить кухню' : 'Добавить товар';

  return (
    <>
      <BackLink to="/admin/categories">
        <FiChevronLeft size={14} /> Категории
      </BackLink>

      <PageHeader>
        <div>
          <PageTitle>{category.name}</PageTitle>
          <Text style={{ marginTop: 4 }}>
            {totalProducts} {productCountWord(totalProducts)} · {category.brands.length}{' '}
            {brandCountWord(category.brands.length)}
          </Text>
        </div>
        <Toolbar>
          <Button type="button" $variant="secondary" onClick={openCategoryEdit}>
            <FiEdit2 size={14} /> Редактировать категорию
          </Button>
          <Button type="button" onClick={openProductAdd}>
            <FiPlus size={16} /> {addLabel}
          </Button>
        </Toolbar>
      </PageHeader>

      <Card>
        <DisplayGroupsSection
          brands={category.brands}
          onEditBrand={openEditBrand}
          onDeleteBrand={requestDeleteBrand}
          onAddSubcategory={setSubcategoryModalBrand}
          onAddGroup={() => setDisplayGroupAddOpen(true)}
        />
      </Card>

      <Card>
        <SectionTitle>Товары</SectionTitle>

        {totalProducts > 5 && (
          <SearchWrap>
            <SearchIcon>
              <FiSearch size={16} />
            </SearchIcon>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию, описанию, цене..."
            />
          </SearchWrap>
        )}

        {totalProducts === 0 && <Empty>Пока нет товаров. Добавьте первый.</Empty>}

        {filteredBrands.length === 0 && totalProducts > 0 && (
          <Empty>Ничего не найдено по запросу «{search}»</Empty>
        )}

        {filteredBrands.map((brand) => {
          const brandHasProducts = brand.subcategories.some((s) => s.products.length > 0);
          if (!brandHasProducts) return null;

          return (
            <BrandGroup key={brand.id}>
              {category.brands.length > 1 && (
                <BrandHeader>
                  <BrandTitle>{brand.name}</BrandTitle>
                </BrandHeader>
              )}

              {brand.subcategories.map((sub) => {
                if (sub.products.length === 0) return null;
                return (
                  <div key={sub.id}>
                    {brand.subcategories.length > 1 && <SubTitle>{sub.name}</SubTitle>}
                    <ProductGrid>
                      {sub.products.map((product) => (
                        <ProductCard key={product.id}>
                          <ProductImage $src={product.image} />
                          <ProductBody>
                            <ProductName>{product.name}</ProductName>
                            <ProductMeta>{product.price}</ProductMeta>
                          </ProductBody>
                          <ActionCorner>
                            <EditIconAction
                              type="button"
                              title="Редактировать"
                              onClick={() => openEditProduct(product)}
                            >
                              <FiEdit2 size={14} />
                            </EditIconAction>
                            <DeleteIconAction
                              type="button"
                              title="Удалить"
                              onClick={() => requestDeleteProduct(product)}
                            >
                              <FiTrash2 size={14} />
                            </DeleteIconAction>
                          </ActionCorner>
                        </ProductCard>
                      ))}
                    </ProductGrid>
                  </div>
                );
              })}
            </BrandGroup>
          );
        })}
      </Card>

      <DangerZone>
        <SectionTitle>Удаление категории</SectionTitle>
        <Text style={{ marginBottom: 16 }}>
          Категория «{category.name}» и все {totalProducts} {productCountWord(totalProducts)} будут удалены
          безвозвратно.
        </Text>
        <Button type="button" $variant="danger" onClick={requestDeleteCategory}>
          <FiTrash2 size={14} />
          Удалить категорию
        </Button>
      </DangerZone>

      {categoryEditOpen && (
        <ModalShell title="Редактирование категории" width="480px">
          <form onSubmit={handleCategorySave}>
            <CategoryFormFields values={catForm} onChange={patchCatForm} errors={catErrors} />
            <ModalFormFooter
              submitLabel="Сохранить"
              onCancel={() => setCategoryEditOpen(false)}
            />
          </form>
        </ModalShell>
      )}

      {productAddOpen && (
        <ModalShell title={isKitchens ? 'Новая кухня' : 'Новый товар'} width="520px">
          <form onSubmit={handleProductAddSubmit}>
            {category.brands.length > 1 && (
              <>
                <Label>Бренд</Label>
                <Select
                  value={activeBrandId}
                  onChange={(e) => {
                    setBrandId(e.target.value);
                    setSubcategoryId('');
                  }}
                >
                  {category.brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Select>
              </>
            )}

            {activeBrand && activeBrand.subcategories.length > 1 && (
              <>
                <Label>Подкатегория</Label>
                <Select value={activeSubId} onChange={(e) => setSubcategoryId(e.target.value)}>
                  {activeBrand.subcategories.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </>
            )}

            <ProductFormFields
              values={productForm}
              onChange={patchProductForm}
              errors={productFormErrors}
              namePlaceholder={isKitchens ? 'Например: Луна' : 'Название модели'}
            />
            <ModalFormFooter
              submitLabel="Добавить"
              onCancel={() => {
                setProductAddOpen(false);
                resetProductForm();
              }}
            />
          </form>
        </ModalShell>
      )}

      {displayGroupAddOpen && (
        <ModalShell title="Новая витринная группа" width="480px">
          <form onSubmit={handleDisplayGroupAdd}>
            <Label>Название группы *</Label>
            <Input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Отображается в каталоге"
            />
            <BrandEntityLinkSelect
              variant="create"
              value={newGroupEntityMode}
              onChange={setNewGroupEntityMode}
              brandEntities={brandEntities}
            />
            <ModalFormFooter
              submitLabel="Создать"
              onCancel={() => {
                setDisplayGroupAddOpen(false);
                setNewGroupName('');
                setNewGroupEntityMode('__auto__');
              }}
            />
          </form>
        </ModalShell>
      )}

      {subcategoryModalBrand && (
        <ModalShell title={`Подкатегория — ${subcategoryModalBrand.name}`} width="420px">
          <form onSubmit={handleSubcategoryAdd}>
            <Label>Название *</Label>
            <Input
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              placeholder="Например: Современные"
              autoFocus
            />
            <ModalFormFooter
              submitLabel="Добавить"
              onCancel={() => {
                setSubcategoryModalBrand(null);
                setNewSubName('');
              }}
            />
          </form>
        </ModalShell>
      )}

      {editBrandGroup && (
        <ModalShell title="Витринная группа" width="440px">
          <form onSubmit={saveEditBrand}>
            <Label>Название *</Label>
            <Input value={editBrandName} onChange={(e) => setEditBrandName(e.target.value)} />
            {editBrandGroup.id !== 'default' ? (
              <BrandEntityLinkSelect
                variant="edit"
                value={editBrandEntitySlug}
                onChange={setEditBrandEntitySlug}
                brandEntities={brandEntities}
              />
            ) : (
              <Text style={{ marginTop: 8 }}>
                У служебной группы «Все бренды» нельзя менять привязку к производителю.
              </Text>
            )}
            <ModalFormFooter submitLabel="Сохранить" onCancel={() => setEditBrandGroup(null)} />
          </form>
        </ModalShell>
      )}

      {editProduct && (
        <ModalShell title="Редактирование товара" width="520px">
          <form onSubmit={handleEditProductSubmit}>
            <ProductFormFields
              values={editProductForm}
              onChange={patchEditProductForm}
              errors={editProductErrors}
            />
            <ModalFormFooter submitLabel="Сохранить" onCancel={() => setEditProduct(null)} />
          </form>
        </ModalShell>
      )}

      <ConfirmModal
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        title={confirm?.title}
        message={confirm?.message}
        onConfirm={confirm?.onConfirm}
      />
    </>
  );
};

export default AdminCategoryDetail;
