import { Aurelia, autoinject, bindable } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { I18N } from 'aurelia-i18n';
/**
 * NavBar
 */
@autoinject()
export class NavigationTop {
    @bindable router;
    private app: Aurelia;
    private redirectRouter: Router;
    /*
     */
    constructor(private i18n: I18N) {
        console.log(this.router);
    }

}
