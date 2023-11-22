import { Request, Response } from "npm:express@4.18.2";
import {ClienteModel} from "../../db/tcliente.ts";

const deleteCliente = async (req: Request, res: Response) => {
    try{
        const {DNI} = req.params;
        const persona = await ClienteModel.findOneAndDelete({DNI: DNI}).exec();
        if(!persona){
            res.status(404).send("Cliente doesn't exists");
            return;
        }
        res.status(200).send("Cliente deleted");
    
    }catch(error){
        res.status(404).send(error.mesage);
        return;
    }
}

export default deleteCliente;