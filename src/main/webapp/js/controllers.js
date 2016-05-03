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
        ClientesDAO.busca(id).then(function(cliente) {
                self.cliente=cliente;
                self.editMode=true;
        });
    };      
    this.borra=function (id) {
        if (angular.isNumber(id)) {
            ClientesDAO.borra(id).then(this.updateClientes);
        };
        this.reset();
    };
    this.guarda=function (cliente) {
        if (cliente.id>0) {
          //Modify cliente data
          ClientesDAO.guarda(cliente).then(this.updateClientes);
      } else {
          //New cliente
          cliente.id=0;
          ClientesDAO.crea(cliente).then(this.updateClientes);
      }
        this.reset();
    };
    this.reset=function () {
        this.cliente={};
        this.editMode=false;
    };
    this.updateClientes= function () {
        ClientesDAO.buscaTodos().then(function (clientes) {
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

    //used to access controller when some method is used as callback on other object
    var self=this;
    
    //view model 
    this.cliente={};
    this.clientes=[];

    //edita.html view button actions
    this.borra=function (id) {
        if (angular.isNumber(id)) {
            ClientesDAO.borra(id).then(function (json) {
               self.updateClientes(); 
            });
        };
    };
    this.guarda=function (cliente) {
        if (cliente.id>0) {
          //Modify cliente data
          ClientesDAO.guarda(cliente).then(function (json) {
              self.updateClientes();
          });
      } else {
          //New cliente
          cliente.id=0;
          ClientesDAO.crea(cliente).then(function () {
              self.updateClientes();
          });
      }
    };

    this.updateClientes= function () {
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
        ClientesDAO.busca(idCliente).then(function (cliente) {
            self.cliente=cliente;
        });        
    }else if (action=="crea") {
        this.cliente={};
    }else if (action=="borra") {
        ClientesDAO.borra(idCliente).then(function(json) { 
            self.updateClientes();
        });
    }else {
        //default: action=="lista"
        ClientesDAO.buscaTodos().then(function (clientes) {
            self.clientes=clientes;
        });       
    };                      
                                 
  }]);
