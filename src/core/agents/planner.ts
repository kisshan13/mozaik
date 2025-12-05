// core/agents/PlanningAgent.ts
import { Plan, PlanNode } from "@/types/plan"
import { WorkUnit } from "@core/workflow/work-unit"
import { Task } from "@core/workflow/task"
import { Workflow } from "@core/workflow/workflow"
import { Agent } from "./agent"
import { Command } from "@/types/command"

const PROMPT = `You are a planner.
Return STRICT JSON only, no prose.
Schema:
{
  "root": {
    "kind": "workflow", "id": "root", "name": string, "mode": "sequential"|"parallel",
    "children": [
      { "kind":"task", "id":string, "name":string, "task":string, "model": "gpt-5-nano" } |
      { "kind":"workflow", "id":string, "name":string, "mode":"sequential"|"parallel", "children":[...] }
    ]
  }
}
Rules:
- Use 'parallel' for the task that can be run in parallel.
- Pick model based on the task complexity ('gpt-5', 'gpt-5-mini', 'gpt-5-nano')
- Keep prompts actionable.
- Don't ask user for any input, just do the thing with available data you have.
`

export class PlanningAgent extends Agent {

	constructor(command: Command){
		super(command)
	}

	async planFromGoal(goal: string): Promise<Workflow> {
		const raw = await this.act(`${PROMPT}\nGoal: ${goal}`)
		const plan = safeParsePlan(raw)
		return buildWorkflow(plan.root)
	}
}

function safeParsePlan(raw: string): Plan {

	console.log(`Plan: ${raw}`)
	// extremely defensive: strip code fences, find first/last braces
	const json = raw.trim().replace(/^```json|^```|```$/g, "")
	const start = json.indexOf("{")
	const end = json.lastIndexOf("}")
	const obj = JSON.parse(json.slice(start, end+1))

	// minimal checks
	if (!obj?.root || obj.root.kind !== "workflow") 
		throw new Error("Invalid plan")

	return obj as Plan
}

function buildWorkflow(node: PlanNode): Workflow {

	if (node.kind !== "workflow") 
		throw new Error("Root must be workflow")
	
	return new Workflow(
		node.mode ?? "sequential",
		node.children.map(mapNode)
	)
}

function mapNode(node: PlanNode): WorkUnit {

	if (node.kind === "task") {
		return new Task(node.task, node.model)
	}
	
	return new Workflow(
		node.mode ?? "sequential",
		node.children.map(mapNode)
	)
}
