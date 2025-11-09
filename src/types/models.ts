export const OPENAI_MODELS = ['gpt-5', 'gpt-5-mini', 'gpt-5-nano'] as const
export type OpenAIModels = typeof OPENAI_MODELS[number]