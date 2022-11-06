import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data: {
            name:'firstUser',
            email:'firsUser@mail.com',
            avatarUrl:'https://github.com/mazzillio.png'
        }
    })
    const pool = await prisma.pool.create({
        data:{
            title:'First Pool',
            code:'abc123',
            ownerId:user.id,

            participants:{
                create: {
                    userId:user.id
                }
            }
        }
    })
    await prisma.game.create({
        data:{
            date:'2022-11-06T00:00:00.334Z',
            firstTeamCountryCode:'DE',
            secondTeamCountryCode:'BR'
        }
    })
    await prisma.game.create({
        data:{
            date:'2022-11-07T00:00:00.334Z',
            firstTeamCountryCode:'BR',
            secondTeamCountryCode:'AR',
            guesses:{
                create:{
                    firstTeamPoints:1,
                    secondTeamPoints:0,
                    participant: {
                        connect:{
                            userId_poolId: {
                                userId:user.id,
                                poolId:pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}
main()