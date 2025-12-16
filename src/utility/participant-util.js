import {prismaClient} from "../application/database.js";

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
    updateParticipantCost
}
