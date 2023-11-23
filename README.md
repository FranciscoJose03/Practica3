# Practica3

 # - END POINTS 
  .post("/banco/Cliente", postCliente)  =>  Crea un cliente al banco 

		localhost:3002/banco/Cliente
  		{ 
	    "name": "Fernando", 
  	  "DNI": "404043A", 
  		"dinero": 23000 
  		}
  
  .delete("/banco/Cliente/:DNI", deleteCliente)	=>	Elimina el cliente 
  
			localhost:3002/banco/Cliente/404042 

  .get("/banco/Cliente", getCliente) => Obtiene todos los clientes del banco 
  
		  localhost:3002/bancoCliente

  .put("/enviarDinero", putenviardinero) => Envia dinero de un cliente a otro 
  
		  localhost:3002/enviarDinero
		{
	    "DNIenvia": "404043A",
  	  "DNIrecibe": "404042A",
  		"dinero": 7000
  		}

  .put("/meterDinero", putCliente) => Introduce dinero en la cuenta de cada cliente
  
			{
  	  "DNI": "404043A",
  		"dinero": 4000
  		}
  
  .post("/Hipoteca", postHipoteca) => Crea una Hipoteca 

  		localhost:3002/enviarDinero
  		{
  			"cuotas": [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000],
  			"clientes": ["404043A", "404040A"],
  			"gestores": ["505051A"]
  		}

  .put("/pagar/Hipoteca", putHipoteca) => Pagar una de la cuota que toca pagar en este momento 

  		localhost:3002/pagar/Hipoteca
  		{
  			"DNIenvia": "404043A",
  			"idHipoteca": //Introduce el id de la ultima practica creada para pagar
  			"dinero": 100 //Ira cambiando dependiendo de la cuota que toque
  		}
  
  .get("/Hipoteca", getHipoteca)	=>	Obtiene todas las hipotecas creadas 

			localhost:3002/Hipoteca
  
  .delete("/Hipoteca/:id", deleteHipoteca)	=>	Elimina la hipoteca creada

	 		localhost:3002/Hipoteca/ //id de la hipoteca

  .post("/Gestor", postGestor)	=> Crea un gestor

			localhost:3002/Gestor
  		{
  			"name": "Pedro"
  			"DNI": "505052A"
  		}
  
  .put("/Gestor/:DNI", putGestor)	=>	Enlaza un gestor al cliente

			localhost:3002/Gestor/505052A
  		{
  			"DNICliente": "404040A"
  		}
  
  .get("/Gestor", getGestor)	=>	Obtiene todos los gestores creados

		localhost:3002/Gestor

 # - CronJob
He utilizado cronJob porque me ha parecido el más sencillo en este caso, además he reciclado la funcion putCliente y putHipoteca para poder realizar las funciones cada 5 minutos
