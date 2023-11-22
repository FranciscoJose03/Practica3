import {Request, Response} from "npm:express@4.18.2";
import {GestorModel}  from "../../db/tgestor.ts";
import { Gestor } from "../../type.ts";
import { getGestorFromModel } from "../../controllers/getGestorModel.ts";

const postGestor = async (req:Request, res: Response)  => {
    try{
        const {name, DNI} = req.body;

        if(!name || !DNI){
                res.status(500).send("Name or DNI are required");
                return;
        }

        const alreadyExists = await GestorModel.findOne({DNI: DNI});
        if(alreadyExists){
            res.status(400).send("The gestor already exists");
            return;
        }
    
        const newGestor = new GestorModel({name, DNI});
        await newGestor.save();

        const gestorResponse: Gestor = await getGestorFromModel(newGestor)

        res.status(200).send(gestorResponse)

    }catch(error){
        res.status(500).send(error.message);
        return
    }
}

export default postGestor;