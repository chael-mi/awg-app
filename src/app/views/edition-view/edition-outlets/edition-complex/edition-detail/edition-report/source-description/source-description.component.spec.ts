import { DOCUMENT } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import Spy = jasmine.Spy;

import { clickAndAwaitChanges } from '@testing/click-helper';
import { expectSpyCall, getAndExpectDebugElementByCss } from '@testing/expect-helper';
import { mockEditionData } from '@testing/mock-data';
import { RouterLinkStubDirective } from '@testing/router-stubs';

import { UtilityService } from '@awg-core/services';
import { CompileHtmlComponent } from '@awg-shared/compile-html';
import { EDITION_FIRM_SIGNS_DATA } from '@awg-views/edition-view/data';
import { SourceDescriptionList } from '@awg-views/edition-view/models';

import { SourceDescriptionComponent } from './source-description.component';

describe('SourceDescriptionComponent (DONE)', () => {
    let component: SourceDescriptionComponent;
    let fixture: ComponentFixture<SourceDescriptionComponent>;
    let compDe: DebugElement;

    let mockDocument: Document;
    let utils: UtilityService;

    let expectedSourceDescriptionListData: SourceDescriptionList;
    let expectedFirmSigns;
    let expectedSheetId: string;
    let expectedNextSheetId: string;
    let expectedModalSnippet: string;

    let openModalSpy: Spy;
    let openModalRequestEmitSpy: Spy;
    let selectSvgSheetSpy: Spy;
    let selectSvgSheetRequestEmitSpy: Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SourceDescriptionComponent, CompileHtmlComponent, RouterLinkStubDirective],
            providers: [UtilityService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SourceDescriptionComponent);
        component = fixture.componentInstance;
        compDe = fixture.debugElement;

        mockDocument = TestBed.inject(DOCUMENT);
        utils = TestBed.inject(UtilityService);

        // Test data
        expectedSheetId = 'test_item_id_1';
        expectedNextSheetId = 'test_item_id_2';
        expectedModalSnippet = mockEditionData.mockModalSnippet;
        expectedSourceDescriptionListData = mockEditionData.mockSourceDescriptionListData;
        expectedFirmSigns = {
            OP12: { A: [EDITION_FIRM_SIGNS_DATA.FIRM_JE_NO_9_LIN_28] },
            OP25: {
                A: [EDITION_FIRM_SIGNS_DATA.FIRM_JE_NO_15_LIN_16],
                B: [EDITION_FIRM_SIGNS_DATA.FIRM_JE_NO_2_LIN_12],
                C: [EDITION_FIRM_SIGNS_DATA.FIRM_JE_NO_3_LIN_14],
            },
        };

        // Spies on component functions
        // `.and.callThrough` will track the spy down the nested describes, see
        // https://jasmine.github.io/2.0/introduction.html#section-Spies:_%3Ccode%3Eand.callThrough%3C/code%3E
        openModalSpy = spyOn(component, 'openModal').and.callThrough();
        openModalRequestEmitSpy = spyOn(component.openModalRequest, 'emit').and.callThrough();
        selectSvgSheetSpy = spyOn(component, 'selectSvgSheet').and.callThrough();
        selectSvgSheetRequestEmitSpy = spyOn(component.selectSvgSheetRequest, 'emit').and.callThrough();
    });

    it('... should create', () => {
        expect(component).toBeTruthy();
    });

    describe('BEFORE initial data binding', () => {
        it('... should not have `sourceDescriptionListData`', () => {
            expect(component.sourceDescriptionListData).toBeUndefined();
        });

        it('... should have `ref`', () => {
            expect(component.ref).toBeTruthy();
            expect(component.ref).withContext(`should equal ${component}`).toEqual(component);
        });

        it('... should have `FIRM_SIGNS`', () => {
            expect(component.FIRM_SIGNS).toBeTruthy();
            expect(component.FIRM_SIGNS).withContext(`should equal ${expectedFirmSigns}`).toEqual(expectedFirmSigns);
        });

        describe('VIEW', () => {
            it('... should contain no div yet', () => {
                getAndExpectDebugElementByCss(compDe, 'div', 0, 0);
            });
        });
    });

    describe('AFTER initial data binding', () => {
        beforeEach(() => {
            // Simulate the parent setting the input properties
            component.sourceDescriptionListData = expectedSourceDescriptionListData;

            // Trigger initial data binding
            fixture.detectChanges();
        });

        it('... should have `sourceDescriptionListData`', () => {
            expect(component.sourceDescriptionListData).toBeTruthy();
            expect(component.sourceDescriptionListData)
                .withContext(`should equal ${expectedSourceDescriptionListData}`)
                .toEqual(expectedSourceDescriptionListData);
        });

        describe('VIEW', () => {
            it('... should contain one main description list div', () => {
                getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-list', 1, 1);
            });

            it('... should contain as many description divs in main list div as description data has sources', () => {
                getAndExpectDebugElementByCss(
                    compDe,
                    'div.awg-source-description-list > div.awg-source-description',
                    expectedSourceDescriptionListData.sources.length,
                    expectedSourceDescriptionListData.sources.length
                );
            });

            it('... should contain para class in description divs', () => {
                const divDes = getAndExpectDebugElementByCss(
                    compDe,
                    'div.awg-source-description-list > div.awg-source-description',
                    expectedSourceDescriptionListData.sources.length,
                    expectedSourceDescriptionListData.sources.length
                );

                divDes.forEach(divDe => {
                    expect(divDe.nativeElement.classList.contains('para')).toBeTruthy();
                    expect(divDe.nativeElement).toHaveClass('para');
                });
            });

            describe('... first description div', () => {
                it('... should contain a description-head div, but no description-body', () => {
                    const divDes = getAndExpectDebugElementByCss(
                        compDe,
                        'div.awg-source-description-list > div.awg-source-description',
                        2,
                        2
                    );

                    getAndExpectDebugElementByCss(divDes[0], 'div.awg-source-description-head', 1, 1);
                    getAndExpectDebugElementByCss(divDes[0], 'div.awg-source-description-body', 0, 0);
                });

                it('... should contain 3 paragraphs in first description-head div', () => {
                    const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-head', 2, 2);

                    getAndExpectDebugElementByCss(divDes[0], 'p', 3, 3);
                });

                it('... the first paragraph displaying a siglum (bold) without an addendum', () => {
                    const expectedSiglum =
                        expectedSourceDescriptionListData.sources[0].siglum +
                        expectedSourceDescriptionListData.sources[0].siglumAddendum;

                    const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-head', 2, 2);

                    const pDes = getAndExpectDebugElementByCss(divDes[0], 'p', 3, 3);

                    const pEl = pDes[0].nativeElement;

                    expect(pEl).toHaveClass('awg-source-description-siglum');
                    expect(pEl).toHaveClass('bold');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedSiglum.trim()}`)
                        .toBe(expectedSiglum.trim());
                });

                it('... the second paragraph displaying the source type', () => {
                    const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-head', 2, 2);

                    const pDes = getAndExpectDebugElementByCss(divDes[0], 'p', 3, 3);

                    const pEl = pDes[1].nativeElement;

                    expect(pEl).toHaveClass('awg-source-description-type');
                    expect(pEl.textContent).withContext('should be defined').toBeDefined();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedSourceDescriptionListData.sources[0].type.trim()}`)
                        .toBe(expectedSourceDescriptionListData.sources[0].type.trim());
                });

                it('... the third paragraph displaying the source location', () => {
                    const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-head', 2, 2);

                    const pDes = getAndExpectDebugElementByCss(divDes[0], 'p', 3, 3);

                    const pEl = pDes[2].nativeElement;

                    expect(pEl).toHaveClass('awg-source-description-location');
                    expect(pEl.textContent).withContext('should be defined').toBeDefined();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedSourceDescriptionListData.sources[0].location.trim()}`)
                        .toBe(expectedSourceDescriptionListData.sources[0].location.trim());
                });
            });

            describe('... second description div', () => {
                it('... should contain a description-head div, and a description-body', () => {
                    const divDes = getAndExpectDebugElementByCss(
                        compDe,
                        'div.awg-source-description-list > div.awg-source-description',
                        2,
                        2
                    );

                    getAndExpectDebugElementByCss(divDes[1], 'div.awg-source-description-head', 1, 1);
                    getAndExpectDebugElementByCss(divDes[1], 'div.awg-source-description-body', 1, 1);
                });

                it('... should contain 2 paragraphs in second description-head div', () => {
                    const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-head', 2, 2);

                    getAndExpectDebugElementByCss(divDes[1], 'p', 2, 2);
                });

                it('... the first paragraph displaying a siglum (bold) with addendum', () => {
                    const expectedSiglum =
                        expectedSourceDescriptionListData.sources[1].siglum +
                        expectedSourceDescriptionListData.sources[1].siglumAddendum;

                    const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-head', 2, 2);

                    const pDes = getAndExpectDebugElementByCss(divDes[1], 'p', 2, 2);
                    const pEl = pDes[0].nativeElement;

                    const addendumDes = getAndExpectDebugElementByCss(pDes[0], 'span', 1, 1);
                    const addendumEl = addendumDes[0].nativeElement;

                    expect(pEl).toHaveClass('awg-source-description-siglum');
                    expect(pEl).toHaveClass('bold');

                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent).withContext('should be defined').toBeDefined();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedSiglum.trim()}`)
                        .toBe(expectedSiglum.trim());

                    expect(addendumEl).toHaveClass('awg-source-description-siglum-addendum');
                    expect(addendumEl.textContent).toBeTruthy();
                    expect(addendumEl.textContent.trim())
                        .withContext(`should be ${expectedSourceDescriptionListData.sources[1].siglumAddendum}`)
                        .toBe(expectedSourceDescriptionListData.sources[1].siglumAddendum);
                });

                it('... the second paragraph displaying the source location', () => {
                    const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-head', 2, 2);

                    const pDes = getAndExpectDebugElementByCss(divDes[1], 'p', 2, 2);
                    const pEl = pDes[1].nativeElement;

                    expect(pEl).toHaveClass('awg-source-description-location');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedSourceDescriptionListData.sources[1].location.trim()}`)
                        .toBe(expectedSourceDescriptionListData.sources[1].location.trim());
                });

                it('... should contain up to 9 paragraphs in description-body div', () => {
                    getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                });

                it('... the first possible paragraph displaying the description', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[0].nativeElement;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        expectedSourceDescriptionListData.sources[1].description.desc[0];

                    expect(pEl).toHaveClass('awg-source-description-desc');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim());
                });

                it('... the second possible paragraph displaying the writingMaterial', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[1].nativeElement;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        '<span class="caps">Beschreibstoff:&nbsp;</span><span>' +
                        expectedSourceDescriptionListData.sources[1].description.writingMaterial +
                        '</span>';

                    expect(pEl).toHaveClass('awg-source-description-writing-material');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim().toLowerCase())
                        // .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim().toLowerCase());
                });

                it('... the third possible paragraph displaying the writingInstruments', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[2].nativeElement;

                    const instruments = expectedSourceDescriptionListData.sources[1].description.writingInstruments;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        '<span class="caps">Schreibstoff:&nbsp;</span><span>' +
                        instruments.main +
                        ';&nbsp;' +
                        instruments.secondary.join(',&nbsp;') +
                        '.</span>';

                    expect(pEl).toHaveClass('awg-source-description-writing-instruments');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim().toLowerCase())
                        .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim().toLowerCase());
                });

                it('... the fourth possible paragraph displaying the title', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[3].nativeElement;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        'Titel:&nbsp;' + expectedSourceDescriptionListData.sources[1].description.title;

                    expect(pEl).toHaveClass('awg-source-description-title');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim());
                });

                it('... the fifth possible paragraph displaying the date', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[4].nativeElement;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        'Datierung:&nbsp;' + expectedSourceDescriptionListData.sources[1].description.date;

                    expect(pEl).toHaveClass('awg-source-description-date');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim());
                });

                it('... the sixth possible paragraph displaying the pagination', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[5].nativeElement;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        'Paginierung:&nbsp;' + expectedSourceDescriptionListData.sources[1].description.pagination;

                    expect(pEl).toHaveClass('awg-source-description-pagination');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim());
                });

                it('... the seventh possible paragraph displaying the measure numbers', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[6].nativeElement;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        'Taktzahlen:&nbsp;' + expectedSourceDescriptionListData.sources[1].description.measureNumbers;

                    expect(pEl).toHaveClass('awg-source-description-measure-numbers');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim());
                });

                it('... the eighth possible paragraph displaying the instrumentation', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[7].nativeElement;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        'Instrumentenvorsatz:&nbsp;' +
                        expectedSourceDescriptionListData.sources[1].description.instrumentation;

                    expect(pEl).toHaveClass('awg-source-description-instrumentation');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim());
                });

                it('... the ninth possible paragraph displaying the annotations', () => {
                    const pDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body > p', 9, 9);
                    const pEl = pDes[8].nativeElement;

                    // Process HTML expression of expected text content
                    const expectedHtmlTextContent = mockDocument.createElement('p');
                    expectedHtmlTextContent.innerHTML =
                        'Eintragungen:&nbsp;' + expectedSourceDescriptionListData.sources[1].description.annotations;

                    expect(pEl).toHaveClass('awg-source-description-annotations');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim())
                        .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                        .toBe(expectedHtmlTextContent.textContent.trim());
                });

                it('... should contain one description-content div in description-body div', () => {
                    getAndExpectDebugElementByCss(
                        compDe,
                        'div.awg-source-description-body > div.awg-source-description-content',
                        1,
                        1
                    );
                });

                it('... should contain one paragraph (no-para) displaying the label "Inhalt:" in description-content div', () => {
                    const pDes = getAndExpectDebugElementByCss(
                        compDe,
                        'div.awg-source-description-body > div.awg-source-description-content > p.no-para',
                        1,
                        1
                    );
                    const pEl = pDes[0].nativeElement;

                    expect(pEl).toHaveClass('no-para');
                    expect(pEl.textContent).toBeTruthy();
                    expect(pEl.textContent.trim()).withContext(`should be 'Inhalt:'`).toBe('Inhalt:');
                });

                it('... should contain as many item paragraphs (half-para) in description-content div as given content items', () => {
                    getAndExpectDebugElementByCss(
                        compDe,
                        'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                        expectedSourceDescriptionListData.sources[1].description.content.length,
                        expectedSourceDescriptionListData.sources[1].description.content.length
                    );
                });

                describe('... the item paragraphs (half-para)', () => {
                    it('... should contain the content items', () => {
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );

                        const itemDes0 = getAndExpectDebugElementByCss(
                            pDes[0],
                            'span.awg-source-description-content-item',
                            1,
                            1
                        );
                        const itemEl0 = itemDes0[0].nativeElement;

                        const itemDes1 = getAndExpectDebugElementByCss(
                            pDes[1],
                            'span.awg-source-description-content-item',
                            1,
                            1
                        );
                        const itemEl1 = itemDes1[0].nativeElement;

                        const itemDes2 = getAndExpectDebugElementByCss(
                            pDes[2],
                            'span.awg-source-description-content-item',
                            1,
                            1
                        );
                        const itemEl2 = itemDes2[0].nativeElement;

                        expect(itemEl0.textContent).toBeTruthy();
                        expect(itemEl0.textContent.trim()).toBe('Test item (test description):');

                        expect(itemEl1.textContent).toBeTruthy();
                        expect(itemEl1.textContent.trim()).toBe('Test item 2 without link (test description 2):');

                        expect(itemEl2.textContent).toBeTruthy();
                        expect(itemEl2.textContent.trim()).toBe('Test item 3 without description:');
                    });

                    it('... should display the content-item (strong) with anchor link and description if given', () => {
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );
                        const contentItemDes = getAndExpectDebugElementByCss(
                            pDes[0],
                            'span.awg-source-description-content-item',
                            1,
                            1
                        );
                        const anchorDes = getAndExpectDebugElementByCss(contentItemDes[0], 'a', 1, 1);
                        const strongDes = getAndExpectDebugElementByCss(anchorDes[0], 'strong', 1, 1);
                        const strongEl = strongDes[0].nativeElement;

                        const contentItemDescriptionDes = getAndExpectDebugElementByCss(
                            pDes[0],
                            'span.awg-source-description-content-item-description',
                            1,
                            1
                        );
                        const contentItemDescriptionEl = contentItemDescriptionDes[0].nativeElement;

                        expect(strongEl.textContent).toBeTruthy();
                        expect(strongEl.textContent.trim()).toBe('Test item');

                        expect(contentItemDescriptionEl.textContent).toBeTruthy();
                        expect(contentItemDescriptionEl.textContent.trim()).toBe('(test description)');
                    });

                    it('... should display the content-item (strong) without anchor link if not given', () => {
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );
                        const contentItemDes = getAndExpectDebugElementByCss(
                            pDes[1],
                            'span.awg-source-description-content-item',
                            1,
                            1
                        );
                        getAndExpectDebugElementByCss(contentItemDes[0], 'a', 0, 0);
                        const strongDes = getAndExpectDebugElementByCss(contentItemDes[0], 'strong', 1, 1);
                        const strongEl = strongDes[0].nativeElement;

                        const contentItemDescriptionDes = getAndExpectDebugElementByCss(
                            pDes[1],
                            'span.awg-source-description-content-item-description',
                            1,
                            1
                        );
                        const contentItemDescriptionEl = contentItemDescriptionDes[0].nativeElement;

                        expect(strongEl.textContent).toBeTruthy();
                        expect(strongEl.textContent.trim()).toBe('Test item 2 without link');

                        expect(contentItemDescriptionEl.textContent).toBeTruthy();
                        expect(contentItemDescriptionEl.textContent.trim()).toBe('(test description 2)');
                    });

                    it('... should display the content-item (strong) without description if not given', () => {
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );
                        const contentItemDes = getAndExpectDebugElementByCss(
                            pDes[2],
                            'span.awg-source-description-content-item',
                            1,
                            1
                        );
                        const anchorDes = getAndExpectDebugElementByCss(contentItemDes[0], 'a', 1, 1);
                        const strongDes = getAndExpectDebugElementByCss(anchorDes[0], 'strong', 1, 1);
                        const strongEl = strongDes[0].nativeElement;

                        getAndExpectDebugElementByCss(
                            pDes[2],
                            'span.awg-source-description-content-item-description',
                            0,
                            0
                        );

                        expect(strongEl.textContent).toBeTruthy();
                        expect(strongEl.textContent.trim()).toBe('Test item 3 without description');
                    });
                });

                describe('... the content item folios', () => {
                    it('... should contain as many folio spans (content-item-folio) in item paragraphs as given content item folios', () => {
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const expectedFolioLength =
                            expectedSourceDescriptionListData.sources[1].description.content[0].folios.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );
                        getAndExpectDebugElementByCss(
                            pDes[0],
                            'span.awg-source-description-content-item-folio',
                            expectedFolioLength,
                            expectedFolioLength
                        );
                    });

                    it('... should have `tab` class on folio spans (content-item-folio) if content.item is given', () => {
                        // Get number of all content items of mockdata
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );

                        // Get length of folio array of 1st content item array of mockdata
                        const expectedFolioLength =
                            expectedSourceDescriptionListData.sources[1].description.content[0].folios.length;
                        const folioDes = getAndExpectDebugElementByCss(
                            pDes[0],
                            'span.awg-source-description-content-item-folio',
                            expectedFolioLength,
                            expectedFolioLength
                        );
                        const folioEl0 = folioDes[0].nativeElement;
                        const folioEl1 = folioDes[1].nativeElement;

                        expect(folioEl0).toHaveClass('tab');
                        expect(folioEl1).toHaveClass('tab');
                    });

                    it('... should have no tab class on folio spans (content-item-folio) if no content.item is given', () => {
                        // Get number of all content items of mockdata
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );

                        // Get length of folio array of 4th content item array of mockdata
                        const expectedFolioLength =
                            expectedSourceDescriptionListData.sources[1].description.content[3].folios.length;
                        const folioDes = getAndExpectDebugElementByCss(
                            pDes[3],
                            'span.awg-source-description-content-item-folio',
                            expectedFolioLength,
                            expectedFolioLength
                        );
                        const folioEl = folioDes[0].nativeElement;

                        expect(folioEl).not.toHaveClass('tab');
                    });

                    it('... should display the content-item-folio with anchor link if given', () => {
                        // Get number of all content items of mockdata
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );

                        // Get length of folio array of 1st content item array of mockdata
                        const expectedFolioLength =
                            expectedSourceDescriptionListData.sources[1].description.content[0].folios.length;
                        const folioDes = getAndExpectDebugElementByCss(
                            pDes[0],
                            'span.awg-source-description-content-item-folio',
                            expectedFolioLength,
                            expectedFolioLength
                        );

                        const anchorDes = getAndExpectDebugElementByCss(folioDes[0], 'a', 1, 1);
                        const anchorEl0 = anchorDes[0].nativeElement;

                        // Process HTML expression of expected text content
                        const expectedHtmlTextContent = mockDocument.createElement('a');
                        expectedHtmlTextContent.innerHTML =
                            '<span>Bl.&nbsp;<span class="awg-source-description-content-item-folio-number">1<sup class="awg-source-description-content-item-folio-side">r</sup></span></span>';

                        expect(anchorEl0.textContent).toBeTruthy();
                        expect(anchorEl0.textContent.trim())
                            .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                            .toBe(expectedHtmlTextContent.textContent.trim());
                    });

                    it('... should display the content-item-folio without anchor link if not given', () => {
                        // Get number of all content items of mockdata
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );

                        // Get length of folio array of 1st content item array of mockdata
                        const expectedFolioLength =
                            expectedSourceDescriptionListData.sources[1].description.content[0].folios.length;
                        const folioDes = getAndExpectDebugElementByCss(
                            pDes[0],
                            'span.awg-source-description-content-item-folio',
                            expectedFolioLength,
                            expectedFolioLength
                        );
                        getAndExpectDebugElementByCss(folioDes[1], 'a', 0, 0);

                        const folioEl1 = folioDes[1].nativeElement;

                        // Process HTML expression of expected text content
                        const expectedHtmlTextContent = mockDocument.createElement('a');
                        expectedHtmlTextContent.innerHTML =
                            '<span>Bl.&nbsp;<span class="awg-source-description-content-item-folio-number">29<sup class="awg-source-description-content-item-folio-side">v</sup></span></span>';

                        expect(folioEl1.textContent).toBeTruthy();
                        expect(folioEl1.textContent.trim())
                            .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                            .toBe(expectedHtmlTextContent.textContent.trim());
                    });

                    it('... should display the content-item-folio with description if given', () => {
                        // Get number of all content items of mockdata
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );

                        // Get length of folio array of 4th content item array of mockdata
                        const expectedFolioLength =
                            expectedSourceDescriptionListData.sources[1].description.content[3].folios.length;
                        const folioDes = getAndExpectDebugElementByCss(
                            pDes[3],
                            'span.awg-source-description-content-item-folio',
                            expectedFolioLength,
                            expectedFolioLength
                        );
                        const folioEl = folioDes[0].nativeElement;

                        // Process HTML expression of expected text content
                        const expectedHtmlTextContent = mockDocument.createElement('a');
                        expectedHtmlTextContent.innerHTML =
                            '<span>Bl.&nbsp;<span class="awg-source-description-content-item-folio-number">2<sup class="awg-source-description-content-item-folio-side">v</sup></span></span><span class="awg-source-description-content-item-folio-description">&nbsp;Test item 4 without item</span>';

                        expect(folioEl.textContent).toBeTruthy();
                        expect(folioEl.textContent.trim())
                            .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                            .toBe(expectedHtmlTextContent.textContent.trim());
                    });
                });

                describe('... the content item systems', () => {
                    it('... should contain as many system spans (content-item-system) in content item folios as given systems', () => {
                        // Get number of all content items of mockdata
                        const expectedContent = expectedSourceDescriptionListData.sources[1].description.content;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContent.length,
                            expectedContent.length
                        );
                        pDes.forEach((pDe, pIndex) => {
                            // Get length of nested system groups array of all folios of 1st content item array of mockdata
                            const systemGroups = [];
                            expectedContent[pIndex].folios.forEach(folio => {
                                systemGroups.push(folio.systemGroups.flat());
                            });
                            const expectedSystems = systemGroups.flat();

                            getAndExpectDebugElementByCss(
                                pDe,
                                'span.awg-source-description-content-item-system',
                                expectedSystems.length,
                                expectedSystems.length
                            );
                        });
                    });

                    it('... should display the system labels', () => {
                        // Get number of all content items of mockdata
                        const expectedContent = expectedSourceDescriptionListData.sources[1].description.content;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContent.length,
                            expectedContent.length
                        );
                        pDes.forEach((pDe, pIndex) => {
                            // Get length of nested system groups array of all folios of 1st content item array of mockdata
                            const systemGroups = [];
                            expectedContent[pIndex].folios.forEach(folio => {
                                systemGroups.push(folio.systemGroups.flat());
                            });
                            const expectedSystems = systemGroups.flat();

                            const systemDes = getAndExpectDebugElementByCss(
                                pDe,
                                'span.awg-source-description-content-item-system',
                                expectedSystems.length,
                                expectedSystems.length
                            );
                            systemDes.forEach((system, index) => {
                                const systemEl = system.nativeElement;

                                const expectedHtmlTextContent = mockDocument.createElement('span');
                                expectedHtmlTextContent.innerHTML = `System&nbsp;${expectedSystems[index].system}:`;

                                expect(systemEl.textContent).toBeTruthy();
                                expect(systemEl.textContent.trim())
                                    .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                                    .toBe(expectedHtmlTextContent.textContent.trim());
                            });
                        });
                    });

                    it('... should display the system description if given', () => {
                        // Get number of all content items of mockdata
                        const expectedContent = expectedSourceDescriptionListData.sources[1].description.content;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContent.length,
                            expectedContent.length
                        );
                        pDes.forEach((pDe, pIndex) => {
                            // Get length of nested system groups array of all folios of 1st content item array of mockdata
                            const systemGroups = [];
                            expectedContent[pIndex].folios.forEach(folio => {
                                systemGroups.push(folio.systemGroups.flat());
                            });
                            const expectedSystems = systemGroups.flat();
                            const expectedSystemDescriptions = expectedSystems.filter(
                                system => system.systemDescription !== undefined && system.systemDescription !== ''
                            );

                            const systemDescDes = getAndExpectDebugElementByCss(
                                pDe,
                                'span.awg-source-description-content-item-system-description',
                                expectedSystemDescriptions.length,
                                expectedSystemDescriptions.length
                            );
                            systemDescDes.forEach((systemDesc, index) => {
                                const systemDescEl = systemDesc.nativeElement;
                                const expectedSystemDescText = expectedSystemDescriptions[index].systemDescription;

                                expect(systemDescEl.textContent).toBeTruthy();
                                expect(systemDescEl.textContent.trim())
                                    .withContext(`should be ${expectedSystemDescText}`)
                                    .toBe(expectedSystemDescText);
                            });
                        });
                    });

                    it('... should display measure numbers if given', () => {
                        // Get number of all content items of mockdata
                        const expectedContent = expectedSourceDescriptionListData.sources[1].description.content;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContent.length,
                            expectedContent.length
                        );
                        pDes.forEach((pDe, pIndex) => {
                            // Get length of nested system groups array of all folios of 1st content item array of mockdata
                            const systemGroups = [];
                            expectedContent[pIndex].folios.forEach(folio => {
                                systemGroups.push(folio.systemGroups.flat());
                            });
                            const expectedSystems = systemGroups.flat();
                            const expectedSystemMeasures = expectedSystems.filter(
                                system => system.measure !== undefined && system.measure !== ''
                            );
                            const systemMeasureDes = getAndExpectDebugElementByCss(
                                pDe,
                                'span.awg-source-description-content-item-measure',
                                expectedSystemMeasures.length,
                                expectedSystemMeasures.length
                            );
                            systemMeasureDes.forEach((systemMeasure, index) => {
                                const systemMeasureEl = systemMeasure.nativeElement;

                                const expectedHtmlTextContent = mockDocument.createElement('span');
                                expectedHtmlTextContent.innerHTML = `T.&nbsp;${expectedSystemMeasures[index].measure}`;

                                expect(systemMeasureEl.textContent).toBeTruthy();
                                expect(systemMeasureEl.textContent.trim())
                                    .withContext(`should be ${expectedHtmlTextContent.textContent.trim()}`)
                                    .toBe(expectedHtmlTextContent.textContent.trim());
                            });
                        });
                    });

                    it('... should have `doubletab` class if the folio label length equals 2 and the system is not in the first systemGroup, and has measures', () => {
                        // Get number of all content items of mockdata
                        const expectedContent = expectedSourceDescriptionListData.sources[1].description.content;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContent.length,
                            expectedContent.length
                        );

                        // Get length of nested system groups array of all folios of 1st content item array of mockdata
                        const contentIndex = 0;
                        let expectedSystemLength = 0;
                        expectedContent[contentIndex].folios.forEach(folio => {
                            expectedSystemLength += folio.systemGroups.flat().length;
                        });

                        const systemDes = getAndExpectDebugElementByCss(
                            pDes[contentIndex],
                            'span.awg-source-description-content-item-system',
                            expectedSystemLength,
                            expectedSystemLength
                        );
                        const systemEl0 = systemDes[0].nativeElement;
                        const systemEl1 = systemDes[1].nativeElement;
                        const systemEl2 = systemDes[2].nativeElement;
                        const systemEl3 = systemDes[3].nativeElement;

                        // Bl. 1r
                        expect(systemEl0).not.toHaveClass('doubletab');
                        expect(systemEl1).toHaveClass('doubletab');

                        // Bl. 29v
                        expect(systemEl2).not.toHaveClass('doubletab');
                        expect(systemEl3).not.toHaveClass('doubletab');
                    });

                    it('... should have `doubletab_two` class if the folio label length is greater 2 and the system is not in the first systemGroup, and has measures', () => {
                        // Get number of all content items of mockdata
                        const expectedContent = expectedSourceDescriptionListData.sources[1].description.content;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContent.length,
                            expectedContent.length
                        );

                        // Get length of nested system groups array of all folios of 1st content item array of mockdata
                        const contentIndex = 0;
                        let expectedSystemLength = 0;
                        expectedContent[contentIndex].folios.forEach(folio => {
                            expectedSystemLength += folio.systemGroups.flat().length;
                        });

                        const systemDes = getAndExpectDebugElementByCss(
                            pDes[contentIndex],
                            'span.awg-source-description-content-item-system',
                            expectedSystemLength,
                            expectedSystemLength
                        );
                        const systemEl0 = systemDes[0].nativeElement;
                        const systemEl1 = systemDes[1].nativeElement;
                        const systemEl2 = systemDes[2].nativeElement;
                        const systemEl3 = systemDes[3].nativeElement;

                        // Bl. 1r
                        expect(systemEl0).not.toHaveClass('doubletab_two');
                        expect(systemEl1).not.toHaveClass('doubletab_two');

                        // Bl. 29v
                        expect(systemEl2).not.toHaveClass('doubletab_two');
                        expect(systemEl3).toHaveClass('doubletab_two');
                    });

                    it('... should have `tab` class if the system has rows and is not the first system', () => {
                        // Get number of all content items of mockdata
                        const expectedContent = expectedSourceDescriptionListData.sources[1].description.content;
                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContent.length,
                            expectedContent.length
                        );

                        // Get length of nested system groups array of all folios of 2nd content item array of mockdata
                        const contentIndex = 1;
                        let expectedSystemLength = 0;
                        expectedContent[contentIndex].folios.forEach(folio => {
                            expectedSystemLength += folio.systemGroups.flat().length;
                        });

                        const systemDes = getAndExpectDebugElementByCss(
                            pDes[contentIndex],
                            'span.awg-source-description-content-item-system',
                            expectedSystemLength,
                            expectedSystemLength
                        );
                        const systemEl0 = systemDes[0].nativeElement;
                        const systemEl1 = systemDes[1].nativeElement;
                        const systemEl2 = systemDes[2].nativeElement;
                        const systemEl3 = systemDes[3].nativeElement;
                        const systemEl4 = systemDes[4].nativeElement;
                        const systemEl5 = systemDes[5].nativeElement;
                        const systemEl6 = systemDes[6].nativeElement;
                        const systemEl7 = systemDes[7].nativeElement;

                        // Bl. 1r
                        expect(systemEl0).not.toHaveClass('tab');
                        expect(systemEl1).toHaveClass('tab');
                        expect(systemEl2).not.toHaveClass('tab');
                        expect(systemEl3).toHaveClass('tab');

                        // Bl. 29v
                        expect(systemEl4).not.toHaveClass('tab');
                        expect(systemEl5).toHaveClass('tab');
                        expect(systemEl6).not.toHaveClass('tab');
                        expect(systemEl7).toHaveClass('tab');
                    });

                    it('... should have `doubletab` class if the system has rows, is first system, but not in the first systemGroup, and the folio length equals 2', () => {
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const expectedSystemLength = 8;

                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );
                        // Systems with measures
                        const systemDes = getAndExpectDebugElementByCss(
                            pDes[1],
                            'span.awg-source-description-content-item-system',
                            expectedSystemLength,
                            expectedSystemLength
                        );
                        const systemEl0 = systemDes[0].nativeElement;
                        const systemEl1 = systemDes[1].nativeElement;
                        const systemEl2 = systemDes[2].nativeElement;
                        const systemEl3 = systemDes[3].nativeElement;
                        const systemEl4 = systemDes[4].nativeElement;
                        const systemEl5 = systemDes[5].nativeElement;
                        const systemEl6 = systemDes[6].nativeElement;
                        const systemEl7 = systemDes[7].nativeElement;

                        // Bl. 1r
                        expect(systemEl0).not.toHaveClass('doubletab');
                        expect(systemEl1).not.toHaveClass('doubletab');
                        expect(systemEl2).toHaveClass('doubletab');
                        expect(systemEl3).not.toHaveClass('doubletab');

                        // Bl. 29v
                        expect(systemEl4).not.toHaveClass('doubletab');
                        expect(systemEl5).not.toHaveClass('doubletab');
                        expect(systemEl6).not.toHaveClass('doubletab');
                        expect(systemEl7).not.toHaveClass('doubletab');
                    });

                    it('... should have `doubletab_two` class if the system has rows, is first system, but not in the first systemGroup, and the folio length is greater 2', () => {
                        const expectedContentLength =
                            expectedSourceDescriptionListData.sources[1].description.content.length;
                        const expectedSystemLength = 8;

                        const pDes = getAndExpectDebugElementByCss(
                            compDe,
                            'div.awg-source-description-body > div.awg-source-description-content > p.half-para',
                            expectedContentLength,
                            expectedContentLength
                        );
                        // Systems with measures
                        const systemDes = getAndExpectDebugElementByCss(
                            pDes[1],
                            'span.awg-source-description-content-item-system',
                            expectedSystemLength,
                            expectedSystemLength
                        );
                        const systemEl0 = systemDes[0].nativeElement;
                        const systemEl1 = systemDes[1].nativeElement;
                        const systemEl2 = systemDes[2].nativeElement;
                        const systemEl3 = systemDes[3].nativeElement;
                        const systemEl4 = systemDes[4].nativeElement;
                        const systemEl5 = systemDes[5].nativeElement;
                        const systemEl6 = systemDes[6].nativeElement;
                        const systemEl7 = systemDes[7].nativeElement;

                        // Bl. 1r
                        expect(systemEl0).not.toHaveClass('doubletab_two');
                        expect(systemEl1).not.toHaveClass('doubletab_two');
                        expect(systemEl2).not.toHaveClass('doubletab_two');
                        expect(systemEl3).not.toHaveClass('doubletab_two');

                        // Bl. 29v
                        expect(systemEl4).not.toHaveClass('doubletab_two');
                        expect(systemEl5).not.toHaveClass('doubletab_two');
                        expect(systemEl6).toHaveClass('doubletab_two');
                        expect(systemEl7).not.toHaveClass('doubletab_two');
                    });
                });
            });
        });

        describe('#openModal()', () => {
            it('... should have a method `openModal`', () => {
                expect(component.openModal).toBeDefined();
            });

            it('... should trigger on click', fakeAsync(() => {
                const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body', 1, 1);
                // Find description paragraphs
                const pDes = getAndExpectDebugElementByCss(divDes[0], 'p.awg-source-description-desc', 1, 1);

                // Find anchors in second description paragraph
                const anchorDes = getAndExpectDebugElementByCss(pDes[0], 'a', 1, 1);

                // Click on first anchor with modal call
                clickAndAwaitChanges(anchorDes[0], fixture);

                expectSpyCall(openModalSpy, 1, expectedModalSnippet);
            }));

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

            it('... should trigger on click', fakeAsync(() => {
                const divDes = getAndExpectDebugElementByCss(compDe, 'div.awg-source-description-body', 1, 1);

                // Find content item spans
                const contentItemDes = getAndExpectDebugElementByCss(
                    divDes[0],
                    'span.awg-source-description-content-item',
                    3,
                    3
                );

                // Find anchors in second paragraph
                const anchorDes = getAndExpectDebugElementByCss(contentItemDes[0], 'a', 1, 1);

                // CLick on anchor (with selectSvgSheet call)
                clickAndAwaitChanges(anchorDes[0], fixture);

                expectSpyCall(selectSvgSheetSpy, 1, expectedSheetId);
            }));

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
