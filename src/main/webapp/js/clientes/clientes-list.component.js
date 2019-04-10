
/* Component definition sample */

class ClientesListController {
    //static $inject = ['$location'];

    constructor($location) {
        this.$location=$location;
        this.clientes=[];
        this.order='id'; 
    }
    $onInit () {
       
    }
    view(id_cliente) {
        this.$location.path('/clientes/'+id_cliente);
    }
    orderBy(newOrder) {
        this.order=newOrder;
    }
    
}
ClientesListController.$inject = ['$location'];

/**Visualiza un resumen de los datos de un cliente
   @notes use <cliente datos="objCliente"/>
 */
export const clientesListComponent = {
    bindings: {
        clientes: '<' //Component attribute (single binding)
    },
    templateUrl: 'js/clientes/clientes-list.template.html',
    controller: ClientesListController
};
