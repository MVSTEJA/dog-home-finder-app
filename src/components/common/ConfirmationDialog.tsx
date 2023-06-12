import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FC } from 'react';

export interface ConfirmationOptions {
  variant?: 'danger' | 'info';
  title?: string;
  description?: string;
}

export interface ConfirmationDialogProps extends ConfirmationOptions {
  open: boolean | null;
  onSubmit: () => void;
  onClose: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  description = '',
  variant = 'info',
  title = '',
  onSubmit,
  onClose,
}) => {
  return (
    <Dialog open={open || false}>
      <DialogTitle fontSize="14px" id="alert-dialog-title">
        {title}
      </DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {variant === 'danger' && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              autoFocus
            >
              Cancel
            </Button>
            <Button color="primary" onClick={onSubmit}>
              Yes
            </Button>
          </>
        )}

        {variant === 'info' && (
          <Button color="primary" onClick={onSubmit}>
            OK
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
