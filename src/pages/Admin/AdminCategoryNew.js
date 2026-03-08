import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';
import { FiChevronLeft } from 'react-icons/fi';
import {
  Card,
  PageTitle,
  Label,
  Input,
  FormActions,
  Button,
  BackLink,
} from './AdminUI';

const AdminCategoryNew = () => {
  const navigate = useNavigate();
  const { showToast } = useOutletContext();
  const { addCategory } = useCatalog();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const id = addCategory({ name, image });
    if (id) {
      showToast(`Категория «${name.trim()}» создана`);
      navigate(`/admin/categories/${id}`);
    }
  };

  return (
    <>
      <BackLink to="/admin/categories">
        <FiChevronLeft size={14} />
        Категории
      </BackLink>

      <Card as="form" onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
        <PageTitle style={{ marginBottom: 24 }}>Новая категория</PageTitle>

        <Label htmlFor="cat-name">Название *</Label>
        <Input
          id="cat-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например: Кухни"
          required
          autoFocus
        />

        <Label htmlFor="cat-image">URL изображения</Label>
        <Input
          id="cat-image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://images.unsplash.com/..."
        />

        <FormActions>
          <Button type="submit">Создать</Button>
          <Button type="button" $variant="secondary" onClick={() => navigate('/admin/categories')}>
            Отмена
          </Button>
        </FormActions>
      </Card>
    </>
  );
};

export default AdminCategoryNew;
