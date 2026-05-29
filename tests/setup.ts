// Global test setup.
//
// Provider SDK clients (Anthropic, OpenAI, Gemini, DeepSeek) are instantiated
// by their runtimes even when a test never makes a network call. Seed dummy
// credentials so those constructors succeed in CI without real secrets.
//
// Tests MUST NOT make real API calls. Stub the SDK client when exercising a
// runtime's request/response mapping.

process.env.ANTHROPIC_API_KEY ||= "test-anthropic-key"
process.env.OPENAI_API_KEY ||= "test-openai-key"
process.env.GEMINI_API_KEY ||= "test-gemini-key"
process.env.GOOGLE_API_KEY ||= "test-google-key"
process.env.DEEPSEEK_API_KEY ||= "test-deepseek-key"
