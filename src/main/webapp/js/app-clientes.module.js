// Application Module

// Root component
import {appClientesComponent} from "./app-clientes.component.js";

// App modules

import {ClientesModule} from "./clientes/clientes.module.js";
import {CommonsModule} from "./commons/commons.module.js";

// Declare app level module and dependences
export const appClientesModule = angular
  .module('app.clientes', [
    ClientesModule,
    CommonsModule
  ])
  .component('appClientes',appClientesComponent)
  .name;
