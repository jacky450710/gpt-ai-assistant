import config from '../config/index.js';

// Answer model identity from application configuration, not model self-report.
export const getConfiguredModelReply = (text) => {
  if (typeof text !== 'string') return null;
  const question = text.trim();
  const asksAboutSelf = /(你|妳|你的|目前|現在|這個|此|機器人|bot|assistant|自己)/i.test(question);
  const asksAboutModel = /(模型|model|gpt|版本|幾版)/i.test(question);
  const asksWhich = /(什麼|哪個|哪一|多少|幾|what|which|版本|型號)/i.test(question);
  if (!asksAboutSelf || !asksAboutModel || !asksWhich) return null;
  return `這個 LINE 機器人目前設定使用的文字 AI 模型是 ${config.OPENAI_COMPLETION_MODEL}。這是後端程式的模型設定名稱；圖片理解功能可能使用不同模型。`;
};
