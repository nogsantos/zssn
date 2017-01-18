import { Aurelia, autoinject } from 'aurelia-framework';
import { NavigationInstruction, RouterConfiguration, AppRouter } from "aurelia-router";
import { I18N } from 'aurelia-i18n';
/**
 * 
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
        config.title = this.i18n.tr("hello");
        config.map({
            route: ['', 'home', 'index'],
            name: 'index',
            moduleId: './v1/index/index',
            href: "#/",
            title: "Wellcome",
            icon: 'home',
            id: "_home"
        });
        config.map({
            route: ['people'],
            name: 'people',
            moduleId: './v1/people/index',
            title: "People",
            href: "#/people",
            icon: 'ic_directions_run',
            id: "_people"
        });
        config.map({
            route: ['report'],
            name: 'report',
            moduleId: './v1/report/index',
            title: "Report",
            href: "#/report",
            icon: 'ic_directions_run',
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
