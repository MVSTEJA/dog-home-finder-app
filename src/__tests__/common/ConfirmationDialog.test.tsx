import { render, screen, fireEvent } from '@testing-library/react';

import ConfirmationDialog, {
  ConfirmationDialogProps,
} from 'src/components/common/ConfirmationDialog';

describe('ConfirmationDialog', () => {
  const defaultProps: ConfirmationDialogProps = {
    open: true,
    onClose: vi.fn(),
    onSubmit: vi.fn(),
  };

  it('renders dialog with title and description', () => {
    const title = 'Confirmation Dialog';
    const description = 'Are you sure?';
    render(
      <ConfirmationDialog
        title={title}
        description={description}
        {...defaultProps}
      />
    );

    const titleElement = screen.getByText(title);
    const descriptionElement = screen.getByText(description);

    expect(titleElement).toBeDefined();
    expect(descriptionElement).toBeDefined();
  });

  it('renders dialog with "OK" button for variant "info"', () => {
    render(<ConfirmationDialog {...defaultProps} variant="info" />);

    const okButton = screen.getByRole('button', { name: 'OK' });
    expect(okButton).toBeDefined();
  });

  it('renders dialog with "Cancel" and "Yes" buttons for variant "danger"', () => {
    render(<ConfirmationDialog {...defaultProps} variant="danger" />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const yesButton = screen.getByRole('button', { name: 'Yes' });

    expect(cancelButton).toBeDefined();
    expect(yesButton).toBeDefined();
  });

  it('calls onSubmit when "Yes" button is clicked for variant "danger"', () => {
    render(<ConfirmationDialog {...defaultProps} variant="danger" />);

    const yesButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(yesButton);

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when "Cancel" button is clicked for variant "danger"', () => {
    render(<ConfirmationDialog {...defaultProps} variant="danger" />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
