'use strict';

/* Directives */

angular.module('clientesApp.directives', [])
    .directive('cliente',[ function() {
            //Visualiza un resumen de los datos de un cliente
            //Uso: <cliente datos="objCliente"/>
            return {
                restrict: 'E',
                scope: {
                    c: '=datos'
                },
                template: '<p>{{c.nombre}} ({{c.dni}})</p>'
            };
        }
    ]);
