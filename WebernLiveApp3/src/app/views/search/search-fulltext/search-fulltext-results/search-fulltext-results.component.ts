import { Component, Input, OnInit } from '@angular/core';

import { SearchResponseJson } from '../../../../shared/api-objects';

@Component({
    selector: 'awg-search-fulltext-results',
    templateUrl: './search-fulltext-results.component.html',
    styleUrls: ['./search-fulltext-results.component.css']
})
export class SearchFulltextResultsComponent implements OnInit {
    @Input() searchData: SearchResponseJson;

    private curId: string;
    private resText: string;

    constructor() { }

    ngOnInit() {
        console.log('length results: ', this.searchData.subjects.length);
        this.resText = (this.searchData.subjects.length === 1) ? 'zugängliches Resultat von' : 'zugängliche Resultate von';
    }

    activeObject(id: string){
        return this.curId === id;
    };

    showObject(id: string){
        this.curId = id;

        // TODO: remove
        console.info('SearchResults#showObject: called id: ', id);
    }

}
