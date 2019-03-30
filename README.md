# dawClub using AngujarJS

Sample Maven Netbeans project with classic CRUD Web App using AngularJS/JAX-RS

## Features:

- ES6 syntax for controller and DAO classes
- SPA implementation
- SPA implementation using Routing & Partials
- Sample Angular Custom components
- Angular DAO Service implementation using internal array (testing purpose)
- Angular DAO Service implementation using $http to access JAX-RS webservice
- JAX-RS webservice for serving JSON contents

## Usage:
 - Select Clientes DAO implementation in JAX-RS Service: ClientDAOREST or ClientesDAOList
 - Select Clientes DAO implementation in AngularJS controller (controllers.js): ClientesDAO$http or ClientesDAOList
 - Package and deploy in a JEE8 Application Server, e.g. Payara/Glassfish
