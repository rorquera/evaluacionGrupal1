cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    let resultado;
    for(let i = 0; i < cuentas.length; i++){
        resultado=cuentas[i];
        if(resultado.numeroCuenta==numeroCuenta){
            return resultado;
        }
    }
    return null
}

ejecutarBusqueda=function(){
    let valorNumeroCuenta= recuperarTexto("txtBusquedaCedula");
    let cuentaEncontrada= buscarCuenta(valorNumeroCuenta);
    if(cuentaEncontrada!=null){
        mostrarTexto("txtNombre",cuentaEncontrada.nombre);
        mostrarTexto("txtApellido",cuentaEncontrada.apellido);
        mostrarTexto("txtCedula",cuentaEncontrada.cedula);
        mostrarTexto("txtNumeroCuenta" ,cuentaEncontrada.numeroCuenta);
        mostrarTexto("txtSaldo" ,cuentaEncontrada.saldo);
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");

    }else{
        alert("CUENTA INEXISTENTE");
    }
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
}

depositar=function(numeroCuenta,monto){
    let cuentaAfectada= buscarCuenta(numeroCuenta);
    let resultadoSuma=cuentaAfectada.saldo+=monto;
    return resultadoSuma
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
}

ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    let valorCuenta=recuperarTexto("txtBusquedaCedula");
    //Toma el monto ingresado en la caja de texto
    let valorMonto=recuperarFloat("valorIngresado");
    //invoca a depositar
    let resultado=depositar(valorCuenta,valorMonto);
    //Muestra un mensaje TRANSACCION EXITOSA
    alert("TRANSACCION EXITOSA")
    //Muestra en pantalla el nuevo saldo de la cuenta
    mostrarTexto("txtSaldo", resultado);
}



retirar=function(numeroCuenta,monto){
    let cuentaAfectada=buscarCuenta(numeroCuenta);
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    if(cuentaAfectada.saldo>monto){
        cuentaAfectada.saldo-=monto
        mostrarTexto("txtSaldo",cuentaAfectada.saldo);
        alert("TRANSACCION EXITOSA");
    }else{
        alert("SALDO INSUFICIENTE");
    }
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
}

ejecurtaRetirar= function(){
    let valorNumeroCuenta= recuperarTexto("txtBusquedaCedula");
    let valorIngresado= recuperarFloat("valorIngresado");
    retirar(valorNumeroCuenta,valorIngresado);
    
}