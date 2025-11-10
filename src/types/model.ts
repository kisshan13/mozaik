export const OPENAI_MODELS = [
  'gpt-5', 
  'gpt-5-mini', 
  'gpt-5-nano'
] as const

export type OpenAIModel = typeof OPENAI_MODELS[number]

export const ANTHROPIC_MODELS = [
  'claude-sonnet-4-5-20250929',
  'claude-haiku-4-5-20251001',
  'claude-opus-4-1-20250805'
] as const

export type AnthropicModel = typeof ANTHROPIC_MODELS[number]

export type Model = OpenAIModel | AnthropicModel