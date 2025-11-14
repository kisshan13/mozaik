export abstract class WorkUnit {
    constructor() {}
    abstract execute(): Promise<any>
}