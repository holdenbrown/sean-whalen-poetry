import { access, cp, mkdir, rm, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const projectRoot = process.cwd()
const exportDirectory = resolve(projectRoot, "out")
const distributionDirectory = resolve(projectRoot, "dist")
const clientDirectory = resolve(distributionDirectory, "client")
const serverDirectory = resolve(distributionDirectory, "server")

await access(resolve(exportDirectory, "index.html"))
await rm(distributionDirectory, { recursive: true, force: true })
await mkdir(serverDirectory, { recursive: true })
await cp(exportDirectory, clientDirectory, { recursive: true })

await writeFile(
  resolve(serverDirectory, "index.js"),
  `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request)
  },
}\n`
)

console.log("Prepared the static Sites bundle in dist.")
