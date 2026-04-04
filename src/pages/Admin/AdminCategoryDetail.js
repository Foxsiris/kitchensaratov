import React, { useState, useMemo } from 'react';
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
  Input,
  Textarea,
  Select,
  FormActions,
  Button,
  IconButton,
  BackLink,
  Empty,
  Text,
  ErrorText,
  ModalOverlay,
  ModalCard,
  ModalTitle,
  ModalMessage,
  ConfirmActions,
} from './AdminUI';

/* ---- Page-specific styled ---- */

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

const EditIconButton = styled(IconButton)`
  &:hover {
    border-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.primary};
    background: ${(p) => p.theme.colors.white};
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

const InlineForm = styled.form`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-top: ${(p) => p.theme.spacing.md};
`;

const InlineInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 4px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.primary};
  }
`;

const SmallButton = styled.button`
  padding: 8px 14px;
  font-size: ${(p) => p.theme.fontSizes.xs};
  font-family: inherit;
  border: 1px solid ${(p) => p.theme.colors.primary};
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: transparent;
    color: ${(p) => p.theme.colors.primary};
  }
`;

const CategoryEditRow = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.md};
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: ${(p) => p.theme.spacing.md};
`;

const FieldWrap = styled.div`
  flex: 1;
  min-width: 200px;
