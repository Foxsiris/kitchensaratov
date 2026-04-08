import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { useCatalog } from '../../context/CatalogContext';
import { Card, PageTitle, PageHeader, SectionTitle, Button, Text, Label, Input, Textarea } from './AdminUI';
import { ModalShell, ConfirmModal, ModalFormFooter, EditIconAction, DeleteIconAction } from './components';

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

const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${(p) => p.theme.spacing.md};
  font-size: ${(p) => p.theme.fontSizes.sm};
  cursor: pointer;
  user-select: none;
`;

const emptyCreate = () => ({
  dark: false,
  badge: '',
  title: '',
  description: '',
  price: '',
  action: '',
  sortOrder: '0',
});

const AdminPromotions = () => {
  const { showToast } = useOutletContext();
  const { fetchPromotions, createPromotion, updatePromotion, deletePromotion } = useCatalog();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);
  const [createValues, setCreateValues] = useState(emptyCreate);

  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState(emptyCreate);

  const [confirmDelete, setConfirmDelete] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await fetchPromotions();
      setList(rows);
    } catch (e) {
      showToast(e.message || 'Не удалось загрузить акции', { type: 'error' });
      setList([]);
    } finally {
      setLoading(false);
    }
  }, [fetchPromotions, showToast]);

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
    const badge = createValues.badge.trim();
    const title = createValues.title.trim();
    if (!badge || !title) return;
    try {
      await createPromotion({
        dark: createValues.dark,
        badge,
        title,
        description: createValues.description.trim(),
        price: createValues.price.trim(),
        action: createValues.action.trim(),
        sortOrder: Number(createValues.sortOrder) || 0,
      });
      showToast('Акция создана');
      setCreateOpen(false);
      await reload();
    } catch (err) {
      showToast(err.message || 'Не удалось создать', { type: 'error' });
    }
  };

  const openEdit = (row) => {
    setEditId(row.id);
    setEditValues({
      dark: Boolean(row.dark),
      badge: row.badge || '',
      title: row.title || '',
      description: row.description || '',
      price: row.price || '',
      action: row.action || '',
      sortOrder: String(row.sortOrder ?? 0),
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editId) return;
    const badge = editValues.badge.trim();
    const title = editValues.title.trim();
    if (!badge || !title) return;
    try {
      await updatePromotion(editId, {
        dark: editValues.dark,
        badge,
        title,
        description: editValues.description.trim(),
        price: editValues.price.trim(),
        action: editValues.action.trim(),
        sortOrder: Number(editValues.sortOrder) || 0,
      });
      showToast('Сохранено');
      setEditId(null);
      await reload();
    } catch (err) {
      showToast(err.message || 'Не удалось сохранить', { type: 'error' });
    }
  };

  const doDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deletePromotion(confirmDelete.id);
      showToast('Акция удалена');
      setConfirmDelete(null);
      await reload();
    } catch (err) {
      showToast(err.message || 'Не удалось удалить', { type: 'error' });
      setConfirmDelete(null);
    }
  };

  const formFields = (values, onChange) => (
    <>
      <CheckboxRow>
        <input
          type="checkbox"
          checked={values.dark}
          onChange={(e) => onChange('dark', e.target.checked)}
        />
        Тёмная карточка
      </CheckboxRow>
      <Label htmlFor="promo-badge">Бейдж</Label>
      <Input
        id="promo-badge"
        value={values.badge}
        onChange={(e) => onChange('badge', e.target.value)}
        placeholder="Напр. Скидка 30%"
      />
      <Label htmlFor="promo-title">Заголовок</Label>
      <Input
        id="promo-title"
        value={values.title}
        onChange={(e) => onChange('title', e.target.value)}
        placeholder="Название акции"
      />
      <Label htmlFor="promo-desc">Описание</Label>
      <Textarea
        id="promo-desc"
        value={values.description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Текст под заголовком"
      />
      <Label htmlFor="promo-price">Цена / выгода</Label>
      <Input
        id="promo-price"
        value={values.price}
        onChange={(e) => onChange('price', e.target.value)}
        placeholder="Напр. от 15 000 ₽/мес"
      />
      <Label htmlFor="promo-action">Текст кнопки</Label>
      <Input
        id="promo-action"
        value={values.action}
        onChange={(e) => onChange('action', e.target.value)}
        placeholder="Напр. Оформить"
      />
      <Label htmlFor="promo-order">Порядок</Label>
      <Input
        id="promo-order"
        type="number"
        value={values.sortOrder}
        onChange={(e) => onChange('sortOrder', e.target.value)}
      />
    </>
  );

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Акции</PageTitle>
          <Text style={{ marginTop: 6 }}>
            Карточки блока «Акции и скидки» на главной странице. Кнопка по-прежнему открывает форму рассрочки.
          </Text>
        </div>
        <Button type="button" onClick={openCreate}>
          <FiPlus size={16} /> Добавить акцию
        </Button>
      </PageHeader>

      <Card>
        <SectionTitle>Список</SectionTitle>
        {loading ? (
          <Text>Загрузка…</Text>
        ) : list.length === 0 ? (
          <Text>Пока нет акций. Нажмите «Добавить акцию» или выполните сид БД.</Text>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <th>Порядок</th>
                  <th>Бейдж</th>
                  <th>Заголовок</th>
                  <th>Тёмная</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {list.map((row) => (
                  <tr key={row.id}>
                    <td>{row.sortOrder ?? 0}</td>
                    <td>{row.badge}</td>
                    <td>{row.title}</td>
                    <td>{row.dark ? 'Да' : 'Нет'}</td>
                    <td>
                      <Actions>
                        <EditIconAction type="button" title="Изменить" onClick={() => openEdit(row)}>
                          <FiEdit2 size={14} />
                        </EditIconAction>
                        <DeleteIconAction
                          type="button"
                          title="Удалить"
                          onClick={() => setConfirmDelete(row)}
                        >
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
        <ModalShell title="Новая акция" width="520px">
          <form onSubmit={handleCreateSubmit}>
            {formFields(createValues, patchCreate)}
            <ModalFormFooter submitLabel="Создать" onCancel={() => setCreateOpen(false)} />
          </form>
        </ModalShell>
      )}

      {editId && (
        <ModalShell title="Редактировать акцию" width="520px">
          <form onSubmit={handleEditSubmit}>
            {formFields(editValues, patchEdit)}
            <ModalFormFooter submitLabel="Сохранить" onCancel={() => setEditId(null)} />
          </form>
        </ModalShell>
      )}

      <ConfirmModal
        open={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
        title="Удалить акцию?"
        message={confirmDelete ? `«${confirmDelete.title}» будет удалена с главной страницы.` : ''}
        onConfirm={doDelete}
      />
    </>
  );
};

export default AdminPromotions;
