import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * @description
 *   Error 404
 * @namespace 
 *  Core
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class Error404 {    
    /**
     * CDI
     */
    constructor(
        private i18n: I18N
    ) { }    
 }
