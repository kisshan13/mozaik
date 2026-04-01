import { SessionContext } from "../session/state"

export abstract class Workflow {

    abstract start(session: SessionContext): Promise<unknown>
}   