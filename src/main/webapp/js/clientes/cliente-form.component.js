
/* Component definition sample */

class ClienteFormController {
    //Dependency declaration
    //static $inject=['clientesDAO','$location'];
    
    constructor (clientesDAO,$location) {
        //Dependency injection
        this.clientesDAO=clientesDAO;
        this.$location=$location;
        //View-Model
        this.cliente={id: 0};
        this.errMsgs = [];
    }
    $onInit() {
        //Binding completed
        console.log(this.cliente);
    }
    guarda() {
        if (this.cliente.id && this.cliente.id > 0) {
            //Modify cliente data
            this.clientesDAO.guarda(this.cliente)
                .then( () => {
                    console.log("cliente guardado");
                    this.$location.path('/clientes');
                })
                .catch( response => {
                    console.warn("error guardando cliente");
                    this.errMsgs=response.data;
                })
        } else {
            //New cliente
            this.cliente.id = 0;
            this.clientesDAO.crea(this.cliente)
                .then( () => {
                    console.log("Alta cliente");
                    this.$location.path('/clientes');
                })
                .catch( response => {
                    console.warn("error creando cliente");
                    this.errMsgs=response.data;
                })
        }
    }
    borra(id) {
        if (angular.isNumber(id)) {
            this.clientesDAO.borra(id)
                .then(() => {
                        console.log("cliente borrado");
                        this.$location.path("/clientes");
                })
                .catch( (response) => {
                    console.log("error borrando cliente");
                    this.errMsgs=response.data;
                });
        }
    }

}
//Dependency declaration
ClienteFormController.$inject=['clientesDAO','$location'];

/**Permite visualizar y editar los datos de un cliente
 @notes use <cliente-form cliente="objCliente"/>
 */
export const clienteFormComponent = {
    bindings: {
        cliente: '<', //Component attribute (single binding)
    },
    controller: ClienteFormController,
    templateUrl: 'js/clientes/cliente-form.template.html'
};
