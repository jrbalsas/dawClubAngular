'use strict';

// Declare app level module which depends on filters, and services
angular.module('clientesApp', [
  'ngRoute',
  'clientesApp.services',
  'clientesApp.directives',
  'clientesApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lista', {templateUrl: 'partials/clientes/lista.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl' });
  $routeProvider.when('/visualiza/:idCliente', {templateUrl: 'partials/clientes/visualiza.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl'});
  $routeProvider.when('/borra/:idCliente', {templateUrl: 'partials/clientes/lista.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl'});
  $routeProvider.when('/edita/:idCliente', {templateUrl: 'partials/clientes/edita.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl'});
  $routeProvider.when('/crea', {templateUrl: 'partials/clientes/edita.html', controller: 'ClientesRouteCtrl', controllerAs: '$ctrl'});
  $routeProvider.otherwise({redirectTo: '/lista'});
}]);
