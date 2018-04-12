'use strict';

/* Controllers */
class ClientesCtrl { 

    constructor (clientesDAO) {
        this.clientesDAO=clientesDAO;
        //view model
        this.editMode=false;
        this.cliente={};
        this.clientes=[];
        this.errMsgs=[];
        //Init controller
        this.updateClientes();
        this.reset();
    }
    //view actions
    crea () {
        this.reset();
        this.editMode=true;
    }
    edita (id) {
        this.reset();
        this.clientesDAO.busca(id).then( cliente => {
                this.cliente=cliente;
                this.editMode=true;
        }).catch(this.errorDAO);
    }      
    borra (id) {
        if (angular.isNumber(id)) {
            this.clientesDAO.borra(id)
                  .then( ()=>this.updateClientes() )
                  .catch(response => this.errorDAO(response));

        };
    }
    guarda (cliente) {
        if (cliente.id>0) {
          //Modify cliente data
          this.clientesDAO.guarda(cliente)
                  .then( ()=>this.updateClientes() )
                  .catch(response => this.errorDAO(response));
        } else {
          //New cliente
          cliente.id=0;
          this.clientesDAO.crea(cliente)
                  .then( ()=>this.updateClientes() )
                  .catch(response => this.errorDAO(response));
        };
    }
    reset () {
        this.cliente={};
        this.editMode=false;
        this.errMsgs=[];
    }
    //Util methods
    updateClientes () {
        this.clientesDAO.buscaTodos()
                .then( clientes => {
                    this.clientes=clientes;
                });
        this.reset();
    }
    errorDAO (response) {
        this.errMsgs= response.data; //JAX-RS BeanValidation errors
        console.log( "Error en servidor: " + response.status +" "+ response.statusText );
    }
          
  };
  
//ClientesCtrl.$inject = ['ClientesDAOREST'];

angular.module('clientesApp.controllers', [])
  .controller('ClientesCtrl', ['ClientesDAOREST', ClientesCtrl ] )
  .controller('ClientesRouteCtrl', ['$scope','$routeParams','$location','ClientesDAOREST',function($scope,$routeParams,$location,clientesDAO) {
    //ClientesCtrl routing action version

    //used to access controller when some method is used as callback on other object
    var self=this;
    
    //view model 
    this.cliente={};
    this.clientes=[];
    this.errMsgs=[];

    //edita.html view button actions
    this.borra=function (id) {
        if (angular.isNumber(id)) {
            clientesDAO.borra(id).then(this.updateClientes).catch(this.errorDAO);
        };
    };
    this.guarda=function (cliente) {
      if (cliente.id>0) {
        //Modify cliente data
        clientesDAO.guarda(cliente).then(this.updateClientes).catch(this.errorDAO);
      } else {
        //New cliente
        cliente.id=0;
        clientesDAO.crea(cliente).then(this.updateClientes).catch(this.errorDAO);
      }
    };

    this.updateClientes= function () {
        $location.path("/lista");  //Post-Redirect-Get
    };

    this.errorDAO= function (response) {
        self.errMsgs= response.data; //JAX-RS BeanValidation errors
        console.log( "Error en servidor: " + response.status +" "+ response.statusText );
    };

    //Process path actions
    var idCliente=($routeParams.idCliente?parseInt($routeParams.idCliente):0); 
    var action="";    
    if ($location.path().length) {
        //extract action name from path
        action=$location.path().match(/^\/?(\w+)/)[1];
    }

    switch(action) {
        case "visualiza":
        case "edita":
            clientesDAO.busca(idCliente).then(function (cliente) {           
                self.cliente=cliente;
            }).catch(this.errorDAO);
            break;
        case "crea":
            this.cliente={};
            break;
        case "borra":
            clientesDAO.borra(idCliente).then(this.updateClientes
                                   ).catch(this.errorDAO);
            break;
        default :
            //default: action=="lista"
            clientesDAO.buscaTodos().then(function (clientes) {
                self.clientes=clientes;
            }).catch(this.errorDAO);                       
    };

 }]);  //ClientesRouteCtrl

