import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { useCatalog } from '../../context/CatalogContext';
import {
  Card,
  PageTitle,
  PageHeader,
  SectionTitle,
  Label,
  Input,
  Textarea,
  FormActions,
  Button,
  Text,
  ModalOverlay,
  ModalCard,
  ModalTitle,
  ModalMessage,
  ConfirmActions,
  IconButton,
} from './AdminUI';

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

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.spacing.md};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const AdminBrands = () => {
  const { showToast } = useOutletContext();
  const {
    fetchBrandEntities,
    createBrandEntity,
    updateBrandEntity,
    deleteBrandEntity,
  } = useCatalog();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [createName, setCreateName] = useState('');
  const [createSlug, setCreateSlug] = useState('');
  const [createLogo, setCreateLogo] = useState('');
  const [createWebsite, setCreateWebsite] = useState('');
  const [createDesc, setCreateDesc] = useState('');

  const [editRow, setEditRow] = useState(null);
  const [editName, setEditName] = useState('');
  const [editLogo, setEditLogo] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editSort, setEditSort] = useState('0');

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

  const handleCreate = async (e) => {
    e.preventDefault();
    const name = createName.trim();
    if (!name) return;
    try {
      const payload = {
        name,
        ...(createSlug.trim() ? { slug: createSlug.trim() } : {}),
        logoUrl: createLogo.trim() || undefined,
        website: createWebsite.trim() || undefined,
        description: createDesc.trim() || undefined,
      };
      await createBrandEntity(payload);
      showToast(`Производитель «${name}» создан`);
      setCreateName('');
      setCreateSlug('');
      setCreateLogo('');
      setCreateWebsite('');
      setCreateDesc('');
      await reload();
    } catch (err) {
      showToast(err.message || 'Не удалось создать', { type: 'error' });
    }
  };

  const openEdit = (row) => {
    setEditRow(row);
    setEditName(row.name);
    setEditLogo(row.logoUrl || '');
    setEditWebsite(row.website || '');
    setEditDesc(row.description || '');
    setEditSort(String(row.sortOrder ?? 0));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editRow || !editName.trim()) return;
    try {
      await updateBrandEntity(editRow.slug, {
        name: editName.trim(),
        logoUrl: editLogo.trim() || null,
        website: editWebsite.trim() || null,
        description: editDesc.trim() || null,
        sortOrder: Number(editSort) || 0,
      });
      showToast('Сохранено');
      setEditRow(null);
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
      </PageHeader>

      <Card as="form" onSubmit={handleCreate}>
        <SectionTitle>
          <FiPlus size={18} style={{ verticalAlign: '-3px', marginRight: 6 }} />
          Новый производитель
        </SectionTitle>
        <Grid2>
          <div>
            <Label>Название *</Label>
            <Input value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="Например: Rimi" />
          </div>
          <div>
            <Label>Slug (необязательно)</Label>
            <Input
              value={createSlug}
              onChange={(e) => setCreateSlug(e.target.value)}
              placeholder="Латиница, будет из названия если пусто"
            />
          </div>
        </Grid2>
        <Label>URL логотипа</Label>
        <Input value={createLogo} onChange={(e) => setCreateLogo(e.target.value)} placeholder="https://..." />
        <Label>Сайт</Label>
        <Input value={createWebsite} onChange={(e) => setCreateWebsite(e.target.value)} placeholder="https://..." />
        <Label>Описание</Label>
        <Textarea value={createDesc} onChange={(e) => setCreateDesc(e.target.value)} rows={3} />
        <FormActions style={{ marginTop: 0 }}>
          <Button type="submit">Создать</Button>
        </FormActions>
      </Card>

      <Card>
        <SectionTitle>Список</SectionTitle>
        {loading ? (
          <Text>Загрузка…</Text>
        ) : list.length === 0 ? (
          <Text>Пока нет записей. Добавьте производителя выше.</Text>
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
                        <IconButton type="button" title="Изменить" onClick={() => openEdit(row)}>
                          <FiEdit2 size={14} />
                        </IconButton>
                        <IconButton type="button" title="Удалить" onClick={() => setConfirmDelete(row)}>
                          <FiTrash2 size={14} />
                        </IconButton>
                      </Actions>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>

      {editRow && (
        <ModalOverlay onClick={() => setEditRow(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()} $width="480px">
            <ModalTitle>Редактировать: {editRow.slug}</ModalTitle>
            <form onSubmit={saveEdit}>
              <Label>Название *</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
              <Label>URL логотипа</Label>
              <Input value={editLogo} onChange={(e) => setEditLogo(e.target.value)} />
              <Label>Сайт</Label>
              <Input value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)} />
              <Label>Описание</Label>
              <Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={3} />
              <Label>Порядок сортировки</Label>
              <Input value={editSort} onChange={(e) => setEditSort(e.target.value)} type="number" />
              <FormActions>
                <Button type="submit">Сохранить</Button>
                <Button type="button" $variant="secondary" onClick={() => setEditRow(null)}>
                  Отмена
                </Button>
              </FormActions>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {confirmDelete && (
        <ModalOverlay onClick={() => setConfirmDelete(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()} $width="420px">
            <ModalTitle>Удалить из справочника?</ModalTitle>
            <ModalMessage>
              «{confirmDelete.name}» будет удалён. Привязки витринных групп и поле «производитель» у товаров будут
              сброшены ({confirmDelete.placementsCount ?? 0} витрин, {confirmDelete.productsCount ?? 0} товаров с
              прямой ссылкой).
            </ModalMessage>
            <ConfirmActions>
              <Button type="button" $variant="secondary" onClick={() => setConfirmDelete(null)}>
                Отмена
              </Button>
              <Button type="button" $variant="danger" onClick={doDelete}>
                Удалить
              </Button>
            </ConfirmActions>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
};

export default AdminBrands;
