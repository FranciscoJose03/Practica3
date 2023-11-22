import { Request, Response } from "npm:express@4.18.2";
import {HipotecaModel} from "../../db/thipoteca.ts";

const deleteHipoteca = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const hipoteca = await HipotecaModel.findOneAndDelete({_id: id}).exec();
        if(!hipoteca){
            res.status(404).send("Hipoteca doesn't exists");
            return;
        }
        res.status(200).send("Hipoteca deleted");
    
    }catch(error){
        res.status(404).send(error.mesage);
        return;
    }
}

export default deleteHipoteca;