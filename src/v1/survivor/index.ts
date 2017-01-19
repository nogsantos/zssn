import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../resources/system/resource-factory';
/**
 * Survivors
 */
@autoinject()
export class Survivor {
    private title: string;
    private survivors: Object;    
    /**
     * 
     */
    constructor(
        private i18n: I18N,
        private resource: ResourceFactory
    ) { }
    /**
     * 
     */
    created(): void {
        this.title = this.i18n.tr(`survivors_list`);
        this.fetchAll();
    }
    /**
     * 
     */
    fetchAll(): void {
        this.resource.query('people.json', null, null).then(response => {
            if (response.length > 0) {
                this.survivors = response;
            } else {

            }
        }).catch(error => {
            console.log(error);            
        });
    }    
}
