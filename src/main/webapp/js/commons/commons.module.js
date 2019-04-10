//Module with layout components

import {clubHeaderComponent} from "./club-header.component.js";
import {clubFooterComponent} from "./club-footer.component.js";
import {erroresValidacionComponent} from "./errores-validacion.component.js";

// Declare app level module which depends on filters, and services
export const CommonsModule = angular
    .module('commons.module', [])
    .component('clubHeader', clubHeaderComponent)
    .component('clubFooter', clubFooterComponent)
    .component('erroresValidacion', erroresValidacionComponent)    
    .name;
    