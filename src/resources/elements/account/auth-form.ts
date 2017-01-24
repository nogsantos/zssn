import { autoinject, customElement } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { ResourceFactory } from '../../system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { I18N } from 'aurelia-i18n';
import { Storage } from '../../system/storage';
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
        id: "04e2904d-6404-4133-9851-877edf2f1724"
    };
    /**
     * CDI
     */
    constructor(
        private subrouter: Router,
        private resource: ResourceFactory,
        private toast: MdToastService,
        private i18n: I18N,
        private storage: Storage
    ) {
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
                        this.storage.set("survivor", JSON.stringify(response));
                        this.cancel();
                        this.toast.show('Autenticado com sucesso', env.conf.messages.success.duration);
                        this.subrouter.navigate("#/survivor/profile");
                    }
                    this.loading = false;
                }).catch(error => {
                    console.log(error);
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
