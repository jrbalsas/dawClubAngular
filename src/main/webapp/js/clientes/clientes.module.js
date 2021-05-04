
import {clienteDetalleComponent} from "./cliente-detalle.component.js";
import {clienteFormComponent} from "./cliente-form.component.js";
import {clientesListComponent} from './clientes-list.component.js'
import {ClientesDAO$http, ClientesDAOList} from "./clientes.services.js";

// Declare clientes module and dependencies
export const ClientesModule = angular
    .module('clientes.module', [
    'ngRoute',
    'commons.module'
    ])
    .component('clienteForm', clienteFormComponent)
    .component('clienteDetalle', clienteDetalleComponent)
    .component('clientesList', clientesListComponent)
    //REST webservice URL (used in ClientesDAO$http)
    .value('webServiceUrl','webservice/clientes') 
// Select DAO implementation
    .service('clientesDAO',ClientesDAO$http)    
//    .service('clientesDAO',ClientesDAOList)    
// Route definitions
    .config( $routeProvider =>  {
      $routeProvider
          .when('/clientes', {template: '<clientes-list clientes="$resolve.clientes"/>', 
                  resolve: {
                      clientes: clientesDAO => clientesDAO.buscaTodos()
                  }
           })
          .when('/clientes/crea', {template: '<cliente-form cliente="$resolve.cliente"/>',
                  resolve: {
                      cliente: () =>  { return { id: 0 } }
                  }
           })
          .when('/clientes/edita/:idCliente', {template: '<cliente-form cliente="$resolve.cliente"/>',
                  resolve: {
                      cliente: (clientesDAO,$route) => clientesDAO.busca($route.current.params.idCliente)
                  }
           })
           .when('/clientes/:idCliente', {template: '<cliente-detalle cliente="$resolve.cliente"/>',
                  resolve: {
                      cliente: (clientesDAO,$route) => clientesDAO.busca($route.current.params.idCliente)
                  }
           })
          .otherwise({redirectTo: '/clientes'});
    })  
    .name;
    