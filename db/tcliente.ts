import mongoose from "npm:mongoose@7.6.3";
import { Cliente } from "../type.ts";

const schema = mongoose.Schema;
const ClienteSchema = new schema(
    {
        name: {type: String, required: true},
        DNI: {type: String, required: true},
        dinero: {type: Number, required: true, default: 0},
        gestor: {type: schema.Types.ObjectId, ref: "Gestor", required: false},
        hipotecas: [{type: schema.Types.ObjectId, ref: "Hipoteca", required: false, default: []}],
    },
    {timestamps: false}
);

export type ClienteModelType = mongoose.Document & Omit<Cliente, "id" | "hipotecas" | "gestor"> & {
    gestor: mongoose.Types.ObjectId;
    hipotecas: Array<mongoose.Schema.Types.ObjectId>;
};
export const ClienteModel =  mongoose.model<ClienteModelType>("Cliente", ClienteSchema);