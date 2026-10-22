// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AuthGuard } from '../src/components/AuthGuard';
import LoginPage from '../src/app/login/page';
import SignupPage from '../src/app/signup/page';
const navigation = vi.hoisted(() => ({ pathname: '/collection', replace: vi.fn(), push: vi.fn() }));
vi.mock('next/navigation', () => ({ usePathname: () => navigation.pathname, useRouter: () => navigation }));
beforeEach(() => { localStorage.clear(); vi.clearAllMocks(); navigation.pathname = '/collection'; });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it.each(['/collection', '/collection/add-card', '/marketplace', '/shared', '/profile'])('hides protected content and redirects unauthenticated %s', pathname => {
  navigation.pathname = pathname;
  render(<AuthGuard><div>Private content</div></AuthGuard>);
  expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  expect(navigation.replace).toHaveBeenCalledWith('/login');
});
it.each(['/login', '/signup'])('renders public %s without bottom navigation', pathname => {
  navigation.pathname = pathname;
  render(<AuthGuard><div>Public form</div></AuthGuard>);
  expect(screen.getByText('Public form')).toBeInTheDocument();
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  expect(navigation.replace).not.toHaveBeenCalled();
});
it('allows a stored demo session to view protected content and navigation', () => {
  localStorage.setItem('cardnexus_token', 'demo-token');
  render(<AuthGuard><div>Private content</div></AuthGuard>);
  expect(screen.getByText('Private content')).toBeInTheDocument();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(navigation.replace).not.toHaveBeenCalled();
});
it.each(['/', '/login', '/signup'])('redirects a stored demo session from %s to collection', pathname => {
  navigation.pathname = pathname;
  localStorage.setItem('cardnexus_token', 'demo-token');
  render(<AuthGuard><div>Content</div></AuthGuard>);
  expect(navigation.replace).toHaveBeenCalledWith('/collection');
});
it.each([{ Component: LoginPage, action: 'Log in', endpoint: 'login' }, { Component: SignupPage, action: 'Sign up', endpoint: 'signup' }])('stores successful $endpoint response and navigates', async ({ Component, action, endpoint }) => {
  const account = { token: 'session-token', userId: 'user-1', email: 'test@example.com', name: 'Test' };
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => account });
  vi.stubGlobal('fetch', fetchMock);
  render(<Component />);
  fireEvent.click(screen.getByRole('button', { name: action }));
  await waitFor(() => expect(navigation.push).toHaveBeenCalledWith('/collection'));
  expect(fetchMock).toHaveBeenCalledWith(`/api/auth/${endpoint}`, expect.objectContaining({ method: 'POST', body: expect.any(String) }));
  expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ email: expect.any(String), password: expect.any(String) });
  expect(localStorage.getItem('cardnexus_token')).toBe(account.token);
  expect(JSON.parse(localStorage.getItem('cardnexus_user')!)).toEqual(account);
});
it('does not store credentials or navigate after failed login', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
  render(<LoginPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
  expect(await screen.findByText(/Unable to login/)).toBeInTheDocument();
  expect(localStorage.getItem('cardnexus_token')).toBeNull();
  expect(navigation.push).not.toHaveBeenCalled();
});
