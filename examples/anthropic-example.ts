/**
 * Anthropic Claude Examples
 * 
 * Note: Requires ANTHROPIC_API_KEY in .env file
 * Get your API key from: https://console.anthropic.com/settings/keys
 */

import 'dotenv/config'
import { gateway, InvocationRequest } from '@jigjoy-io/mosaic'

// Example 1: Simple prompt with Claude Sonnet 4.5
async function simpleExample() {
    console.log('\n=== Simple Claude Sonnet 4.5 Example ===\n')
    
    const request: InvocationRequest = {
        messages: [{
            role: 'system',
            content: 'You are a helpful AI assistant specialized in explaining complex topics simply'
        }],
        prompt: 'Explain quantum entanglement in 2-3 sentences for a beginner',
        model: 'claude-sonnet-4-5-20250929'
    }
    
    const response = await gateway.invoke(request)
    console.log(response)
}

// Example 2: Multi-turn conversation with Claude Haiku 4.5
async function conversationExample() {
    console.log('\n=== Multi-turn Conversation with Claude Haiku 4.5 ===\n')
    
    const request: InvocationRequest = {
        messages: [
            { role: 'system', content: 'You are an expert TypeScript developer' },
            { role: 'user', content: 'What are generics in TypeScript?' },
            { role: 'assistant', content: 'Generics in TypeScript allow you to write reusable, type-safe code...' },
            { role: 'user', content: 'Can you show me a practical example?' }
        ],
        prompt: '',
        model: 'claude-haiku-4-5-20251001'
    }
    
    const response = await gateway.invoke(request)
    console.log(response)
}

// Example 3: Using Claude Opus 4.1 for complex reasoning
async function complexReasoningExample() {
    console.log('\n=== Complex Reasoning with Claude Opus 4.1 ===\n')
    
    const request: InvocationRequest = {
        messages: [{
            role: 'system',
            content: 'You are an expert in software architecture and design patterns'
        }],
        prompt: 'Compare and contrast the Strategy pattern vs the State pattern. When should I use each?',
        model: 'claude-opus-4-1-20250805'
    }
    
    const response = await gateway.invoke(request)
    console.log(response)
}

// Run examples
async function main() {
    try {
        await simpleExample()
        // await conversationExample()
        // await complexReasoningExample()
    } catch (error) {
        console.error('Error:', error)
    }
}

main()
