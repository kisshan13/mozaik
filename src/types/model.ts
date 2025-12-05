export const OPENAI_MODELS = [
  'gpt-5', 
  'gpt-5-mini', 
  'gpt-5-nano',
  'gpt-5.1'
] as const

export type OpenAIModel = typeof OPENAI_MODELS[number]

const latest_sonnet = 'claude-sonnet-4-5-20250929'
const latest_haiku = 'claude-haiku-4-5-20251001'
const latest_opus = 'claude-opus-4-5-20251101'

export const ANTHROPIC_MODELS = [
  'claude-sonnet-4.5', 
  'claude-haiku-4.5', 
  'claude-opus-4.5'
] as const

export const ANTHROPIC_MODEL_MAP = {
  'claude-sonnet-4.5' : latest_sonnet,
  'claude-haiku-4.5': latest_haiku,
  'claude-opus-4.5': latest_opus
} as const

export type AnthropicModel = typeof ANTHROPIC_MODELS[number]

export type Model = OpenAIModel | AnthropicModel