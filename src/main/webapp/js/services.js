'use strict';

/* Services */

angular.module('clientesApp.services', [])
    .value('version', '0.1')
    .factory('ObjUtil', function () {
        return {
            toParam: function (obj) {
                    //Transform an object {prop1:val1, prop2:val2,...}
                    //to a param string:  prop1=val1&prop2=val2...
                    var str = [];
                    for (var p in obj)
                        if (obj.hasOwnProperty(p)) {
                            str.push(p + "=" + obj[p]);
                        }
                    return str.join("&");
                }
        };
    })
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
                      if (c.id==id) {
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
                      if (c.id==id) {
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
                    if (c.id==cliente.id) {
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
            }            
    }])
    .service('ClientesDAOJson',['$http','$q','ObjUtil',function($http,$q,ObjUtil) {
        //DAO implementation which return promises (Angular way)
        var srvUrl="clientesjson";

        this.buscaTodos = function () {
                return $http.get(srvUrl);
        };
        this.busca = function (id) {
                return $http.get(srvUrl+"/busca",{params: {id:id}});
        };
        this.borra = function (id) {
                if (id>0) {
                  return $http.get(srvUrl+"/borra",{params: {id:id}});
                };
        };
        this.guarda = function (cliente) {
                if (cliente.id>0) {
                //Modify cliente data
                    return $http.post(srvUrl+"/guarda",cliente
                        ,{  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            transformRequest: ObjUtil.toParam
                        });
                }            
        };
        this.crea = function(cliente) {
                //New cliente
                return $http.post(srvUrl+"/crea", cliente
                    ,{  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest:ObjUtil.toParam
                     });
        };
    }]);

