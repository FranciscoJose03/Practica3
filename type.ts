export type Hipoteca ={
    cuotas: number[];
    cuotasporpagar?: number;
    clientes?: Array<Omit<Cliente, "gestores" | "hipotecas">>;
    gestores?: Array<Omit<Gestor, "clientes">>;
    total: number;
    id: string;
}

export type Gestor ={
    name: string;
    DNI: string;
    clientes?: Array<Omit<Cliente, "gestor" | "hipotecas">>;
    hipotecas?: Array<Omit<Hipoteca, "gestores">>;
    id: string;
}

export type Cliente ={
    name: string;
    DNI: string;
    dinero: number;
    gestor?: Omit<Gestor, "clientes">;
    hipotecas?: Array<Omit<Hipoteca, "clientes" | "gestor">>;
    id: string;
}

export type Transaccion ={
    recibe?:Cliente;
    envia?: Cliente;
    dinero: number;
    hipoteca?: Hipoteca;
    id: string;
}