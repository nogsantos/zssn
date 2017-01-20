import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * Report ?
 * 
 * @author Fabricio Nogueira  
 */
@autoinject()
export class Report {
    private title: string;
    /**
     * 
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     * 
     */
    created() {
        this.title = this.i18n.tr(`survivors_list`);
    }
}
