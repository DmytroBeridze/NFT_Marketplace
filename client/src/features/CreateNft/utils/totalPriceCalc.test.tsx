import { describe, expect, test } from 'vitest';
import { totalPriceCalc } from './totalPriceCalc';

describe('totalPriceCalc', () => {
  test('discount calculation', () => {
    expect(totalPriceCalc(100, 20, true)).toBe('80.00');
  });

  test('returns the original price when not for sale', () => {
    expect(totalPriceCalc(100, 20, false)).toBe('100.00');
  });

  test('calculates a fractional price', () => {
    expect(totalPriceCalc(99.99, 20, true)).toBe('79.99');
  });
});
