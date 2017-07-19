/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';

import { MetaService } from './core/services/meta-service/meta.service';

import { RouterLinkStubDirective, RouterOutletStubComponent } from '../myTesting/router-stubs';

// TODO: add custom testing matchers (also for footer.spec.ts)

describe('AppComponent', () => {
    beforeEach( async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                FooterComponent, NavbarComponent, SidenavComponent,
                RouterLinkStubDirective, RouterOutletStubComponent
                /*
                FooterStubComponent, NavbarStubComponent, SidenavStubComponent
                */
            ],
            providers: [MetaService]
        });
        TestBed.compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
