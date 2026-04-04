import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { ConfirmModal } from './ConfirmModal';

function renderModal(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('ConfirmModal', () => {
  test('не рендерится при open=false', () => {
    const { container } = renderModal(
      <ConfirmModal open={false} onClose={() => {}} title="T" message="M" onConfirm={() => {}} />
    );
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  test('кнопка подтверждения вызывает onConfirm', async () => {
    const onConfirm = jest.fn();
    renderModal(
      <ConfirmModal open onClose={() => {}} title="Удалить?" message="Текст" onConfirm={onConfirm} />
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Удалить' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test('Отмена вызывает onClose', async () => {
    const onClose = jest.fn();
    renderModal(
      <ConfirmModal open onClose={onClose} title="T" message="M" onConfirm={() => {}} />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Отмена' }));
    expect(onClose).toHaveBeenCalled();
  });
});
