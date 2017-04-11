'use strict';

/* Controllers */

angular.module('clientesApp.controllers', [])
  .controller('ClientesCtrl', ['ClientesDAOJson',function(ClientesDAO) {

    //DAO implementations available: ClientesDAOList, ClientesDAOJson
    //Change ClientesDAOList with ClientesDAOJson to access JSON Servlet (see implementation on services.js)

    //Controller version using promises from DAO (Angular way)
    //used to access controller when some method is used as callback on other object
    var self=this;
    
    //view model (new way (using controller attributes for view-model)
    this.editMode=false;
    this.cliente={};
    this.clientes=[];
    this.errMsg="";

    //view actions
    this.crea=function () {
        this.reset();
        this.editMode=true;
    };
    this.edita=function (id) {
        this.reset();
        ClientesDAO.busca(id).then(function(cliente) {
                self.cliente=cliente;
                self.editMode=true;
        });
    };      
    this.borra=function (id) {
        if (angular.isNumber(id)) {
            ClientesDAO.borra(id).then(this.updateClientes);
        };
        //this.reset();
    };
    this.guarda=function (cliente) {
        if (cliente.id>0) {
          //Modify cliente data
          ClientesDAO.guarda(cliente).then(this.updateClientes).catch(this.errorDAO);
        } else {
          //New cliente
          cliente.id=0;
          ClientesDAO.crea(cliente).then(this.updateClientes).catch(this.errorDAO);                            
        };
      //  this.reset();
    };
    this.reset=function () {
        this.cliente={};
        this.editMode=false;
        this.errMsg="";
    };
    this.updateClientes= function () {
        ClientesDAO.buscaTodos().then(function (clientes) {
        //"this" can not be a controller when this method is executed as callback. i.e. in DAO
            self.clientes=clientes;
        });
        self.reset();
    };
    this.errorDAO= function (response) {
        self.errMsg= "La operación no ha podido completarse";
        console.log( "Error en servidor: " + response.status +" "+ response.statusText );
    };
    //Init controller
    this.updateClientes();
    this.reset();
          
  }])  
  .controller('ClientesRouteCtrl', ['$scope','$routeParams','$location','ClientesDAOJson',function($scope,$routeParams,$location,ClientesDAO) {
    //ClientesCtrl routing action version

    //used to access controller when some method is used as callback on other object
    var self=this;
    
    //view model 
    this.cliente={};
    this.clientes=[];
    this.errMsg="";

    //edita.html view button actions
    this.borra=function (id) {
        if (angular.isNumber(id)) {
            ClientesDAO.borra(id).then(this.updateClientes).catch(this.errorDAO);
        };
    };
    this.guarda=function (cliente) {
      if (cliente.id>0) {
        //Modify cliente data
        ClientesDAO.guarda(cliente).then(this.updateClientes).catch(this.errorDAO);
      } else {
        //New cliente
        cliente.id=0;
        ClientesDAO.crea(cliente).then(this.updateClientes).catch(this.errorDAO);
      }
    };

    this.updateClientes= function () {
        $location.path("/lista");  //Post-Redirect-Get
    };

    this.errorDAO= function (response) {
        self.errMsg= "La operación no ha podido completarse";
        console.log( "Error en servidor: " + response.status +" "+ response.statusText );
    };

    //Process path actions
    var idCliente=($routeParams.idCliente?parseInt($routeParams.idCliente):0); 
    var action="";    
    if ($location.path().length) {
        //extract action name from path
        action=$location.path().match(/^\/?(\w+)/)[1];
    }
    console.log($location.path());
    switch(action) {
        case "visualiza":
        case "edita":
            ClientesDAO.busca(idCliente).then(function (cliente) {           
                self.cliente=cliente;
                });
            break;
        case "crea":
            this.cliente={};
            break;
        case "borra":
            ClientesDAO.borra(idCliente).then(this.updateClientes
                                   ).catch(this.errorDAO);
            break;
        default :
            //default: action=="lista"
            ClientesDAO.buscaTodos().then(function (clientes) {
                self.clientes=clientes;
            });                       
    };

 }]);  //ClientesRouteCtrl
