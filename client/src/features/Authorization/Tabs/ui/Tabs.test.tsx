import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Tabs from './Tabs';
import { AuthorizationContextProvider } from '../../../AuthorizationModal/context';
import { MemoryRouter } from 'react-router-dom';

vi.mock('./Content', () => ({
  Content: () => <div></div>,
}));

const mockTranslate = vi.fn();

vi.mock('../../../../shared/lib/i18n', () => ({
  useTranslate: () => mockTranslate(),
}));

// vi.mock('../../../shared/lib/i18n', () => ({
//   useTranslate: () => mockTranslate(),
// }));

const renderTabs = (
  <MemoryRouter>
    <AuthorizationContextProvider>
      <Tabs />
    </AuthorizationContextProvider>
  </MemoryRouter>
);

describe('Tabs', () => {
  it('renders tabs', () => {
    mockTranslate.mockReturnValue({
      translateVariables: { tab1: 'Tab1', tab2: 'Tab2' },
    });
    render(renderTabs);
    screen.debug();
    expect(screen.getByText('Tab1')).toBeInTheDocument();
    expect(screen.getByText('Tab2')).toBeInTheDocument();
  });

  it('empty variables', () => {
    mockTranslate.mockReturnValue({
      translateVariables: {},
    });
    render(renderTabs);
    expect(screen.queryByText(/Tab/i)).not.toBeInTheDocument();
  });
});
