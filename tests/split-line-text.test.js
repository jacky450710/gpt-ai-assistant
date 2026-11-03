import splitLineText from '../utils/split-line-text.js';

describe('LINE text splitting', () => {
  it('keeps ordinary messages intact', () => {
    expect(splitLineText('你好')).toEqual(['你好']);
  });
  it('splits messages at 5000 characters', () => {
    const chunks = splitLineText('甲'.repeat(5001));
    expect(chunks.map((x) => x.length)).toEqual([5000, 1]);
    expect(chunks.join('')).toBe('甲'.repeat(5001));
  });
  it('preserves surrogate pairs across boundaries', () => {
    const input = '😀'.repeat(5001);
    const chunks = splitLineText(input);
    expect(Array.from(chunks[0])).toHaveLength(5000);
    expect(chunks.join('')).toBe(input);
  });
  it('rejects invalid lengths', () => {
    expect(() => splitLineText('test', 5001)).toThrow(RangeError);
  });
});
