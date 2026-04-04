import React from 'react';
import { ModalMessage, ConfirmActions, Button } from '../AdminUI';
import { ModalShell } from './ModalShell';

/**
 * Унифицированное подтверждение опасного действия (удаление и т.д.).
 */
export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  confirmLabel = 'Удалить',
  cancelLabel = 'Отмена',
  danger = true,
  onConfirm,
  busy = false,
}) {
  if (!open) return null;

  return (
    <ModalShell
      title={title}
      width="420px"
      onClose={() => {
        if (!busy) onClose();
      }}
    >
      <ModalMessage>{message}</ModalMessage>
      <ConfirmActions>
        <Button type="button" $variant="secondary" onClick={onClose} disabled={busy}>
          {cancelLabel}
        </Button>
        <Button
          type="button"
          $variant={danger ? 'danger' : 'primary'}
          disabled={busy}
          onClick={() => onConfirm()}
        >
          {confirmLabel}
        </Button>
      </ConfirmActions>
    </ModalShell>
  );
}
