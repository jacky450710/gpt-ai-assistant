import { generateCompletion } from '../../utils/index.js';
import { COMMAND_BOT_CONTINUE } from '../commands/index.js';
import Context from '../context.js';
import { updateHistory } from '../history/index.js';
import { getPrompt, setPrompt } from '../prompt/index.js';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context) => context.hasCommand(COMMAND_BOT_CONTINUE);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context) => check(context) && (
  async () => {
    updateHistory(context.id, (history) => history.erase());
    const prompt = getPrompt(context.userId);
    const { lastMessage } = prompt;
    if (lastMessage.isEnquiring) prompt.erase();
    try {
      const { text, isFinishReasonStop } = await generateCompletion({ prompt });
      prompt.patch(text);
      if (lastMessage.isEnquiring && !isFinishReasonStop) prompt.write('', lastMessage.content);
      setPrompt(context.userId, prompt);
      if (!lastMessage.isEnquiring) updateHistory(context.id, (history) => history.patch(text));
      // Continue remains a text command, but never appears as a quick-reply button.
      context.pushText(text);
    } catch (err) {
      context.pushError(err);
    }
    return context;
  }
)();

export default exec;
