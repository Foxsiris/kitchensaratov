import React, { useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { useCatalog } from '../../context/CatalogContext';
import { FiPlus, FiChevronLeft, FiTrash2 } from 'react-icons/fi';
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
} from './AdminUI';

/* ---- Page-specific styled ---- */

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

const DeleteCorner = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0;
  transition: opacity 0.15s;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const BrandGroup = styled.div`
  margin-bottom: ${(p) => p.theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const BrandTitle = styled.h3`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes.md};
  font-weight: 400;
  margin: 0 0 6px;
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

const AdminCategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useOutletContext();
  const { categories, addProduct, deleteProduct, deleteCategory } = useCatalog();

  const [showForm, setShowForm] = useState(false);
  const [brandId, setBrandId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [source, setSource] = useState('');

  const category = categories.find((c) => c.id === id);

  if (!category) {
    return (
      <Card>
        <Empty>Категория не найдена.</Empty>
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
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim() || !activeBrandId || !activeSubId) return;
    addProduct(id, activeBrandId, activeSubId, { name, price, description, image, source });
    showToast(`«${name.trim()}» добавлен в каталог`);
    resetForm();
    setShowForm(false);
  };

  const handleDeleteProduct = (product) => {
    if (!window.confirm(`Удалить «${product.name}»?`)) return;
    deleteProduct(product.id);
    showToast(`«${product.name}» удалён`);
  };

  const handleDeleteCategory = () => {
    if (!window.confirm(`Удалить категорию «${category.name}» и все её товары?`)) return;
    deleteCategory(id);
    showToast(`Категория «${category.name}» удалена`);
    navigate('/admin/categories');
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
            {totalProducts} {totalProducts === 1 ? 'товар' : 'товаров'} · {category.brands.length}{' '}
            {category.brands.length === 1 ? 'бренд' : 'брендов'}
          </Text>
        </div>
        <Button type="button" onClick={() => setShowForm(!showForm)}>
          <FiPlus size={16} />
          {addLabel}
        </Button>
      </PageHeader>

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
            required
            autoFocus
          />

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
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
          />

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

      {/* ---- Products grouped by brand / subcategory ---- */}
      <Card>
        <SectionTitle>Товары</SectionTitle>

        {totalProducts === 0 && <Empty>Пока нет товаров. Добавьте первый.</Empty>}

        {category.brands.map((brand) => {
          const brandHasProducts = brand.subcategories.some((s) => s.products.length > 0);
          if (!brandHasProducts) return null;

          return (
            <BrandGroup key={brand.id}>
              {category.brands.length > 1 && <BrandTitle>{brand.name}</BrandTitle>}

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
                          <DeleteCorner>
                            <IconButton
                              type="button"
                              title="Удалить"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <FiTrash2 size={14} />
                            </IconButton>
                          </DeleteCorner>
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
          Категория «{category.name}» и все {totalProducts} товаров будут удалены безвозвратно.
        </Text>
        <Button
          type="button"
          $variant="secondary"
          style={{ borderColor: '#c00', color: '#c00' }}
          onClick={handleDeleteCategory}
        >
          <FiTrash2 size={14} />
          Удалить категорию
        </Button>
      </DangerZone>
    </>
  );
};

export default AdminCategoryDetail;
