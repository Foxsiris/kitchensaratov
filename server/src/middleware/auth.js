import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'JWT_SECRET is not configured' });
  }
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(h.slice(7), secret);
    req.adminUserId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
