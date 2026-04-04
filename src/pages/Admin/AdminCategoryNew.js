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
  ErrorText,
} from './AdminUI';

const AdminCategoryNew = () => {
  const navigate = useNavigate();
  const { showToast } = useOutletContext();
  const { addCategory } = useCatalog();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Обязательное поле';
    if (image.trim() && !/^https?:\/\/.+/i.test(image.trim())) e.image = 'Некорректный URL';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const id = await addCategory({ name, image });
      if (id) {
        showToast(`Категория «${name.trim()}» создана`);
        navigate(`/admin/categories/${id}`);
      } else {
        showToast('Не удалось создать категорию', { type: 'error' });
      }
    } catch (err) {
      showToast(err.message || 'Ошибка сохранения', { type: 'error' });
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
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          placeholder="Например: Кухни"
          autoFocus
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}

        <Label htmlFor="cat-image">URL изображения</Label>
        <Input
          id="cat-image"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
            if (errors.image) setErrors((prev) => ({ ...prev, image: '' }));
          }}
          placeholder="https://images.unsplash.com/..."
        />
        {errors.image && <ErrorText>{errors.image}</ErrorText>}

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
