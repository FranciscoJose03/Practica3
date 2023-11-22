import { Request, Response } from "npm:express@4.18.2";
import {HipotecaModel} from "../../db/thipoteca.ts";
import {Hipoteca} from "../../type.ts";
import { getHipotecaFromModel } from "../../controllers/getHipotecaModel.ts";

const getHipoteca = async(_req: Request, res: Response) => {
    try{
        const hipotecas = await HipotecaModel.find().exec();
        const hipotecaResponse: Hipoteca[] = await Promise.all(
            hipotecas.map((hipoteca) => getHipotecaFromModel(hipoteca))
        )
        res.status(200).send(hipotecaResponse);
        
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getHipoteca;