`;

/* ---- Component ---- */

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
  } = useCatalog();

  // Add product form
  const [showForm, setShowForm] = useState(false);
  const [brandId, setBrandId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [source, setSource] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Edit product modal
  const [editProduct, setEditProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editSource, setEditSource] = useState('');
  const [editErrors, setEditErrors] = useState({});

  // Category edit
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');
  const [showCatEdit, setShowCatEdit] = useState(false);

  // Brand / subcategory inline add
  const [newBrandName, setNewBrandName] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [addSubForBrand, setAddSubForBrand] = useState(null);

  // Search
  const [search, setSearch] = useState('');

  // Confirm delete modal
  const [confirm, setConfirm] = useState(null);

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

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setSource('');
    setFormErrors({});
  };

  const validateAdd = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Обязательное поле';
    if (image.trim() && !/^https?:\/\/.+/i.test(image.trim())) errors.image = 'Некорректный URL';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validateAdd() || !activeBrandId || !activeSubId) return;
    try {
      const pid = await addProduct(id, activeBrandId, activeSubId, {
        name,
        price,
        description,
        image,
        source,
      });
      if (pid) {
        showToast(`«${name.trim()}» добавлен в каталог`);
        resetForm();
        setShowForm(false);
      }
    } catch (err) {
      showToast(err.message || 'Не удалось добавить товар', { type: 'error' });
    }
  };

  // Edit product
  const openEdit = (product) => {
    setEditProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditDescription(product.description);
    setEditImage(product.image);
    setEditSource(product.source);
    setEditErrors({});
  };

  const validateEdit = () => {
    const errors = {};
    if (!editName.trim()) errors.name = 'Обязательное поле';
    if (editImage.trim() && !/^https?:\/\/.+/i.test(editImage.trim())) errors.image = 'Некорректный URL';
    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!validateEdit()) return;
    try {
      await updateProduct(editProduct.id, {
        name: editName,
        price: editPrice,
        description: editDescription,
        image: editImage,
        source: editSource,
      });
      showToast(`«${editName.trim()}» обновлён`);
      setEditProduct(null);
    } catch (err) {
      showToast(err.message || 'Не удалось сохранить', { type: 'error' });
    }
  };

  const handleDeleteProduct = (product) => {
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

  const handleDeleteCategory = () => {
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

  // Category edit
  const startCatEdit = () => {
    setCatName(category.name);
    setCatImage(category.image);
    setShowCatEdit(true);
  };

  const saveCatEdit = async () => {
    if (!catName.trim()) return;
    try {
      await updateCategory(id, { name: catName, image: catImage });
      showToast('Категория обновлена');
      setShowCatEdit(false);
    } catch (err) {
      showToast(err.message || 'Не удалось сохранить', { type: 'error' });
    }
  };

  // Brand add
  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    try {
      await addBrand(id, newBrandName);
      showToast(`Бренд «${newBrandName.trim()}» добавлен`);
      setNewBrandName('');
    } catch (err) {
      showToast(err.message || 'Не удалось добавить бренд', { type: 'error' });
    }
  };

  // Subcategory add
  const handleAddSub = async (e, forBrandId) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    try {
      await addSubcategory(id, forBrandId, newSubName);
      showToast(`Подкатегория «${newSubName.trim()}» добавлена`);
      setNewSubName('');
      setAddSubForBrand(null);
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
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button type="button" $variant="secondary" onClick={startCatEdit}>
            <FiEdit2 size={14} /> Редактировать
          </Button>
          <Button type="button" onClick={() => setShowForm(!showForm)}>
            <FiPlus size={16} /> {addLabel}
          </Button>
        </div>
      </PageHeader>

      {/* ---- Category edit card ---- */}
      {showCatEdit && (
        <Card>
          <SectionTitle>Редактирование категории</SectionTitle>
          <CategoryEditRow>
            <FieldWrap>
              <Label>Название</Label>
              <Input value={catName} onChange={(e) => setCatName(e.target.value)} />
            </FieldWrap>
            <FieldWrap>
              <Label>URL изображения</Label>
              <Input value={catImage} onChange={(e) => setCatImage(e.target.value)} />
            </FieldWrap>
          </CategoryEditRow>
          <FormActions style={{ marginTop: 0 }}>
            <Button type="button" onClick={saveCatEdit}>
              Сохранить
            </Button>
            <Button type="button" $variant="secondary" onClick={() => setShowCatEdit(false)}>
              Отмена
            </Button>
          </FormActions>
        </Card>
      )}

      {/* ---- Add product form ---- */}
      {showForm && (
        <Card as="form" onSubmit={handleAdd} style={{ maxWidth: 560 }}>
          <SectionTitle>{isKitchens ? 'Новая кухня' : 'Новый товар'}</SectionTitle>

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

          <Label htmlFor="p-name">Название *</Label>
          <Input
            id="p-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isKitchens ? 'Например: Луна' : 'Название модели'}
          />
          {formErrors.name && <ErrorText>{formErrors.name}</ErrorText>}

          <Label htmlFor="p-price">Цена</Label>
          <Input
            id="p-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="от 200 000 ₽  или  По запросу"
          />

          <Label htmlFor="p-desc">Описание</Label>
          <Textarea
            id="p-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание модели..."
          />

          <Label htmlFor="p-img">URL изображения</Label>
          <Input
            id="p-img"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
          />
          {formErrors.image && <ErrorText>{formErrors.image}</ErrorText>}

          <Label htmlFor="p-src">Источник (отображается в карточке)</Label>
          <Input
            id="p-src"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="rimi-mebel.ru"
          />

          <FormActions>
            <Button type="submit">Добавить</Button>
            <Button
              type="button"
              $variant="secondary"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
            >
              Отмена
            </Button>
          </FormActions>
        </Card>
      )}

      {/* ---- Brands & Subcategories management ---- */}
      <Card>
        <SectionTitle>Бренды и подкатегории</SectionTitle>
        {category.brands.map((brand) => (
          <div key={brand.id} style={{ marginBottom: 12 }}>
            <BrandHeader>
              <BrandTitle>{brand.name}</BrandTitle>
              <SmallButton
                type="button"
                onClick={() => {
                  setAddSubForBrand(addSubForBrand === brand.id ? null : brand.id);
                  setNewSubName('');
                }}
              >
                <FiPlus size={12} /> Подкатегория
              </SmallButton>
            </BrandHeader>
            <Text style={{ marginLeft: 4 }}>
              {brand.subcategories.map((s) => s.name).join(', ')}
            </Text>
            {addSubForBrand === brand.id && (
              <InlineForm onSubmit={(e) => handleAddSub(e, brand.id)}>
                <InlineInput
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="Название подкатегории"
                  autoFocus
                />
                <SmallButton type="submit">Добавить</SmallButton>
              </InlineForm>
            )}
          </div>
        ))}
        <InlineForm onSubmit={handleAddBrand}>
          <InlineInput
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
            placeholder="Новый бренд..."
          />
          <SmallButton type="submit">
            <FiPlus size={12} /> Бренд
          </SmallButton>
        </InlineForm>
      </Card>

      {/* ---- Products grouped by brand / subcategory ---- */}
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
                            <EditIconButton
                              type="button"
                              title="Редактировать"
                              onClick={() => openEdit(product)}
                            >
                              <FiEdit2 size={14} />
                            </EditIconButton>
                            <IconButton
                              type="button"
                              title="Удалить"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <FiTrash2 size={14} />
                            </IconButton>
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

      {/* ---- Danger zone ---- */}
      <DangerZone>
        <SectionTitle>Удаление категории</SectionTitle>
        <Text style={{ marginBottom: 16 }}>
          Категория «{category.name}» и все {totalProducts} {productCountWord(totalProducts)} будут удалены безвозвратно.
        </Text>
        <Button type="button" $variant="danger" onClick={handleDeleteCategory}>
          <FiTrash2 size={14} />
          Удалить категорию
        </Button>
      </DangerZone>

      {/* ---- Confirm delete modal ---- */}
      {confirm && (
        <ModalOverlay onClick={() => setConfirm(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()} $width="400px">
            <ModalTitle>{confirm.title}</ModalTitle>
            <ModalMessage>{confirm.message}</ModalMessage>
            <ConfirmActions>
              <Button type="button" $variant="secondary" onClick={() => setConfirm(null)}>
                Отмена
              </Button>
              <Button
                type="button"
                $variant="danger"
                onClick={() => {
                  confirm.onConfirm();
                }}
              >
                Удалить
              </Button>
            </ConfirmActions>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* ---- Edit product modal ---- */}
      {editProduct && (
        <ModalOverlay onClick={() => setEditProduct(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Редактирование товара</ModalTitle>
            <form onSubmit={handleEditSave}>
              <Label>Название *</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
              {editErrors.name && <ErrorText>{editErrors.name}</ErrorText>}

              <Label>Цена</Label>
              <Input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />

              <Label>Описание</Label>
              <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />

              <Label>URL изображения</Label>
              <Input value={editImage} onChange={(e) => setEditImage(e.target.value)} />
              {editErrors.image && <ErrorText>{editErrors.image}</ErrorText>}

              <Label>Источник</Label>
              <Input value={editSource} onChange={(e) => setEditSource(e.target.value)} />

              <FormActions>
                <Button type="submit">Сохранить</Button>
                <Button type="button" $variant="secondary" onClick={() => setEditProduct(null)}>
                  Отмена
                </Button>
              </FormActions>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
};

export default AdminCategoryDetail;
