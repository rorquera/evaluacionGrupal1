const cuentas = [
  {
    numeroCuenta: '02234567',
    cedula: '1714616123',
    nombre: 'Juan',
    apellido: 'Perez',
    saldo: 0.0,
  },
  {
    numeroCuenta: '02345211',
    cedula: '1281238233',
    nombre: 'Felipe',
    apellido: 'Caicedo',
    saldo: 0.0,
  },
];

const movimientos = [
  { numeroCuenta: '02234567', monto: 10.24, tipo: 'D' },
  { numeroCuenta: '02345211', monto: 45.9, tipo: 'D' },
  { numeroCuenta: '02234567', monto: 65.23, tipo: 'C' },
  { numeroCuenta: '02345211', monto: 65.23, tipo: 'C' },
  { numeroCuenta: '02345211', monto: 12.0, tipo: 'D' },
];

/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte

//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos

/*********/
/*CUENTAS*/
/*********/
cargarCuenta = function () {
  mostrarComponente('divCuentas');
  ocultarComponente('divMovimientos');
  ocultarComponente('divTransacciones');
  mostrarCuentas();
};

mostrarCuentas = function () {
  /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
  let tabla = `<table>
                <tr>
                     <th>NUMERO CUENTA</th>
                     <th>NOMBRE</th>
                     <th>SALDO</th>
                </tr>`;

  for (let i = 0; i < cuentas.length; i++) {
    tabla += `<tr>
                    <td>${cuentas[i].numeroCuenta}</td>
                    <td>${cuentas[i].nombre} ${cuentas[i].apellido}</td>
                    <td>${cuentas[i].saldo}</td>
                </tr>`;
  }
  tabla += `</table>`;

  mostrarHtml(tabla, 'tablaCuentas');
};

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
  for (let cta of cuentas) {
    if (cta.numeroCuenta == numeroCuenta) {
      return cta;
    }
  }
  return null;
};

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta = function (cuenta) {
  //Si ya existe mostrar un alert CUENTA EXISTENTE
  //Si se agrega, mostrar un alert CUENTA AGREGADA
  if (buscarCuenta(cuenta.numeroCuenta) == null) {
    alert('CUENTA AGREGADA');
    cuentas.push(cuenta);
  } else {
    alert('CUENTA EXISTENTE');
  }
};

agregar = function () {
  //Toma los valores de las cajas de texto, sin validaciones
  //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
  //Invoca a agregarCuenta
  //Invoca a mostrarCuentas
  const cedula = recuperarTexto('txtCed');
  const nombre = recuperarTexto('txtNom');
  const apellido = recuperarTexto('txtAp');
  const numeroCuenta = recuperarTexto('txtCuenta');

  const cuenta = {
    numeroCuenta: numeroCuenta,
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    saldo: 0.0,
  };
  agregarCuenta(cuenta);
  mostrarCuentas();
};

/***************/
/*TRANSACCIONES*/
/***************/
cargarTransacciones = function () {
  mostrarComponente('divTransacciones');
  ocultarComponente('divCuentas');
  ocultarComponente('divMovimientos');
  deshabilitarComponente('btnDepositar');
  deshabilitarComponente('btnRetirar');
};

ejecutarBusqueda = function () {
  let valorNumeroCuenta = recuperarTexto('txtBusquedaCedula');
  let cuentaEncontrada = buscarCuenta(valorNumeroCuenta);
  if (cuentaEncontrada != null) {
    mostrarTexto('txtNombre', cuentaEncontrada.nombre);
    mostrarTexto('txtApellido', cuentaEncontrada.apellido);
    mostrarTexto('txtCedula', cuentaEncontrada.cedula);
    mostrarTexto('txtNumeroCuenta', cuentaEncontrada.numeroCuenta);
    mostrarTexto('txtSaldo', cuentaEncontrada.saldo);
    habilitarComponente('btnDepositar');
    habilitarComponente('btnRetirar');
  } else {
    alert('CUENTA INEXISTENTE');
    limpiarDatosTransacciones();
  }
  //toma el numero de cuenta de la caja de texto
  //invoca a buscarCuenta y guarda el resultado en una variable
  //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
};

