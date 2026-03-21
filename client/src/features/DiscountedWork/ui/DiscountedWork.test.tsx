vi.mock('../../../widgets/NFTPreview/ui/NFTPreview', () => ({
  __esModule: true, // чтобы TS понял default export
  default: Object.assign(
    (props: any) => <div data-testid="NFTPreview" {...props} />,
    { Skeleton: () => <div data-testid="NFTPreview-skeleton" /> },
  ),
}));

import { render, screen } from '@testing-library/react';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as model from '../../../entities/DiscountedWork/model';
import DiscountedWork from './DiscountedWork';
import { MemoryRouter } from 'react-router-dom';

describe('DiscountedWork', () => {
  vi.mock('../../../entities/DiscountedWork/model', () => ({
    useGetNFTBySaleQuery: vi.fn(),
  }));

  const mockedHook = model.useGetNFTBySaleQuery as unknown as ReturnType<
    typeof vi.fn
  >;
  beforeEach(() => {
    mockedHook.mockReset();
  });

  // --------show skeleton
  it('show skeleton during loading', () => {
    mockedHook.mockReturnValue({
      isError: false,
      isLoading: true,
      data: null,
    });

    render(<DiscountedWork />);

    const elem = screen.getByTestId('NFTPreview-skeleton');
    expect(elem).toBeInTheDocument();
  });

  // ------------shows error
  it('shows error message when fetch fails', () => {
    mockedHook.mockReturnValue({
      isError: true,
      isLoading: false,
      data: null,
    });

    render(<DiscountedWork />);
    expect(screen.getByTestId('discountWork-error')).toBeInTheDocument();
  });

  // ------shows data
  it('shows data when fetch succeeds', () => {
    mockedHook.mockReturnValue({
      isError: false,
      isLoading: false,
      data: {
        item: {
          _id: '68e571c5c1b8b36f35d21cdd',
          name: 'Progr',
          description: 'lorem ipsum',
          authorId: {
            _id: '68e56d68c1b8b36f35d21cc4',
            userName: 'UserName',
            avatar: 'avatar.link',
          },
          gallery: { _id: '68e56d68c1b8b36f35d21cc4', name: 'gallery' },
          category: 'category',
          price: 20,
          sold: true,
          imageUrl: 'image.url',
          deleteImageUrl: 'delete.url',
          keywords: ['lorem', 'ipsum'],
          likes: ['first', 'second'],
          views: 2,
          rating: 100,
          sales: null,
        },
      },
    });

    render(
      <MemoryRouter>
        <DiscountedWork />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('NFTPreview')).toBeInTheDocument();
  });
});
