const jwt = require('jsonwebtoken');
const SECRET = 'kalyani_Naraga';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};