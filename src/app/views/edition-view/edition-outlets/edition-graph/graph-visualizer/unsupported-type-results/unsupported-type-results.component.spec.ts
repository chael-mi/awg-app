import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { customJasmineMatchers } from '@testing/custom-matchers';
import { detectChangesOnPush } from '@testing/detect-changes-on-push-helper';
import { getAndExpectDebugElementByCss } from '@testing/expect-helper';

import { UnsupportedTypeResultsComponent } from './unsupported-type-results.component';

describe('UnsupportedTypeResultsComponent (DONE)', () => {
    let component: UnsupportedTypeResultsComponent;
    let fixture: ComponentFixture<UnsupportedTypeResultsComponent>;
    let compDe: DebugElement;
    let compEl: any;

    let expectedQueryType: string;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgbAccordionModule],
            declarations: [UnsupportedTypeResultsComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        // add custom jasmine matchers (ToHaveCssClass)
        jasmine.addMatchers(customJasmineMatchers);

        fixture = TestBed.createComponent(UnsupportedTypeResultsComponent);
        component = fixture.componentInstance;
        compDe = fixture.debugElement;
        compEl = compDe.nativeElement;

        // test data
        expectedQueryType = 'ask';
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('BEFORE initial data binding', () => {
        it('... should not have queryType', () => {
            expect(component.queryType).toBeUndefined('should be undefined');
        });

        describe('VIEW', () => {
            it('... should contain one ngb-accordion without panel (div.card) yet', () => {
                // ngb-accordion debug element
                const accordionDes = getAndExpectDebugElementByCss(compDe, 'ngb-accordion', 1, 1);

                // panel
                getAndExpectDebugElementByCss(accordionDes[0], 'div.card', 0, 0, 'yet');
            });
        });
    });

    describe('AFTER initial data binding', () => {
        beforeEach(() => {
            // simulate the parent setting the input properties
            component.queryType = expectedQueryType;

            // trigger initial data binding
            fixture.detectChanges();
        });

        it('should have `queryType` input', () => {
            expect(component.queryType).toBeDefined('should be defined');
            expect(component.queryType).toBe(expectedQueryType, `should be ${expectedQueryType}`);
        });

        describe('VIEW', () => {
            it('... should contain one ngb-accordion with panel (div.card) header and body', () => {
                // ngb-accordion debug element
                const accordionDes = getAndExpectDebugElementByCss(compDe, 'ngb-accordion', 1, 1);

                // panel (div.card)
                const panelDes = getAndExpectDebugElementByCss(accordionDes[0], 'div.card', 1, 1); // panel (div.card)
                // header
                getAndExpectDebugElementByCss(
                    panelDes[0],
                    'div#awg-graph-visualizer-unsupported-query-type-result-header.card-header',
                    1,
                    1
                ); // panel (div.card)
                // body
                getAndExpectDebugElementByCss(
                    panelDes[0],
                    'div#awg-graph-visualizer-unsupported-query-type-result > div.card-body',
                    1,
                    1
                );
            });

            it('... should display panel header button', () => {
                // panel header button
                const btnDes = getAndExpectDebugElementByCss(
                    compDe,
                    'div#awg-graph-visualizer-unsupported-query-type-result-header > button',
                    1,
                    1
                );

                const btnEl = btnDes[0].nativeElement;

                // check button content
                expect(btnEl.textContent).toBeTruthy();
                expect(btnEl.textContent).toContain('Resultat', `should contain Resultat`);
            });

            it('... should contain panel body with two centered paragraphs', () => {
                // panel body paragraphs
                const pDes = getAndExpectDebugElementByCss(
                    compDe,
                    'div#awg-graph-visualizer-unsupported-query-type-result > div.card-body > p',
                    2,
                    2
                );

                const pEl0 = pDes[0].nativeElement;
                const pEl1 = pDes[1].nativeElement;

                expect(pEl0).toHaveCssClass('text-center');
                expect(pEl1).toHaveCssClass('text-center');
            });

            it('... should display messages in panel body paragraphs', () => {
                // panel body paragraphs
                const pDes = getAndExpectDebugElementByCss(
                    compDe,
                    'div#awg-graph-visualizer-unsupported-query-type-result > div.card-body > p',
                    2,
                    2
                );

                const pEl0 = pDes[0].nativeElement;
                const pEl1 = pDes[1].nativeElement;

                expect(pEl0.textContent).toBeTruthy();
                expect(pEl0.textContent).toContain(
                    `Sorry, but the requested SPARQL query type ${expectedQueryType.toUpperCase()} is not supported yet`
                );
                expect(pEl0.textContent).toContain(
                    expectedQueryType.toUpperCase(),
                    `should contain ${expectedQueryType.toUpperCase()}`
                );

                expect(pEl1.textContent).toBeTruthy();
                expect(pEl1.textContent).toContain('Please try a CONSTRUCT or SELECT query instead.');
            });

            it('... should display correct queryType if input changes', () => {
                // panel body paragraphs
                const pDes = getAndExpectDebugElementByCss(
                    compDe,
                    'div#awg-graph-visualizer-unsupported-query-type-result > div.card-body > p',
                    2,
                    2
                );
                const pEl0 = pDes[0].nativeElement;

                expect(pEl0.textContent).toContain(
                    expectedQueryType.toUpperCase(),
                    `should contain ${expectedQueryType.toUpperCase()}`
                );

                // DESCRIBE
                let newQueryType = 'describe';
                component.queryType = newQueryType;
                detectChangesOnPush(fixture);

                expect(pEl0.textContent).toContain(newQueryType.toUpperCase(), `should contain DESCRIBE`);

                // COUNT
                newQueryType = 'count';
                component.queryType = newQueryType;
                detectChangesOnPush(fixture);

                expect(pEl0.textContent).toContain(newQueryType.toUpperCase(), `should contain COUNT`);
            });
        });
    });
});
