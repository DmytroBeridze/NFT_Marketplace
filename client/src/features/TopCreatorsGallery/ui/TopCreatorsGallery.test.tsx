import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopCreatorsGallery } from './TopCreatorsGallery';
import { useGetTopCreatorsQuery } from '../model';

vi.mock('../model', () => ({
  useGetTopCreatorsQuery: vi.fn(),
}));

vi.mock('../../../widgets/TopCreators/ui', () => ({
  TopCreatorsCard: Object.assign(
    ({ author }: { author?: any }) => (
      <div data-testid={'TopCreatorsCard'}>{author.userName}</div>
    ),
    // (props: any) => <div data-testid={'TopCreatorsCard'} {...props}></div>,
    { Skeleton: () => <div data-testid={'TopCreatorsCard-skeleton'}></div> },
  ),
}));

describe('TopCreatorsGallery', () => {
  const mockedHook = vi.mocked(useGetTopCreatorsQuery);

  beforeEach(() => {
    mockedHook.mockReset();
  });

  it('show placeholder during error', () => {
    mockedHook.mockReturnValue({
      isError: true,
      isLoading: false,
      data: null,
    } as any);

    render(<TopCreatorsGallery />);
    expect(screen.getByTestId('topCreator-error')).toBeInTheDocument();
  });

  it('show skeleton during loading', () => {
    mockedHook.mockReturnValue({
      isError: false,
      isLoading: true,
      data: null,
    } as any);

    render(<TopCreatorsGallery />);
    expect(
      screen.getAllByTestId('TopCreatorsCard-skeleton')[0],
    ).toBeInTheDocument();
  });

  it('render TopCreatorsCard during valid data', () => {
    mockedHook.mockReturnValue({
      isError: false,
      isLoading: false,
      data: {
        message: 'message',
        topAuthors: [
          {
            totalSales: 10,
            totalRevenue: 5,
            authorId: '12345',
            userName: 'John',
            avatar: 'https://avatar.com/avatar',
          },
        ],
      },
    } as any);

    render(<TopCreatorsGallery />);
    expect(screen.getAllByTestId('TopCreatorsCard')[0]).toBeInTheDocument();
  });
});
