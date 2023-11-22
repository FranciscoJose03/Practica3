import {Request, Response} from "npm:express@4.18.2";
import {HipotecaModel}  from "../../db/thipoteca.ts";
import {ClienteModel} from "../../db/tcliente.ts";
import {GestorModel} from "../../db/tgestor.ts";
import {Hipoteca} from "../../type.ts";
import { getHipotecaFromModel } from "../../controllers/getHipotecaModel.ts";

const postHipoteca = async (req:Request, res: Response)  => {
    try{
        const {cuotas, clientes, gestores} = req.body;

        if(!cuotas ||  !clientes || !gestores || clientes.length == 0 || gestores.length == 0){
                res.status(500).send("Cuotas, clientes or gestores are required");
                return;
        }

        const total = cuotas.reduce((elem1: number, elem2: number) => {
            return elem1 + elem2
        }, 0)
        
        const clientesid = []
        const gestoresid = []

        for(let i = 0; i < clientes.length; i++){
            const existe = await ClienteModel.findOne({DNI: clientes[i]})
            if(existe){
                clientesid.push(existe._id)
            }else{
                res.status(500).send("Algun DNI de los clientes no es el correcto")
                return;
            }
        }

        for(let i = 0; i < gestores.length; i++){
            const existe = await GestorModel.findOne({DNI: gestores[i]})
            if(existe){
                gestoresid.push(existe._id)
            }else{
                res.status(500).send("Algun DNI de los gestores no es el correcto")
                return;
            }
        }

        const newHipoteca = new HipotecaModel({cuotas, clientes: clientesid, gestores: gestoresid, total});
        await newHipoteca.save();

        const hipotecaResponse: Hipoteca = await getHipotecaFromModel(newHipoteca)


        res.status(200).send(hipotecaResponse)

    }catch(error){
        res.status(500).send(error.message);
        return
    }
}

export default postHipoteca;