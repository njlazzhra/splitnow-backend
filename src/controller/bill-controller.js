import userService from "../service/user-service.js";
import billService from "../service/bill-service.js";

const createKegiatan = async (req, res, next) => {

    try {
        const user = req.user;
        const request = req.body;
        const result = await billService.createKegiatan(user, request)
        res.status(201).json({
            data :result,
            message : "Kegiatan berhasil dibuat"
        })

    }catch (error){
        next(error);
    }

}


const addParticipants = async (req, res, next) => {
    try {
        const request = req.body;
        const kegiatanId = req.params.kegiatanId;
        const result = await billService.addParticipant(request, kegiatanId)
        res.status(201).json({
            data :result,
            message : "Peserta berhasil ditambahkan"
        })
    }catch (error){
        next(error);
    }
}

const getAllParticipant = async (req, res, next) => {
    try {
        const kegiatanId = parseInt(req.params.kegiatanId);

        const result = await billService.getAllParticipant(kegiatanId)
        res.status(200).json({
            data :result,
            message : "Peserta berhasil diambil"
        })
    }catch (error){
        next(error);
    }
}

const addItem = async (req, res, next) => {
    try {
        const request = req.body;
        const participantId =parseInt(req.params.participantId,10) ;
        const result = await billService.addItem( request, participantId)
        res.status(201).json({
            data :result,
            message : "Item berhasil ditambahkan"
        })
    }catch (error){
        next(error);
    }
}

const getAllItems = async (req, res, next) => {
    try {
        const participantId =parseInt(req.params.participantId,10) ;
        const result = await billService.getAllItems(participantId)
        res.status(200).json({
            data :result,
        })
    }catch (error){
        next(error);
    }

}


export default {
    createKegiatan,
    addParticipants,
    getAllParticipant,
    addItem,
    getAllItems
}