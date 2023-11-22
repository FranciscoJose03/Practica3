import mongoose from "npm:mongoose@7.6.3";
import { Gestor } from "../type.ts";

const schema = mongoose.Schema;
const GestorSchema = new schema(
    {
        name: {type: String, required: true},
        DNI: {type: String, required: true},
    },
    {timestamps: false}
);

export type GestorModelType = mongoose.Document & Omit<Gestor, "id"| "clientes" | "hipotecas">;

export const GestorModel = mongoose.model<GestorModelType>("Gestor", GestorSchema);