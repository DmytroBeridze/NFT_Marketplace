import { describe, expect, test, vi } from 'vitest';
import { CreateNftFormContent } from './CreateNftFormContent';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const { uploadFileMock, uploadNFTMock } = vi.hoisted(() => ({
  uploadFileMock: vi.fn(),
  uploadNFTMock: vi.fn(),
}));

// --------------------Icon
vi.mock(import('../../../shared/ui/atoms'), async (importOriginal) => {
  const originalModule = await importOriginal();

  return {
    ...originalModule,
    Icon: () => <svg data-testid="mock-icon"></svg>,
  };
});

// ---------------------------translation
vi.mock('react-i18next', async (importOriginal) => {
  const originalModule = await importOriginal<typeof import('react-i18next')>();

  return {
    ...originalModule,
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});

// ---------------------------UploadImage
vi.mock('../../../entities/nft/model', () => ({
  useUploadImageMutation: () => [
    uploadFileMock,
    { isLoading: false, isError: false },
  ],
  useSetNFTMutation: () => [uploadNFTMock],
}));

// --------------------------GetCollection
vi.mock('../../../entities/collection/model', () => ({
  useGetCollectionQuery: () => ({
    data: {
      galleries: [],
    },
  }),
}));

// -------------------------GetCategories
vi.mock('../../BrowseCategories/model', () => ({
  useGetCategoriesQuery: () => ({
    data: [],
  }),
}));

// -------------------------GetSalesConfig
vi.mock('../../../entities/sales-config/model', () => ({
  useGetSalesConfigApiQuery: () => ({
    data: {
      config: {
        discounts: [],
        durations: [],
      },
    },
  }),
}));
// -------------------------GetCurrency

vi.mock('../../../shared/model', () => ({
  useGetCurrencyQuery: () => ({
    isError: false,
    isLoading: false,
    data: { currency: { BTC: 78398 } },
  }),
}));

// ------------------------Create NftForm Content

describe('createNftFormContent', () => {
  // ---------------render form
  test('renders the form', () => {
    render(<CreateNftFormContent userId="test-user" />);

    expect(screen.getByTestId('upload-nft-button')).toBeInTheDocument();
  });

  // ------------------not call uploads
  test('does not call mutations when form is invalid', () => {
    render(<CreateNftFormContent userId="test-user" />);

    fireEvent.click(screen.getByTestId('upload-nft-button'));

    expect(uploadFileMock).not.toHaveBeenCalled();
    expect(uploadNFTMock).not.toHaveBeenCalled();
  });

  // -----------------upload NFT

  test('uploads file', async () => {
    uploadNFTMock.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    uploadFileMock.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          imageUrl: 'https://example.com/image.png',
          deleteImageUrl: 'https://example.com/delete-image',
        }),
    });

    render(<CreateNftFormContent userId="test-user" />);
    // console.log('Наш мок:-------------------------', uploadFileMock);

    const nameField = screen.getByTestId('nft-name-input');
    const descriptionField = screen.getByLabelText('titles.description');
    const fileInput = screen.getByTestId('nft-file-input') as HTMLInputElement;
    const keywordsField = screen.getByTestId('upload-nft-keywords');
    const priceField = screen.getByTestId('nft-file-price');

    fireEvent.change(keywordsField, {
      target: { value: 'lorem, ipsum, dolor' },
    });

    fireEvent.change(priceField, { target: { value: 20 } });
    fireEvent.change(nameField, { target: { value: 'Test name' } });
    fireEvent.change(descriptionField, {
      target: { value: 'Some description' },
    });

    const file = new File(['image content'], 'test.jpg');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toBe(file);
    const form = screen.getByTestId('upload-nft-button').closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(uploadFileMock).toHaveBeenCalledTimes(1);
      expect(uploadNFTMock).toHaveBeenCalledTimes(1);
    });
  });
});
