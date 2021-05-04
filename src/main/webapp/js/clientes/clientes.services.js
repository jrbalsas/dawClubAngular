/* Angular Service samples: DAO implementations */

/** DAO implementation using Angular service $http */
export class ClientesDAO$http {
    
    //static $inject=['$http'];   //Angular dependencies
    
    constructor($http, webServiceUrl) {
        this.$http = $http;

        this.srvUrl = webServiceUrl;
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

} //ClienteDAO$http
ClientesDAO$http.$inject=['$http','webServiceUrl'];   //Angular dependencies

/**DAO over simple array for testing purposes
 Returns promises to attach user callbacks
 Used for compatibility with DAO remote implementation methods*/

export class ClientesDAOList {

    //static $inject = ['$q', '$timeout'];

    constructor($q, $timeout) {
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
        //Angular $q its similar to ES6 Promise object, but it helps to 
        //sync view when model-view is updated after async operation completes
        let promise=this.$q((resolve,reject) => {
            this.$timeout(function () {
                resolve(data);
            }, 100);            
        });
        return promise;
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

                if (c.id == id) {

                    angular.copy(c, cliente);
                    return true;
                };
                return false;
            });
        };
        return this.asyncOp(cliente);
    }
    borra(id) {
        if (id > 0) {
            //Borrar cliente
            this.clientes.some(function (c, key, clientes) {
                if (c.id == id) {
                    clientes.splice(key, 1);
                    return true;
                }
                return false;
            });
        };
        return this.asyncOp({});
    }
    guarda(cliente) {
        if (cliente.id > 0) {
            //Modify cliente data
            this.clientes.some(function (c, key) {
                if (c.id == cliente.id) {
                    angular.copy(cliente, c);
                    return true;
                };
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
} //ClientesDAOList
ClientesDAOList.$inject = ['$q', '$timeout'];