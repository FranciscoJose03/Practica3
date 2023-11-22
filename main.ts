import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import {CronJob} from "npm:cron@3.1.6";

import { ClienteModel } from "./db/tcliente.ts";
import { HipotecaModel } from "./db/thipoteca.ts";

import postCliente from "./resolvers/Cliente/postCliente.ts";
import deleteCliente from "./resolvers/Cliente/deleteCliente.ts";
import putCliente from "./resolvers/Cliente/putCliente.ts";
import getCliente from "./resolvers/Cliente/getCliente.ts";
import putenviardinero from "./resolvers/Cliente/putenviardinero.ts";

import postHipoteca from "./resolvers/Hipoteca/postHipoteca.ts";
import putHipoteca from "./resolvers/Hipoteca/putHipoteca.ts";
import getHipoteca from "./resolvers/Hipoteca/getHipoteca.ts";
import deleteHipoteca from "./resolvers/Hipoteca/deleteHipoteca.ts";

import postGestor from "./resolvers/Gestores/postGestor.ts";
import putGestor from "./resolvers/Gestores/putGestores.ts";
import getGestor from "./resolvers/Gestores/getGestores.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL")

if(!MONGO_URL){
    console.log("No mongo URL found");
    Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());
app
  .post("/banco/Cliente", postCliente)
  .delete("/banco/Cliente/:DNI", deleteCliente)
  .get("/banco/Cliente", getCliente)
  
  .put("/enviarDinero", putenviardinero)
  .put("/meterDinero", putCliente)

  .post("/Hipoteca", postHipoteca)
  .put("/pagar/Hipoteca", putHipoteca)
  .get("/Hipoteca", getHipoteca)
  .delete("/Hipoteca/:id", deleteHipoteca)

  .post("/Gestor", postGestor)
  .put("/Gestor/:DNI", putGestor)
  .get("/Gestor", getGestor)

 
  const response = () => ({
    status:() => ({ send:() => console.log("Realizado") }),
  });


  const funcionsautomatica1 = new CronJob ('*/1 * * * *', async() => {
    console.log("Funcion automatica: ")
    try{
      const clientes = await ClienteModel.find();
      for(let i = 0; i < clientes.length; i++ ){
        await putCliente({body: { DNI: clientes[i].DNI, dinero: 10000}}, response())
      }
    }catch(_e){
      console.log("No se realiza las funciones cada 5 minutos")
    }
  })
  
  const funcionsautomatica2 = new CronJob ('*/1 * * * *', async()=> {
    try{
      const clientes = await ClienteModel.find();
      const hipoteca = await HipotecaModel.find({})
      for(let i = 0; i < clientes.length; i++){
        for(let j = 0; j < hipoteca.length; j++){
          for(let l = 0; l < hipoteca[j].clientes.length; l++){       
            if(clientes[i].id == hipoteca[j].clientes[l]){
              await putHipoteca({body: {DNIenvia: clientes[i].DNI.toString(), idHipoteca: hipoteca[j].id.toString(),  dinero: Number(hipoteca[j].cuotas[0])}}, response())
            }
          }
        }
      }
    }catch(_e){
      console.log("No se realizo la funcion 2 cada 5 minutos")
    }
  })
  
  
  funcionsautomatica1.start();
  funcionsautomatica2.start();
app.listen(3002);