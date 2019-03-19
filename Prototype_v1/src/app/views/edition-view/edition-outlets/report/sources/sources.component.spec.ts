/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { getAndExpectDebugElementByDirective } from '@testing/expect-helper';
import { RouterLinkStubDirective } from '@testing/router-stubs';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { SourceList } from '@awg-views/edition-view/models';

import { SourcesComponent } from './sources.component';

// mock components
@Component({ selector: 'awg-source-list', template: '' })
class SourceListStubComponent {
    @Input()
    sourceListData: SourceList;

    // TODO: handle outputs
}

@Component({ selector: 'awg-source-description', template: '' })
class SourceDescriptionStubComponent {
    @Input()
    showDescriptionPanel: boolean;

    // TODO: handle outputs
}

@Component({ selector: 'awg-source-evaluation', template: '' })
class SourceEvaluationStubComponent {
    // TODO: handle outputs
}

describe('SourcesComponent', () => {
    let component: SourcesComponent;
    let fixture: ComponentFixture<SourcesComponent>;
    let compDe: DebugElement;
    let compEl: any;

    let expectedSourceListData: SourceList;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgbAccordionModule, RouterTestingModule],
            declarations: [
                SourcesComponent,
                SourceListStubComponent,
                SourceDescriptionStubComponent,
                SourceEvaluationStubComponent,
                RouterLinkStubDirective
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SourcesComponent);
        component = fixture.componentInstance;
        compDe = fixture.debugElement;
        compEl = compDe.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('BEFORE initial data binding', () => {
        it('should not get sourceListData input', () => {
            expect(component.sourceListData).toBeUndefined('should be undefined');
        });

        it('should not contain source list component (stubbed)', () => {
            getAndExpectDebugElementByDirective(compDe, SourceListStubComponent, 0, 0);
        });

        it('should not contain source description component (stubbed)', () => {
            getAndExpectDebugElementByDirective(compDe, SourceDescriptionStubComponent, 0, 0);
        });

        it('should not contain source evaluation component (stubbed)', () => {
            getAndExpectDebugElementByDirective(compDe, SourceEvaluationStubComponent, 0, 0);
        });
    });

    describe('AFTER initial data binding', () => {
        beforeEach(() => {
            // mock the input values supplied by the parent component
            expectedSourceListData = {
                sources: [
                    {
                        siglum: 'A',
                        type: 'Skizzen',
                        location: 'Basel, Paul Sacher Stiftung, Sammlung Anton Webern.',
                        linkTo: 'sourceA'
                    },
                    {
                        siglum: 'B',
                        type: 'Autograph von Nr. I.',
                        location: 'Basel, Paul Sacher Stiftung, Sammlung Anton Webern.',
                        linkTo: 'sourceNotA'
                    },
                    {
                        siglum: 'C',
                        type: 'Autograph von Nr. I–IV.',
                        location: 'Basel, Paul Sacher Stiftung, Sammlung Anton Webern.',
                        linkTo: 'sourceNotA'
                    }
                ]
            };

            // simulate the parent setting the input properties
            component.sourceListData = expectedSourceListData;

            // trigger initial data binding
            fixture.detectChanges();
        });

        it('should get sourceListData input', () => {
            expect(component.sourceListData).toBe(expectedSourceListData);
        });

        it('should contain source list component (stubbed)', () => {
            getAndExpectDebugElementByDirective(compDe, SourceListStubComponent, 1, 1);
        });

        it('should contain source description component (stubbed)', () => {
            getAndExpectDebugElementByDirective(compDe, SourceDescriptionStubComponent, 1, 1);
        });

        it('should contain source evaluation component (stubbed)', () => {
            getAndExpectDebugElementByDirective(compDe, SourceEvaluationStubComponent, 1, 1);
        });
    });
});
