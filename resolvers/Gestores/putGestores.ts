import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../../db/tcliente.ts";
import {GestorModel} from "../../db/tgestor.ts";
import { Gestor, Cliente } from "../../type.ts";
import { getGestorFromModel } from "../../controllers/getGestorModel.ts";
import { getClienteFromModel } from "../../controllers/getClientModel.ts";

const putGestor = async (req:Request, res: Response)  => {
    try{
        const {DNI} = req.params;
        const {DNICliente} = req.body;
        
        if(!DNICliente){
            res.status(500).send("Client DNI is required");
            return;
        }
        
        const existeGestor = await GestorModel.findOne({DNI: DNI})
        if(!existeGestor){
            res.status(500).send("Gestor is not found");
            return;
        }

        const gestorResponse: Gestor = await getGestorFromModel(existeGestor)

        if(gestorResponse.clientes && gestorResponse.clientes.length >= 10){
            res.status(500).send("Gestor has enough clients");
            return;
        }else if(gestorResponse.clientes && gestorResponse.clientes.find(elem => {elem.DNI == DNICliente})){
            res.status(500).send("This Gestor has this client");
            return;
        }

        let existeCliente = await ClienteModel.findOne({DNI: DNICliente})
        if(!existeCliente){
            res.status(500).send("Client not found");
            return;
        }

        existeCliente = await ClienteModel.findOneAndUpdate({DNI: DNICliente}, 
                                {gestor: existeGestor},
                                {new: true});
        
        if(!existeCliente){
            res.status(500).send("Client not cant be update");
            return;
        }

        const clienteResponse: Cliente = await getClienteFromModel(existeCliente)
        
        res.status(200).send(clienteResponse);

    }catch(error){
        res.status(500).send(error.message)
    }
}

export default putGestor;