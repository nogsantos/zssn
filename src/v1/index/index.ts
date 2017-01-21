import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * @description
 *  Index 
 * @namespace 
 *  V1/Index
 *  
 * @author Fabricio Nogueira
 */
@autoinject()
export class Index {
    private title: string;
    /**
     * CDI
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     * View Created
     */
    created() {
        this.title = this.i18n.tr(`wellcome`);
    }
}
