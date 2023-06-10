import {
  render,
  screen,
  fireEvent,
  getByRole,
  getAllByRole,
} from '@testing-library/react';
import BreedSelect from 'src/components/SortFilterSection/BreedSelect';
import { Breed } from 'src/types';
import { locationMock, navigateMock } from '../testUtils';

const options: Breed[] = [
  { value: 'Labrador Retriever', label: 'Labrador Retriever' },
  { value: 'German Shepherd', label: 'German Shepherd' },
  { value: 'Golden Retriever', label: 'Golden Retriever' },
  { value: 'Bulldog', label: 'Bulldog' },
];

vi.mock('wouter', () => ({
  useLocation: () => [locationMock, navigateMock],
}));

describe('BreedSelect', () => {
  it('renders the breed select component', () => {
    render(<BreedSelect options={options} breeds={[]} setBreeds={() => {}} />);

    const textField = screen.getByPlaceholderText('Search breed and select...');
    expect(textField).toBeDefined();
  });

  it('displays options in the autocomplete dropdown', async () => {
    render(<BreedSelect options={options} breeds={[]} setBreeds={() => {}} />);

    const textField = screen.getByTestId('autocomplete-search');
    await fireEvent.mouseDown(getByRole(textField, 'combobox'));

    options.forEach((option) => {
      const optionElement = screen.getByText(option.value);
      expect(optionElement).toBeDefined();
    });
  });

  it('selects breeds when an option is clicked', async () => {
    const setBreedsMock = vi.fn();
    render(
      <BreedSelect options={options} breeds={[]} setBreeds={setBreedsMock} />
    );

    const textField = screen.getByTestId('autocomplete-search');
    await fireEvent.mouseDown(getByRole(textField, 'combobox'));

    const optionElement = screen.getByText('Labrador Retriever');
    fireEvent.click(optionElement);

    expect(setBreedsMock).toHaveBeenCalledWith([
      { value: 'Labrador Retriever', label: 'Labrador Retriever' },
    ]);
  });

  it('displays selected breeds as checked', async () => {
    const breeds: Breed[] = [
      { value: 'Labrador Retriever', label: 'Labrador Retriever' },
      { value: 'Golden Retriever', label: 'Golden Retriever' },
    ];
    render(
      <BreedSelect options={options} breeds={breeds} setBreeds={() => {}} />
    );

    const textField = screen.getByTestId('autocomplete-search');
    await fireEvent.mouseDown(getByRole(textField, 'combobox'));

    const getDropdown = screen.getByRole('list-box');
    const selectedOptions = await getAllByRole(getDropdown, 'option');

    let selectedCount = 0;
    selectedOptions.forEach((option) => {
      if (option.getAttribute('aria-selected') === 'true') {
        selectedCount += 1;
      }
    });
    expect(selectedCount).toEqual(2);
  });
});
