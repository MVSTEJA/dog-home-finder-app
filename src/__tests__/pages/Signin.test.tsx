import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';

import { SignInSideForm } from 'src/pages/SignIn';
import { locationMock, navigateMock } from '../testUtils';

vi.spyOn(global.console, 'warn');

vi.mock('wouter', () => ({
  useLocation: () => [locationMock, navigateMock],
}));

describe('SignInSideForm', () => {
  const props = {
    isLoggedIn: false,
    openConfim: false,
    handleBackNav: vi.fn(),
    handleClose: vi.fn(),
    handleSubmit: vi.fn((e) => e.preventDefault()),
    nameError: '',
    emailError: '',
    handleNameInput: vi.fn(),
    handleEmailInput: vi.fn(),
    isSuccess: false,
    isLoading: false,
  };

  it('renders the component without errors', () => {
    render(<SignInSideForm {...props} />);
    expect(screen.getByText('Sign in')).toBeDefined();
  });

  it('displays name error message when provided', () => {
    const nameError = 'Invalid name';
    render(<SignInSideForm {...props} nameError={nameError} />);
    expect(screen.getByText(nameError)).toBeDefined();
  });

  it('displays email error message when provided', () => {
    const emailError = 'Invalid email';
    render(<SignInSideForm {...props} emailError={emailError} />);
    expect(screen.getByText(emailError)).toBeDefined();
  });

  it('calls handleNameInput on name input change', () => {
    render(<SignInSideForm {...props} />);
    const nameInput = screen.getByPlaceholderText('abc');

    fireEvent.input(nameInput, { target: { value: '$23.0' } });
    expect(props.handleNameInput).toHaveBeenCalledTimes(1);
  });

  it('calls handleEmailInput on email input blur', () => {
    render(<SignInSideForm {...props} />);

    const emailInput = screen.getByPlaceholderText('abc@xyz.com');

    fireEvent.input(emailInput, { target: { value: '$23.0' } });
    fireEvent.blur(emailInput);
    expect(props.handleEmailInput).toHaveBeenCalledTimes(1);
  });

  it('calls handleSubmit on form submission', async () => {
    const handleSubmitLocal = vi.fn();
    render(<SignInSideForm {...props} handleSubmit={handleSubmitLocal} />);

    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(handleSubmitLocal).toHaveBeenCalledTimes(1);
      cleanup();
    });
  });

  it('displays loading button when isLoading is true', async () => {
    const handleSubmitLocal = vi.fn();
    render(<SignInSideForm {...props} handleSubmit={handleSubmitLocal} />);
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.click(signInButton);
    render(<SignInSideForm {...props} isLoading />);
    await waitFor(() => {
      expect(handleSubmitLocal).toHaveBeenCalledTimes(1);

      expect(screen.getByRole('progressbar')).toBeDefined();
    });
  });
});
