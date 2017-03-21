import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Sheet } from '../../models';

@Component({
    selector: 'awg-edition-detail-sheet-control',
    templateUrl: './edition-detail-sheet-control.component.html',
    styleUrls: ['./edition-detail-sheet-control.component.css']
})
export class EditionDetailSheetControlComponent implements OnInit {
    @Input() sheets: Sheet[];
    @Input() selectedSheet: Sheet;
    @Output() selectSheetRequest: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    private isSelectedSheet(id: string) {
        return id === this.selectedSheet.id;
    }

    private selectSheet(id: string) {
        this.selectSheetRequest.emit(id);
    }

}
