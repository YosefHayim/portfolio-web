/**
 * Simple in-memory LRU cache for AI responses
 * Caches common questions to reduce OpenAI API calls and improve response time
 */

type CacheEntry = {
  response: string;
  timestamp: number;
};

const CACHE_TTL = 1000 * 60 * 60; // 1 hour cache TTL
const MAX_CACHE_SIZE = 100; // Maximum number of cached responses

class ResponseCache {
  private cache: Map<string, CacheEntry> = new Map();

  /**
   * Generate a cache key from the user's message
   * Normalizes the message to improve cache hit rate
   */
  private generateKey(message: string): string {
    return message
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, "") // Remove punctuation
      .replace(/\s+/g, " "); // Normalize whitespace
  }

  /**
   * Check if a message matches common cacheable patterns
   */
  private isCacheable(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    const cacheablePatterns = [
      // Skills questions
      /skill/,
      /tech/,
      /proficien/,
      /stack/,
      /language/,
      // Project questions
      /project/,
      /built/,
      /portfolio/,
      /work.*on/,
      // Experience questions
      /experience/,
      /background/,
      /career/,
      /job/,
      // About questions
      /who.*is/,
      /tell.*about/,
      /introduce/,
      // Education
      /education/,
      /degree/,
      /study/,
      /bootcamp/,
      // Contact (but not email sending)
      /contact/,
      /reach/,
      /hire/,
    ];

    return cacheablePatterns.some((pattern) => pattern.test(lowerMessage));
  }

  /**
   * Get cached response if available and not expired
   */
  get(message: string): string | null {
    if (!this.isCacheable(message)) {
      return null;
    }

    const key = this.generateKey(message);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if cache entry is expired
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.response;
  }

  /**
   * Store response in cache
   */
  set(message: string, response: string): void {
    if (!this.isCacheable(message)) {
      return;
    }

    // Enforce max cache size (LRU eviction)
    if (this.cache.size >= MAX_CACHE_SIZE) {
      // Delete oldest entry
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    const key = this.generateKey(message);
    this.cache.set(key, {
      response,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear expired entries (called periodically)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > CACHE_TTL) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; maxSize: number } {
    return {
      size: this.cache.size,
      maxSize: MAX_CACHE_SIZE,
    };
  }
}

// Singleton instance
export const responseCache = new ResponseCache();

// Cleanup expired entries every 10 minutes
setInterval(() => {
  responseCache.cleanup();
}, 1000 * 60 * 10);
