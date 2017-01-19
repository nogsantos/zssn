import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * Index
 */
@autoinject()
export class Index {
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
        this.title = this.i18n.tr(`wellcome`);
    }
}
