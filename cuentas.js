cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    
}

mostrarCuentas=function(){
    let tabla="<table><tr><th>NUMERO CUENTA </th>"+
    "<th>NOMBRE</th><th>SALDO</th>";
    let infoCuenta;
    let tablaHtml=document.getElementById("inferior");
    for(let i=0;i<cuentas.length;i++){
        infoCuenta=cuentas[i];
        tabla+="<tr><td>"+infoCuenta.numeroCuenta+"</td>";
        tabla+="<td>"+infoCuenta.nombre+" "+infoCuenta.apellido+"</td>";
        tabla+="<td>"+infoCuenta.saldo+"</td></tr>";
        }
        tabla+="</table>"
        tablaHtml.innerHTML=tabla;

    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){

}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta=function(cuenta){
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
}

agregar=function(){
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas
}
