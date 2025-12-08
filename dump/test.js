// import PrismaClient

import {PrismaClient} from "@prisma/client"; // relatif dari index.js ke folder generated

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany();
        console.log("Users:", users);
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main().then(r => console.log(r));
