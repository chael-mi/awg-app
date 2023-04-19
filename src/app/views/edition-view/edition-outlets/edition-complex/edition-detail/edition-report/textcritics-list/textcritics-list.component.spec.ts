import { Component, DebugElement, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import Spy = jasmine.Spy;

import { NgbAccordionModule, NgbConfig } from '@ng-bootstrap/ng-bootstrap';

import { click } from '@testing/click-helper';
import { detectChangesOnPush } from '@testing/detect-changes-on-push-helper';
import {
    expectSpyCall,
    expectToBe,
    expectToEqual,
    getAndExpectDebugElementByCss,
    getAndExpectDebugElementByDirective,
} from '@testing/expect-helper';
import { mockEditionData } from '@testing/mock-data';

import { UtilityService } from '@awg-app/core/services';
import { CompileHtmlComponent } from '@awg-shared/compile-html';
import { TextcriticalComment, TextcriticsList } from '@awg-views/edition-view/models';

import { TextcriticsListComponent } from './textcritics-list.component';

// Mock tka table component
@Component({ selector: 'awg-edition-tka-table', template: '' })
class EditionTkaTableStubComponent {
    @Input()
    textcriticalComments: TextcriticalComment[];
    @Input()
    isRowTable = false;
    @Output()
    navigateToReportFragmentRequest: EventEmitter<string> = new EventEmitter();
    @Output()
    openModalRequest: EventEmitter<string> = new EventEmitter();
    @Output()
    selectSvgSheetRequest: EventEmitter<string> = new EventEmitter();
}

describe('TextcriticsListComponent (DONE)', () => {
    let component: TextcriticsListComponent;
    let fixture: ComponentFixture<TextcriticsListComponent>;
    let compDe: DebugElement;

    let utils: UtilityService;

    let expectedFragment: string;
    let expectedModalSnippet: string;
    let expectedNextSheetId: string;
    let expectedSheetId: string;
    let expectedTextcriticsData: TextcriticsList;

    let navigateToReportFragmentSpy: Spy;
    let navigateToReportFragmentRequestEmitSpy: Spy;
    let openModalSpy: Spy;
    let openModalRequestEmitSpy: Spy;
    let selectSvgSheetSpy: Spy;
    let selectSvgSheetRequestEmitSpy: Spy;

    // Global NgbConfigModule
    @NgModule({ imports: [NgbAccordionModule], exports: [NgbAccordionModule] })
    class NgbAccordionWithConfigModule {
        constructor(config: NgbConfig) {
            // Set animations to false
            config.animation = false;
        }
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NgbAccordionWithConfigModule],
            declarations: [TextcriticsListComponent, CompileHtmlComponent, EditionTkaTableStubComponent],
            providers: [UtilityService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextcriticsListComponent);
        component = fixture.componentInstance;
        compDe = fixture.debugElement;

        utils = TestBed.inject(UtilityService);

        // Test data
        expectedFragment = 'source_A';
        expectedModalSnippet = mockEditionData.mockModalSnippet;
        expectedNextSheetId = 'test_item_id_2';
        expectedSheetId = 'test_item_id_1';
        expectedTextcriticsData = mockEditionData.mockTextcriticsData;

        // Spies on component functions
        // `.and.callThrough` will track the spy down the nested describes, see
        // https://jasmine.github.io/2.0/introduction.html#section-Spies:_%3Ccode%3Eand.callThrough%3C/code%3E
        navigateToReportFragmentSpy = spyOn(component, 'navigateToReportFragment').and.callThrough();
        navigateToReportFragmentRequestEmitSpy = spyOn(
            component.navigateToReportFragmentRequest,
            'emit'
        ).and.callThrough();
        openModalSpy = spyOn(component, 'openModal').and.callThrough();
        openModalRequestEmitSpy = spyOn(component.openModalRequest, 'emit').and.callThrough();
        selectSvgSheetSpy = spyOn(component, 'selectSvgSheet').and.callThrough();
        selectSvgSheetRequestEmitSpy = spyOn(component.selectSvgSheetRequest, 'emit').and.callThrough();
    });

    it('... should create', () => {
        expect(component).toBeTruthy();
    });

    describe('BEFORE initial data binding', () => {
        it('... should not have `textcriticsData`', () => {
            expect(component.textcriticsData).toBeUndefined();
        });

        it('... should have `ref`', () => {
            expectToEqual(component.ref, component);
        });

        describe('VIEW', () => {
            it('... should contain no ngb-accordion yet', () => {
                // Ngb-accordion debug element
                getAndExpectDebugElementByCss(compDe, 'ngb-accordion', 0, 0);
            });
        });
    });

    describe('AFTER initial data binding', () => {
        beforeEach(() => {
            // Simulate the parent setting the input properties
            component.textcriticsData = expectedTextcriticsData;

            // Trigger initial data binding
            fixture.detectChanges();
        });

        it('... should have `textcriticsData`', () => {
            expectToEqual(component.textcriticsData, expectedTextcriticsData);
        });

        describe('VIEW', () => {
            it('... should contain one ngb-accordion with two panels (div.accordion-item)', () => {
                // Ngb-accordion debug element
                const accordionDes = getAndExpectDebugElementByCss(compDe, 'ngb-accordion', 1, 1);

                // Panel
                getAndExpectDebugElementByCss(accordionDes[0], 'div.accordion-item', 2, 2);
            });

            it('... should contain panel header with collapsed body', () => {
                // Ngb-accordion debug element
                const accordionDes = getAndExpectDebugElementByCss(compDe, 'ngb-accordion', 1, 1);

                // Panel (div.card)
                const panelDes = getAndExpectDebugElementByCss(accordionDes[0], 'div.accordion-item', 2, 2);

                // Header
                getAndExpectDebugElementByCss(
                    panelDes[0],
                    `div#${expectedTextcriticsData.textcritics[0].id}-header.accordion-header`,
                    1,
                    1
                );
                getAndExpectDebugElementByCss(
                    panelDes[1],
                    `div#${expectedTextcriticsData.textcritics[1].id}-header.accordion-header`,
                    1,
                    1
                );

                // Body
                getAndExpectDebugElementByCss(
                    panelDes[0],
                    `div#${expectedTextcriticsData.textcritics[0].id} > div.accordion-body`,
                    0,
                    0
                );
                getAndExpectDebugElementByCss(
                    panelDes[1],
                    `div#${expectedTextcriticsData.textcritics[1].id} > div.accordion-body`,
                    0,
                    0
                );
            });

            it('... should contain div and two buttons in header section (div.accordion-header)', () => {
                // Ngb-accordion panel debug element
                const panelDes = getAndExpectDebugElementByCss(compDe, 'ngb-accordion > div.accordion-item', 2, 2);

                // Header
                const header0Des = getAndExpectDebugElementByCss(
                    panelDes[0],
                    `div#${expectedTextcriticsData.textcritics[0].id}-header.accordion-header`,
                    1,
                    1
                );
                const header1Des = getAndExpectDebugElementByCss(
                    panelDes[1],
                    `div#${expectedTextcriticsData.textcritics[1].id}-header.accordion-header`,
                    1,
                    1
                );

                // Header Buttons
                const button0Des = getAndExpectDebugElementByCss(
                    header0Des[0],
                    'div.accordion-button > button.btn',
                    2,
                    2
                );
                const button1Des = getAndExpectDebugElementByCss(
                    header1Des[0],
                    'div.accordion-button > button.btn',
                    2,
                    2
                );

                const buttonEl00 = button0Des[0].nativeElement;
                const buttonEl01 = button0Des[1].nativeElement;
                const buttonEl10 = button1Des[0].nativeElement;
                const buttonEl11 = button1Des[1].nativeElement;

                const expectedTitle0 = expectedTextcriticsData.textcritics[0].label;
                const expectedTitle1 = expectedTextcriticsData.textcritics[1].label;
                const expectedTitleT = 'Zur Transkription';

                expect(buttonEl00).toHaveClass('text-start');
                expectToBe(buttonEl00.textContent.trim(), expectedTitle0);

                expect(buttonEl01).toHaveClass('btn-outline-info');
                expectToBe(buttonEl01.textContent.trim(), expectedTitleT);

                expect(buttonEl10).toHaveClass('text-start');
                expectToBe(buttonEl10.textContent.trim(), expectedTitle1);

                expect(buttonEl11).toHaveClass('btn-outline-info');
                expectToBe(buttonEl11.textContent.trim(), expectedTitleT);
            });

            it('... should toggle first panel body on click on first header', () => {
                // Ngb-accordion panel debug element
                const panelDes = getAndExpectDebugElementByCss(compDe, 'ngb-accordion > div.accordion-item', 2, 2);

                // Header
                const header0Des = getAndExpectDebugElementByCss(
                    panelDes[0],
                    `div#${expectedTextcriticsData.textcritics[0].id}-header.accordion-header`,
                    1,
                    1
                );

                // Header Button
                const btnDes = getAndExpectDebugElementByCss(header0Des[0], 'div.accordion-button > button.btn', 2, 2);
                const btnEl = btnDes[0].nativeElement;

                // Panel body is closed
                getAndExpectDebugElementByCss(
                    panelDes[0],
                    `div#${expectedTextcriticsData.textcritics[0].id} > div.accordion-body`,
                    0,
                    0,
                    'collapsed'
                );

                // Click header button
                click(btnEl as HTMLElement);
                detectChangesOnPush(fixture);

                getAndExpectDebugElementByCss(
                    panelDes[0],
                    `div#${expectedTextcriticsData.textcritics[0].id} > div.accordion-body`,
                    1,
                    1,
                    'open'
                );

                // Click header button
                click(btnEl as HTMLElement);
                detectChangesOnPush(fixture);

                getAndExpectDebugElementByCss(
                    panelDes[0],
                    `div#${expectedTextcriticsData.textcritics[0].id} > div.accordion-body`,
                    0,
                    0,
                    'collapsed'
                );
            });

            it('... should toggle second panel body on click on second header', () => {
                // Ngb-accordion panel debug element
                const panelDes = getAndExpectDebugElementByCss(compDe, 'ngb-accordion > div.accordion-item', 2, 2);

                // Header
                const header1Des = getAndExpectDebugElementByCss(
                    panelDes[1],
                    `div#${expectedTextcriticsData.textcritics[1].id}-header.accordion-header`,
                    1,
                    1
                );

                // Header Button
                const btnDes = getAndExpectDebugElementByCss(header1Des[0], 'div.accordion-button > button.btn', 2, 2);
                const btnEl = btnDes[0].nativeElement;

                // Panel body is closed
                getAndExpectDebugElementByCss(
                    panelDes[1],
                    `div#${expectedTextcriticsData.textcritics[1].id} > div.accordion-body`,
                    0,
                    0,
                    'collapsed'
                );

                // Click header button
                click(btnEl as HTMLElement);
                detectChangesOnPush(fixture);

                getAndExpectDebugElementByCss(
                    panelDes[1],
                    `div#${expectedTextcriticsData.textcritics[1].id} > div.accordion-body`,
                    1,
                    1,
                    'open'
                );

                // Click header button
                click(btnEl as HTMLElement);
                detectChangesOnPush(fixture);

                getAndExpectDebugElementByCss(
                    panelDes[1],
                    `div#${expectedTextcriticsData.textcritics[1].id} > div.accordion-body`,
                    0,
                    0,
                    'collapsed'
                );
            });

            describe('... with open body', () => {
                beforeEach(() => {
                    // Open bodies
                    const header0Des = getAndExpectDebugElementByCss(
                        compDe,
                        `div#${expectedTextcriticsData.textcritics[0].id}-header.accordion-header`,
                        1,
                        1
                    );
                    const header1Des = getAndExpectDebugElementByCss(
                        compDe,
                        `div#${expectedTextcriticsData.textcritics[1].id}-header.accordion-header`,
                        1,
                        1
                    );

                    // Header Button
                    const btn0Des = getAndExpectDebugElementByCss(
                        header0Des[0],
                        'div.accordion-button > button.btn',
                        2,
                        2
                    );
                    const btn1Des = getAndExpectDebugElementByCss(
                        header1Des[0],
                        'div.accordion-button > button.btn',
                        2,
                        2
                    );
                    const btn0El = btn0Des[0].nativeElement;
                    const btn1El = btn1Des[0].nativeElement;

                    // Click header buttons to open body
                    click(btn0El as HTMLElement);
                    click(btn1El as HTMLElement);
                    detectChangesOnPush(fixture);
                });

                it('... should contain no panel body with div and paragraphs if description array is empty', () => {
                    const textcritics = expectedTextcriticsData.textcritics[0];
                    const bodyDes = getAndExpectDebugElementByCss(
                        compDe,
                        `div#${textcritics.id} > div.accordion-body`,
                        1,
                        1,
                        'open'
                    );

                    getAndExpectDebugElementByCss(bodyDes[0], 'div', 0, 0);
                });

                it('... should contain panel body with as many paragraphs in first div as textcritics.description if description array is not empty', () => {
                    const textcritics = expectedTextcriticsData.textcritics[1];
                    const bodyDes = getAndExpectDebugElementByCss(
                        compDe,
                        `div#${textcritics.id} > div.accordion-body`,
                        1,
                        1,
                        'open'
                    );

                    const divDes = getAndExpectDebugElementByCss(bodyDes[0], 'div:first-child', 1, 1);

                    // Number of paragraphs = description array length + 1 (heading)
                    const pDes = getAndExpectDebugElementByCss(
                        divDes[0],
                        'p',
                        textcritics.description.length + 1,
                        textcritics.description.length + 1
                    );
                    const pEl0 = pDes[0].nativeElement;

                    expectToBe(pEl0.textContent, 'Skizzenkommentar:');

                    pDes.forEach((pDe, index) => {
                        if (index === 0) {
                            return;
                        }
                        const pEl = pDe.nativeElement;

                        expectToBe(pEl.textContent, textcritics.description[index - 1]);
                    });
                });

                it('... should contain panel body with div, paragraph and EditionTkaTableComponent if comments array is not empty', () => {
                    const textcritics = expectedTextcriticsData.textcritics[1];
                    const bodyDes = getAndExpectDebugElementByCss(
                        compDe,
                        `div#${textcritics.id} > div.accordion-body`,
                        1,
                        1,
                        'open'
                    );

                    const divDes = getAndExpectDebugElementByCss(bodyDes[0], 'div:not(:first-child)', 1, 1);
                    const pDes = getAndExpectDebugElementByCss(divDes[0], 'p', 1, 1);
                    const pEl0 = pDes[0].nativeElement;

                    expectToBe(pEl0.textContent, 'Textkritischer Kommentar:');

                    // EditionTkaTableStubComponent
                    getAndExpectDebugElementByDirective(bodyDes[0], EditionTkaTableStubComponent, 1, 1);
                });

                it('... should pass down `comments` and `rowtable` data to EditionTkaTableComponent (stubbed)', () => {
                    const editionTkaTableDes = getAndExpectDebugElementByDirective(
                        compDe,
                        EditionTkaTableStubComponent,
                        1,
                        1
                    );
                    const editionTkaTableCmp = editionTkaTableDes[0].injector.get(
                        EditionTkaTableStubComponent
                    ) as EditionTkaTableStubComponent;

                    expectToEqual(
                        editionTkaTableCmp.textcriticalComments,
                        expectedTextcriticsData.textcritics[1].comments
                    );
                    expectToEqual(editionTkaTableCmp.isRowTable, expectedTextcriticsData.textcritics[1].rowtable);
                });
            });
        });

        describe('#navigateToReportFragment()', () => {
            it('... should have a method `navigateToReportFragment`', () => {
                expect(component.navigateToReportFragment).toBeDefined();
            });

            it('... should trigger on event from EditionTkaTableComponent', () => {
                // Open second panel
                const header1Des = getAndExpectDebugElementByCss(
                    compDe,
                    `div#${expectedTextcriticsData.textcritics[1].id}-header.accordion-header`,
                    1,
                    1
                );

                // Header Button
                const btn1Des = getAndExpectDebugElementByCss(header1Des[0], 'div.accordion-button > button.btn', 2, 2);
                const btn1El = btn1Des[0].nativeElement;

                // Click header buttons to open body
                click(btn1El as HTMLElement);
                detectChangesOnPush(fixture);

                const editionTkaTableDes = getAndExpectDebugElementByDirective(
                    compDe,
                    EditionTkaTableStubComponent,
                    1,
                    1
                );
                const editionTkaTableCmp = editionTkaTableDes[0].injector.get(
                    EditionTkaTableStubComponent
                ) as EditionTkaTableStubComponent;

                editionTkaTableCmp.navigateToReportFragmentRequest.emit(expectedFragment);

                expectSpyCall(navigateToReportFragmentSpy, 1, expectedFragment);
            });

            describe('... should not emit anything if', () => {
                it('... id is undefined', () => {
                    component.navigateToReportFragment(undefined);

                    expectSpyCall(navigateToReportFragmentRequestEmitSpy, 0);
                });
                it('... id is null', () => {
                    component.navigateToReportFragment(null);

                    expectSpyCall(navigateToReportFragmentRequestEmitSpy, 0);
                });
                it('... id is empty string', () => {
                    component.navigateToReportFragment('');

                    expectSpyCall(navigateToReportFragmentRequestEmitSpy, 0);
                });
            });

            it('... should emit id of selected report fragment', () => {
                component.navigateToReportFragment(expectedFragment);

                expectSpyCall(navigateToReportFragmentRequestEmitSpy, 1, expectedFragment);

                const otherFragment = 'source_B';
                component.navigateToReportFragment(otherFragment);

                expectSpyCall(navigateToReportFragmentRequestEmitSpy, 2, otherFragment);
            });
        });

        describe('#openModal()', () => {
            it('... should have a method `openModal`', () => {
                expect(component.openModal).toBeDefined();
            });

            it('... should trigger on event from EditionTkaTableComponent', () => {
                // Open second panel
                const header1Des = getAndExpectDebugElementByCss(
                    compDe,
                    `div#${expectedTextcriticsData.textcritics[1].id}-header.accordion-header`,
                    1,
                    1
                );

                // Header Button
                const btn1Des = getAndExpectDebugElementByCss(header1Des[0], 'div.accordion-button > button.btn', 2, 2);
                const btn1El = btn1Des[0].nativeElement;

                // Click header buttons to open body
                click(btn1El as HTMLElement);
                detectChangesOnPush(fixture);

                const editionTkaTableDes = getAndExpectDebugElementByDirective(
                    compDe,
                    EditionTkaTableStubComponent,
                    1,
                    1
                );
                const editionTkaTableCmp = editionTkaTableDes[0].injector.get(
                    EditionTkaTableStubComponent
                ) as EditionTkaTableStubComponent;

                editionTkaTableCmp.openModalRequest.emit(expectedModalSnippet);

                expectSpyCall(openModalSpy, 1, expectedModalSnippet);
            });

            describe('... should not emit anything if ', () => {
                it('... id is undefined', () => {
                    component.openModal(undefined);

                    expectSpyCall(openModalRequestEmitSpy, 0);
                });

                it('... id is null', () => {
                    component.openModal(undefined);

                    expectSpyCall(openModalRequestEmitSpy, 0, null);
                });
                it('... id is empty string', () => {
                    component.openModal('');

                    expectSpyCall(openModalRequestEmitSpy, 0);
                });
            });

            it('... should emit id of given modal snippet', () => {
                component.openModal(expectedModalSnippet);

                expectSpyCall(openModalRequestEmitSpy, 1, expectedModalSnippet);
            });
        });

        describe('#selectSvgSheet()', () => {
            it('... should have a method `selectSvgSheet`', () => {
                expect(component.selectSvgSheet).toBeDefined();
            });

            it('... should trigger on event from EditionTkaTableComponent', () => {
                // Open second panel
                const header1Des = getAndExpectDebugElementByCss(
                    compDe,
                    `div#${expectedTextcriticsData.textcritics[1].id}-header.accordion-header`,
                    1,
                    1
                );

                // Header Button
                const btn1Des = getAndExpectDebugElementByCss(header1Des[0], 'div.accordion-button > button.btn', 2, 2);
                const btn1El = btn1Des[0].nativeElement;

                // Click header buttons to open body
                click(btn1El as HTMLElement);
                detectChangesOnPush(fixture);

                const editionTkaTableDes = getAndExpectDebugElementByDirective(
                    compDe,
                    EditionTkaTableStubComponent,
                    1,
                    1
                );
                const editionTkaTableCmp = editionTkaTableDes[0].injector.get(
                    EditionTkaTableStubComponent
                ) as EditionTkaTableStubComponent;

                editionTkaTableCmp.selectSvgSheetRequest.emit(expectedSheetId);

                expectSpyCall(selectSvgSheetSpy, 1, expectedSheetId);
            });

            describe('... should not emit anything if ', () => {
                it('... id is undefined', () => {
                    component.selectSvgSheet(undefined);

                    expectSpyCall(selectSvgSheetRequestEmitSpy, 0);
                });
                it('... id is null', () => {
                    component.selectSvgSheet(null);

                    expectSpyCall(selectSvgSheetRequestEmitSpy, 0);
                });
                it('... id is empty string', () => {
                    component.selectSvgSheet('');

                    expectSpyCall(selectSvgSheetRequestEmitSpy, 0);
                });
            });

            it('... should emit id of selected svg sheet', () => {
                component.selectSvgSheet(expectedSheetId);

                expectSpyCall(selectSvgSheetRequestEmitSpy, 1, expectedSheetId);

                component.selectSvgSheet(expectedNextSheetId);

                expectSpyCall(selectSvgSheetRequestEmitSpy, 2, expectedNextSheetId);
            });
        });
    });
});
