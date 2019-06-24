import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ConversionService, DataStreamerService } from '@awg-core/services';
import { DataApiService } from '@awg-views/data-view/services';

import { SearchResponseJson } from '@awg-shared/api-objects';
import { SearchParams, SearchResponseWithQuery } from '@awg-views/data-view/models';

@Component({
    selector: 'awg-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit, OnDestroy {
    navigationSubscription: Subscription;

    searchUrl = '';
    currentQueryParams: ParamMap;

    searchParams: SearchParams = {
        query: '',
        nRows: '10',
        startAt: '0',
        view: 'table'
    };

    errorMessage: any;
    isLoadingData = false;
    viewChanged = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private conversionService: ConversionService,
        private dataApiService: DataApiService,
        private streamerService: DataStreamerService
    ) {}

    ngOnInit() {
        this.navigationSubscription = this.subscribeToDataApiService();
    }

    // switch the load status
    changeLoadingStatus(status: boolean) {
        this.isLoadingData = status;
    }

    // start loading activities
    onLoadingStart(): void {
        this.changeLoadingStatus(true);
    }

    // end loading activities
    onLoadingEnd(): void {
        this.changeLoadingStatus(false);
    }

    // new startPosition after page change request
    onPageChange(requestedStartAt: string): void {
        if (requestedStartAt !== this.searchParams.startAt) {
            // view has not changed
            this.viewChanged = false;

            const sp: SearchParams = {
                query: this.searchParams.query,
                nRows: this.searchParams.nRows,
                startAt: requestedStartAt,
                view: this.searchParams.view
            };
            // route to new params
            this.routeToSelf(sp);
        }
    }

    // new row number after row change request
    onRowChange(requestedRows: string): void {
        if (requestedRows !== this.searchParams.nRows) {
            // view has not changed
            this.viewChanged = false;

            // reset start position
            this.searchParams.startAt = '0';

            const sp: SearchParams = {
                query: this.searchParams.query,
                nRows: requestedRows,
                startAt: this.searchParams.startAt,
                view: this.searchParams.view
            };

            // route to new params
            this.routeToSelf(sp);
        }
    }

    // new row number after row change request
    onViewChange(requestedView: string): void {
        if (requestedView !== this.searchParams.view) {
            // view has changed
            this.viewChanged = true;

            const sp: SearchParams = {
                query: this.searchParams.query,
                nRows: this.searchParams.nRows,
                startAt: this.searchParams.startAt,
                view: requestedView
            };

            // route to new params
            this.routeToSelf(sp);
        }
    }

    // new query after search request
    onSearch(requestedQuery: string): void {
        if (requestedQuery !== this.searchParams.query) {
            // view has not changed
            this.viewChanged = false;

            const sp: SearchParams = {
                query: requestedQuery,
                nRows: this.searchParams.nRows,
                startAt: this.searchParams.startAt,
                view: this.searchParams.view
            };

            // route to new search params
            this.routeToSelf(sp);
        }
    }

    // route to self to set new params
    routeToSelf(sp: SearchParams) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { query: sp.query, nrows: sp.nRows, startAt: sp.startAt, view: sp.view },
            queryParamsHandling: 'merge'
        });
    }

    subscribeToDataApiService(): Subscription {
        return this.router.events.subscribe((e: any) => {
            // check for end of navigation
            if (e instanceof NavigationEnd) {
                // snapshot of current route query params
                const qp = this.route.snapshot.queryParamMap;

                if (qp !== this.currentQueryParams) {
                    this.currentQueryParams = qp;

                    if (qp.keys.length < 4) {
                        const sp: SearchParams = {
                            query: qp.get('query') || this.searchParams.query,
                            nRows: qp.get('nrows') || this.searchParams.nRows,
                            startAt: qp.get('startAt') || this.searchParams.startAt,
                            view: qp.get('view') || this.searchParams.view
                        };
                        this.routeToSelf(sp);
                    } else {
                        // update search params from route if available
                        this.updateSearchParamsFromRoute(qp);

                        if (this.searchParams.query && !this.viewChanged) {
                            // start loading
                            this.onLoadingStart();

                            // fetch search data
                            return this.dataApiService
                                .getFulltextSearchData(
                                    this.searchParams.query,
                                    this.searchParams.nRows,
                                    this.searchParams.startAt
                                )
                                .subscribe(
                                    (searchResponse: SearchResponseJson) => {
                                        // update url for search
                                        this.updateCurrentUrl();

                                        // share search data via streamer service
                                        this.updateStreamerService(searchResponse, this.searchParams.query);

                                        // end loading
                                        this.onLoadingEnd();
                                    },
                                    error => {
                                        this.errorMessage = error as any;
                                    }
                                );
                        } else {
                            // console.log('No search query!');
                        }
                    }
                } else {
                    // console.log('Routed on same page with same query params');
                }
            }
        });
    }

    updateCurrentUrl() {
        // get url from search service
        this.searchUrl = this.dataApiService.httpGetUrl;
    }

    // update search params from route
    updateSearchParamsFromRoute(params: ParamMap) {
        if (!params) {
            return;
        }

        if (params.get('query') && params.get('query') !== this.searchParams.query) {
            this.searchParams.query = params.get('query');
        }
        if (params.get('nrows') && params.get('nrows') !== this.searchParams.nRows) {
            this.searchParams.nRows = params.get('nrows');
        }
        if (params.get('startAt') && params.get('startAt') !== this.searchParams.startAt) {
            this.searchParams.startAt = params.get('startAt');
        }
        if (
            params.get('view') &&
            (params.get('view') === 'table' || params.get('view') === 'grid') &&
            params.get('view') !== this.searchParams.view
        ) {
            this.searchParams.view = params.get('view');
        }
    }

    // update search data via streamer service
    updateStreamerService(searchResponse: SearchResponseJson, query: string) {
        const searchResponseWithQuery: SearchResponseWithQuery = new SearchResponseWithQuery(searchResponse, query);
        this.streamerService.updateSearchResponseWithQuery(searchResponseWithQuery);
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
}
