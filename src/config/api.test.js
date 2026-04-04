describe('apiUrl', () => {
  const orig = process.env.REACT_APP_API_URL;

  afterEach(() => {
    process.env.REACT_APP_API_URL = orig;
    jest.resetModules();
  });

  test('пустой base: только path', async () => {
    delete process.env.REACT_APP_API_URL;
    jest.resetModules();
    const { apiUrl } = await import('./api');
    expect(apiUrl('/api/catalog')).toBe('/api/catalog');
    expect(apiUrl('api/catalog')).toBe('/api/catalog');
  });

  test('убирает хвостовой слэш у base', async () => {
    jest.resetModules();
    process.env.REACT_APP_API_URL = 'https://api.example.com/';
    const { apiUrl } = await import('./api');
    expect(apiUrl('/api/health')).toBe('https://api.example.com/api/health');
  });

  test('base без слэша в конце', async () => {
    jest.resetModules();
    process.env.REACT_APP_API_URL = 'https://x.com';
    const { apiUrl } = await import('./api');
    expect(apiUrl('/a')).toBe('https://x.com/a');
  });
});
