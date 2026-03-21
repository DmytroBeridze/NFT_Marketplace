import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGetTrendingCollectionQuery } from '../../model';
import { TrendingCollection } from './TrendingCollection';

vi.mock('../../model', () => ({
  useGetTrendingCollectionQuery: vi.fn(),
}));

vi.mock('../../../../widgets/TrendingCollection/ui/CollectionCard', () => ({
  CollectionCard: Object.assign(
    ({ author }: { author: string }) => (
      <div data-testid={'CollectionCard'}>{author}</div>
    ),
    // (props: any) => <div data-testid={'CollectionCard'} {...props}></div>,
    { Skeleton: () => <div data-testid={'CollectionCard-skeleton'}></div> },
  ),
}));

const mockedHook = vi.mocked(useGetTrendingCollectionQuery);

describe('TrendingCollection', () => {
  beforeEach(() => {
    mockedHook.mockReset();
  });

  it('show placeholder during error', () => {
    mockedHook.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    } as any);

    render(<TrendingCollection />);
    expect(screen.getByTestId('TrendingCollection-error')).toBeInTheDocument();
  });

  it('show skeleton during loading', () => {
    mockedHook.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    } as any);

    render(<TrendingCollection />);
    expect(
      screen.getAllByTestId('CollectionCard-skeleton')[0],
    ).toBeInTheDocument();
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
    expect(screen.getAllByTestId('CollectionCard')[0]).toBeInTheDocument();
  });
});
