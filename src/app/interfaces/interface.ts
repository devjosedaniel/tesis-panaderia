export class Sucursal{
    constructor(){
        this.nombre = '';
    }
    id?: number;
    nombre?: string;
    // tslint:disable-next-line: variable-name
    created_at?: string;
    // tslint:disable-next-line: variable-name
    updated_at?: string;
}
export class Producto{
    constructor(){
        this.nombre = '';
        this.precio = 0;
    }
    id?: number;
    idproducto?: number;
    nombre?: string;
    precio?: number;
    // tslint:disable-next-line: variable-name
    created_at?: string;
    // tslint:disable-next-line: variable-name
    updated_at?: string;
    cantidad?: number;
}

export class Usuario{
    id?: number;
    idrol?: number;
    nombre?: string;
    password?: string;
    idsucursal?: number;
    sucursal?: string;
}
