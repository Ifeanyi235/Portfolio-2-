export function notFound(req, res) { res.status(404).json({ error: true, message: 'Route not found.' }); }

export function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  const upstream = Number(error.status);
  const status = [400, 401, 403, 404, 429].includes(upstream) ? upstream : 502;
  const message = status === 401 ? 'Google authentication failed or expired.'
    : status === 403 ? 'The backend does not have permission to access this Google Drive resource.'
    : error.message || 'An unexpected server error occurred.';
  if (process.env.NODE_ENV !== 'test') console.error(error);
  res.status(status).json({ error: true, message });
}
