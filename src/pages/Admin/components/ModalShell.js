import React from 'react';
import { ModalOverlay, ModalCard, ModalTitle } from '../AdminUI';

/**
 * Общая оболочка модального окна: затемнение, карточка, заголовок.
 */
export function ModalShell({ title, width, onClose, children }) {
  const handleOverlay = onClose || (() => {});
  return (
    <ModalOverlay onClick={handleOverlay}>
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
