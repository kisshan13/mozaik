import { Interaction } from "./interaction"
import { Interpreter } from "./interpreter"
import { AttentionPhase, InferencePhase, IntentionPhase, InteractionPhase } from "./phase"

export abstract class Participant {
    abstract interpreter: Interpreter

    async interact(interaction: Interaction) {
        return this.interpreter.run(interaction)
    }
}

export class Actor extends Participant {
    interpreter: Interpreter = new Interpreter()

    constructor() {
        super()
        this.interpreter.addPhase(new AttentionPhase())
        this.interpreter.addPhase(new InferencePhase())
        this.interpreter.addPhase(new IntentionPhase())
        this.interpreter.addPhase(new InteractionPhase())
    }

    async interact(interaction: Interaction) {
        return this.interpreter.run(interaction)
    }
}

export class Environment extends Participant {
    interpreter: Interpreter = new Interpreter()

    constructor() {
        super()
        this.interpreter.addPhase(new InteractionPhase())
    }
}