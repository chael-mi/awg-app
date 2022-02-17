import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import {
    PropertyTypesInResourceClassResponseJson,
    ResourceTypesInVocabularyResponseJson,
    ResTypeItemJson,
} from '@awg-shared/api-objects';

import { ExtendedSearchParams } from '@awg-views/data-view/models';
import { DataApiService } from '@awg-views/data-view/services';

import { SEARCH_COMPOP_LISTS, SearchCompop, VALUETYPE_LIST } from './compop';

@Component({
    selector: 'awg-extended-search-form',
    templateUrl: './extended-search-form.component.html',
    styleUrls: ['./extended-search-form.component.css'],
})
export class ExtendedSearchFormComponent implements OnInit {
    /**
     * Output variable: searchRequest.
     *
     * It keeps an event emitter for the extended search params.
     */
    @Output()
    searchRequest: EventEmitter<ExtendedSearchParams> = new EventEmitter();

    /**
     * Public variable: faPlus.
     *
     * It instantiates fontawesome's faPlus icon.
     */
    faPlus = faPlus;

    /**
     * Public variable: faSearch.
     *
     * It instantiates fontawesome's faSearch icon.
     */
    faSearch = faSearch;

    /**
     * Public variable: faTrash.
     *
     * It instantiates fontawesome's faTrash icon.
     */
    faTrash = faTrash;

    /**
     * Public variable: extendedSearchForm.
     *
     * It keeps the reactive form group: extendedSearchForm.
     */
    extendedSearchForm: FormGroup;

    extendedSearchParams: ExtendedSearchParams = new ExtendedSearchParams();

    restypesResponse: ResourceTypesInVocabularyResponseJson;
    propertyListsResponse: PropertyTypesInResourceClassResponseJson;
    selectedResourcetype: ResTypeItemJson;
    selectedProperties: string[];
    selectedCompopSets: SearchCompop[][] = [[]];

    defaultFormString = '---';

    /**
     * Public variable: searchFormString.
     *
     * It keeps the default text strings for the search form.
     */
    searchFormStrings = {
        label: 'Search Input',
        placeholder: 'Volltextsuche in der Webern-Datenbank …',
        errorMessage: 'Es wird ein Suchbegriff mit mindestens 3 Zeichen benötigt!',
    };

    constructor(private dataApiService: DataApiService, private formBuilder: FormBuilder) {}

    /**
     * Getter for the resource type control value.
     */
    get restypeControl() {
        return this.extendedSearchForm.get('restypeControl');
    }

    /**
     * Getter for the properties control value.
     */
    get propertiesControls(): FormArray {
        return this.extendedSearchForm.get('propertiesControls') as FormArray;
    }

    ngOnInit(): void {
        this.createExtendedSearchForm();
        this.getResourcetypes();
    }

