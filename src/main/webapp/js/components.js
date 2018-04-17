'use strict';

/* Components */

class ClienteComponentController {
    constructor () {
        
    }
}

angular.module('clientesApp.components', [])
    .component('cliente', {
            //Visualiza un resumen de los datos de un cliente
            //Uso: <cliente datos="objCliente"/>
            bindings: {
                datos: '<'
            },
            controller: ClienteComponentController,
            template: '<p>{{$ctrl.datos.nombre}} ({{$ctrl.datos.dni}})</p>'
        });
