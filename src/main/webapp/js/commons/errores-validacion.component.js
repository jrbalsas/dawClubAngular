
/* Component definition sample */

/**Visualiza un listado de errores de validación
   @notes use <erroresValidacion msgs="array_errores"/>
 */
export const erroresValidacionComponent = {
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
