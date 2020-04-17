import { parseObject, getRoute, getRouteByPath } from './helpers';
import { Routes } from '..';

describe('helpers.ts', () => {
  describe('parseObject()', () => {
    const obj: { [key: string]: any } = { name: 'test' };

    it('parses object with only one element correctly', () => {
      const text = parseObject(obj);

      expect(text).toBe('?name=test');
    });

    it('parses object with elements correctly', () => {
      const newObj = {
        ...obj,
        type: 'test type',
      };

      const text = parseObject(newObj);

      expect(text).toBe(`?name=test&type=${encodeURIComponent('test type')}`);
    });

    it('parses empty element from object correctly', () => {
      const newObj = {
        ...obj,
        type: '',
      };

      const text = parseObject(newObj);

      expect(text).toBe('?name=test&type=');
    });

    it("returns empty string when there's empty object", () => {
      const text = parseObject({});

      expect(text).toBe('');
    });
  });

  describe('getRoute()', () => {
    const routes = [{ name: 'page_1', path: '/page_1' }] as Routes[];

    it('finds path correctly', () => {
      const text = getRoute(routes, 'page_1');

      expect(text).toBe('/page_1');
    });

    it('replaces params correctly', () => {
      const newRoutes = [...routes, { name: 'page_2', path: '/page-with-params/:id' }] as Routes[];

      const text = getRoute(newRoutes, 'page_2', { id: 2 });

      expect(text).toBe('/page-with-params/2');
    });

    it('parses query correctly', () => {
      const text = getRoute(routes, 'page_1', { query: { name: 'test' } });

      expect(text).toBe(`/page_1?name=test`);
    });

    it('returns empty string in case when did not find', () => {
      const text = getRoute(routes, 'page_TEST_NUMBER', { id: 2 });

      expect(text).toBe('');
    });
  });

  describe('getRouteByPath()', () => {
    const routes = [{ name: 'page_1', path: '/page_1' }] as Routes[];

    it('returns route name by path', () => {
      const text = getRouteByPath(routes, '/page_1');

      expect(text).toBe('page_1');
    });

    it('returns empty string in case when did not find', () => {
      const text = getRouteByPath(routes, 'page_TEST_NUMBER');

      expect(text).toBe('');
    });
  });
});
