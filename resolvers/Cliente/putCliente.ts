import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../../db/tcliente.ts";
import {TransaccionModel} from "../../db/ttransaccion.ts";

const putCliente = async (req:Request, res: Response)  => {
    try{
        const {DNI, dinero} = req.body;
        
        if(!DNI || !dinero){
            res.status(500).send("Money is required");
            return;
        }
        
        const masdinero = await ClienteModel.findOneAndUpdate({DNI}, 
                                    {$inc: {dinero: dinero}},
                                    {new: true});

        
        if(!masdinero){
            res.status(404).send("Fallo el update")
        }else{
            const transaccion = new TransaccionModel({envia: masdinero, dinero});
            await transaccion.save();
            res.status(200).send(transaccion);
        }


    }catch(error){
        res.status(500).send(error.message)
    }
}

export default putCliente;