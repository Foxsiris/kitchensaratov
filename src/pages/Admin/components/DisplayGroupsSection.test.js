import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { DisplayGroupsSection } from './DisplayGroupsSection';

const brands = [
  {
    id: 'default',
    name: 'Все бренды',
    entitySlug: undefined,
    subcategories: [{ id: 'all', name: 'Все модели', products: [] }],
  },
  {
    id: 'rimi',
    name: 'В стиле «Рими»',
    entitySlug: 'rimi',
    subcategories: [
      { id: 'm', name: 'Современные', products: [{ id: 'p' }] },
      { id: 'c', name: 'Классика', products: [] },
    ],
  },
];

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('DisplayGroupsSection', () => {
  test('показывает группы, чипы и вызывает колбэки', async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onAddSub = jest.fn();
    const onAddGroup = jest.fn();

    renderWithTheme(
      <DisplayGroupsSection
        brands={brands}
        onEditBrand={onEdit}
        onDeleteBrand={onDelete}
        onAddSubcategory={onAddSub}
        onAddGroup={onAddGroup}
      />
    );

    expect(screen.getByText('Бренды и подкатегории')).toBeInTheDocument();
    expect(screen.getByText('В стиле «Рими»')).toBeInTheDocument();
    expect(screen.getByText('Современные')).toBeInTheDocument();
    expect(screen.getByText('rimi')).toBeInTheDocument();

    await userEvent.click(screen.getAllByTitle('Изменить')[1]);
    expect(onEdit).toHaveBeenCalledWith(brands[1]);

    await userEvent.click(screen.getAllByTitle('Удалить группу')[0]);
    expect(onDelete).toHaveBeenCalledWith(brands[1]);

    await userEvent.click(screen.getAllByTitle('Добавить подкатегорию')[0]);
    expect(onAddSub).toHaveBeenCalledWith(brands[0]);

    await userEvent.click(screen.getByRole('button', { name: /Добавить витринную группу/i }));
    expect(onAddGroup).toHaveBeenCalled();
  });
});
