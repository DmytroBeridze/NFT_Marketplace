import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { HeroPreview } from './HeroPreview';
import { useGetTopNftsQuery } from '../../../entities/nft/model';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../entities/nft/model', () => ({
  useGetTopNftsQuery: vi.fn(),
}));

const mockedHook = vi.mocked(useGetTopNftsQuery);
//---- swiper
vi.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div>{children}</div>,
  SwiperSlide: ({ children }: any) => (
    <div data-testid="SwiperSlide">{children}</div>
  ),
}));
// ---swiper button
vi.mock('../../../widgets/MarketplaceHero/ui/atoms', () => ({
  SwiperNavButton: () => <div data-testid="SwiperNavButton"></div>,
}));

// ----GSAP
vi.mock('swiper/modules', () => ({
  Navigation: {},
  Autoplay: {},
}));

describe('HeroPreview', () => {
  beforeEach(() => {
    mockedHook.mockReset();
  });

  it('show message during error', () => {
    mockedHook.mockReturnValue({
      isError: true,
      isLoading: false,
      data: null,
    } as any);
    render(
      <MemoryRouter>
        <HeroPreview />
      </MemoryRouter>,
    );
    expect(screen.getByText('Error loading...')).toBeInTheDocument();
  });

  it('render SwiperSlide during valid data', () => {
    mockedHook.mockReturnValue({
      isError: false,
      isLoading: false,
      data: {
        items: [
          {
            _id: '123',
            name: 'Nft',
            description: 'Test dedscription',
            authorId: {
              _id: '456',
              userName: 'John',
            },
            price: 45,
            imageUrl: 'image.jpg',
            deleteImageUrl: 'delete.jpg',
            keywords: ['one', 'two'],
          },
        ],
      },
    } as any);
    render(
      <MemoryRouter>
        <HeroPreview />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('SwiperSlide')).toBeInTheDocument();
  });
});
