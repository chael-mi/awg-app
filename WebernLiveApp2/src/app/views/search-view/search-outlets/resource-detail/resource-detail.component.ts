import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ConversionService } from '../../../../core/services';
import { SearchService } from '../../services/search.service';
import { ResourceDetail } from '../../models';
import { ResourceFullResponseJson } from '../../../../shared/api-objects';

@Component({
    selector: 'awg-resource-detail',
    templateUrl: './resource-detail.component.html',
    styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {

    public currentId: string;
    public oldId: string;
    public errorMessage: string = undefined;
    public request: string;
    public resourceData: ResourceFullResponseJson;
    public resourceDetailData: ResourceDetail;
    public resourceJsonConvertedData: ResourceDetail;
    public resourceJsonRawData: ResourceFullResponseJson;

    ref: ResourceDetailComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private conversionService: ConversionService,
        private searchService: SearchService
    ) {
        this.ref = this;
    }

    ngOnInit() {
        this.routeToSidenav();
        this.getResourceData();
    }


    public getResourceData() {
        // init currentId when initiating the component
        this.currentId = this.route.snapshot.paramMap.get('id');
        // fetch data
        this.route.params
            .switchMap((params: Params) => this.searchService.getResourceData(params['id']))
            .subscribe(
                (data: ResourceFullResponseJson) => {
                    // snapshot of raw json response
                    this.resourceJsonRawData = JSON.parse(JSON.stringify(data));
                    // convert data for displaying resource detail
                    this.resourceDetailData = this.conversionService.prepareResourceDetail(data, this.currentId);
                    // snapshot of converted json response
                    this.resourceJsonConvertedData = JSON.parse(JSON.stringify(this.resourceDetailData));

                    this.request = 'http://www.salsah.org/api/resources/' + this.currentId + '_-_local';
                },
                error => {
                    this.errorMessage = <any>error;
                }
            );
    }

    public routeToSidenav(): void {
        this.router.navigate([{ outlets: { side: 'searchInfo' }}]);
    }

    public showDetail(nextId?: string): void {
        /*
         * Navigate to ResultDetail:
         * if nextId is emitted, use nextId for navigation, else navigate to oldId (backButton)
         * if oldId not exists (first call), use currentId
         */
        const showId = nextId ? nextId : (this.oldId ? this.oldId : this.currentId);
        // save currentId as oldId
        this.oldId = this.currentId;
        // update currentId
        this.currentId = showId;
        // navigate to new detail
        this.router.navigate(['/search/detail', +showId]);
    }

    public goBack(): void {
        /*
         * Navigate back to SearchPanel
         * TODO: store query in URL to avoid redoing search
         * pass along the currentId if available
         * so that the SearchResultList component
         * can select the corresponding Resource.
         */
        const resId = this.resourceDetailData ? +this.currentId : null;
        this.router.navigate(['/search/fulltext', { id: resId }]);
    }

}
