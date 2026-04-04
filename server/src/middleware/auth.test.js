import { describe, it, expect, beforeEach, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { requireAuth } from './auth.js';

describe('requireAuth', () => {
  const secret = 'test-secret-key-min-32-chars-long!!';
  let req;
  let res;
  let next;

  beforeEach(() => {
    process.env.JWT_SECRET = secret;
    req = { headers: {} };
    res = {
      statusCode: 200,
      body: null,
      status(n) {
        this.statusCode = n;
        return this;
      },
      json(o) {
        this.body = o;
        return this;
      },
    };
    next = vi.fn();
  });

  it('401 без заголовка', () => {
    requireAuth(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('401 при невалидном токене', () => {
    req.headers.authorization = 'Bearer garbage';
    requireAuth(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('next и req.adminUserId при валидном JWT', () => {
    const token = jwt.sign({ sub: 'admin-uuid' }, secret, { expiresIn: '1h' });
    req.headers.authorization = `Bearer ${token}`;
    requireAuth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.adminUserId).toBe('admin-uuid');
  });

  it('500 без JWT_SECRET', () => {
    delete process.env.JWT_SECRET;
    req.headers.authorization = 'Bearer x';
    requireAuth(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(next).not.toHaveBeenCalled();
    process.env.JWT_SECRET = secret;
  });
});
