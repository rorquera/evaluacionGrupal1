const movimientos = [
  { numeroCuenta: '02234567', monto: 10.24, tipo: 'D' },
  { numeroCuenta: '02345211', monto: 45.9, tipo: 'D' },
  { numeroCuenta: '02234567', monto: 65.23, tipo: 'C' },
  { numeroCuenta: '02345211', monto: 65.23, tipo: 'C' },
  { numeroCuenta: '02345211', monto: 12.0, tipo: 'D' },
];

cargar = function () {
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
