import { autoinject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { ResourceFactory } from '../../resources/system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { I18N } from 'aurelia-i18n';
import { Storage } from '../../resources/system/storage';
import env from '../../resources/system/env';
import * as $ from 'jquery';
/**
 * @description
 *   Survivor profile
 * @namespace 
 *  V1/survivor
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class Profile {
    private title: string;
    private about_info: string;
    private survivor: any;
    /**
     * CDI
     */
    constructor(
        private resource: ResourceFactory,
        private toast: MdToastService,
        private i18n: I18N,
        private storage: Storage,
        private subrouter: Router
    ) {
        if (!this.storage.get("survivor")) {
            this.subrouter.navigate("/");
        }
    }
    /**
     * Will load survivor attributes
     */
    created(){         
        this.survivor = JSON.parse(sessionStorage.getItem(env.conf.storage.name));        
    }
    /**
     * Will fill all survivor attributes
     */
    bind() {
        this.title = this.i18n.tr('survivor.welcome', { name: this.survivor.name });
        this.about_info = this.i18n.tr('about_info');
    }    
}
