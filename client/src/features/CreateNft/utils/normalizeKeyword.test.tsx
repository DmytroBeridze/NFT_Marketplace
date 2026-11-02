import { describe, expect, test } from 'vitest';
import { normalizeKeyword } from './normalizeKeyword';

describe('normalizeKeyword', () => {
  test('normalizes keywords', () => {
    expect(normalizeKeyword(' TEst10 teSt11 ')).toBe('test10,test11');
  });

  test('replaces special characters with commas', () => {
    expect(normalizeKeyword('Test1!!!Test2')).toBe('test1,test2');
  });

  test('returns an empty string for empty input', () => {
    expect(normalizeKeyword('')).toBe('');
  });
});
