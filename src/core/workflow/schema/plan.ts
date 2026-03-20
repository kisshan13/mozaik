import z from "zod"
import { ANTHROPIC_MODELS, OPENAI_MODELS } from "@/types/model"
import { PlanNode } from "@core/workflow/plan"

const ModelSchema = z.enum([...OPENAI_MODELS, ...ANTHROPIC_MODELS])

const TaskPlanNodeSchema = z.object({
	kind: z.literal("task"),
	task: z.string(),
	model: ModelSchema,
})

const WorkflowPlanNodeSchema: z.ZodType<Extract<PlanNode, { kind: "workflow" }>> = z.lazy(() =>
	z.object({
		kind: z.literal("workflow"),
		mode: z.enum(["sequential", "parallel"]),
		units: z.array(PlanNodeSchema),
	}),
)

const PlanNodeSchema: z.ZodType<PlanNode> = TaskPlanNodeSchema.or(WorkflowPlanNodeSchema)

export const PlanSchema = z.object({
	root: PlanNodeSchema,
})
