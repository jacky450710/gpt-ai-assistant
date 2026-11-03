import { getConfiguredModelReply } from '../utils/model-identity.js';
import config from '../config/index.js';

describe('bot model self-identification', () => {
  it('answers Chinese model identity questions from backend config', () => {
    expect(getConfiguredModelReply('你現在是什麼模型？')).toContain(config.OPENAI_COMPLETION_MODEL);
    expect(getConfiguredModelReply('你是GPT幾版的？')).toContain(config.OPENAI_COMPLETION_MODEL);
  });
  it('does not override ordinary GPT learning questions', () => {
    expect(getConfiguredModelReply('介紹 GPT 的發展歷史')).toBeNull();
  });
  it('does not override unrelated user requests', () => {
    expect(getConfiguredModelReply('LINE Messaging API 是什麼？')).toBeNull();
  });
});
