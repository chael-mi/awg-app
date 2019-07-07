import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { SearchInfo } from '@awg-side-info/side-info-models';

/**
 * The SideInfo service.
 *
 * It handles the provision of data and
 * titles for the side info components.
 *
 * Provided in: `root`.
 */
@Injectable({
    providedIn: 'root'
})
export class SideInfoService {
    /**
     * Private subject to handle search info data.
     */
    private searchInfoDataSubject: Subject<SearchInfo> = new Subject<SearchInfo>();

    /**
     * Private readonly search info data stream as observable (`Subject`).
     */
    private readonly searchInfoDataStream$ = this.searchInfoDataSubject.asObservable();

    /**
     * Private subject to handle search info title.
     */
    private searchInfoTitleSubject: Subject<string> = new Subject<string>();

    /**
     * Private readonly search info title stream as observable (`Subject`).
     */
    private readonly searchInfoTitleStream$ = this.searchInfoTitleSubject.asObservable();

    /**
     * Public method: getSearchInfoData.
     *
     * It provides the latest data from the search info data stream.
     *
     * @returns {Observable<SearchInfo>} The search info data stream as observable.
     */
    getSearchInfoData(): Observable<SearchInfo> {
        return this.searchInfoDataStream$;
    }

    /**
     * Public method: getSearchInfoTitle.
     *
     * It provides the latest title from the search info title stream.
     *
     * @returns {Observable<string>} The search info title stream as observable.
     */
    getSearchInfoTitle(): Observable<string> {
        return this.searchInfoTitleStream$;
    }

    /**
     * Public method: updateSearchInfoData.
     *
     * It updates the side info data stream with the given data (`searchInfo`).
     *
     * @returns {void} Sets the next searchInfo to the side info data stream.
     */
    updateSearchInfoData(searchInfo: SearchInfo): void {
        this.searchInfoDataSubject.next(searchInfo);
    }

    /**
     * Public method: updateSearchInfoTitle.
     *
     * It updates the search info title stream with the given title.
     *
     * @returns {void} Sets the next title to the search info title stream.
     */
    updateSearchInfoTitle(title: string): void {
        console.log('updateSearchInfoTitle: title: ', title);
        this.searchInfoTitleSubject.next(title);
    }
}
