import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { useCatalog } from '../../context/CatalogContext';
import { Card, PageTitle, PageHeader, SectionTitle, Button, Text } from './AdminUI';
import {
  ModalShell,
  ConfirmModal,
  ModalFormFooter,
  BrandEntityFormFields,
  EditIconAction,
  DeleteIconAction,
} from './components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${(p) => p.theme.fontSizes.sm};

  th,
  td {
    text-align: left;
    padding: 10px 8px;
    border-bottom: 1px solid ${(p) => p.theme.colors.border};
    vertical-align: top;
  }

  th {
    color: ${(p) => p.theme.colors.gray};
    font-weight: 500;
    font-size: ${(p) => p.theme.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

const SlugCell = styled.code`
  font-size: ${(p) => p.theme.fontSizes.xs};
  background: ${(p) => p.theme.colors.light};
  padding: 2px 6px;
  border-radius: 4px;
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

const emptyCreate = () => ({
  name: '',
  slug: '',
  logoUrl: '',
  website: '',
  description: '',
});

const AdminBrands = () => {
  const { showToast } = useOutletContext();
  const { fetchBrandEntities, createBrandEntity, updateBrandEntity, deleteBrandEntity } = useCatalog();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);
  const [createValues, setCreateValues] = useState(emptyCreate);

  const [editSlug, setEditSlug] = useState(null);
  const [editValues, setEditValues] = useState({
    name: '',
    logoUrl: '',
    website: '',
    description: '',
    sortOrder: '0',
  });

  const [confirmDelete, setConfirmDelete] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await fetchBrandEntities();
      setList(rows);
    } catch (e) {
      showToast(e.message || 'Не удалось загрузить справочник', { type: 'error' });
      setList([]);
    } finally {
      setLoading(false);
    }
  }, [fetchBrandEntities, showToast]);

  useEffect(() => {
    reload();
  }, [reload]);

  const patchCreate = (field, value) => {
    setCreateValues((prev) => ({ ...prev, [field]: value }));
  };

  const patchEdit = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const openCreate = () => {
    setCreateValues(emptyCreate());
    setCreateOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const name = createValues.name.trim();
    if (!name) return;
    try {
      const payload = {
        name,
        ...(createValues.slug.trim() ? { slug: createValues.slug.trim() } : {}),
        logoUrl: createValues.logoUrl.trim() || undefined,
        website: createValues.website.trim() || undefined,
        description: createValues.description.trim() || undefined,
      };
      await createBrandEntity(payload);
      showToast(`Производитель «${name}» создан`);
      setCreateOpen(false);
      await reload();
    } catch (err) {
      showToast(err.message || 'Не удалось создать', { type: 'error' });
    }
  };

  const openEdit = (row) => {
    setEditSlug(row.slug);
    setEditValues({
      name: row.name,
      logoUrl: row.logoUrl || '',
      website: row.website || '',
      description: row.description || '',
      sortOrder: String(row.sortOrder ?? 0),
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editSlug || !editValues.name.trim()) return;
    try {
      await updateBrandEntity(editSlug, {
        name: editValues.name.trim(),
        logoUrl: editValues.logoUrl.trim() || null,
        website: editValues.website.trim() || null,
        description: editValues.description.trim() || null,
        sortOrder: Number(editValues.sortOrder) || 0,
      });
      showToast('Сохранено');
      setEditSlug(null);
      await reload();
    } catch (err) {
      showToast(err.message || 'Не удалось сохранить', { type: 'error' });
    }
  };

  const doDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteBrandEntity(confirmDelete.slug);
      showToast(`«${confirmDelete.name}» удалён из справочника`);
      setConfirmDelete(null);
      await reload();
    } catch (err) {
      showToast(err.message || 'Не удалось удалить', { type: 'error' });
      setConfirmDelete(null);
    }
  };

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Бренды</PageTitle>
          <Text style={{ marginTop: 6 }}>
            Справочник производителей: лого, сайт, описание. Витринные группы в категориях можно привязать к записи
            здесь.
          </Text>
        </div>
        <Button type="button" onClick={openCreate}>
          <FiPlus size={16} /> Добавить производителя
        </Button>
      </PageHeader>

      <Card>
        <SectionTitle>Список</SectionTitle>
        {loading ? (
          <Text>Загрузка…</Text>
        ) : list.length === 0 ? (
          <Text>Пока нет записей. Нажмите «Добавить производителя».</Text>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Slug</th>
                  <th>Витрины</th>
                  <th>Товары (прямая ссылка)</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {list.map((row) => (
                  <tr key={row.slug}>
                    <td>{row.name}</td>
                    <td>
                      <SlugCell>{row.slug}</SlugCell>
                    </td>
                    <td>{row.placementsCount ?? 0}</td>
                    <td>{row.productsCount ?? 0}</td>
                    <td>
                      <Actions>
                        <EditIconAction type="button" title="Изменить" onClick={() => openEdit(row)}>
                          <FiEdit2 size={14} />
                        </EditIconAction>
                        <DeleteIconAction type="button" title="Удалить" onClick={() => setConfirmDelete(row)}>
                          <FiTrash2 size={14} />
                        </DeleteIconAction>
                      </Actions>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>

      {createOpen && (
        <ModalShell title="Новый производитель" width="520px">
          <form onSubmit={handleCreateSubmit}>
            <BrandEntityFormFields mode="create" values={createValues} onChange={patchCreate} />
            <ModalFormFooter submitLabel="Создать" onCancel={() => setCreateOpen(false)} />
          </form>
        </ModalShell>
      )}

      {editSlug && (
        <ModalShell title="Редактировать производителя" width="520px">
          <form onSubmit={handleEditSubmit}>
            <BrandEntityFormFields
              mode="edit"
              slugReadOnly={editSlug}
              values={{
                name: editValues.name,
                slug: editSlug,
                logoUrl: editValues.logoUrl,
                website: editValues.website,
                description: editValues.description,
                sortOrder: editValues.sortOrder,
              }}
              onChange={patchEdit}
            />
            <ModalFormFooter submitLabel="Сохранить" onCancel={() => setEditSlug(null)} />
          </form>
        </ModalShell>
      )}

      <ConfirmModal
        open={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
        title="Удалить из справочника?"
        message={
          confirmDelete
            ? `«${confirmDelete.name}» будет удалён. Привязки витринных групп и поле «производитель» у товаров будут сброшены (${confirmDelete.placementsCount ?? 0} витрин, ${confirmDelete.productsCount ?? 0} товаров с прямой ссылкой).`
            : ''
        }
        onConfirm={doDelete}
      />
    </>
  );
};

export default AdminBrands;
