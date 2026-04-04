import React from 'react';
import { ModalOverlay, ModalCard, ModalTitle } from '../AdminUI';

/**
 * Общая оболочка модального окна: затемнение, карточка, заголовок.
 * Закрытие — только явными действиями внутри (кнопки), не по клику на фон.
 */
export function ModalShell({ title, width, children }) {
  return (
    <ModalOverlay>
      <ModalCard
        onClick={(e) => e.stopPropagation()}
        $width={width}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'admin-modal-title' : undefined}
      >
        {title != null && title !== '' && <ModalTitle id="admin-modal-title">{title}</ModalTitle>}
        {children}
      </ModalCard>
    </ModalOverlay>
  );
}
