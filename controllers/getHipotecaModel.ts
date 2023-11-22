import { HipotecaModelType } from "../db/thipoteca.ts";
import { Hipoteca } from "../type.ts";
import { ClienteModel } from "../db/tcliente.ts";
import { GestorModel } from "../db/tgestor.ts";

export const getHipotecaFromModel = async (
  subject: HipotecaModelType
): Promise<Hipoteca> => {

  const {cuotas, clientes, gestores, total, _id} = subject;

  const clients = await ClienteModel.find({_id: { $in: clientes} });

  const gest = await GestorModel.find({_id: { $in: gestores } });

  return {
    id: _id.toString(),
    cuotas: cuotas.map((elem: any) => elem[0]),
    cuotasporpagar: cuotas.length,
    total,
    clientes: clients.map((client) => ({
      id: client._id.toString(),
      name: client.name,
      DNI: client.DNI,
      dinero: client.dinero
    })),
    gestores: gest.map((gestor) =>({
        id: gestor._id.toString(),
        name: gestor.name,
        DNI: gestor.DNI,
      })),
  };
};