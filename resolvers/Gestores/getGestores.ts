import { Request, Response } from "npm:express@4.18.2";
import {GestorModel} from "../../db/tgestor.ts";
import { Gestor } from "../../type.ts";
import { getGestorFromModel } from "../../controllers/getGestorModel.ts";

const getGestor = async(_req: Request, res: Response) => {
    try{
        const gestores = await GestorModel.find().exec();
        const gestoresResponse: Gestor[] = await Promise.all(
            gestores.map((gestor) => getGestorFromModel(gestor))
        )

        res.status(200).send(gestoresResponse);
        
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getGestor;