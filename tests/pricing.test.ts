import { beforeEach, expect, it, vi } from 'vitest';
import { db } from '../apps/api/src/data/mockDb';
import { MockPricingProvider, PricingService } from '../apps/api/src/modules/pricing/service';
const initial = structuredClone(db);
beforeEach(() => Object.assign(db, structuredClone(initial)));
it('uses the injected pricing provider and quantities rather than hardcoded totals', async () => {
  const getCardValue = vi.fn().mockResolvedValueOnce(10).mockResolvedValueOnce(2.5);
  expect((await new PricingService({ getCardValue }).getCollectionValue('collection-1')).summary.totalValue).toBe(15);
  expect(getCardValue).toHaveBeenCalledTimes(2);
});
it('uses the newest captured snapshot even when inserted out of order', async () => {
  db.pricingSnapshots = [
    { id: 'new', cardId: 'card-1', value: 100, currency: 'USD', capturedAt: '2026-02-01T00:00:00Z' },
    { id: 'old', cardId: 'card-1', value: 1, currency: 'USD', capturedAt: '2026-01-01T00:00:00Z' },
  ];
  expect(await new PricingService(new MockPricingProvider()).getCardValue('card-1')).toBe(100);
});
it('retains the demo fallback for unpriced cards and zero for missing cards', async () => {
  db.pricingSnapshots = [];
  const service = new PricingService(new MockPricingProvider());
  expect(await service.getCardValue('card-1')).toBe(15);
  expect(await service.getCardValue('missing')).toBe(0);
});
it('propagates provider failure instead of returning a misleading zero valuation', async () => {
  const service = new PricingService({ getCardValue: vi.fn().mockRejectedValue(new Error('provider down')) });
  await expect(service.getCollectionValue('collection-1')).rejects.toThrow('provider down');
});
