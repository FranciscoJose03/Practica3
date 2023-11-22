import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../../db/tcliente.ts";
import {TransaccionModel} from "../../db/ttransaccion.ts";


const putenviardinero = async (req:Request, res: Response)  => {
    try{
        
        const {DNIenvia, DNIrecibe, dinero} = req.body;
        
        if(!dinero || DNIenvia === DNIrecibe){
            res.status(500).send("Money is required or you send the money to yourself");
            return;
        }
        
        let qnenvia = await ClienteModel.findOne({DNI: DNIenvia})
        if(!qnenvia || qnenvia.dinero < dinero){
            res.status(500).send("Client not found or not have enough money");
            return;
        }

        const qnrecibe = await ClienteModel.findOneAndUpdate({DNI: DNIrecibe}, 
                                    {$inc: {dinero: dinero}},
                                    {new: true});

        if(!qnrecibe){
            res.status(404).send("Fallo el update")
        }else{
            qnenvia = await ClienteModel.findOneAndUpdate({DNI: DNIenvia}, 
                                        {$inc: {dinero: dinero*-1}},
                                        {new: true});

            const transaccion = new TransaccionModel({recibe: qnrecibe, envia: qnenvia, dinero});
            await transaccion.save();

            res.status(200).send(transaccion);
        }


    }catch(error){
        res.status(500).send(error.message)
    }
}

export default putenviardinero;