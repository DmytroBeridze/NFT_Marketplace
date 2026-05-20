import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ConnectWallet from './ConnectWallet';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { MemoryRouter } from 'react-router-dom';
import {
  useWalletContext,
  WalletContextProvider,
} from '../context/connectWalletContext';
import { useConnecMetaMask } from '../model/connectWallet';
import { useToggleOverlay } from '../../../shared/ui/molecules/Overlay';

vi.mock('../model/connectWallet', () => ({
  useConnecMetaMask: vi.fn(),
}));

vi.mock('../context/connectWalletContext', () => ({
  useWalletContext: vi.fn(),
}));

vi.mock('../../../shared/ui/molecules/Overlay', () => ({
  useToggleOverlay: vi.fn(),
}));

const mockedConnecMetaMaskHook = vi.mocked(useConnecMetaMask);
const mockedWalletContextHook = vi.mocked(useWalletContext);
const mockedToggleOverlayHook = vi.mocked(useToggleOverlay);

const baseMetaMask = {
  connect: vi.fn(),
  loading: false,
  hasMetaMask: false,
  wallet: null,
  disconnect: vi.fn(),
};

describe('ConnectWallet', () => {
  const connectMock = vi.fn();
  const setWalletDataMock = vi.fn();
  const openHandlerMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // mockedConnecMetaMaskHook.mockReturnValue({
    //   ...baseMetaMask,
    //   connect: connectMock,
    //   hasMetaMask: true,
    //   wallet: 'wallet',
    // } as any);

    mockedWalletContextHook.mockReturnValue({
      setWalletData: setWalletDataMock,
    } as any);

    mockedToggleOverlayHook.mockReturnValue({
      openHandler: openHandlerMock,
    } as any);
  });

  it('no wallet', () => {
    mockedConnecMetaMaskHook.mockReturnValue({
      ...baseMetaMask,
      hasMetaMask: false,
    } as any);

    render(
      <Provider store={store}>
        <MemoryRouter>
          {/* <WalletContextProvider> */}
          <ConnectWallet />
          {/* </WalletContextProvider> */}
        </MemoryRouter>
      </Provider>,
    );
    const buttons = screen.getAllByRole('button');
    fireEvent.click(screen.getAllByRole('button')[0]);
    // fireEvent.click(screen.getByText('Metamask'));
    expect(buttons).toHaveLength(3);
    // fireEvent.click(buttons[0]);

    expect(setWalletDataMock).toHaveBeenCalled();
    expect(openHandlerMock).toHaveBeenCalled();
    expect(connectMock).not.toHaveBeenCalled();
  });

  it('wallet', () => {
    mockedConnecMetaMaskHook.mockReturnValue({
      ...baseMetaMask,
      hasMetaMask: true,
      wallet: 'wallet',
      connect: connectMock,
    } as any);
    render(
      <Provider store={store}>
        <MemoryRouter>
          {/* <WalletContextProvider> */}
          <ConnectWallet />
          {/* </WalletContextProvider> */}
        </MemoryRouter>
      </Provider>,
    );
    const buttons = screen.getAllByRole('button');
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(buttons).toHaveLength(3);
    // fireEvent.click(screen.getByText('Metamask'));
    // fireEvent.click(buttons[0]);

    expect(connectMock).toHaveBeenCalled();
    expect(setWalletDataMock).not.toHaveBeenCalled();
    expect(openHandlerMock).not.toHaveBeenCalled();
  });
});
