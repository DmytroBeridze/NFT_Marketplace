import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TrendingCollection } from './TrendingCollection';
import { useGetTrendingCollectionQuery } from '../../model';

vi.mock('../../model', () => ({
  useGetTrendingCollectionQuery: vi.fn(),
}));

vi.mock('../../../../widgets/TrendingCollection/ui/CollectionCard', () => ({
  CollectionCard: Object.assign(
    ({ author }: { author: string }) => (
      <div data-testid="CollectionCard">{author}</div>
    ),
    {
      Skeleton: () => <div data-testid="CollectionCard-skeleton" />,
    },
  ),
}));

vi.mock('../../../../shared/lib/hooks', () => ({
  useResponsiveValue: () => ({
    responsiveValue: 3,
  }),
}));

const mockedHook = vi.mocked(useGetTrendingCollectionQuery);

describe('TrendingCollection', () => {
  beforeEach(() => {
    mockedHook.mockReset();
  });

  it('shows an error message when the request fails', () => {
    mockedHook.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    } as any);

    render(<TrendingCollection />);

    expect(screen.getByTestId('TrendingCollection-error')).toBeInTheDocument();
  });

  it('shows skeletons while loading', () => {
    mockedHook.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    } as any);

    render(<TrendingCollection />);

    expect(screen.getAllByTestId('CollectionCard-skeleton')).toHaveLength(3);
  });

  it('renders collection cards when data is loaded', () => {
    mockedHook.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        message: 'message',
        galleries: [
          {
            _id: '12345',
            name: 'John',
            avgRating: 10,
            nfts: [],
            nftsQuantity: 6,
            author: 'John',
            authorAvatar: 'http://avatars.com/avatar',
            authorId: '456',
          },
        ],
      },
    } as any);

    render(<TrendingCollection />);

    expect(screen.getByTestId('CollectionCard')).toHaveTextContent('John');
  });
});
