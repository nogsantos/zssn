import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * Report (?)
 * @deprecated
 * 
 * @author Fabricio Nogueira  
 */
@autoinject()
export class Report {
    private title: string;
    /**
     * CDI
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     * View created
     */
    created() {
        this.title = this.i18n.tr(`survivors_list`);
    }
}
