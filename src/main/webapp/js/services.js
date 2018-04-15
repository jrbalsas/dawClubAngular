'use strict';

/* Services */

class ClientesDAOREST {
    constructor($http) {
        //DAO REST implementation which return promises (Angular way)
        this.$http = $http;

        this.srvUrl = "webservice/clientes";
    }
    buscaTodos() {
        return this.$http.get(this.srvUrl).then(response => response.data);
    }

    busca(id) {
        return this.$http.get(this.srvUrl + "/" + id).then(response => response.data);
    }

    borra(id) {
        return this.$http.delete(this.srvUrl + "/" + id);
    }

    guarda(cliente) {
        return this.$http.put(this.srvUrl + "/" + cliente.id, cliente)
                .then(response => response.data);
    }

    crea(cliente) {
        return this.$http.post(this.srvUrl, cliente).then(response => response.data);
    }

}

class ClientesDAOList {
    constructor($q, $timeout) {
        //DAO over simple array for testing purposes
        //modern DAO returning promises to attach user callbacks
        //Used for compatibility with DAO remote implementation methods
        this.$q=$q;
        this.$timeout=$timeout;

        this.idClientes = 1;
        this.clientes = [
            {id: this.idClientes++,
                nombre: 'María González',
                dni: '12345678-A',
                socio: true},
            {id: this.idClientes++,
                nombre: 'Pedro Pérez',
                dni: '87654321B',
                socio: true},
            {id: this.idClientes++,
                nombre: 'Sergio Fuentes',
                dni: '11223344',
                socio: false}
        ];
    }
    //Simulate an async operation which returns data with some delay
    //i.e $http()
    asyncOp(data) {
        let deferred = this.$q.defer();  //Create promise
        //create promise success method as in $http
//            deferred.promise.success= function (usrCallBack) {
//                deferred.promise.then(function(data){
//                    usrCallBack(data);
//                },
//                null);
//            };
        this.$timeout(function () {
            deferred.resolve(data);
        }, 100);
        return deferred.promise;
    }
    //public methods
    buscaTodos() {
        return this.asyncOp(this.clientes);
    }
    busca(id) {
        var cliente = {};
        if (id > 0) {
            //Look for cliente
            this.clientes.some(function (c, key) {
                if (c.id === id) {
                    angular.copy(c, cliente);
                    return true;
                }
                ;
                return false;
            });
        }
        ;
        return this.asyncOp(cliente);
    }
    borra(id) {
        if (id > 0) {
            //Borrar cliente
            this.clientes.some(function (c, key, clientes) {
                if (c.id === id) {
                    clientes.splice(key, 1);
                    return true;
                }
                return false;
            });
        }
        ;
        return this.asyncOp({});
    }
    guarda(cliente) {
        if (cliente.id > 0) {
            //Modify cliente data
            this.clientes.some(function (c, key) {
                if (c.id === cliente.id) {
                    angular.copy(cliente, c);
                    return true;
                }
                ;
                return false;
            });
        }
        return this.asyncOp({});
    }
    crea(cliente) {
        //New cliente
        cliente.id = this.idClientes++;
        this.clientes.push(cliente);
        return this.asyncOp(cliente);
    }
}

angular.module('clientesApp.services', [])
        .value('version', '0.1')
        .service('ClientesDAOList', ['$q', '$timeout', ClientesDAOList])
        .service('ClientesDAOREST', ['$http', ClientesDAOREST]);
