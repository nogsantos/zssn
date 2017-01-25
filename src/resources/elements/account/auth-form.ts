import { autoinject, customElement } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';
import { ResourceFactory } from '../../system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { I18N } from 'aurelia-i18n';
import { Storage } from '../../system/storage';
import { NavigationTop } from '../../../template/navigation/navigation-top';
import env from '../../system/env';
import * as $ from 'jquery';
/**
 * @description
 *  Map as element
 * @namespace 
 *  Elements
 * 
 * @author Fabricio Nogueira
 */
@customElement('auth-form')
@autoinject()
export class AuthForm {
    private loading: boolean;
    private survivor = {
        id: "d778cc9d-650b-4a71-b371-48a44bb69f9a"
    };
    /**
     * CDI
     */
    constructor(
        private subrouter: Router,
        private resource: ResourceFactory,
        private toast: MdToastService,
        private i18n: I18N,
        private storage: Storage,
        private navigation: NavigationTop,
        private event: EventAggregator
    ) { }
    /**
     * 
     */
    attached() {
        this.loading = false;
    }
    /**
     * Check credentials 
     */
    auth() {
        this.loading = true;
        if (this.survivor.id !== null) {
            this.resource.query(env.api.resources.survivor, this.survivor.id)
                .then(response => {
                    if (!response.status) {                        
                        /*
                         * The service, don`t send the information about infected when fetch a single survivor
                         */
                        // if (response['infected?']) { 
                            this.storage.set("survivor", JSON.stringify(response));
                            this.cancel();
                            this.toast.show('Autenticado com sucesso', env.conf.messages.success.duration);
                            this.event.publish('survivor_credentials', response); // send the survivor credentials to subscribers
                            // this.subrouter.navigate("#/survivor/profile");
                        // } else {
                        //     this.toast.show('Lamentamos, mas usuários infectados não possuem mais acesso ao sistema', env.conf.messages.warn.duration);
                        // }
                    }
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                });
        } else {
            this.loading = false;
            this.toast.show('Identificador do usuário inválido', env.conf.messages.warn.duration);
        }
    }
    /**
     * Cancel
     */
    cancel() {
        $('#auth-form').slideToggle();
    }
}
