import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        './elements/map',
        './elements/three-dots',
        './attributes/input-enter-keypress',
    ]);
}
