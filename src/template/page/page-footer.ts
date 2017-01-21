import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * @description
 *  Footer 
 * @namespace 
 *  Template/Page
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class PageFooter {
    private author: string;
    private web_address: string;
    /**     
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     */
    created(): void {
        this.author = this.i18n.tr('author');
        this.web_address = this.i18n.tr('web_address');
    }
}
