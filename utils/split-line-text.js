// LINE Messaging API accepts at most 5,000 characters per text message.
// Split by Unicode code points so surrogate pairs are not cut in half.
const MAX_LINE_TEXT_LENGTH = 5000;

const splitLineText = (text, maxLength = MAX_LINE_TEXT_LENGTH) => {
  if (typeof text !== 'string' || !text.length) return [];
  if (!Number.isInteger(maxLength) || maxLength < 1 || maxLength > MAX_LINE_TEXT_LENGTH) {
    throw new RangeError('Invalid LINE text chunk size');
  }
  const points = Array.from(text);
  const chunks = [];
  for (let start = 0; start < points.length; start += maxLength) {
    chunks.push(points.slice(start, start + maxLength).join(''));
  }
  return chunks;
};

export default splitLineText;
