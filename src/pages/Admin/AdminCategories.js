import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCatalog } from '../../context/CatalogContext';
import { FiPlus, FiChevronRight } from 'react-icons/fi';
import { productCount as productCountWord } from '../../utils/pluralize';
import { PageTitle, PageHeader, ButtonLink, Thumb, Empty } from './AdminUI';

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
  const { categories } = useCatalog();

  const productCount = (cat) =>
    cat.brands.reduce(
      (acc, b) => acc + b.subcategories.reduce((s, sub) => s + sub.products.length, 0),
      0
    );

  return (
    <>
      <PageHeader>
        <PageTitle>Категории</PageTitle>
        <ButtonLink to="/admin/categories/new">
          <FiPlus size={16} />
          Добавить
        </ButtonLink>
      </PageHeader>

      {categories.length === 0 && <Empty>Категорий пока нет. Создайте первую.</Empty>}

      <List>
        {categories.map((cat) => {
          const count = productCount(cat);
          return (
            <Item key={cat.id}>
              <ItemLink to={`/admin/categories/${cat.id}`}>
                <Thumb $src={cat.image} $size="56px" />
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
    </>
  );
};

export default AdminCategories;
