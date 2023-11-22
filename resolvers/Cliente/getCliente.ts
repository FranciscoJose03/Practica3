import { Request, Response } from "npm:express@4.18.2";
import  {ClienteModel}  from "../../db/tcliente.ts";
import { Cliente } from "../../type.ts";
import { getClienteFromModel } from "../../controllers/getClientModel.ts";

const getCliente = async(_req: Request, res: Response) => {
    try{
        const clientes = await ClienteModel.find().exec();
        const clientesResponse: Cliente[] = await Promise.all(
            clientes.map((cliente) => getClienteFromModel(cliente))
        );
        res.status(200).send(clientesResponse);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getCliente;