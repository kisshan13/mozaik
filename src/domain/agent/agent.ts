import { Interpreter } from "../hypervisor/interpreter"
import { Participant } from "../hypervisor/participant"
import { Tool } from "../hypervisor/tool"

export class Agent extends Participant {
	constructor(id: string, tools: Tool[], interpreter: Interpreter) {
		super(id, tools, interpreter)
	}
}
