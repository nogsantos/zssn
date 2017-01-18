import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import "aurelia-polyfills";
import 'whatwg-fetch';
import * as Backend from 'i18next-xhr-backend';
//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
(<any>Promise).config({
    warnings: {
        wForgottenReturn: false
    }
});
export function configure(aurelia: Aurelia) {
    /**
     * 
     */
    aurelia.use
        .standardConfiguration()
        .feature('resources')        
        .plugin('aurelia-materialize-bridge', b => b.useAll()) // materialize
        .plugin('aurelia-i18n', (instance) => { // i18next
            instance.i18next.use(Backend);
            return instance.setup({
                backend: {
                    loadPath: './locales/{{lng}}/{{ns}}.json',
                },
                lng: 'pt_br',
                attributes: ['t', 'i18n'],
                fallbackLng: 'pt_br',
                debug: false
            });
        });
    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
}
