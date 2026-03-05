import { getByText, render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { HeroSlide } from './HeroSlide';
import { MemoryRouter } from 'react-router-dom';
import type { INft } from '../../../../../entities/nft/model';

vi.mock('../../../../../shared/ui/atoms/Skeleton', () => ({
  Skeleton: (props: any) => (
    <div
      data-testid="hero-slide-skeleton"
      data-isloading={props.isLoading}
    ></div>
  ),
}));

vi.mock('../../../../../shared/ui/atoms/LazyImage', () => ({
  LazyImage: (props: any) => (
    <img data-testid="lazy-image" src={props.src} alt={props.alt} />
  ),
}));

vi.mock('../../../../../shared/ui/atoms', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../../../../shared/ui/atoms')>();

  return {
    ...actual,

    Image: (props: any) => (
      <img data-testid="hero-slide-avatar" src={props.src} alt={props.alt} />
    ),
  };
});

const nft: INft = {
  _id: '123',
  name: 'Nft',
  description: 'Test dedscription',
  authorId: {
    _id: '456',
    userName: 'John',
    avatar: 'avatar.jpg',
  },
  price: 45,
  imageUrl: 'image.jpg',
  deleteImageUrl: 'delete.jpg',
  keywords: ['one', 'two'],
};

describe('HeroSlide', () => {
  it('show skeleton during Skeleton', () => {
    render(
      <MemoryRouter>
        <HeroSlide nft={nft} isLoading={true} />
      </MemoryRouter>,
    );
    const skeletons = screen.getAllByTestId('hero-slide-skeleton');
    skeletons.forEach((skeleton) => {
      expect(skeleton).toHaveAttribute('data-isloading', 'true');
    });
  });

  it('render nft content when not loading', () => {
    render(
      <MemoryRouter>
        <HeroSlide nft={nft} isLoading={false} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Nft')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('render lazy when not loading', () => {
    render(
      <MemoryRouter>
        <HeroSlide nft={nft} isLoading={false} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('lazy-image')).toHaveAttribute(
      'src',
      'image.jpg',
    );
  });

  it('uses fallback avatar when no avatar provided', () => {
    const fallBackNft = {
      ...nft,
      authorId: { ...nft.authorId, avatar: undefined },
    };

    render(
      <MemoryRouter>
        <HeroSlide nft={fallBackNft} isLoading={false} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('hero-slide-avatar')).toBeInTheDocument();
  });
});
