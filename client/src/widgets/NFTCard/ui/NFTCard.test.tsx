import { expect, it, describe } from 'vitest';
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

  it('renders NFT image with correct src', () => {
    render(
      <MemoryRouter>
        <NFTCard {...props} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText('50 ETH')).toBeInTheDocument();
  });
  it('right data', () => {
    render(
      <MemoryRouter>
        <NFTCard {...props} />
      </MemoryRouter>,
    );
    const img = screen.getByAltText('Name');
    expect(img).toHaveAttribute('src', 'nft.jpg');
  });
});
