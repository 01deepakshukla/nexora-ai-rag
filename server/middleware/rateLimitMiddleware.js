const requests = new Map();

function rateLimit({ windowMs = 60_000, max = 60 } = {}) {
  return (req, res, next) => {
    const key = req.ip;
    const current = requests.get(key) || { count: 0, startedAt: Date.now() };

    if (Date.now() - current.startedAt > windowMs) {
      current.count = 0;
      current.startedAt = Date.now();
    }

    current.count += 1;
    requests.set(key, current);

    if (current.count > max) {
      return res.status(429).json({ message: 'Too many requests. Try again shortly.' });
    }

    return next();
  };
}

module.exports = rateLimit;

