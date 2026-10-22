import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../apps/api/src/data/mockDb';
import { POST as signup } from '../src/app/api/auth/signup/route';
import { POST as login } from '../src/app/api/auth/login/route';
import { GET as collection } from '../src/app/api/collection/route';
import { GET as value } from '../src/app/api/collection/value/route';
import { POST as addCard } from '../src/app/api/collection/cards/route';
import { POST as createListing, GET as listings } from '../src/app/api/marketplace/listings/route';

const initial = structuredClone(db);
beforeEach(() => Object.assign(db, structuredClone(initial)));
const request = (path: string, body?: unknown) => new Request(`http://localhost/api/${path}`, body === undefined ? undefined : {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});
const credentials = { name: 'Test Collector', email: 'test@example.com', password: 'test-password' };

describe('authentication HTTP contract (in-memory demo)', () => {
  it('signs up then logs in with the same identity without leaking credentials', async () => {
    const created = await signup(request('auth/signup', credentials));
    expect(created.status).toBe(201);
    const account = await created.json();
    expect(account).toMatchObject({ email: credentials.email, name: credentials.name, token: expect.any(String) });
    expect(Object.keys(account).sort()).toEqual(['email', 'name', 'token', 'userId']);
    const response = await login(request('auth/login', credentials));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ userId: account.userId });
  });
  it('rejects duplicate email regardless of case and whitespace without adding a user', async () => {
    await signup(request('auth/signup', credentials));
    const count = db.users.length;
    expect((await signup(request('auth/signup', { ...credentials, email: ' TEST@EXAMPLE.COM ' }))).status).toBe(400);
    expect(db.users).toHaveLength(count);
  });
  it.each(['wrong-password', ''])('rejects incorrect password %j', async password => {
    await signup(request('auth/signup', credentials));
    expect((await login(request('auth/login', { ...credentials, password }))).status).toBe(401);
  });
  it('rejects unknown users', async () => {
    expect((await login(request('auth/login', credentials))).status).toBe(401);
  });
  it.each([{}, null, { ...credentials, email: 'invalid' }, { ...credentials, name: ' ' }, { ...credentials, password: '' }])('rejects malformed signup %j atomically', async body => {
    const count = db.users.length;
    expect((await signup(request('auth/signup', body))).status).toBe(400);
    expect(db.users).toHaveLength(count);
  });
});

describe('collection and valuation HTTP integration', () => {
  it('multiplies unit prices by quantities and keeps response shape used by dashboard', async () => {
    const response = await value(request('collection/value'));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      summary: { collectionId: 'collection-1', totalValue: 311, cardCount: 3, currency: 'USD', lastUpdated: expect.any(String) },
      items: [{ cardId: 'card-1', value: 215 }, { cardId: 'card-2', value: 96 }],
    });
  });
  it('adds a card and reflects it in both collection and valuation', async () => {
    const response = await addCard(request('collection/cards', { collectionId: 'collection-1', name: 'Test Card', set: 'Test', rarity: 'Rare', condition: 'Mint' }));
    expect(response.status).toBe(201);
    const added = await response.json();
    const portfolio = await (await collection(request('collection'))).json();
    expect(portfolio.cards).toContainEqual(expect.objectContaining({ card: expect.objectContaining({ id: added.card.id, name: 'Test Card' }) }));
    expect((await (await value(request('collection/value'))).json()).summary).toMatchObject({ totalValue: 346, cardCount: 4 });
  });
  it('returns zero for an existing empty collection and excludes other collections', async () => {
    db.collections.push({ ...db.collections[0], id: 'empty' });
    expect((await (await value(request('collection/value?collectionId=empty'))).json()).summary).toMatchObject({ totalValue: 0, cardCount: 0 });
  });
  it('returns 404 consistently for a missing collection', async () => {
    expect((await collection(request('collection?collectionId=missing'))).status).toBe(404);
    expect((await value(request('collection/value?collectionId=missing'))).status).toBe(404);
  });
});

describe('listing creation HTTP contract', () => {
  const listing = { collectionCardId: 'collection-card-1', sellerId: 'user-1', price: 12.5 };
  it('persists an ACTIVE listing readable by marketplace', async () => {
    const response = await createListing(request('marketplace/listings', listing));
    expect(response.status).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject({ ...listing, id: expect.any(String), status: 'ACTIVE' });
    expect(await (await listings()).json()).toContainEqual({ ...created, cardName: 'Charizard EX' });
  });
  it.each([0, -1, '12', null])('rejects invalid price %j without mutation', async price => {
    const count = db.marketplaceListings.length;
    expect((await createListing(request('marketplace/listings', { ...listing, price }))).status).toBe(400);
    expect(db.marketplaceListings).toHaveLength(count);
  });
  it.each([{ ...listing, collectionCardId: 'missing' }, { ...listing, sellerId: 'missing' }, {}, null])('rejects invalid references/payload %j', async body => {
    const count = db.marketplaceListings.length;
    expect((await createListing(request('marketplace/listings', body))).status).toBe(400);
    expect(db.marketplaceListings).toHaveLength(count);
  });
  it('rejects a real seller who does not own the card', async () => {
    db.users.push({ ...db.users[0], id: 'other-user', email: 'other@example.com' });
    expect((await createListing(request('marketplace/listings', { ...listing, sellerId: 'other-user' }))).status).toBe(400);
    expect(db.marketplaceListings).toEqual(initial.marketplaceListings);
  });
  it('returns a controlled error for malformed JSON', async () => {
    const response = await createListing(new Request('http://localhost/api/marketplace/listings', { method: 'POST', body: '{' }));
    expect(response.status).toBe(400);
  });
});
