export interface Tool { 
    name: string
    description: string
    schema: Record<string, any>
    invoke: (args: any) => Promise<any>
}