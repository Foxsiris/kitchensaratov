import styled from 'styled-components';
import { IconButton } from '../AdminUI';

/** Редактирование: акцент primary */
export const EditIconAction = styled(IconButton)`
  &:hover {
    border-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.primary};
    background: ${(p) => p.theme.colors.white};
  }
`;

/** Удаление: акцент danger */
export const DeleteIconAction = styled(IconButton)`
  &:hover {
    border-color: #c00;
    color: #c00;
    background: #fff5f5;
  }
`;

/** Добавить подкатегорию */
export const AddSubIconAction = styled(IconButton)`
  &:hover {
    border-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.primary};
    background: ${(p) => p.theme.colors.white};
  }
`;
