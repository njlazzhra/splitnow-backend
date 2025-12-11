import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const summary = async (kegiatanId) => {

    const kegiatan = await prismaClient.kegiatan.findUnique({
        where: { id: kegiatanId },
        include: {
            participants: {
                include: {
                    items: true
                }
            }
        }
    });

    if (!kegiatan) {
        throw new ResponseError(404, "Kegiatan not found");
    }

    const taxPercentage = kegiatan.taxPercentage;

    const participantsSummary = kegiatan.participants.map((p) => {
        const subtotal = p.items.reduce(
            (sum, item) => sum + item.cost * item.amount,
            0
        );

        const tax = subtotal * (taxPercentage / 100);
        const total = subtotal + tax;

        return {
            participantId: p.id,
            name: p.name,
            subtotal,
            tax,
            total
        };
    });

    const grandTotal = participantsSummary.reduce(
        (sum, p) => sum + p.total,
        0
    );

    const subTotal = participantsSummary.reduce(
        (sum, p) => sum + p.subtotal,
        0
    );

    return {
        id: kegiatan.id,      // FIX
        name: kegiatan.name,  // FIX
        event_date: kegiatan.event_date,
        taxPercentage,
        participants: participantsSummary,
        totalPembayaran: grandTotal,
        subTotal

    };
};

export default { summary };
