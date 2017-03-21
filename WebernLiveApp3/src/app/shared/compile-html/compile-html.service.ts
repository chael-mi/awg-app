/************************************************
 *
 *               CREDITS
 *
 * This code is inspired, adapted or taken from:
 *
 * [**P3X-NG2-COMPILE-HTML**](https://patrikx3.github.com/ng2-compile-html) Build v1.1.132-230 on 3/17/2017, 7:43:58 PM
 * [Corifeus](http://github.com/patrikx3/corifeus) by [Patrik Laszlo](http://patrikx3.tk)
 *
 *
 ************************************************/

import { Component, Compiler, NgModule, Injectable } from '@angular/core';

import { CompileHtmlModel } from './compile-html.model';

@Injectable()
export class CompileHtmlService  {

    constructor(
        private compiler: Compiler
    ) {}

    public compile(opts: CompileHtmlModel) {

        @Component({
            template: opts.template || ''
        })
        class TemplateComponent {
            ref = opts.ref;
        }
        @NgModule({
            imports: opts.imports,
            declarations: [
                TemplateComponent
            ]
        })
        class TemplateModule {}
        const compiled = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        const factory = compiled.componentFactories.find((comp) =>
            comp.componentType === TemplateComponent
        );
        opts.container.clear();
        opts.container.createComponent(factory);
    }
}
