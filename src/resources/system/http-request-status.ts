import { I18N } from 'aurelia-i18n';
import { MdToastService } from 'aurelia-materialize-bridge';
import env from '../../resources/system/env';
/**
 * @description
 *  Request status messages
 * @namespace 
 *  System
 * 
 * @author Fabricio Nogueira
 */
export class HttpRequestStatus {
    private status_code: number;
    private i18n: I18N;
    private toast: MdToastService;
    /**
     * CDI
     */
    constructor(status_code) {
        this.status_code = status_code;
        this.i18n = new I18N();
        this.toast = new MdToastService();
        this.action();
    }
    /**
     * What will do
     */
    action() {
        if (this.between(this.status_code, 100, 122)) {
            this.info();
        } else if (this.between(this.status_code, 200, 207)) {
            this.success();
        } else if (this.between(this.status_code, 300, 307)) {
            this.redirect();
        } else if (this.between(this.status_code, 400, 499)) {
            this.clientError();
        } else if (this.between(this.status_code, 500, 500)) {
            this.serviceError();
        }
    }
    /**
     * Code: 1xx
     */
    info() {
        this.toast.show(`${this.i18n.tr('req_status.info.title')}: ${this.i18n.tr(`req_status.info.${this.status_code}`)}`, env.conf.messages.success.duration);
        // another things to do, if necessary
    }
    /**
     * Code: 2xx
     */
    success() {
        this.toast.show(`${this.i18n.tr('req_status.sucess.title')}: ${this.i18n.tr(`req_status.sucess.${this.status_code}`)}`, env.conf.messages.success.duration);
        // another things to do, if necessary
    }
    /**
     * Code: 3xx
     */
    redirect() {
        this.toast.show(`${this.i18n.tr('req_status.redirect.title')}: ${this.i18n.tr(`req_status.redirect.${this.status_code}`)}`, env.conf.messages.success.duration);
        // another things to do, if necessary
    }
    /**
     * Code: 4xx
     */
    clientError() {
        this.toast.show(`${this.i18n.tr('req_status.error.400.title')}: ${this.i18n.tr(`req_status.error.400.${this.status_code}`)}`, env.conf.messages.error.duration);
        // another things to do, if necessary
    }
    /**
     * Code: 5xx
     */
    serviceError() {
        this.toast.show(`${this.i18n.tr('req_status.error.500.title')}: ${this.i18n.tr(`req_status.error.500.${this.status_code}`)}`, env.conf.messages.error.duration);
        // another things to do, if necessary
    }
    /**
     * Check if number is in range
     */
    between(num: number, min: number, max: number): boolean {
        return num > min && num < max;
    }
}
