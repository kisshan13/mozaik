// LoggingVisitor.js

import { Task } from "../task"
import { Workflow } from "../workflow"
import { ExecutionHook } from "./execution-hook"

export class Logger implements ExecutionHook {
    
    beforeWorkflow(workflow: Workflow) {
        console.log(`[Workflow:start], Mode: ${workflow.mode}`)
    }
  
    afterWorkflow(workflow: Workflow) {
        console.log(`[Workflow:end], Mode: ${workflow.mode}`)
    }
  
    beforeTask(task: Task) {
        console.log(`[Task:end]: Model: ${task.getModel()} Task: ${task.getTask()}`)
    }
  
    afterTask(task: Task) {
        console.log(`[Task:end]: Model: ${task.getModel()} Task: ${task.getTask()}`)
    }

}