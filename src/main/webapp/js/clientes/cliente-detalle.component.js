/**Visualiza un resumen de los datos de un cliente
   @notes use <cliente-detalle cliente="objCliente"/>
 */
export const clienteDetalleComponent = {
    bindings: {
        cliente: '<' //Component attribute (single binding)
    },
    templateUrl: 'js/clientes/cliente-detalle.template.html',
};
