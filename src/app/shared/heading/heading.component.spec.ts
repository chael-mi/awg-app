/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { getAndExpectDebugElementByCss } from '@testing/expect-helper';

import { HeadingComponent } from './heading.component';

describe('HeadingComponent (DONE)', () => {
    let component: HeadingComponent;
    let fixture: ComponentFixture<HeadingComponent>;
    let compDe: DebugElement;
    let compEl: any;

    let expectedTitle: string;
    let expectedId: string;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeadingComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeadingComponent);
        component = fixture.componentInstance;
        compDe = fixture.debugElement;
        compEl = compDe.nativeElement;

        // test data
        expectedTitle = 'Test Title';
        expectedId = '23';
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('BEFORE initial data binding', () => {
        it('... should not have `title` and `id`', () => {
            expect(component.title).toBeUndefined();
            expect(component.id).toBeUndefined();
        });

        describe('VIEW', () => {
            it('... should contain one div.para with an h3', () => {
                getAndExpectDebugElementByCss(compDe, 'div.para', 1, 1);
                getAndExpectDebugElementByCss(compDe, 'div.para > h3', 1, 1);
            });
        });
    });

    describe('AFTER initial data binding', () => {
        beforeEach(() => {
            // simulate the parent setting the input properties
            component.title = expectedTitle;
            component.id = expectedId;

            // trigger initial data binding
            fixture.detectChanges();
        });

        describe('VIEW', () => {
            it('... should pass down `title` and `id` to component', () => {
                const divDes = getAndExpectDebugElementByCss(compDe, 'div.para', 1, 1);
                const headerDes = getAndExpectDebugElementByCss(compDe, 'div.para > h3', 1, 1);

                const divEl = divDes[0].nativeElement;
                const headerEl = headerDes[0].nativeElement;

                expect(divEl.id).toBeDefined();
                expect(divEl.id).toContain(expectedId, `should contain ${expectedId}`);

                expect(headerEl.textContent).toBeDefined();
                expect(headerEl.textContent).toContain(expectedTitle, `should contain ${expectedTitle}`);
            });
        });
    });
});
