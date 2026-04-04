import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import { CatalogProvider, useCatalog } from './CatalogContext';

const mockCategories = [
  {
    id: 'kitchens',
    name: 'Кухни',
    brands: [
      {
        id: 'rimi',
        name: 'Рими',
        subcategories: [
          {
            id: 'modern',
            name: 'Современные',
            products: [
              { id: 'p1', name: 'Луна', price: '100', description: '', image: '', source: '' },
            ],
          },
        ],
      },
    ],
  },
];

function CatProbe() {
  const { categories, loading, error, findProductById, getProductsByCategory, getAllProducts } = useCatalog();
  if (loading) return <div data-testid="loading">loading</div>;
  return (
    <div>
      <div data-testid="error">{error || ''}</div>
      <div data-testid="count">{categories.length}</div>
      <div data-testid="find">{findProductById('p1')?.name || 'none'}</div>
      <div data-testid="bycat">{getProductsByCategory('kitchens').length}</div>
      <div data-testid="all">{getAllProducts().length}</div>
    </div>
  );
}

function wrap(ui) {
  return (
    <AuthProvider>
      <CatalogProvider>{ui}</CatalogProvider>
    </AuthProvider>
  );
}

describe('CatalogProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
    global.fetch = jest.fn();
  });

  test('загружает публичный каталог без токена', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ categories: mockCategories }),
    });

    render(wrap(<CatProbe />));

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('1');
    });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/catalog'),
      expect.objectContaining({ headers: {} })
    );
    expect(screen.getByTestId('find')).toHaveTextContent('Луна');
    expect(screen.getByTestId('bycat')).toHaveTextContent('1');
    expect(screen.getByTestId('all')).toHaveTextContent('1');
  });

  test('при ошибке API показывает сообщение', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'fail' }),
    });

    render(wrap(<CatProbe />));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('fail');
    });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  test('если в sessionStorage есть JWT, запрашивается admin catalog', async () => {
    sessionStorage.setItem('kitchensaratov_admin_jwt', 'saved-token');
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ categories: mockCategories }),
    });

    render(wrap(<CatProbe />));

    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/admin/catalog'),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer saved-token' }),
      })
    );
  });
});
