import React from 'react';
import styled from 'styled-components';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { productCount as productCountWord } from '../../../utils/pluralize';
import { SectionTitle } from '../AdminUI';
import { EditIconAction, DeleteIconAction, AddSubIconAction } from './IconActionButtons';

const BrandBlocksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing.md};
`;

const BrandBlock = styled.article`
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 12px;
  padding: ${(p) => p.theme.spacing.md} ${(p) => p.theme.spacing.lg};
  background: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.shadows.sm};
`;

const BrandBlockTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${(p) => p.theme.spacing.md};
`;

const BrandIdentity = styled.div`
  flex: 1;
  min-width: 0;
`;

const BrandNameHeading = styled.h3`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes.lg};
  font-weight: 400;
  color: ${(p) => p.theme.colors.primary};
  margin: 0 0 8px;
  line-height: 1.3;
`;

const BrandMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: ${(p) => p.theme.fontSizes.xs};
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid ${(p) => p.theme.colors.border};
  line-height: 1.3;
`;

const EntityPill = styled(Pill)`
  background: ${(p) => p.theme.colors.light};
  color: ${(p) => p.theme.colors.grayDark};
  font-family: ui-monospace, monospace;
`;

const MutedPill = styled(Pill)`
  background: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors.gray};
  font-style: italic;
`;

const BrandActions = styled.div`
  display: inline-flex;
  gap: 4px;
  flex-shrink: 0;
  padding-top: 2px;
`;

const SubRow = styled.div`
  margin-top: ${(p) => p.theme.spacing.md};
  padding-top: ${(p) => p.theme.spacing.md};
  border-top: 1px solid ${(p) => p.theme.colors.border};
`;

const SubRowLabel = styled.div`
  font-size: ${(p) => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${(p) => p.theme.colors.gray};
  margin-bottom: 10px;
  font-weight: 500;
`;

const SubChips = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SubChip = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  padding: 8px 14px;
  border-radius: 8px;
  background: ${(p) => p.theme.colors.light};
  border: 1px solid ${(p) => p.theme.colors.border};
  color: ${(p) => p.theme.colors.primary};
`;

const SubCount = styled.span`
  font-size: ${(p) => p.theme.fontSizes.xs};
  color: ${(p) => p.theme.colors.gray};
  font-variant-numeric: tabular-nums;
  padding: 1px 6px;
  border-radius: 4px;
  background: ${(p) => p.theme.colors.white};
`;

const AddGroupFooter = styled.div`
  margin-top: ${(p) => p.theme.spacing.lg};
  padding-top: ${(p) => p.theme.spacing.lg};
  border-top: 1px dashed ${(p) => p.theme.colors.border};
`;

const DashedButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 16px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-family: inherit;
  color: ${(p) => p.theme.colors.grayDark};
  background: transparent;
  border: 1px dashed ${(p) => p.theme.colors.grayLight};
  border-radius: 10px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s,
    background 0.15s;

  &:hover {
    border-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.primary};
    background: ${(p) => p.theme.colors.light};
  }
`;

/**
 * Витринные группы (бренды) и подкатегории внутри страницы категории.
 */
export function DisplayGroupsSection({
  brands,
  onEditBrand,
  onDeleteBrand,
  onAddSubcategory,
  onAddGroup,
}) {
  return (
    <>
      <SectionTitle>Бренды и подкатегории</SectionTitle>

      <BrandBlocksList>
        {brands.map((b) => (
          <BrandBlock key={b.id}>
            <BrandBlockTop>
              <BrandIdentity>
                <BrandNameHeading>{b.name}</BrandNameHeading>
                <BrandMeta>
                  {b.id === 'default' ? (
                    <MutedPill>Системная группа</MutedPill>
                  ) : b.entitySlug ? (
                    <EntityPill title="Производитель в справочнике">{b.entitySlug}</EntityPill>
                  ) : (
                    <MutedPill>Без привязки к производителю</MutedPill>
                  )}
                </BrandMeta>
              </BrandIdentity>
              <BrandActions>
                <EditIconAction
                  type="button"
                  aria-label={`Изменить группу «${b.name}»`}
                  title="Изменить"
                  onClick={() => onEditBrand(b)}
                >
                  <FiEdit2 size={16} />
                </EditIconAction>
                {b.id !== 'default' && (
                  <DeleteIconAction
                    type="button"
                    aria-label={`Удалить группу «${b.name}»`}
                    title="Удалить группу"
                    onClick={() => onDeleteBrand(b)}
                  >
                    <FiTrash2 size={16} />
                  </DeleteIconAction>
                )}
                <AddSubIconAction
                  type="button"
                  aria-label={`Добавить подкатегорию в «${b.name}»`}
                  title="Добавить подкатегорию"
                  onClick={() => onAddSubcategory(b)}
                >
                  <FiPlus size={16} />
                </AddSubIconAction>
              </BrandActions>
            </BrandBlockTop>

            <SubRow>
              <SubRowLabel>Подкатегории</SubRowLabel>
              <SubChips>
                {b.subcategories.map((s) => (
                  <SubChip key={s.id}>
                    <span>{s.name}</span>
                    <SubCount>
                      {s.products.length} {productCountWord(s.products.length)}
                    </SubCount>
                  </SubChip>
                ))}
              </SubChips>
            </SubRow>
          </BrandBlock>
        ))}
      </BrandBlocksList>

      <AddGroupFooter>
        <DashedButton type="button" onClick={onAddGroup}>
          <FiPlus size={18} strokeWidth={2} />
          Добавить витринную группу
        </DashedButton>
      </AddGroupFooter>
    </>
  );
}
