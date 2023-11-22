import mongoose from "npm:mongoose@7.6.3";
import { Transaccion } from "../type.ts";

const schema = mongoose.Schema;
const TransaccionSchema = new schema(
    {
        recibe: {type: schema.Types.ObjectId, ref: "Cliente", required: false},
        envia: {type: schema.Types.ObjectId, ref: "Cliente", required: false},
        dinero: {type: Number, required: true, default: 0},
        hipoteca: {type: schema.Types.ObjectId, ref: "Hipoteca", required: false},
    },
    {timestamps: true}
);

export type TransaccionModelType = mongoose.Document & Omit<Transaccion, "id">;

export const TransaccionModel = mongoose.model<TransaccionModelType>("Transaccion", TransaccionSchema);