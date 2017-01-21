import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../resources/system/resource-factory';
/**
 * Survivors
 *
 * @author Fabricio Nogueira 
 */
@autoinject()
export class Survivor {
    private title: string;
    private survivors: Object;
    private is_loading: boolean;
    /**
     * Dependency injections
     */
    constructor(
        private i18n: I18N,
        private resource: ResourceFactory
    ) { }
    /**
     * The view also ben created
     */
    created(): void {
        this.title = this.i18n.tr(`survivor.list`);
        this.is_loading = true;
        this.fetchAll();
    }
    /**
     * Fetch all data
     */
    fetchAll(): void {
        this.resource.query('people.json').then(response => {
            if (response.length > 0) {
                this.survivors = response;
                this.is_loading = false;
            } else {

            }
        }).catch(error => {
            this.is_loading = false;
            console.log(error);
        });
    }
}
