import config from '../config/index.js';
import { buildChatCompletionBody } from '../services/utils/chat-completion-payload.js';

const messages = [{ role: 'user', content: '請深入解釋' }];

describe('LINE answer-quality configuration', () => {
  it('enables Luna reasoning and a larger completion budget', () => {
    const body = buildChatCompletionBody({
      model: 'gpt-6-luna',
      messages,
      maxTokens: config.OPENAI_COMPLETION_MAX_TOKENS,
      reasoningEffort: config.OPENAI_REASONING_EFFORT,
    });
    expect(body.model).toBe('gpt-6-luna');
    expect(body.max_completion_tokens).toBe(2048);
    expect(body.reasoning_effort).toBe('low');
    expect(body.max_tokens).toBeUndefined();
    expect(body.temperature).toBeUndefined();
  });
  it('preserves the legacy image-model payload and token field', () => {
    const body = buildChatCompletionBody({
      model: 'gpt-4o',
      messages,
      maxTokens: 1024,
      temperature: 1,
      frequencyPenalty: 0,
      presencePenalty: 0.6,
    });
    expect(body.max_tokens).toBe(1024);
    expect(body.max_completion_tokens).toBeUndefined();
  });
  it('keeps default context above previous 256 token limit', () => {
    expect(config.APP_MAX_PROMPT_TOKENS).toBe(2048);
    expect(config.APP_MAX_PROMPT_MESSAGES).toBe(10);
  });
});
