'use strict';

/* Services */

angular.module('clientesApp.services', [])
    .value('version', '0.1')
    .service('ClientesDAOREST',['$http',function($http) {
        //DAO REST implementation which return promises (Angular way)
        var srvUrl="webservice/clientes";

        this.buscaTodos = function () {

            return $http.get(srvUrl).then( function (response) {
                    return response.data;
                   });
        };

        this.busca = function (id) {
                return $http.get(srvUrl+"/"+id).then (function (response) {
                    return response.data;
                });
        };
        
        this.borra = function (id) {
                  return $http.delete(srvUrl+"/"+id);
        };
        
        this.guarda = function (cliente) {
            return $http.put(srvUrl+"/"+cliente.id,cliente).then (function (response) {
                return response.data;
            });
        };

        this.crea = function (cliente) {
            return $http.post(srvUrl,cliente).then (function (response) {
                return response.data;
            });
        };

    }])
    .service('ClientesDAOList',['$q','$timeout',function($q,$timeout) {
        //DAO over simple array for testing purposes
        //modern DAO returning promises to attach user callbacks
        //Used for compatibility with DAO remote implementation methods
                    
        var idClientes=1;
        var clientes= [
            {id: idClientes++,
             nombre: 'María González',
             dni: '12345678-A',
             socio: true},
            {id: idClientes++,
             nombre: 'Pedro Pérez',
             dni: '87654321B',
             socio: true},
            {id: idClientes++,
             nombre: 'Sergio Fuentes',
             dni: '11223344',
             socio: false}     
        ];

        //Simulate an async operation which returns data with some delay
        //i.e $http()
        function asyncOp (data) {
            var deferred= $q.defer();  //Create promise
            //create promise success method as in $http
//            deferred.promise.success= function (usrCallBack) {
//                deferred.promise.then(function(data){
//                    usrCallBack(data);
//                },
//                null);
//            };
            $timeout(function() {
                deferred.resolve(data);
            }, 100);
            return deferred.promise;
        }
        //public methods
        this.buscaTodos= function () {                
                return asyncOp(clientes);
        };
        this.busca=function (id) {
                var cliente={};
                if (id>0) {
                  //Look for cliente
                  clientes.some(function(c,key) {
                      if (c.id===id) {
                          angular.copy(c,cliente);
                          return true;
                      };
                      return false;
                  });
              };
              return asyncOp(cliente);
        };
        this.borra=function (id) {
                if (id>0) {
                  //Borrar cliente
                  clientes.some(function(c,key) {
                      if (c.id===id) {
                          clientes.splice(key,1);
                          return true;
                      };
                      return false;
                  });
              };
              return asyncOp({});
        };
        this.guarda=function (cliente) {
              if (cliente.id>0) {
                //Modify cliente data
                clientes.some(function(c,key) {
                    if (c.id===cliente.id) {
                        angular.copy(cliente,c);
                        return true;
                    };
                    return false;
                });
              }
              return asyncOp({});
            };
        this.crea=function(cliente) {
                //New cliente
                cliente.id=idClientes++;
                clientes.push(cliente);
                return asyncOp(cliente);
            };         
    }]);
