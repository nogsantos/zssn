import { I18N } from 'aurelia-i18n';
import { MdToastService } from 'aurelia-materialize-bridge';
/**
 * App request Exceptions
 * 
 * @author Fabricio Nogueira
 */
export class AppException {
    private status_code?: number;
    private msg?: string;
    private i18n: I18N;
    private toast: MdToastService;
    /**
     * CDI
     */
    constructor(msg?: string, status_code?: number) {
        this.i18n = new I18N();
        this.toast = new MdToastService();
        this.msg = msg;
        this.status_code = status_code;
    }
    /**
     * Fetch
     */
    toFailedToFetch(): string {
        return `${this.i18n.tr('erro.fetch')} ${this.msg || ''}`;
    }
    /**
     * Service
     */
    toServiceRespond(): string {
        return `${this.i18n.tr('error.service')}: ${this.msg}`;
    }
    /**
     * Respond
     */
    response() {
        this.toast.show(this.i18n.tr(`error.respond`), 9000);       
    }
}
