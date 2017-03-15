import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Sheet } from '../sheet';
import { Textcritics } from '../textcritics';
import { EditionService } from '../edition.service';

@Component({
    selector: 'awg-edition-detail',
    templateUrl: './edition-detail.component.html',
    styleUrls: ['./edition-detail.component.css']
})
export class EditionDetailComponent implements OnInit {

    public items: Textcritics[];
    public selectedItem: string;
    public selectedSheet: Sheet;
    public sheetsData: Sheet[];
    public textcriticsData: Textcritics[];

    private errorMessage: string = undefined;
    private showTkA: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private editionService: EditionService
    ) { }

    ngOnInit() {
        this.getSheetsAndCommentsData();
    }

    onItemSelect($event) {
        if (!this.textcriticsData && !this.selectedSheet) return;
        let res = this.editionService.getCommentsForItem(this.textcriticsData[this.selectedSheet.id], $event.field, $event.id);
        this.items = res[0];
        this.selectedItem = res[1];
        this.showTkA = (this.items !== []);
    }

    onSheetSelect(sheet: Sheet) {
        this.router.navigate(['/edition/detail', sheet.id]);
        this.selectedSheet = sheet;
        this.selectedItem = '';
        this.showTkA = false;
    }

    getSheetsAndCommentsData() {
        this.editionService.getSheetsAndCommentsData()
            .subscribe((data) => {
                    this.sheetsData = data[0];
                    if (this.sheetsData) this.getRouteParams();
                    this.textcriticsData = data[1];
                },
                error => {
                    this.errorMessage = <any>error;
                }
            );
    }

    private getRouteParams() {
        this.route.params.forEach((params: Params) => {
            // if there is no id in route params
            // take first entry of sheets object as default
            let sheetId: string = params['id'] ? params['id'] : Object.keys(this.sheetsData)[0];
            this.selectedSheet = this.sheetsData[sheetId];
        })
    }


}
