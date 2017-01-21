import { HttpClient } from 'aurelia-fetch-client';
import { LogManager } from 'aurelia-framework';
import env from './env';
/**
 * Configuração Fetch client, centralizador para requisições ao serviço.  
 * 
 * @author Fabricio Nogueira 
 */
export class Http extends HttpClient {
    /**
     */
    constructor() {
        super();        
        let log = LogManager.getLogger('HttpClient');
        this.configure(config => {
            config
                .withBaseUrl(env.api.address)
                .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .withInterceptor({
                    request(request) {                        
                        log.debug(`Request: ${request.method} ${request.url}`);
                        return request;
                    },
                    response(response, request) {
                        log.debug(`Response: ${response.status} ${response.url}`);
                        return response;
                    }
                });
        });
    }
}
