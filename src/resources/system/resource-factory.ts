import { Http } from './http';
import { AppException } from './app-exception';
import { json } from 'aurelia-fetch-client';
/**
 * Classe central para comunicação com o serviço. 
 * 
 * @author Fabricio Nogueira
 */
export class ResourceFactory {
    public requestInProgress: boolean;
    /**
     * Atualiza ou persiste um dado.
     */
    add(resource: string, id?: number, body?: Object): Promise<any> {
        const http = new Http();
        this.requestInProgress = true;
        const addPromise = http.fetch(`${resource}${id ? `/${id}` : ''}`, {
            method: id ? 'put' : 'post',
            body: json(body)
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(response => {
                this.requestInProgress = false;
                return response;
            })
            .catch(error => {
                this.requestInProgress = false;
                new AppException(error).toServiceRespond();
                return;
            });
        return Promise.resolve(addPromise);
    }
    /**
     * Ação de deletar um item
     * 
     * @params number id
     * @return Promise
     */
    delete(resource: string, id: number | string): Promise<any> {
        const http = new Http();
        const deletePromise = http.fetch(`${resource}/${id}`, { method: 'delete' })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(res => {
                const response: any = res; // Resolvendo um problema com o typescript. Retornava que o objeto de resposta não possuia o método especificado.    
                if (response.data.length > 0) {
                    return response;
                }
                throw new Error(response.meta.error.message);
            })
            .catch(error => {
                new AppException(error).toServiceRespond();
                return;
            });
        return Promise.resolve(deletePromise);
    }
    /**
     * Consulta aos dados
     * 
     * @params string resource: Recurso do serviço que será utilizado
     * @params Object fieldToQuery: Objeto com os campos e valores 
     * que serão utilizados na consulta, ou apenas o id do item a ser consultado.
     * @params number offset: Paginação para a consulta.
     * @return Promise 
     */
    query(resource: string, fieldToQuery?: any, offset: number = 0, withIcontains?: boolean): Promise<any> {
        const http = new Http();
        let fetchQuery = (typeof fieldToQuery === "object") ? `?offset=${offset}&${this.convertToQuery(fieldToQuery, withIcontains) || ''}` : `/${fieldToQuery}`;
        this.requestInProgress = true;
        const queryPromise = http.fetch(`${resource}${fetchQuery}`)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(response => {
                this.requestInProgress = false;
                return response;
            })
            .catch(error => {
                this.requestInProgress = false;
                new AppException(error).toServiceRespond();
                return;
            });
        return Promise.resolve(queryPromise);
    }
    /**
     * Deve receber um tratamento adequado de acordo com o status da requisição.
     */
    private checkStatus(response) {
        if (response.status !== 200) {
            new AppException(null, response.status).response(); // enviando apenas o código para a excessão.
        }
        return response;
    }
    /**
     * fetch header
     */
    private parseJSON(response) {
        return response.json();
    }
    /**
     * Formata o objeto informado para consulta.
     * @params obj Object Objeto com os campos (as chaves) e valores a serem consultados
     * @withIcontains boolean Não informar ou setar como booleano para icontains
     * @return string  
     */
    private convertToQuery(obj: Object, withIcontains?: boolean): string {
        if (obj && Object.keys(obj).length > 0) {
            let contais = (typeof withIcontains === "undefined" || withIcontains === true) ? "__icontains=" : "=";
            let arr = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    arr.push(key + contais + obj[key]);
                }
            };
            return arr.join('&');
        } else {
            return '';
        }
    }
}
