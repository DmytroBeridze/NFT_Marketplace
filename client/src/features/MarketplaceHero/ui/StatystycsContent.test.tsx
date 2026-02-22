import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { StatystycsContent } from './StatisticsContent';
import { useGetStatisticsQuery } from '../model';

vi.mock('../model', () => ({
  useGetStatisticsQuery: vi.fn(),
}));

const mockedHook = vi.mocked(useGetStatisticsQuery);

vi.mock('../../../widgets/MarketplaceHero/ui', () => ({
  StatisticItem: (props: any) => (
    <div
      data-testid="statisticItem"
      data-isLoading={props.isLoading}
      data-statistics={JSON.stringify(props.statistics)}
    />
  ),
}));

describe('StatystycsContent', () => {
  it('show placeholder during error', () => {
    mockedHook.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    } as any);

    render(<StatystycsContent statisticsArr={[['test', 'test']]} />);
    expect(screen.getByTestId('statystycsContent-error')).toBeInTheDocument();
  });

  it('show skeleton during loading', () => {
    mockedHook.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    } as any);

    render(<StatystycsContent statisticsArr={[['test', 'test']]} />);
    const statisticItems = screen.getAllByTestId('statisticItem');
    statisticItems.forEach((item) => {
      expect(item).toHaveAttribute('data-isLoading', 'true');
    });
  });

  it('render StatisticItem during valid data', () => {
    const mockedStatistics = {
      artists: 123,
      images: 456,
      totalSale: 10,
    };

    mockedHook.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        message: 'message',
        statistics: mockedStatistics,
      },
    } as any);

    render(<StatystycsContent statisticsArr={[['test', 'test']]} />);
    expect(screen.getAllByTestId('statisticItem')[0]).toHaveAttribute(
      'data-statistics',
      JSON.stringify(mockedStatistics),
    );
  });
});
