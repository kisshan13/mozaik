import { CustomToolSpec } from "@jigjoy-io/mosaic"

class WeatherDB {
    async run({ city }: { city: string }) {
        const db: Record<string, { tempC: number; condition: string }> = {
            "Novi Sad": { tempC: 24, condition: "Sunny" },
            "Belgrade": { tempC: 23, condition: "Partly Cloudy" }
        }
        return db[city] || { tempC: 22, condition: "Clear" }
    }
}
  
class WeatherTool implements CustomToolSpec {

    constructor(private db: WeatherDB){}

    invoke(args: any){
        return this.db.run(args)
    }
    
    name: string = 'getWeather'
    description: string = 'Tool for fetching weather info from db'
    schema: Record<string, any> = { 
        type: "object", 
        properties: { city: { type: "string" } }, 
        required: ["city"] 
    }
    
}

export {
    WeatherTool,
    WeatherDB
}