import { Aurelia, autoinject } from 'aurelia-framework';
import { NavigationInstruction, RouterConfiguration, AppRouter } from "aurelia-router";
import { I18N } from 'aurelia-i18n';
/**
 * Main rote
 */
@autoinject()
export class App {
    private router: AppRouter;
    /**
     *      
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     * Rotas
     */
    configureRouter(config: RouterConfiguration, router: AppRouter): void {
        config.title = this.i18n.tr("app_name");
        config.map({
            route: ['', 'home', 'index'],
            name: 'index',
            moduleId: './v1/index/index',
            href: "#/",
            title: this.i18n.tr('home'),
            icon: 'home',
            nav: false,
            id: "_home"
        });
        config.map({
            route: ['survivor'],
            name: 'survivor',
            moduleId: './v1/survivor/index',
            title: this.i18n.tr('survivors_list'),
            href: "#/survivor",
            icon: 'accessibility',
            nav: true,
            id: "_survivor"
        });
        config.map({
            route: ['report'],
            name: 'report',
            moduleId: './v1/report/index',
            title: this.i18n.tr('report'),
            href: "#/report",
            icon: 'content_paste',
            nav: true,
            id: "_report"
        });
        /*
         * Tratando as rotas desconhecidas
         */
        let navStrat = (instruction: NavigationInstruction) => {
            if (instruction.config === null) {
                return '404';
            }
            instruction.config.moduleId = instruction.fragment;
            instruction.config.href = instruction.fragment;
        };
        config.mapUnknownRoutes(navStrat);
        this.router = router;
    }

}
