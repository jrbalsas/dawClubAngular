'use strict';

// Declare app level module which depends on filters, and services
angular.module('clientesApp', [
  'ngRoute',
  'clientesApp.services',
  'clientesApp.components',
  'clientesApp.controllers'
]).
config(['$routeProvider', $routeProvider => {
  $routeProvider
    .when('/lista', {templateUrl: 'partials/clientes/lista.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl' })
    .when('/visualiza/:idCliente', {templateUrl: 'partials/clientes/visualiza.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl'})
    .when('/borra/:idCliente', {templateUrl: 'partials/clientes/lista.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl'})
    .when('/edita/:idCliente', {templateUrl: 'partials/clientes/edita.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl'})
    .when('/crea', {templateUrl: 'partials/clientes/edita.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl'})
    .otherwise({redirectTo: '/lista'});
}]);
