import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    sessionStorage.clear();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ categories: [] }),
    });
  });

  test('монтируется без падения', async () => {
    const { container } = render(<App />);
    expect(container.querySelector('.App')).toBeInTheDocument();
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  test('показывает публичный маршрут (главная)', async () => {
    render(<App />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    expect(window.location.pathname).toBe('/');
  });
});
