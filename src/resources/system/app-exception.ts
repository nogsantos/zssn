import { I18N } from 'aurelia-i18n';
import { MdToastService } from 'aurelia-materialize-bridge';
/**
 * Centralizar as exceções do app.
 * 
 * @author Fabricio Nogueira
 */
export class AppException {
    private status_code?: number;
    private msg?: string;
    private i18n: I18N;
    private toast: MdToastService;
    /**
     * 
     */
    constructor(msg?: string, status_code?: number) {
        this.i18n = new I18N();
        this.toast = new MdToastService();
        this.msg = msg;
        this.status_code = status_code;
    }
    /**
     * Falha na sincronização com o serviço
     */
    toFailedToFetch(): string {
        return `${this.i18n.tr('global.exception.fetch')} ${this.msg || ''}`;
    }
    /**
     * Resposta do serviço
     */
    toServiceRespond(): string {
        return `${this.i18n.tr('global.exception.service_message', { response: `$t(${this.msg.toString().replace("Error: ", "")})` })}`;
    }
    /**
     * Retorna a menssagem de erro para o usuário de acordo com a resposta do serviço.
     */
    response() {
        this.toast.show(this.i18n.tr(`service.error.code.${this.status_code}`), 6000);       
    }
}
