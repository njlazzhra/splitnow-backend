import kegiatanService from "../service/kegiatan-service.js";

const summary= async (req, res, next) => {
    try{
        const kegiatanId =parseInt(req.params.kegiatanId,10) ;
        const result = await kegiatanService.summary(kegiatanId);
        res.status(200).json({
            data :result,
            message : "Kegiatan berhasil dipanggil"
        })
    }catch (error){
        next(error);
    }
}

export default {
    summary
}