    /**
     * Makes the field required if the predicate function returns true
     */
    _requiredIfValidator(predicate) {
        return formControl => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return Validators.required(formControl);
            }
            return null;
        };
    }

    toggle(index: number) {
        this.getSearchvalControlAtIndex(index).setValidators(
            this.getCompopoControlAtIndex(index).value === 'EXISTS' ? null : [Validators.required]
        );
        this.getSearchvalControlAtIndex(index).updateValueAndValidity();
    }

    /**
     * Public method: createExtendedSearchForm.
     *
     * It creates the search form using the reactive FormBuilder
     * with a formGroup and a resource type control and properties control.
     *
     * For the mechanism of FormArray with dynamic fields, see https://www.digitalocean.com/community/tutorials/angular-reactive-forms-formarray-dynamic-fields
     *
     * @returns {void} Creates the search form.
     */
    createExtendedSearchForm(): void {
        this.extendedSearchForm = this.formBuilder.group({
            restypeControl: ['', Validators.required],
            propertiesControls: this.formBuilder.array([]),
        });
        this.addPropertiesControl();
    }

    /**
     * Public method: addPropertiesControl.
     *
     * It creates a single property control using a reactive FormGroup
     * with a property control, compop control, and a searchValue control, and pushes this FormGroup to the propertiesControls FormArray.
     *
     * @returns {void} Creates the form group and adds it to the FormArray.
     */
    addPropertiesControl(): void {
        const group = this.formBuilder.group({
            propertyIdControl: ['', [Validators.required]],
            compopControl: ['', [Validators.required]],
            searchvalControl: [''],
        });

        this.propertiesControls.push(group);
    }

    removePropertiesControl(index: number): void {
        if (index > -1) {
            this.propertiesControls.removeAt(index);
        }
    }

    clearPropertiesControls() {
        this.propertiesControls.clear();
        this.addPropertiesControl(); // Add back first line of property inputs after clearing
    }

    getResourcetypes(): void {
        this.dataApiService.getResourceTypes().subscribe(
            (restypesResponse: ResourceTypesInVocabularyResponseJson) => {
                this.restypesResponse = restypesResponse;
                console.log(this.restypesResponse);

                this.listenToUserResourcetypeChange();
            },
            error => {
                console.error(error as any);
            }
        );
    }

    getPropertyLists(restypeId: string): void {
        this.dataApiService.getPropertyListsByResourceType(restypeId).subscribe(
            (properyListsResponse: PropertyTypesInResourceClassResponseJson) => {
                this.propertyListsResponse = properyListsResponse;
            },
            error => {
                console.error(error as any);
            }
        );
    }

    listenToUserResourcetypeChange(): void {
        this.restypeControl.valueChanges.subscribe((resourcetypeId: string) => {
            this.selectedResourcetype = this.restypesResponse.resourcetypes.find(r => r.id === resourcetypeId);

            this.clearPropertiesControls(); // Remove all previous property input fields

            console.log(resourcetypeId);

            if (this.selectedResourcetype) {
                console.log(this.selectedResourcetype);
                this.getPropertyLists(this.selectedResourcetype.id);
            }
        });
    }

    listenToUserPropertyChange(index: number): void {
        this._getFormArrayControlAtIndex('propertyIdControl', index).valueChanges.subscribe((propertyId: string) => {
            const propertyListEntry = this.getPopertyListEntryById(propertyId)[0];
            const guiElementId = propertyListEntry.guielement_id;
            const valueTypeId = propertyListEntry.valuetype_id;

            this.getCompopoControlAtIndex(index).setValue('');
            this.getSearchvalControlAtIndex(index).setValue('');

            this.selectedCompopSets[index] = this.getCompopSetByValueType(valueTypeId, guiElementId);
        });
    }

    getCompopSetByValueType(valueTypeId: string, guiElementId: string): SearchCompop[] {
        let compopSet: SearchCompop[] = [];
        const valueType = VALUETYPE_LIST.typeList.filter(vt => vt.id === valueTypeId);

        if (!valueType || valueType.length !== 1 || !valueType[0].id) {
            return [];
        } else {
            const id = valueType[0].id;

            if (id === '1' || (id === '6' && guiElementId === '14') || id === '14') {
                // 1 TEXT, 6 RESPTR if gui 14, 14 RICHTEXT
                compopSet = SEARCH_COMPOP_LISTS.compopList[5].compopSet;
            } else if (id === '2' || id === '3') {
                // 2 INTEGER, 3 FLOAT
                compopSet = SEARCH_COMPOP_LISTS.compopList[4].compopSet;
            } else if (id === '4' || id === '5') {
                // 4 DATE, 5 PERIOD
                compopSet = SEARCH_COMPOP_LISTS.compopList[3].compopSet;
            } else if (id === '13') {
                // 13 ICONCLASS
                compopSet = SEARCH_COMPOP_LISTS.compopList[2].compopSet;
            } else if (
                (id === '6' && (guiElementId === '3' || guiElementId === '6')) ||
                id === '7' ||
                id === '11' ||
                id === '12' ||
                id === '15'
            ) {
                // 6 RESPTR if gui 3 or 6 (not 14), 7 SELECTION, 11 COLOR, 12 HLIST, 15 GEONAMES
                compopSet = SEARCH_COMPOP_LISTS.compopList[1].compopSet;
            } else {
                // Minimal set for all other cases
                compopSet = SEARCH_COMPOP_LISTS.compopList[0].compopSet;
            }
        }
        return compopSet;
    }

    onReset(): void {
        alert('Gesamte Suchmaske zurücksetzen?');
        this._resetForm();
    }

    onSearch(): void {
        if (this.extendedSearchForm.valid) {
            this.extendedSearchParams = {
                filterByRestype: this.extendedSearchForm.value.restypeControl,
                propertyId: [],
                compop: [],
                searchval: [],
            };

            this.extendedSearchForm.value.propertiesControls.forEach((property, index) => {
                this.extendedSearchParams.propertyId.push(property.propertyIdControl);
                this.extendedSearchParams.compop.push(property.compopControl);
                this.extendedSearchParams.searchval.push(property.searchvalControl);
            });

            this.searchRequest.emit(this.extendedSearchParams);

            // .this._resetForm();
        }
    }

    getPopertyListEntryById(id: string) {
        return this.propertyListsResponse.properties.filter(property => property.id === id);
    }

    getPropertyIdControlAtIndex(index: number) {
        this.listenToUserPropertyChange(index);
        return this._getFormArrayControlAtIndex('propertyIdControl', index);
    }

    getCompopoControlAtIndex(index: number) {
        return this._getFormArrayControlAtIndex('compopControl', index);
    }

    getSearchvalControlAtIndex(index: number) {
        return this._getFormArrayControlAtIndex('searchvalControl', index);
    }

    getSearchvalPlaceholder(index: number): string {
        let placeholder = 'Suchbegriff';
        if (this.isSearchvalControlDisabled(index)) {
            placeholder = this.defaultFormString;
        }
        return placeholder;
    }

    isAddButtonDisabled(index: number): string | null {
        const compopValue = this.getCompopoControlAtIndex(index).value;

        return this._isPropertyIdOrCompopMissing(index) ||
            (compopValue !== 'EXISTS' && this._isSearchvalMissing(index)) ||
            this.getSearchvalControlAtIndex(index).errors?.minlength ||
            this._isNotLastProperty(index)
            ? ''
            : null;
    }

    isPropertyIdControlDisabled(): string | null {
        return this._isResourecetypeMissing() ? '' : null; // Mechanism needed to populate "attr.disabled", cf. https://stackoverflow.com/a/49087915
    }

    isCompopControlDisabled(index: number): string | null {
        return this.isPropertyIdControlDisabled() || this._isPropertyIdMissing(index) ? '' : null;
    }

    isSearchvalControlDisabled(index: number): string | null {
        const compopValue = this.getCompopoControlAtIndex(index).value;
        return this._isResourecetypeMissing() || this._isPropertyIdOrCompopMissing(index) || compopValue === 'EXISTS'
            ? ''
            : null;
    }

    private _getFormArrayControlAtIndex(controlName: string, index: number): any {
        return this.propertiesControls.controls[index].get(controlName);
    }

    private _isNotLastProperty(index: number): boolean {
        // Check if index is not at last position of FormArray
        const arrayLength = this.propertiesControls.controls.length;
        return arrayLength - 1 > index;
    }

    private _isResourecetypeMissing(): boolean {
        const resourceValue = this.restypeControl.value;
        return !resourceValue || resourceValue === this.defaultFormString;
    }

    private _isPropertyIdMissing(index: number): boolean {
        return this._isFormControlValueMissing('propertyIdControl', index);
    }

    private _isCompopMissing(index: number): boolean {
        return this._isFormControlValueMissing('compopControl', index);
    }

    private _isPropertyIdOrCompopMissing(index: number): boolean {
        return this._isPropertyIdMissing(index) || this._isCompopMissing(index);
    }

    private _isSearchvalMissing(index: number): boolean {
        return this._isFormControlValueMissing('searchvalControl', index);
    }

    private _isFormControlValueMissing(controlName: string, index: number): boolean {
        const formControlValue = this._getFormArrayControlAtIndex(controlName, index).value;
        return !formControlValue || formControlValue === this.defaultFormString;
    }

    private _resetForm() {
        return this.extendedSearchForm.reset();
    }
}
