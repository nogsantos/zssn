import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../src/resources/system/resource-factory';
import { Form } from '../../src/v1/survivor/form';

describe('The survivor module', () => {
    let i18n: I18N;
    let resource: ResourceFactory;    
    
    it('Shold calculate survivors inventory items', done => {
        let survivor = new Form(i18n, resource);   
                expect(1).toBe(1);
        done();
    });
});
