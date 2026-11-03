# GPT-6 Luna LINE assistant — isolated preview validation

Date: 2026-11-03 (Asia/Taipei)
Branch: `test/gpt-6-luna-api-compat-20261103`
Production: **unchanged** (`main` retains GPT-4o mini).

## API compatibility
- Chat Completions endpoint: `POST /v1/chat/completions` (officially supported for `gpt-6-luna`).
- Luna-specific request: `model: gpt-6-luna`, `max_completion_tokens: 1024`, `reasoning_effort: none`, and `messages`.
- Legacy request keys `max_tokens`, `temperature`, `frequency_penalty`, and `presence_penalty` are omitted for Luna.
- Legacy GPT-4o mini and GPT-4o image requests retain their original payload.
- 1024 is the total completion token budget, not a guarantee of 1024 visible output tokens.

## LINE response handling
- Existing `splitLineText` limits each message to 5,000 Unicode code points.
- Existing `Context.pushText` caps reply batches at 5 messages, with quick-reply controls attached only to the final chunk.
- Validation cases cover 11,000 emojis (5,000 + 5,000 + 1,000), intact Unicode and original-content reconstruction.
- This branch does not auto-continue a response that hits the token limit; the existing Continue flow is retained.

## Timeout
- OpenAI request timeout: 15,000 ms default (`OPENAI_TIMEOUT` inherits from `APP_API_TIMEOUT`).
- Vercel function duration: 25 seconds.
- Runtime timeout, LINE reply token validity and actual user-perceived latency remain unverified until a real preview API request is authorized.

## Cost, standard short context (USD per million tokens)
- GPT-4o mini: input $0.15; output $0.60.
- GPT-6 Luna: input $0.10; output $0.50.
- Illustrative 1,000 requests at 1,000 input + 500 output tokens: GPT-4o mini $0.45 vs Luna $0.35, before cached tokens, reasoning tokens, long-context multipliers, retries, fees and other API operations.
- This is a price estimate, **not measured spend**.

## Verification limits and next gates
- Four local Node assertion cases passed on mirrored request builder and LINE splitter code (Luna payload; GPT-4o mini regression; image path; Unicode splitting).
- GitHub includes Jest regression tests; Vercel preview build readiness is checked separately.
- Preview Vercel environment does not currently have `OPENAI_API_KEY` (Production only). Do **not** copy a Production secret or expose values into CI logs. Until a separately authorized Preview key is configured, live Luna API access, real latency and actual LINE E2E reply are **NOT TESTED**.
- LINE Webhook currently targets the Production domain, not the preview deployment. No changes to its destination.
- Do not merge into `main` or promote preview before E2E acceptance.

Official documentation:
- https://developers.openai.com/api/docs/models/gpt-6-luna
- https://developers.openai.com/api/docs/models/gpt-4o-mini
- https://developers.openai.com/api/docs/pricing
