import { ClusterHook } from "./cluster"
import { ExecutionHook } from "./execution-hook"
import { Logger } from "./logger"

const loggingHook: ExecutionHook = new Logger()

const defaultHooks = [loggingHook]
const clusterHook: ExecutionHook = new ClusterHook(defaultHooks)

export const DEFAULT_CLUSTER_HOOK = clusterHook
