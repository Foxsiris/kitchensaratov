import React from 'react';
import { FormActions, Button } from '../AdminUI';

/**
 * Нижняя панель модалки с формой: основное действие (submit) + отмена.
 */
export function ModalFormFooter({
  submitLabel = 'Сохранить',
  cancelLabel = 'Отмена',
  onCancel,
  busy = false,
  submitVariant,
}) {
  return (
    <FormActions>
      <Button type="submit" disabled={busy} {...(submitVariant ? { $variant: submitVariant } : {})}>
        {submitLabel}
      </Button>
      <Button type="button" $variant="secondary" onClick={onCancel} disabled={busy}>
        {cancelLabel}
      </Button>
    </FormActions>
  );
}
