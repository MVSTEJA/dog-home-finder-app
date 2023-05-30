import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface ConfirmationOptions {
  variant?: 'danger' | 'info';
  title?: string;
  description?: string;
}

interface ConfirmationDialogProps extends ConfirmationOptions {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

const ConfirmationDialog = ({
  open,
  title,
  variant,
  description,
  onSubmit,
  onClose,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {variant === 'danger' && (
          <>
            <Button color="primary" onClick={onSubmit}>
              Yes, I agree
            </Button>
            <Button color="primary" onClick={onClose} autoFocus>
              CANCEL
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

ConfirmationDialog.defaultProps = {
  description: '',
  variant: 'info',
  title: '',
};

export default ConfirmationDialog;
