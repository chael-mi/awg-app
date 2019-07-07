import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { faTable, faGripHorizontal } from '@fortawesome/free-solid-svg-icons';

import { SearchInfo } from '@awg-side-info/side-info-models';
import { SearchResponseJson } from '@awg-shared/api-objects';
import { SearchParams, SearchResponseWithQuery } from '@awg-views/data-view/models';

import { ConversionService, DataStreamerService, SideInfoService } from '@awg-core/services';

@Component({
    selector: 'awg-search-result-list',
    templateUrl: './search-result-list.component.html',
    styleUrls: ['./search-result-list.component.css']
})
export class SearchResultListComponent implements OnInit, OnDestroy {
    @Input()
    searchUrl: string;
    @Input()
    searchParams: SearchParams;
    @Output()
    pageChangeRequest: EventEmitter<string> = new EventEmitter();
    @Output()
    rowChangeRequest: EventEmitter<string> = new EventEmitter();
    @Output()
    viewChangeRequest: EventEmitter<string> = new EventEmitter();

    errorMessage: any = undefined;
    currentId: string;

    radioViewForm: FormGroup;
    page: number;
    pageSize: number;
    rowNumberArray = [5, 10, 25, 50, 100, 200];

    streamerServiceSubscription: Subscription;
    searchResponse: SearchResponseJson;
    searchResultText: string;
    searchValue: string;

    faGripHorizontal = faGripHorizontal;
    faTable = faTable;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private conversionService: ConversionService,
        private sideInfoService: SideInfoService,
        private streamerService: DataStreamerService
    ) {}

    ngOnInit() {
        this.streamerServiceSubscription = this.subscribeToStreamerService();
        if (this.searchParams.view && (this.searchParams.view === 'table' || this.searchParams.view === 'grid')) {
            this.buildForm(this.searchParams.view);
        }
    }

    // build radio view form
    buildForm(view: string) {
        this.radioViewForm = this.fb.group({
            radioViewControl: view
        });

        this.checkForUserInputChanges();
    }

    // check for changing view values
    checkForUserInputChanges(): void {
        this.radioViewForm.get('radioViewControl').valueChanges.subscribe((view: string) => {
            this.onViewChange(view);
        });
    }

    isActiveResource(id: string): boolean {
        return this.currentId === id;
    }

    /**
     * Public method: navigateToResource.
     *
     * It navigates to the '/data/resource' route
     * with the given id.
     *
     * @param {string} id The given resource id.
     * @returns {void} Navigates to the resource.
     */
    navigateToResource(id: string): void {
        this.currentId = id;
        this.router.navigate(['/data/resource', this.currentId]);
    }

    // emit page change to search panel
    onPageChange(pageNumber: number): void {
        const nRowsNumber = +this.searchParams.nRows;
        const newStartPosition = pageNumber * nRowsNumber - nRowsNumber;

        this.pageChangeRequest.emit(String(newStartPosition));
    }

    // emit row change to search panel
    onRowChange(rowNumber: number): void {
        this.rowChangeRequest.emit(String(rowNumber));
    }

    // emit view change to search panel
    onViewChange(view: string): void {
        this.viewChangeRequest.emit(view);
    }

    // set values for pagination
    setPagination(): void {
        const nRowsNumber = +this.searchParams.nRows;
        const startAtNumber = +this.searchParams.startAt;

        this.pageSize = nRowsNumber;
        this.page = Math.floor(startAtNumber / nRowsNumber) + 1;
    }

    subscribeToStreamerService(): Subscription {
        // call to streamer service
        const searchResponseWithQuery$: Observable<
            SearchResponseWithQuery
        > = this.streamerService.getSearchResponseWithQuery();

        // subscribe to response to handle changes
        return searchResponseWithQuery$.subscribe(
            (searchResponseWithQuery: SearchResponseWithQuery) => {
                // update current search params (url, text, sideinfo) via streamer service
                this.updateSearchParams(searchResponseWithQuery);

                this.searchResponse = { ...searchResponseWithQuery.data };

                this.setPagination();
            },
            error => {
                this.errorMessage = error as any;
                console.log('SearchResultList# searchResultData subscription error: ', this.errorMessage);
            }
        );
    }

    /**
     * Public method: trackById.
     *
     * It returns a unique identifier of a given item.
     * Angular uses the value returned from
     * tracking function to track items identity.
     *
     * @param {string} item The given item.
     * @returns {string} The identifier of the item.
     */
    trackById(item): string {
        return item.obj_id;
    }

    // update search params
    updateSearchParams(searchResponseWithQuery: SearchResponseWithQuery): void {
        // update current search values
        this.updateCurrentValues(searchResponseWithQuery);

        // update side info
        this.updateSearchInfoService();
    }

    // update current search values
    updateCurrentValues(searchResponseWithQuery: SearchResponseWithQuery): void {
        // get current search value
        this.searchValue = searchResponseWithQuery.query;
        // prepare result text for fulltext search
        this.searchResultText = this.conversionService.prepareFullTextSearchResultText(
            searchResponseWithQuery.data,
            this.searchValue,
            this.searchUrl
        );
    }

    // update data for searchInfo via sideinfo service
    updateSearchInfoService(): void {
        const searchInfo: SearchInfo = new SearchInfo(this.searchValue, this.searchResultText);
        this.sideInfoService.updateSearchInfoData(searchInfo);
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        if (this.streamerServiceSubscription) {
            this.streamerServiceSubscription.unsubscribe();
        }
    }
}
