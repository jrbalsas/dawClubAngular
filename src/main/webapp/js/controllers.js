'use strict';

/* Controllers */

angular.module('clientesApp.controllers', [])
  .controller('ClientesCtrl', ['ClientesDAOList',function(ClientesDAO) {

    //DAO implementations available: ClientesDAOList, ClientesDAOJson
    //Change ClientesDAOList with ClientesDAOJson to access JSON Servlet (see implementation on services.js)

    //Controller version using promises from DAO (Angular way)
    //used to access controller when some method is used as callback on other object
    var self=this;
    
    //view model (new way (using controller attributes for view-model)
    this.editMode=false;
    this.cliente={};
    this.clientes=[];

    //view actions
    this.crea=function () {
        this.reset();
        this.editMode=true;
    };
    this.edita=function (id) {
        ClientesDAO.busca(id).success(function(cliente) {
                self.cliente=cliente;
                self.editMode=true;
        });
    };      
    this.borra=function (id) {
        if (angular.isNumber(id)) {
            ClientesDAO.borra(id).success(this.updateClientes);
        };
        this.reset();
    };
    this.guarda=function (cliente) {
        if (cliente.id>0) {
          //Modify cliente data
          ClientesDAO.guarda(cliente).success(this.updateClientes);
      } else {
          //New cliente
          cliente.id=0;
          ClientesDAO.crea(cliente).success(this.updateClientes);
      }
        this.reset();
    };
    this.reset=function () {
        this.cliente={};
        this.editMode=false;
    };
    this.updateClientes= function () {
        ClientesDAO.buscaTodos().success(function (clientes) {
        //"this" can not be controller when this method is executed as callback. i.e. in DAO
            self.clientes=clientes;
        });
    };
    //Init controller
    this.updateClientes();
    this.reset();
          
  }])  
  .controller('ClientesRouteCtrl', ['$scope','$routeParams','$location','ClientesDAOList',function($scope,$routeParams,$location,ClientesDAO) {
    //ClientesCtrl routing action version

    //view model (traditional way (using $scope for view-model)
    $scope.cliente={};
    $scope.clientes=[];

    //edita.html view button actions
    $scope.borra=function (id) {
        if (angular.isNumber(id)) {
            ClientesDAO.borra(id).success(function (json) {
               $scope.updateClientes(); 
            });
        };
    };
    $scope.guarda=function (cliente) {
        if (cliente.id>0) {
          //Modify cliente data
          ClientesDAO.guarda(cliente).success(function (json) {
              $scope.updateClientes();
          });
      } else {
          //New cliente
          cliente.id=0;
          ClientesDAO.crea(cliente).success(function () {
              $scope.updateClientes();
          });
      }
    };

    $scope.updateClientes= function () {
        $location.path("/lista");  //Post-Redirect-Get
    };

    //Process path actions
    var idCliente=($routeParams.idCliente?parseInt($routeParams.idCliente):0); 
    var action="";    
    if ($location.path().length) {
        //extract action name from path
        action=$location.path().match(/^\/?(\w+)/)[1];
    }

    if (action=="visualiza" || action=="edita") {
        ClientesDAO.busca(idCliente).success(function (cliente) {
            $scope.cliente=cliente;
        });        
    }else if (action=="crea") {
        $scope.cliente={};
    }else if (action=="borra") {
        ClientesDAO.borra(idCliente).success(function(json) { 
            $scope.updateClientes();
        });
    }else {
        //default: action=="lista"
        ClientesDAO.buscaTodos().success(function (clientes) {
            $scope.clientes=clientes;
        });       
    };                      
                                 
  }]);
