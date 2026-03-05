import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { StatisticItem } from './StatisticItem';
import type { Statistics } from '../../../model';

vi.mock('../../../../../shared/ui/atoms/Skeleton', () => ({
  Skeleton: (props: any) => (
    <div
      data-testid="statisticItem-skeleton"
      data-isloading={props.isLoading}
    ></div>
  ),
}));

describe('StatisticItem', () => {
  it('passes isLoading=true to all Skeleton components', () => {
    render(<StatisticItem statKey={'key'} isLoading={true} value="10" />);
    const skeletons = screen.getAllByTestId('statisticItem-skeleton');

    skeletons.forEach((sceleton) => {
      expect(sceleton).toHaveAttribute('data-isloading', 'true');
    });
  });

  it('passes isLoading=false to all Skeleton components', () => {
    render(<StatisticItem statKey={'key'} isLoading={false} value="10" />);
    const skeletons = screen.getAllByTestId('statisticItem-skeleton');

    skeletons.forEach((sceleton) => {
      expect(sceleton).toHaveAttribute('data-isloading', 'false');
    });
  });

  it('renders formatted value when not loading', () => {
    const statistics: Statistics = {
      artists: 123,
      images: 0,
      totalSale: 0,
    };

    render(
      <StatisticItem
        statKey="artists"
        value="value"
        statistics={statistics}
        isLoading={false}
      />,
    );
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('does not render value when loading', () => {
    const statistics: Statistics = {
      artists: 123,
      images: 0,
      totalSale: 0,
    };

    render(
      <StatisticItem
        statKey={'artists'}
        value="value"
        statistics={statistics}
        isLoading={true}
      />,
    );
    expect(screen.queryByText('123')).not.toBeInTheDocument();
  });
});
