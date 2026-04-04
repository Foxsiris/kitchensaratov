import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { useCatalog } from '../../context/CatalogContext';
import { FiPlus, FiChevronRight } from 'react-icons/fi';
import { productCount as productCountWord } from '../../utils/pluralize';
import { isValidCatalogImageUrl, resolveCatalogImageSrc } from '../../utils/imageUrl';
import { PageTitle, PageHeader, Thumb, Empty, Button } from './AdminUI';
import { ModalShell, ModalFormFooter, CategoryFormFields } from './components';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  background: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
`;

const ItemLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  padding: 14px 16px;
  text-decoration: none;
  color: ${(p) => p.theme.colors.primary};
  transition: background 0.15s;

  &:hover {
    background: ${(p) => p.theme.colors.light};
  }
`;

const Name = styled.span`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes.lg};
  font-weight: 400;
  flex: 1;
  min-width: 0;
`;

const Meta = styled.span`
  font-size: ${(p) => p.theme.fontSizes.xs};
  color: ${(p) => p.theme.colors.gray};
  white-space: nowrap;
`;

const Arrow = styled.span`
  display: flex;
  color: ${(p) => p.theme.colors.grayLight};
`;

const AdminCategories = () => {
  const navigate = useNavigate();
  const { showToast } = useOutletContext();
  const { categories, loading, error, addCategory, uploadStoredImage } = useCatalog();

  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: '', image: '' });
  const [formErrors, setFormErrors] = useState({});

  const openCreateModal = useCallback(() => {
    setForm({ name: '', image: '' });
    setFormErrors({});
    setCreateOpen(true);
  }, []);

  const patchForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Обязательное поле';
    if (form.image.trim() && !isValidCatalogImageUrl(form.image.trim())) {
      e.image = 'Укажите URL (https://…) или загрузите файл';
    }
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreateSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      const newId = await addCategory({ name: form.name, image: form.image });
      if (newId) {
        showToast(`Категория «${form.name.trim()}» создана`);
        setCreateOpen(false);
        navigate(`/admin/categories/${newId}`);
      } else {
        showToast('Не удалось создать категорию', { type: 'error' });
      }
    } catch (err) {
      showToast(err.message || 'Ошибка сохранения', { type: 'error' });
    }
  };

  const productCount = (cat) =>
    cat.brands.reduce(
      (acc, b) => acc + b.subcategories.reduce((s, sub) => s + sub.products.length, 0),
      0
    );

  if (loading) {
    return (
      <>
        <PageHeader>
          <PageTitle>Категории</PageTitle>
        </PageHeader>
        <Empty>Загрузка каталога…</Empty>
      </>
    );
  }

  return (
    <>
      <PageHeader>
        <PageTitle>Категории</PageTitle>
        <Button type="button" onClick={openCreateModal}>
          <FiPlus size={16} />
          Добавить
        </Button>
      </PageHeader>

      {error && (
        <Empty style={{ color: '#a00', marginBottom: 16 }}>
          {error}
        </Empty>
      )}

      {!error && categories.length === 0 && (
        <Empty>Категорий пока нет. Создайте первую.</Empty>
      )}

      <List>
        {categories.map((cat) => {
          const count = productCount(cat);
          return (
            <Item key={cat.id}>
              <ItemLink to={`/admin/categories/${cat.id}`}>
                <Thumb $src={resolveCatalogImageSrc(cat.image)} $size="56px" />
                <Name>{cat.name}</Name>
                <Meta>
                  {count} {productCountWord(count)}
                </Meta>
                <Arrow>
                  <FiChevronRight size={18} />
                </Arrow>
              </ItemLink>
            </Item>
          );
        })}
      </List>

      {createOpen && (
        <ModalShell title="Новая категория" width="480px">
          <form onSubmit={handleCreateSubmit}>
            <CategoryFormFields
              values={form}
              onChange={patchForm}
              errors={formErrors}
              uploadImage={uploadStoredImage}
            />
            <ModalFormFooter
              submitLabel="Создать"
              onCancel={() => setCreateOpen(false)}
            />
          </form>
        </ModalShell>
      )}
    </>
  );
};

export default AdminCategories;
