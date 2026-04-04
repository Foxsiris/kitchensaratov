import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';

function Probe() {
  const { authenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="auth">{authenticated ? 'in' : 'out'}</span>
      <button type="button" onClick={() => login('secret')}>
        login
      </button>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
    global.fetch = jest.fn();
  });

  test('по умолчанию не авторизован', () => {
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );
    expect(screen.getByTestId('auth')).toHaveTextContent('out');
  });

  test('login при успешном ответе сохраняет токен', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'jwt-test' }),
    });

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByTestId('auth')).toHaveTextContent('in');
    });
    expect(sessionStorage.getItem('kitchensaratov_admin_jwt')).toBe('jwt-test');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/login'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  test('login при ошибке не меняет состояние', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 401 });

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    expect(screen.getByTestId('auth')).toHaveTextContent('out');
  });

  test('logout очищает токен', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'x' }),
    });

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => expect(screen.getByTestId('auth')).toHaveTextContent('in'));

    await userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(screen.getByTestId('auth')).toHaveTextContent('out');
    expect(sessionStorage.getItem('kitchensaratov_admin_jwt')).toBeNull();
  });
});
