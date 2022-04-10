import { Server } from './app/Server'

Server.start().catch((e) => {
  console.error(e)
  process.exit(1)
})