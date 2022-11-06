import Fastify from "fastify";

import cors from '@fastify/cors'
import { pollRoutes } from "./routes/poll";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })
    await fastify.register(cors, {
        origin: true
    })
    await fastify.register(pollRoutes)
    await fastify.register(userRoutes)
    await fastify.register(guessRoutes)
    
    await fastify.listen({ port: 3535 })
}

bootstrap();