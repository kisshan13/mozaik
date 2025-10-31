import { Message, ToolDef } from "../core/capabilities"

// Provider-neutral capability uses domain types
export interface TextGen {
    text(messages: Message[]): Promise<{ text: string }>
}
  
// Provider-specific mappers — hidden inside adapters
export interface ProviderMessage {}
export interface ProviderToolSpec {}
export interface ProviderChoice {}
  
export interface MessageMapper {
    toProvider(messages: Message[]): ProviderMessage[]
}
  