/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of as observableOf } from 'rxjs';

import { BibliographyDetailComponent } from './bibliography-detail.component';
import { BibliographyFormatPipe } from '../bibliography-format.pipe';
import { BibEntry } from '../bibliography-entry.model';

import { BibliographyService } from '@awg-views/data-view/services';
import { ConversionService } from '@awg-core/services';

import { ResourceFullResponseJson } from '@awg-shared/api-objects';

describe('BibliographyDetailComponent', () => {
    let component: BibliographyDetailComponent;
    let fixture: ComponentFixture<BibliographyDetailComponent>;

    let mockConversionService: Partial<ConversionService>;
    let getBibliographyListSpy: Observable<ResourceFullResponseJson>;

    let expectedObjId: string;
    let expectedBibItemDetailBody: ResourceFullResponseJson;
    let expectedConvertedBibItemDetail: BibEntry;

    beforeEach(
        waitForAsync(() => {
            // create a fake bibliography service object with a `getBibliographyItemDetail()` spy
            const mockBibliographyService = jasmine.createSpyObj('BibliographyService', ['getBibliographyItemDetail']);
            // make the spies return a synchronous Observable with the test data
            expectedBibItemDetailBody = new ResourceFullResponseJson();
            getBibliographyListSpy = mockBibliographyService.getBibliographyItemDetail.and.returnValue(
                observableOf(expectedBibItemDetailBody)
            );

            // stub conversionService to return convertedBibItemDetail
            expectedConvertedBibItemDetail = new BibEntry('Test', 'Monographie', 'Tim Test', 'Testbuch', '2018');
            mockConversionService = {
                convertObjectProperties: (resourceData: ResourceFullResponseJson) => expectedConvertedBibItemDetail
            };

            TestBed.configureTestingModule({
                declarations: [BibliographyDetailComponent, BibliographyFormatPipe],
                providers: [
                    { provide: BibliographyService, useValue: mockBibliographyService },
                    { provide: ConversionService, useValue: mockConversionService }
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BibliographyDetailComponent);
        component = fixture.componentInstance;

        // test data
        expectedObjId = '1234';
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('BEFORE initial data binding', () => {
        it('should not have objId input', () => {
            expect(component.objId).toBeUndefined('should be undefined');
        });
    });

    describe('AFTER initial data binding', () => {
        beforeEach(() => {
            // simulate the parent setting the input properties
            component.objId = expectedObjId;

            // trigger initial data binding
            fixture.detectChanges();
        });

        it('should have objId input', () => {
            expect(component.objId).toBe(expectedObjId);
        });
    });
});
