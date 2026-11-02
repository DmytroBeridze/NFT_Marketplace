import { describe, expect, test } from 'vitest';
import { NFTSchema } from './validationSchema';

const params = {
  name: 'My NFT',
  description: 'Lorem ipsum',
  keywords: 'one, two, three',
  category: { id: null, name: 'None' },
  collection: { id: null, name: 'None' },
  price: '100',
  currency: { id: 'USD', name: 'USD' },
  royalty: { id: null, name: '' },
  duration: { id: null, name: '' },
  isForSale: false,
  file: new File(['image'], 'nft.png'),
};

describe('NFTSchema', () => {
  test('accepts valid data', async () => {
    const values = {
      ...params,
    };

    await expect(NFTSchema.validate(values)).resolves.toBeDefined();
  });

  test('reject an empty name', async () => {
    const values = {
      ...params,
      name: '',
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow('required');
  });

  test('reject a short name', async () => {
    const values = {
      ...params,
      name: 'A',
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow('tooShort');
  });

  test('rejects a short description', async () => {
    const values = {
      ...params,
      file: null,
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow('required');
  });

  test('rejects a non-file', async () => {
    const values = {
      ...params,
      description: 'less ten',
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow('tooShort');
  });

  test('rejects a non-Latin keyword', async () => {
    const values = {
      ...params,
      keywords: 'один, два',
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow('onlyLatin');
  });

  test('rejects a non-Latin keyword', async () => {
    const values = {
      ...params,
      keywords: 'nft123',
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow('onlyLatin');
  });

  test('rejects a zero price', async () => {
    const values = {
      ...params,
      price: '0',
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow('greaterThan-0');
  });

  test('rejects a non-numeric price', async () => {
    const values = {
      ...params,
      price: 'ABc',
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow('containNumbers');
  });

  test('requires royalty and duration when for sale', async () => {
    const values = {
      ...params,
      isForSale: true,
      duration: { id: null, name: '' },
      royalty: { id: null, name: '' },
    };

    await expect(NFTSchema.validate(values)).rejects.toThrow();
  });
});
