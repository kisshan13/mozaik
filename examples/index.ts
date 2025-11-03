import 'dotenv/config'

const message = "I'm planning a weekend trip. What's the weather in Belgrade?"

import { Gpt5Nano } from "@jigjoy-io/mosaic"
import { WeatherDB, WeatherTool } from "./tools/weather"

const gpt5Nano = new Gpt5Nano()

//tools
let weatherTool: WeatherTool = new WeatherTool(new WeatherDB())

gpt5Nano
    .conversation([{role: 'user', content: message}])
    .tools([weatherTool])

const exec = await gpt5Nano.send()

console.log("ToolCalls →", exec.toolCalls)
console.log("Answer →", exec.text)