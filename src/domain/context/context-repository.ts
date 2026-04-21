import { Context } from "src/domain/context/context"

export interface ContextRepository {
	save(context: Context): Promise<void>
	get(id: string): Promise<Context>
	getByProjectId(projectId: string): Promise<Context[]>
}
