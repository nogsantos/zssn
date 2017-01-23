import { autoinject, bindable } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../resources/system/resource-factory';
import env from '../../resources/system/env';
import * as $ from 'jquery';
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
    private ref_survivors_list;
    @bindable private ref_search_by_name;
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
        if (navigationInstruction.id === "_survivor") {
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
     * Possible to search for a survivor by name
     */
    bind() {
        $(this.ref_search_by_name).keyup(event => {
            let val = '^(?=.*\\b' + $.trim(this.ref_search_by_name.value).split(/\s+/).join('\\b)(?=.*\\b') + ').*$';
            let reg = RegExp(val, 'i');
            let text;
            $(this.ref_survivors_list).show().filter(() => {
                text = $(this.ref_survivors_list).text().replace(/\s+/g, ' ');
                return !reg.test(text);
            }).hide();
            // let search = $.grep(this.survivors, field => {
            //     return field.name == this.ref_search_by_name.value;
            // });
            // console.log(search);
            // if (search.lenght > 0) {
            //     $(this.ref_survivors_list).fadeOut();
            // }
        });
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
