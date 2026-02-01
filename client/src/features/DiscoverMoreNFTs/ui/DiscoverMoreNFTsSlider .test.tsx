import { describe, it, expect, vi, beforeEach } from 'vitest';

import { render, screen } from '@testing-library/react';
import { DiscoverMoreNFTsSlider } from './DiscoverMoreNFTsSlider';
import { useGetNftsByCreateDateQuery } from '../../../entities/nft/model';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../widgets/NFTCard', () => ({
  NFTCard: Object.assign(
    (props: any) => <div data-testid="NFTCard" {...props}></div>,
    { Skeleton: () => <div data-testid="NFTCard-skeleton"></div> },
  ),
}));

vi.mock('../../../widgets/MarketplaceHero/ui/atoms', () => ({
  SwiperNavButton: () => <div data-testid="swiper-nav-button"></div>,
}));

describe('DiscoverMoreNFTsSlider', () => {
  vi.mock('../../../entities/nft/model', () => ({
    useGetNftsByCreateDateQuery: vi.fn(),
  }));

  const mockedHook = useGetNftsByCreateDateQuery as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    mockedHook.mockReset();
  });

  it('show  placeholder during error', () => {
    mockedHook.mockReturnValue({
      isError: true,
      isLoading: false,
      data: null,
    });

    render(<DiscoverMoreNFTsSlider />);
    expect(screen.getByTestId('discover-error')).toBeInTheDocument();
  });

  it('show skeleton during loading ', () => {
    mockedHook.mockReturnValue({
      isError: false,
      isLoading: true,
      data: null,
    });
    render(<DiscoverMoreNFTsSlider />);

    expect(screen.getAllByTestId('NFTCard-skeleton')[0]).toBeInTheDocument();
  });

  it('render NFTCard during valid data', () => {
    mockedHook.mockReturnValue({
      isError: false,
      isLoading: false,
      data: {
        items: [
          {
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
        ],
      },
    });

    render(
      <MemoryRouter>
        <DiscoverMoreNFTsSlider />
      </MemoryRouter>,
    );
    expect(screen.getAllByTestId('NFT-slide')[0]).toBeInTheDocument();
  });
});
