import { render, fireEvent, screen } from '@testing-library/react';

import { Box } from '@mui/material';
import CustomIconBtn from 'src/components/common/ActionableBtns';

// Mock Icons
const TestIcon = () => <Box data-testid="test-icon" />;

describe('CustomIconBtn', () => {
  it('should display the correct button text', () => {
    render(
      <CustomIconBtn
        iconState
        handleClick={() => {}}
        btnText="Test Button"
        startIcon={<TestIcon />}
      />
    );
    expect(screen.getByText('Test Button')).toBeDefined();
  });

  it('should call handleClick when the button is clicked', () => {
    const handleClick = vi.fn();
    render(
      <CustomIconBtn
        iconState
        handleClick={handleClick}
        btnText="Test Button"
        startIcon={<TestIcon />}
      />
    );
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should call clearAction when the close icon is clicked', () => {
    const clearAction = vi.fn();
    render(
      <CustomIconBtn
        iconState
        handleClick={() => {}}
        btnText="Test Button"
        startIcon={<TestIcon />}
        clearAction={clearAction}
        selectedText="Selected Text"
        showClose
      />
    );
    fireEvent.click(screen.getByTestId('CloseIcon'));
    expect(clearAction).toHaveBeenCalled();
  });

  it('should render the start icon correctly', () => {
    render(
      <CustomIconBtn
        iconState
        handleClick={() => {}}
        btnText="Test Button"
        startIcon={<TestIcon />}
      />
    );
    expect(screen.getByTestId('test-icon')).toBeDefined();
  });
});