depositar = function (numeroCuenta, monto) {
  let cuentaAfectada = buscarCuenta(numeroCuenta);
  let resultadoSuma = (cuentaAfectada.saldo += monto);
  crearMovimiento(numeroCuenta, monto, 'C');
  return resultadoSuma;
  //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
  //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
};

ejecutarDeposito = function () {
  //Toma el numero de cuenta ingresado en la caja de texto
  let valorCuenta = recuperarTexto('txtBusquedaCedula');
  //Toma el monto ingresado en la caja de texto
  let valorMonto = recuperarFloat('valorIngresado');
  //invoca a depositar
  let resultado = depositar(valorCuenta, valorMonto);
  //Muestra un mensaje TRANSACCION EXITOSA
  alert('TRANSACCION EXITOSA');
  //Muestra en pantalla el nuevo saldo de la cuenta
  mostrarTexto('txtSaldo', resultado);
};

retirar = function (numeroCuenta, monto) {
  let cuentaAfectada = buscarCuenta(numeroCuenta);
  //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
  if (cuentaAfectada.saldo > monto) {
    cuentaAfectada.saldo -= monto;
    mostrarTexto('txtSaldo', cuentaAfectada.saldo);
    alert('TRANSACCION EXITOSA');
    crearMovimiento(numeroCuenta, monto, 'D');
  } else {
    alert('SALDO INSUFICIENTE');
  }
  //Valida si la cuenta tiene el saldo suficiente para retirar el monto
  //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
  //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
  //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
};

ejecurtaRetirar = function () {
  let valorNumeroCuenta = recuperarTexto('txtBusquedaCedula');
  let valorIngresado = recuperarFloat('valorIngresado');
  retirar(valorNumeroCuenta, valorIngresado);
};

const crearMovimiento = (numeroCuenta, monto, tipo) => {
  const movimiento = {
    numeroCuenta: numeroCuenta,
    monto: monto,
    tipo: tipo,
  };
  movimientos.push(movimiento);
};

const limpiarDatosTransacciones=() => {
    mostrarTexto('txtNombre',''); 
    mostrarTexto('txtApellido',''); 
    mostrarTexto('txtCedula',''); 
    mostrarTexto('txtNumeroCuenta','');
    mostrarTexto('txtSaldo','');
 }

/*************/
/*MOVIMIENTOS*/
/*************/

cargarMovimientos = function () {
  mostrarComponente('divMovimientos');
  ocultarComponente('divCuentas');
  ocultarComponente('divTransacciones');
};

const verMoviemintos = () => {
  const numeroCuenta = recuperarTexto('txtNumeroCta');
  filtrarMovimientos(numeroCuenta);
};

filtrarMovimientos = function (numeroCuenta) {
  let movimientosCuenta = [];
  //Se barre el arreglo de movimientos
  //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
  //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
  //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
  if (buscarCuenta(numeroCuenta) == null) {
    alert('LA CUENTA NO EXISTE.');
    limpiarTablaMovimientos();
    return;
  }

  for (let movimiento of movimientos) {
    if (movimiento.numeroCuenta == numeroCuenta) {
      movimientosCuenta.push(movimiento);
    }
  }
  mostrarMovimientos(movimientosCuenta);
};

/*
      Recibe un arreglo con los movimientos que va a mostrar en pantalla
  */
mostrarMovimientos = function (misMovimientos) {
  //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
  //Columnas: NUMERO CUENTA, MONTO, TIPO
  //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
  //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
  //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
  let tabla = `<table>
                  <tr>
                      <th>NUMERO CUENTA</th>
                      <th>MONTO</th>
                      <th>TIPO</th>
                  </tr>`;

  for (let i = 0; i < misMovimientos.length; i++) {
    tabla += `<tr><td>${misMovimientos[i].numeroCuenta}</td>`;
    tabla += `<td>${
      misMovimientos[i].tipo == 'C'
        ? misMovimientos[i].monto
        : -1 * misMovimientos[i].monto
    }</td>`;
    tabla += `<td>${misMovimientos[i].tipo}</td></tr>`;
  }

  tabla += `</table>`;
  mostrarHtml(tabla, 'tablaMovimientos');
};

const limpiarTablaMovimientos = () => {
  mostrarHtml('', 'tablaMovimientos');
};
