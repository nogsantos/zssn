import { Http } from './http';
import { AppException } from './app-exception';
import { json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpRequestStatus } from './http-request-status';
/**
 * @description
 *  Resource central factory 
 * @namespace 
 *  System
 * 
 * @author Fabricio Nogueira
 */
export class ResourceFactory {    
    /**
     * Post or Patch
     *
     * @param String resource The resource to send data
     * @param number | String id If, de id will patch
     * @param Object body what will be persisted
     * @return Promise * 
     */
    send(resource: string, id?: number | String, body?: Object, id_before_resource?:boolean): Promise<any> {
        const http = new Http();
        const addPromise = http.fetch(`${id && id_before_resource ?`people/${id}/` : ''}${resource}${id && !id_before_resource ? `/${id}.json` : '.json'}`, {
            method: id && !id_before_resource ? 'put' : 'post',
            body: json(body)
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(response => {
                new EventAggregator().subscribe(HttpRequestStatus, done => {});
                return response;
            })
            .catch(error => {
                new AppException(error).toServiceRespond();
                return;
            });
        return Promise.resolve(addPromise);
    }
    /**
     * Query     
     * 
     * @param String resource The resource to query
     * @param String id If, de id to query
     * @return Promise 
     */
    query(resource: string, id?: string): Promise<any> {
        const http = new Http();
        const queryPromise = http.fetch(`${resource}${id ? `/${id}.json` : ''}`)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(response => {
                return response;
            })
            .catch(error => {
                new AppException(error).toServiceRespond();
                return;
            });
        return Promise.resolve(queryPromise);
    }
    /**
     * Requisition status return
     */
    private checkStatus(response) {
        new EventAggregator().publish(new HttpRequestStatus(response.status));
        return response;
    }
    /**
     * fetch header
     */
    private parseJSON(response) {
        return response.json();
    }
}
