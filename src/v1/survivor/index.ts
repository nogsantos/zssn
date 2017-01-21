import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../resources/system/resource-factory';
import env from '../../resources/system/env';
/**
 * @description
 *  Survivors Index
 * @namespace 
 *  V1/Survivor
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
     * When view-model is activeted
     */
    activate(params, navigationInstruction) {        
        if(navigationInstruction.id === "_survivor"){
            this.fetchAll();
        }        
    }
    /**
     * The view also ben created
     */
    created(): void {
        this.title = this.i18n.tr(`survivor.list`);
    }
    /**
     * Fetch all data when the user came to all 
     * or when called by a button
     */
    fetchAll(): void {
        this.is_loading = true;
        this.resource.query(env.api.resources.survivor).then(response => {
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
