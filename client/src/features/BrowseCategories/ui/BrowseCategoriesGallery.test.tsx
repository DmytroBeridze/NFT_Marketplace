import BrowseCategoriesGallery from './BrowseCategoriesGallery';
import { render, screen } from '@testing-library/react';
import { vi, it, describe, expect, beforeEach } from 'vitest';
import { useGetCategoriesQuery } from '../model';

vi.mock('../../../widgets/BrowseCategories/ui/CategoriesCard', () => ({
  __esModule: true,
  default: Object.assign(
    (props: any) => <div data-testid="CategoriesCard" {...props}></div>,
    { skeleton: () => <div data-testid="CategoriesCard-skeleton"></div> },
  ),
}));

vi.mock('../model', () => ({
  useGetCategoriesQuery: vi.fn(),
}));

const mockedHook = useGetCategoriesQuery as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockedHook.mockReset();
});

describe('BrowseCategoriesGallery', () => {
  it('skeleton display during loading', () => {
    mockedHook.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });
    render(<BrowseCategoriesGallery />);

    expect(
      screen.getAllByTestId('CategoriesCard-skeleton')[0],
    ).toBeInTheDocument();
  });

  it('placeholder display during an error', () => {
    mockedHook.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });
    render(<BrowseCategoriesGallery />);

    expect(screen.getByTestId('CategoriesCard-error')).toBeInTheDocument();
  });

  it('component displaying after receiving data', () => {
    mockedHook.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ _id: '123', name: 'test name' }],
    });

    render(<BrowseCategoriesGallery />);

    expect(screen.getByTestId('CategoriesCard')).toBeInTheDocument();
  });
});
