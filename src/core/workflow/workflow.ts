import { WorkUnit } from "@core/workflow/work-unit"

export class Workflow extends WorkUnit {
	
    constructor(readonly mode: 'parallel' | 'sequential', readonly units: WorkUnit[]) {
		super()
    }
  
    async execute(): Promise<any> {
		const results = []
		for (const u of this.units) {
			results.push(await u.execute())
		}
		return { ok: true, data: results }
    }
}