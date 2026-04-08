import React from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { FiFolder, FiPackage, FiLayers, FiTag, FiPercent } from 'react-icons/fi';
import { Card, PageTitle, Text, ButtonLink } from './AdminUI';
import styled from 'styled-components';

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${(p) => p.theme.spacing.md};
  margin-bottom: ${(p) => p.theme.spacing.xl};
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.md};
  margin-bottom: 0;
`;

const StatIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: ${(p) => p.theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.colors.primary};
  flex-shrink: 0;
`;

const StatValue = styled.div`
  font-size: ${(p) => p.theme.fontSizes['2xl']};
  font-weight: 600;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: ${(p) => p.theme.fontSizes.xs};
  color: ${(p) => p.theme.colors.gray};
  margin-top: 2px;
`;

const Actions = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.md};
  flex-wrap: wrap;
`;

const AdminDashboard = () => {
  const { categories } = useCatalog();
  const totalProducts = categories.reduce(
    (acc, cat) =>
      acc +
      cat.brands.reduce(
        (bAcc, b) => bAcc + b.subcategories.reduce((sAcc, s) => sAcc + s.products.length, 0),
        0
      ),
    0
  );
  const totalBrands = categories.reduce((acc, cat) => acc + cat.brands.length, 0);

  return (
    <>
      <PageTitle style={{ marginBottom: 24 }}>Обзор</PageTitle>

      <Stats>
        <StatCard>
          <StatIcon><FiLayers size={20} /></StatIcon>
          <div>
            <StatValue>{categories.length}</StatValue>
            <StatLabel>Категорий</StatLabel>
          </div>
        </StatCard>
        <StatCard>
          <StatIcon><FiPackage size={20} /></StatIcon>
          <div>
            <StatValue>{totalProducts}</StatValue>
            <StatLabel>Товаров</StatLabel>
          </div>
        </StatCard>
        <StatCard>
          <StatIcon><FiFolder size={20} /></StatIcon>
          <div>
            <StatValue>{totalBrands}</StatValue>
            <StatLabel>Брендов</StatLabel>
          </div>
        </StatCard>
      </Stats>

      <Card>
        <Text style={{ marginBottom: 16 }}>
          Управляйте каталогом: категории и товары — в разделе «Категории», справочник производителей — в
          «Справочник брендов», карточки на главной — в «Акции».
        </Text>
        <Actions>
          <ButtonLink to="/admin/categories">
            <FiFolder size={16} />
            Категории
          </ButtonLink>
          <ButtonLink to="/admin/brands" $variant="secondary">
            <FiTag size={16} />
            Справочник брендов
          </ButtonLink>
          <ButtonLink to="/admin/promotions" $variant="secondary">
            <FiPercent size={16} />
            Акции
          </ButtonLink>
        </Actions>
      </Card>
    </>
  );
};

export default AdminDashboard;
