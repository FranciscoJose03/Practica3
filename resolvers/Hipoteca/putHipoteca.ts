import {Request, Response} from "npm:express@4.18.2";
import {ClienteModel} from "../../db/tcliente.ts";
import {HipotecaModel} from "../../db/thipoteca.ts";
import {TransaccionModel} from "../../db/ttransaccion.ts";


const putHipoteca = async (req:Request, res: Response)  => {
    try{
        
        const {DNIenvia, idHipoteca, dinero} = req.body;
        
        if(!dinero || !DNIenvia || !idHipoteca){
            res.status(500).send("Money is required or not DNI or Hipoteca id");
            return;
        }
        
        let existeHipoteca = await HipotecaModel.findById(idHipoteca)
        if(!existeHipoteca){
            res.status(500).send("Hipoteca not found");
            return;
        }

        let qnenvia = await ClienteModel.findOne({DNI: DNIenvia})
        if(!qnenvia || qnenvia.dinero < dinero){
            res.status(500).send("Client not found, not have enough money");
            return;
        }else if(existeHipoteca.cuotas.length == 0){
            res.status(500).send("You dont have cuotas to pay")
            return
        }else if(existeHipoteca.cuotas[0]!= dinero){
            res.status(500).send("The money is not the same that cuota that you have to pay")
            return
        }

        qnenvia = await ClienteModel.findOneAndUpdate({DNI: DNIenvia}, 
                                {$inc: {dinero: dinero*-1}},
                                {new: true});
        
        existeHipoteca.cuotas.shift();
        existeHipoteca = await HipotecaModel.findByIdAndUpdate(idHipoteca, {
            cuotas: existeHipoteca.cuotas,
            total: existeHipoteca.total - dinero
        })
        
        const transaccion = new TransaccionModel({envia: qnenvia, dinero, hipoteca: existeHipoteca});
        await transaccion.save();

        res.status(200).send(transaccion);


    }catch(error){
        res.status(500).send(error.message)
    }
}

export default putHipoteca;