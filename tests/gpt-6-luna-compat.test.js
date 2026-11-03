import { buildChatCompletionBody } from '../services/utils/chat-completion-payload.js';
import splitLineText from '../utils/split-line-text.js';

const common = {
  messages: [{ role: 'user', content: '你好' }],
  maxTokens: 1024,
  temperature: 1,
  frequencyPenalty: 0,
  presencePenalty: 0.6,
};

describe('GPT-6 Luna isolated request compatibility', () => {
  it('uses Chat Completions with 1024 total completion tokens and no unsupported legacy controls', () => {
    expect(buildChatCompletionBody({ ...common, model: 'gpt-6-luna' })).toEqual({
      model: 'gpt-6-luna',
      messages: common.messages,
      max_completion_tokens: 1024,
      reasoning_effort: 'none',
    });
  });
  it('preserves the existing GPT-4o mini request for production', () => {
    expect(buildChatCompletionBody({ ...common, model: 'gpt-4o-mini' })).toEqual({
      model: 'gpt-4o-mini',
      messages: common.messages,
      temperature: 1,
      max_tokens: 1024,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });
  });
  it('keeps the image model on its legacy route', () => {
    expect(buildChatCompletionBody({ ...common, model: 'gpt-4o' }).max_tokens).toBe(1024);
  });
  it('supports LINE 5000-character text chunks and intact Unicode', () => {
    const input = '😀'.repeat(11000);
    const chunks = splitLineText(input);
    expect(chunks).toHaveLength(3);
    expect(chunks.map((part) => Array.from(part).length)).toEqual([5000, 5000, 1000]);
    expect(chunks.join('')).toBe(input);
    expect(chunks.length).toBeLessThanOrEqual(5);
  });
});
