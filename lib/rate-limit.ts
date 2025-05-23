type RateLimitStore = {
  [key: string]: {
    count: number;
    resetAt: number;
  };
};

// In-memory store for rate limiting
const store: RateLimitStore = {};

export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ success: boolean; remaining: number }> {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  // Clean up expired entries
  for (const k in store) {
    if (store[k].resetAt < now) {
      delete store[k];
    }
  }

  // Get or create entry
  if (!store[key] || store[key].resetAt < now) {
    store[key] = {
      count: 0,
      resetAt: now + windowMs,
    };
  }

  // Check and increment
  const entry = store[key];
  if (entry.count >= limit) {
    return {
      success: false,
      remaining: 0,
    };
  }

  entry.count++;
  return {
    success: true,
    remaining: limit - entry.count,
  };
}
