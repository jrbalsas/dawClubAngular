# dawClub using AngujarJS

Sample Maven Netbeans project with classic CRUD Web App using AngularJS/JAX-RS

## Features:

- Component based design
- SPA implementation using routing and components
- ES6 syntax for controller and DAO classes
- Content organization using ES6 modules
- Angular DAO Service implementation using internal array (testing purpose)
- Angular DAO Service implementation using $http to access JAX-RS webservice
- JAX-RS webservice for serving JSON contents

## Usage:
 - Select Clientes DAO implementation in JAX-RS Service: ClientDAOREST or ClientesDAOList
 - Select Clientes DAO implementation in AngularJS module (clintes.module.js): ClientesDAO$http or ClientesDAOList
 - Package and deploy in a JEE8 Application Server, e.g. Payara/Glassfish
