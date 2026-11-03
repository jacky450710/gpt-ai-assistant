// Keep legacy Chat Completions parameters for the production GPT-4o mini path.
// GPT-6 Luna uses the newer token limit and may reject legacy sampling penalties.
export const buildChatCompletionBody = ({
  model,
  messages,
  temperature,
  maxTokens,
  frequencyPenalty,
  presencePenalty,
}) => {
  if (model === 'gpt-6-luna') {
    return {
      model,
      messages,
      max_completion_tokens: maxTokens,
      reasoning_effort: 'none',
    };
  }
  return {
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
  };
};
