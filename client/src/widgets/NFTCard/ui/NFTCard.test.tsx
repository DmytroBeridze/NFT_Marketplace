import { expect, it, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NFTCard } from './NFTCard';
import { MemoryRouter } from 'react-router-dom';

describe('NFTCard', () => {
  const props = {
    id: '1',
    src: 'nft.jpg',
    name: 'Name',
    price: 50,
    userName: 'User',
    avatar: 'avatar.jpg',
    views: 2,
  };

  vi.mock('react-i18next', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-i18next')>();

    return {
      ...actual,
      useTranslation: () => ({
        t: (key: string) => key,
      }),
    };
  });

  it('renders NFT image with correct src', () => {
    const { container } = render(
      <MemoryRouter>
        <NFTCard {...props} />
      </MemoryRouter>,
    );

    console.log(container.innerHTML);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText('50.00 USD')).toBeInTheDocument();
  });
  // it('renders NFT image with correct src', () => {
  //   render(
  //     <MemoryRouter>
  //       <NFTCard {...props} />
  //     </MemoryRouter>,
  //   );
  //   expect(screen.getByText('Name')).toBeInTheDocument();
  //   expect(screen.getByText('User')).toBeInTheDocument();
  //   expect(screen.getByText(2)).toBeInTheDocument();
  //   expect(screen.getByText('50 ETH')).toBeInTheDocument();
  // });

  it('right data', () => {
    const { container } = render(
      <MemoryRouter>
        <NFTCard {...props} />
      </MemoryRouter>,
    );

    console.log('NFTCard DOM:', container.innerHTML);

    const img = screen.getByAltText('Name');
    expect(img).toHaveAttribute('src', 'nft.jpg');
  });

  // it('right data', () => {
  //   render(
  //     <MemoryRouter>
  //       <NFTCard {...props} />
  //     </MemoryRouter>,
  //   );
  //   const img = screen.getByAltText('Name');
  //   expect(img).toHaveAttribute('src', 'nft.jpg');
  // });
});
