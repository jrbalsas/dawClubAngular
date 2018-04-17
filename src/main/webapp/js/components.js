'use strict';

/* Component definition sample */

/** Component controller */
class ClienteComponentController {
    constructor () {
        
    }
}

/**Visualiza un resumen de los datos de un cliente
   @notes use <cliente datos="objCliente"/>
 */
const clienteComponent = {
    bindings: {
        datos: '<' //Component attribute (single binding)
    },
    controller: ClienteComponentController,
    template: '<p>{{$ctrl.datos.nombre}} ({{$ctrl.datos.dni}})</p>'
};


/**Visualiza un listado de errores de validación
   @notes use <errores msgs="array_errores"/>
 */
const erroresComponent = {
    bindings: {
        msgs: '<' //Component attribute (single binding)
    },
    template: `
    <div data-ng-show="$ctrl.msgs.length > 0">
        <p class="text-danger" data-ng-repeat="err in $ctrl.msgs">
            {{err.message}}
        </p>
    </div>    
    `
};

//Angular components registration
angular.module('clientesApp.components', [])
    .component('cliente', clienteComponent)
    .component('errores', erroresComponent);
