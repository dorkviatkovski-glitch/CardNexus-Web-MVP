/**
 * Mock Price Comparison Service
 * Returns deterministic simulated market data for any card
 * Same card name + set + condition always returns the same price
 */

export interface MarketComparison {
  avg: number;
  min: number;
  max: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  source: string;
  lastUpdated: string;
}

/**
 * Simple hash function for deterministic pricing
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get market comparison for a card
 * @param cardName - Name of the card (e.g., "Charizard VMAX")
 * @param cardSet - Set name (e.g., "Shining Fates")
 * @param condition - Card condition (e.g., "PSA 10", "NM")
 * @returns MarketComparison with simulated pricing data
 */
export function getMarketComparison(
  cardName: string,
  cardSet: string,
  condition?: string | null
): MarketComparison {
  const key = `${cardName.toLowerCase()}|${cardSet.toLowerCase()}|${(condition || 'unknown').toLowerCase()}`;
  const hash = hashString(key);

  // Base price derived from hash (between $10 and $2000)
  const basePrice = 10 + (hash % 1990);

  // Multipliers based on condition
  const conditionMultiplier = getConditionMultiplier(condition);
  const adjustedBase = basePrice * conditionMultiplier;

  // Generate min/max/avg with small variance
  const variance = 0.15; // 15% variance
  const min = Math.round(adjustedBase * (1 - variance));
  const max = Math.round(adjustedBase * (1 + variance));
  const avg = Math.round((min + max) / 2);

  // Trend based on hash (deterministic)
  const trendHash = hash % 100;
  let trend: 'up' | 'down' | 'stable';
  let trendPercent: number;

  if (trendHash < 33) {
    trend = 'up';
    trendPercent = Math.round((hash % 15) + 1); // 1-15%
  } else if (trendHash < 66) {
    trend = 'down';
    trendPercent = Math.round((hash % 10) + 1); // 1-10%
  } else {
    trend = 'stable';
    trendPercent = Math.round((hash % 3)); // 0-2%
  }

  return {
    avg,
    min,
    max,
    trend,
    trendPercent,
    source: 'Mock Market Data',
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get recommended listing price (market avg + premium)
 * @param marketAvg - Average market price
 * @returns Recommended listing price
 */
export function getRecommendedPrice(marketAvg: number): number {
  // Suggest 5-15% above market average
  const premium = 1 + (0.05 + (hashString(String(marketAvg)) % 10) / 100);
  return Math.round(marketAvg * premium);
}

function getConditionMultiplier(condition?: string | null): number {
  if (!condition) return 1.0;

  const c = condition.toLowerCase();
  if (c.includes('psa 10') || c.includes('gem mint')) return 3.5;
  if (c.includes('psa 9') || c.includes('mint')) return 2.5;
  if (c.includes('psa 8') || c.includes('nm')) return 1.8;
  if (c.includes('lp') || c.includes('light play')) return 1.2;
  if (c.includes('mp') || c.includes('moderate play')) return 0.8;
  if (c.includes('hp') || c.includes('heavy play')) return 0.5;

  return 1.0;
}
