import {prismaClient} from "../src/application/database.js";

const parseJwt = (token) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8')
    return JSON.parse(jsonPayload)
}

const updateParticipantCost = async (participantId) => {
    // 1. Ambil semua item milik participant
    const items = await prismaClient.items.findMany({
        where: { participantId: participantId }
    });

    // 2. Hitung total
    const totalCost = items.reduce((sum, item) => {
        return sum + (item.cost * item.amount);
    }, 0);

    // 3. Update ke tabel Participant
    return prismaClient.participants.update({
        where: {id: participantId},
        data: {cost_total: totalCost}
    });
}

export {
    parseJwt,
    updateParticipantCost
}