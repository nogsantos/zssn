import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * @description
 *   About controller 
 * @namespace 
 *  V1/About
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class About {
    private title: string;
    private about_info: string;
    private author: string;
    private web_address: string;
    private technologies: string;
    /**
     * CDI
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     * View Created
     */
    created(): void {
        this.title = this.i18n.tr('about');
        this.about_info = this.i18n.tr('about_info');        
        this.author = this.i18n.tr('author');
        this.web_address = this.i18n.tr('web_address');
        this.technologies = this.i18n.tr('technologies');
    }
}
