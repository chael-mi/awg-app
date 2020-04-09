import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import Spy = jasmine.Spy;

import { cleanStylesFromDOM } from '@testing/clean-up-helper';
import { detectChangesOnPush } from '@testing/detect-changes-on-push-helper';
import { expectSpyCall, getAndExpectDebugElementByCss } from '@testing/expect-helper';

import { Logo } from '@awg-core/core-models';
import { LOGOSDATA } from '@awg-core/mock-data';

import { FooterLogoComponent } from './footer-logo.component';

describe('FooterLogoComponent (DONE)', () => {
    let component: FooterLogoComponent;
    let fixture: ComponentFixture<FooterLogoComponent>;
    let compDe: DebugElement;
    let compEl: any;

    let getLogoClassSpy: Spy;

    let expectedLogo: Logo;
    let expectedNonRightMainFooterLogo: Logo;
    let expectedNonMainFooterLogo: Logo;

    const cssClassFloatRight = 'float-right';
    const cssClassMarginY2 = 'my-2';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FooterLogoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterLogoComponent);
        component = fixture.componentInstance;
        compDe = fixture.debugElement;
        compEl = compDe.nativeElement;

        // test data
        expectedLogo = LOGOSDATA.unibas;
        expectedNonRightMainFooterLogo = LOGOSDATA.sagw;
        expectedNonMainFooterLogo = LOGOSDATA.angular;

        // spies on component functions
        // `.and.callThrough` will track the spy down the nested describes, see
        // https://jasmine.github.io/2.0/introduction.html#section-Spies:_%3Ccode%3Eand.callThrough%3C/code%3E
        getLogoClassSpy = spyOn<any>(component, 'getLogoClass').and.callThrough();
    });

    afterAll(() => {
        cleanStylesFromDOM();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('BEFORE initial data binding', () => {
        it('should not have logo', () => {
            expect(component.logo).toBeUndefined(`should be undefined`);
        });

        describe('#getLogoClass', () => {
            it('... should not have been called yet', () => {
                expectSpyCall(getLogoClassSpy, 0);
            });
        });

        describe('VIEW', () => {
            it('... should contain one image inside an anchor a', () => {
                const imageDes = getAndExpectDebugElementByCss(compDe, 'a > img', 1, 1);
            });

            it('... should not render logo yet', () => {
                // find debug elements
                const anchorDes = getAndExpectDebugElementByCss(compDe, 'a', 1, 1);
                const imageDes = getAndExpectDebugElementByCss(compDe, 'img', 1, 1);

                // find native elements
                const anchorEl = anchorDes[0].nativeElement;
                const imageEl = imageDes[0].nativeElement;

                expect(anchorEl.href).toBeDefined();
                expect(anchorEl.href).not.toBeTruthy('should be empty string');

                expect(imageEl.id).toBeDefined();
                expect(imageEl.id).not.toBeTruthy('should be empty string');

                expect(imageEl.src).toBeDefined();
                expect(imageEl.src).not.toBeTruthy('should be empty string');

                expect(imageEl.alt).toBeDefined();
                expect(imageEl.alt).not.toBeTruthy('should be empty string');
            });
        });
    });

    describe('AFTER initial data binding', () => {
        beforeEach(() => {
            // simulate the parent setting the input properties
            component.logo = LOGOSDATA.unibas;

            // trigger initial data binding
            fixture.detectChanges();
        });

        it('should have logo', () => {
            expect(component.logo).toBeDefined(`should be defined`);
            expect(component.logo).toBe(expectedLogo, `should be ${expectedLogo}`);
        });

        it('should change logo if input changes', () => {
            expect(component.logo).toBeDefined();
            expect(component.logo).toBe(expectedLogo);

            // trigger changes in data binding
            component.logo = LOGOSDATA.sagw;
            fixture.detectChanges();

            expect(component.logo).toBeDefined(`should be defined`);
            expect(component.logo).toEqual(
                expectedNonRightMainFooterLogo,
                `should equal ${expectedNonRightMainFooterLogo}`
            );

            // trigger changes in data binding
            component.logo = LOGOSDATA.angular;
            fixture.detectChanges();

            expect(component.logo).toBeDefined(`should be defined`);
            expect(component.logo).toEqual(expectedNonMainFooterLogo, `should equal ${expectedNonMainFooterLogo}`);
        });

        describe('#getLogoClass', () => {
            it('... should have been called with logo id', () => {
                expectSpyCall(getLogoClassSpy, 1, expectedLogo.id);
            });

            it('... should return class `my-2 float-right` for right main footer logos', () => {
                expectSpyCall(getLogoClassSpy, 1, expectedLogo.id);

                const classList = component.getLogoClass(component.logo.id);

                expect(classList).toBeTruthy(`should not be empty`);
                expect(classList).toContain(cssClassFloatRight, `should contain ${cssClassFloatRight}`);
                expect(classList).toContain(cssClassMarginY2, `should contain ${cssClassMarginY2}`);
                expect(classList).toBe(
                    cssClassMarginY2 + ' ' + cssClassFloatRight,
                    `should be ${cssClassMarginY2} ${cssClassFloatRight}`
                );
            });

            it('... should return class `float-right` only for right main footer logos', () => {
                expectSpyCall(getLogoClassSpy, 1, expectedLogo.id);

                let classList = component.getLogoClass(component.logo.id);

                expect(classList).toBeTruthy(`should not be empty`);
                expect(classList).toContain(cssClassFloatRight, `should contain ${cssClassFloatRight}`);

                // main footer logo
                // trigger changes in data binding
                component.logo = LOGOSDATA.sagw;
                fixture.detectChanges();

                classList = component.getLogoClass(component.logo.id);

                expect(classList).toBeTruthy(`should not be empty`);
                expect(classList).not.toContain(cssClassFloatRight, `should not contain ${cssClassFloatRight}`);

                // not main footer logo
                // trigger changes in data binding
                component.logo = LOGOSDATA.angular;
                fixture.detectChanges();

                classList = component.getLogoClass(component.logo.id);

                expect(classList).not.toBeTruthy(`should be empty`);
            });

            it('... should return class `my-2` only for main footer logos', () => {
                let classList = component.getLogoClass(component.logo.id);

                expect(classList).toBeTruthy(`should not be empty`);
                expect(classList).toContain(cssClassMarginY2, `should contain ${cssClassMarginY2}`);

                // trigger changes in data binding
                component.logo = LOGOSDATA.sagw;
                fixture.detectChanges();

                classList = component.getLogoClass(component.logo.id);

                expect(classList).toBeTruthy(`should not be empty`);
                expect(classList).toContain(cssClassMarginY2, `should contain ${cssClassMarginY2}`);

                // trigger changes in data binding
                component.logo = LOGOSDATA.angular;
                fixture.detectChanges();

                classList = component.getLogoClass(component.logo.id);

                expect(classList).not.toBeTruthy(`should be empty`);
            });
        });

        describe('VIEW', () => {
            it('... should have correct logo link in anchor', () => {
                // find debug elements
                const anchorDes = getAndExpectDebugElementByCss(compDe, 'a', 1, 1);

                // find native elements
                const anchorEl = anchorDes[0].nativeElement;

                expect(anchorEl.href).toContain(expectedLogo.href, `should contain ${expectedLogo.href}`);
            });

            it('... should have correct logo id in img', () => {
                // find debug elements
                const anchorDes = getAndExpectDebugElementByCss(compDe, 'a', 1, 1);
                const imageDes = getAndExpectDebugElementByCss(compDe, 'img', 1, 1);

                // find native elements
                const anchorEl = anchorDes[0].nativeElement;
                const imageEl = imageDes[0].nativeElement;

                expect(imageEl.id).toBe(expectedLogo.id, `should be ${expectedLogo.id}`);
            });

            it('... should have correct logo src and alt in img', () => {
                // find debug elements
                const anchorDes = getAndExpectDebugElementByCss(compDe, 'a', 1, 1);
                const imageDes = getAndExpectDebugElementByCss(compDe, 'img', 1, 1);

                // find native elements
                const anchorEl = anchorDes[0].nativeElement;
                const imageEl = imageDes[0].nativeElement;

                expect(imageEl.src).toContain(expectedLogo.src, `should contain ${expectedLogo.src}`);
                expect(imageEl.alt).toBe(expectedLogo.alt, `should be ${expectedLogo.alt}`);
            });

            it('... should have CSS class `my-2 float-right` applied only to right main footer logos', async () => {
                // for CSS class karma tests cf. https://stackoverflow.com/a/49157894

                // right main footer logo
                // find debug elements
                const imageDes = getAndExpectDebugElementByCss(compDe, 'img', 1, 1);

                // find native elements
                const imageEl = imageDes[0].nativeElement;
                const imageClasses = imageDes[0].classes;

                expect(imageEl.classList).toContain(cssClassFloatRight, `should contain ${cssClassFloatRight}`);
                expect(imageClasses[cssClassFloatRight]).toBeTruthy(`should not be empty`);
                expect(imageEl.classList).toContain(cssClassMarginY2, `should contain ${cssClassMarginY2}`);
                expect(imageClasses[cssClassMarginY2]).toBeTruthy(`should not be empty`);
            });

            it('... should have CSS class `float-right` applied only to right main footer logos', async () => {
                // for CSS class karma tests cf. https://stackoverflow.com/a/49157894

                // right main footer logo
                // find debug elements
                const imageDes = getAndExpectDebugElementByCss(compDe, 'img', 1, 1);

                // find native elements
                const imageEl = imageDes[0].nativeElement;
                const imageClasses = imageDes[0].classes;

                expect(imageEl.classList).toContain(cssClassFloatRight, `should contain ${cssClassFloatRight}`);
                expect(imageClasses[cssClassFloatRight]).toBeTruthy(`should not be empty`);

                // main footer logo
                // trigger changes in data binding
                component.logo = LOGOSDATA.sagw;
                await detectChangesOnPush(fixture); // fixture.detectChanges with onPush strategy

                expect(imageEl.classList).not.toContain(cssClassFloatRight, `should contain ${cssClassFloatRight}`);
                expect(imageClasses[cssClassFloatRight]).not.toBeTruthy(`should not be empty`);

                // not main footer logo
                // trigger changes in data binding
                component.logo = LOGOSDATA.angular;
                await detectChangesOnPush(fixture); // fixture.detectChanges with onPush

                expect(imageEl.classList).not.toContain(cssClassFloatRight, `should contain ${cssClassFloatRight}`);
                expect(imageClasses[cssClassFloatRight]).not.toBeTruthy(`should be empty`);
            });

            it('... should have CSS class `my-2` applied only to main footer logos', async () => {
                // right main footer logo
                // find debug elements
                const imageDes = getAndExpectDebugElementByCss(compDe, 'img', 1, 1);

                // find native elements
                const imageEl = imageDes[0].nativeElement;
                const imageClasses = imageDes[0].classes;

                expect(imageEl.classList).toContain(cssClassMarginY2, `should contain ${cssClassMarginY2}`);
                expect(imageClasses[cssClassMarginY2]).toBeTruthy(`should not be empty`);

                // main footer logo
                // trigger changes in data binding
                component.logo = LOGOSDATA.sagw;
                await detectChangesOnPush(fixture); // fixture.detectChanges with onPush strategy

                expect(imageEl.classList).toContain(cssClassMarginY2, `should contain ${cssClassMarginY2}`);
                expect(imageClasses[cssClassMarginY2]).toBeTruthy(`should not be empty`);

                // not main footer logo
                // trigger changes in data binding
                component.logo = LOGOSDATA.angular;
                await detectChangesOnPush(fixture); // fixture.detectChanges with onPush

                expect(imageEl.classList).not.toContain(cssClassMarginY2, `should not contain ${cssClassMarginY2}`);
                expect(imageClasses[cssClassMarginY2]).not.toBeTruthy(`should be empty`);
            });

            it('... should have [ngClass] resolve to correct classes', async () => {
                // right main footer logo
                // find debug elements
                const imageDes = getAndExpectDebugElementByCss(compDe, 'img', 1, 1);
                const imageAttributes = imageDes[0].attributes;

                // find native elements
                const imageEl = imageDes[0].nativeElement;
                const imageElAttributes = imageEl.attributes;

                expect(imageAttributes['ng-reflect-ng-class']).toBe(
                    cssClassMarginY2 + ' ' + cssClassFloatRight,
                    `should be ${cssClassMarginY2} ${cssClassFloatRight}`
                );
                expect(imageElAttributes['ng-reflect-ng-class'].value).toBe(
                    cssClassMarginY2 + ' ' + cssClassFloatRight,
                    `should be ${cssClassMarginY2} ${cssClassFloatRight}`
                );

                // main footer logo
                // trigger changes in data binding
                component.logo = LOGOSDATA.sagw;
                await detectChangesOnPush(fixture); // fixture.detectChanges with onPush strategy

                expect(imageAttributes['ng-reflect-ng-class']).toBe(cssClassMarginY2, `should be ${cssClassMarginY2}`);
                expect(imageElAttributes['ng-reflect-ng-class'].value).toBe(
                    cssClassMarginY2,
                    `should be ${cssClassMarginY2}`
                );

                // not main footer logo
                // trigger changes in data binding
                component.logo = LOGOSDATA.angular;
                await detectChangesOnPush(fixture); // fixture.detectChanges with onPush strategy

                expect(imageAttributes['ng-reflect-ng-class']).not.toBeTruthy(`should be empty string`);
                expect(imageElAttributes['ng-reflect-ng-class'].value).not.toBeTruthy(`should be empty string`);
            });
        });
    });
});
