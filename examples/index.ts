import 'dotenv/config'

const message = "I'm planning a weekend trip. What's the weather in Belgrade?"

import { Gpt5 } from "@jigjoy-io/mosaic"
import { WeatherDB, WeatherTool } from "./tools/weather"

const gpt5 = new Gpt5()

//tools
let weatherTool: WeatherTool = new WeatherTool(new WeatherDB())

gpt5
    .conversation([{role: 'user', content: message}])
    .tools([weatherTool])

const exec = await gpt5.send()

console.log("ToolCalls →", exec.toolCalls)
console.log("Answer →", exec.text)