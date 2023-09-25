import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

const port = Bun.env.PORT;

const app = new Elysia()
	.use(staticPlugin({
        assets: 'public',
        prefix: '/public'
    }))
	.get('/', () => Bun.file('./public/index.html'))
	.listen(port)

console.log(`🦊 Server is listening on port ${app.server?.port}`)