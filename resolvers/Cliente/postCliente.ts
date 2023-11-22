import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../../db/tcliente.ts";
import { Cliente } from "../../type.ts";
import { getClienteFromModel } from "../../controllers/getClientModel.ts";

const postCliente = async (req:Request, res: Response)  => {
    try{
        const {name, DNI} = req.body;

        if(!name || !DNI){
                res.status(500).send("Name or DNI are required");
                return;
        }

        const alreadyExists = await ClienteModel.findOne({DNI: DNI});
        if(alreadyExists){
            res.status(400).send("The client already exists");
            return;
        }
    
        const newCliente = new ClienteModel({name, DNI});
        await newCliente.save();

        const clienteResponse: Cliente = await getClienteFromModel(newCliente)

        res.status(200).send(clienteResponse)

    }catch(error){
        res.status(500).send(error.message);
        return
    }
}

export default postCliente;