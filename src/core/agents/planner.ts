import { PlanNode } from "@/types/plan"
import { WorkUnit } from "@core/workflow/work-unit"
import { Task } from "@core/workflow/task"
import { Workflow } from "@core/workflow/workflow"
import { Agent } from "./agent"
import { Command } from "@/types/command"
import z from "zod"
import { ANTHROPIC_MODELS, OPENAI_MODELS } from "@/types/model"

const PROMPT = 
`You are a planner.

Rules:
- Use 'parallel' for the task that can be run in parallel.
- Pick model based on the task complexity
- Keep prompts actionable.
- Don't ask user for any input, just do the thing with available data you have.
`

export const ModelSchema = z.enum([...OPENAI_MODELS, ...ANTHROPIC_MODELS])
export type Model = z.infer<typeof ModelSchema>
  
// Task node schema
export const TaskPlanNodeSchema = z.object({
	kind: z.literal("task"),
	task: z.string(),
	model: ModelSchema,
})
export type TaskPlanNode = z.infer<typeof TaskPlanNodeSchema>
  
  // Workflow node schema (recursive)
export const WorkflowPlanNodeSchema: z.ZodType<Extract<PlanNode, { kind: "workflow" }>> =
	z.lazy(() =>
	  z.object({
		kind: z.literal("workflow"),
		mode: z.enum(["sequential", "parallel"]),
		units: z.array(PlanNodeSchema), // recursion
	  })
)
export type WorkflowPlanNode = z.infer<typeof WorkflowPlanNodeSchema>;
   
export const PlanNodeSchema: z.ZodType<PlanNode> =  TaskPlanNodeSchema.or(WorkflowPlanNodeSchema)
  
export const PlanSchema = z.object({
	root: PlanNodeSchema,
})
  
export class PlanningAgent extends Agent {

	constructor(command: Command){
		super(command)
	}

	async planFromGoal(goal: string): Promise<Workflow> {
		this.setStructuredOutput(PlanSchema)
		const plan = await this.act(`${PROMPT}\nGoal: ${goal}`)
		return buildWorkflow(plan.root)
	}
}

function buildWorkflow(node: PlanNode): Workflow {

	if (node.kind !== "workflow") 
		throw new Error("Root must be workflow")
	
	return new Workflow(
		node.mode ?? "sequential",
		node.units.map(mapNode)
	)
}

function mapNode(node: PlanNode): WorkUnit {

	if (node.kind === "task") {
		return new Task(node.task, node.model)
	}
	
	return new Workflow(
		node.mode ?? "sequential",
		node.units.map(mapNode)
	)
}
