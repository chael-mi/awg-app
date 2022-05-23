import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
    EditionSvgSheet,
    EditionSvgOverlay,
    EditionSvgSheetList,
    EditionSvgOverlayTypes,
} from '@awg-views/edition-view/models';

/**
 * The SvgSheetLabelsOp12 enumeration.
 *
 * It stores the possible sheet labels for op12.
 * TODO: Refactor temporary solution. Will be removed and created dynamically from data.
 */
export enum SvgSheetLabelsOp12 {
    SHEET_1 = 'Aa:SkI/1',
    SHEET_2 = 'Aa:SkI/2',
    SHEET_3 = 'Aa:SkI/3',
    SHEET_4 = 'Aa:SkI/4',
    SHEET_5 = 'Aa:SkI/5',
}

/**
 * The EditionSvgSheetList component.
 *
 * It contains the svg sheet lists
 * of the edition view of the app
 * and displays a selected svg sheet.
 */
@Component({
    selector: 'awg-edition-svg-sheet-list',
    templateUrl: './edition-svg-sheet-list.component.html',
    styleUrls: ['./edition-svg-sheet-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditionSvgSheetListComponent implements OnInit {
    /**
     * Input variable: svgSheetsData.
     *
     * It keeps the svg sheets data.
     */
    @Input()
    svgSheetsData: EditionSvgSheetList;

    /**
     * Input variable: selectedSvgSheet.
     *
     * It keeps the selected svg sheet.
     */
    @Input()
    selectedSvgSheet: EditionSvgSheet;

    /**
     * Input variable: selectedOverlay.
     *
     * It keeps the selected svg overlay.
     */
    @Input()
    selectedOverlay: EditionSvgOverlay;

    /**
     * Output variable: selectSvgSheetRequest.
     *
     * It keeps an event emitter for the selected id of an SVG sheet.
     */
    @Output()
    selectSvgSheetRequest: EventEmitter<string> = new EventEmitter();

    /**
     * Output variable: selectOverlayRequest.
     *
     * It keeps an event emitter for the selected textcritics.
     */
    @Output()
    selectOverlayRequest: EventEmitter<EditionSvgOverlay> = new EventEmitter();

    /**
     * Public variable: svgSheetLabels.
     *
     * It keeps the labels of the svg sheets.
     * TODO: Refactor temporary solution. Will be removed and created dynamically from data.
     */
    svgSheetLabels = {
        op12: {
            SHEET_1: SvgSheetLabelsOp12.SHEET_1,
            SHEET_2: SvgSheetLabelsOp12.SHEET_2,
            SHEET_3: SvgSheetLabelsOp12.SHEET_3,
            SHEET_4: SvgSheetLabelsOp12.SHEET_4,
            SHEET_5: SvgSheetLabelsOp12.SHEET_5,
        },
    };

    /**
     * Public variable: sheetsArray.
     *
     * It keeps the array of of the svg sheets' labels.
     * TODO: Refactor temporary solution. Will be removed and created dynamically from data.
     */
    sheetsArray: string[];

    /**
     * Public variable: overlayTypes.
     *
     * It keeps the EditionSvgOverlayTypes to be accessed from template.
     */
    overlayTypes = EditionSvgOverlayTypes;

    /**
     * Angular life cycle hook: ngOnInit.
     *
     * It calls the containing methods
     * when initializing the component.
     */
    ngOnInit() {
        this.sheetsArray = this.svgSheetsData.sheets.map(sheet => sheet.id);
    }

    /**
     * Public method: isSelectedSvgSheet.
     *
     * It compares a given id with the id
     * of the latest selected svg sheet.
     *
     * @param {string} id The given sheet id.
     * @returns {boolean} The boolean value of the comparison result.
     */
    isSelectedSvgSheet(id: string): boolean {
        return id === this.selectedSvgSheet.id;
    }

    /**
     * Public method: isSelectedOverlay.
     *
     * It compares a given svg overlay with
     * the latest selected svg overlay.
     *
     * @param {EditionSvgOverlayTypes} type The given type of the svg overlay.
     * @param {string} id The given id of the svg overlay.
     * @returns {boolean} The boolean value of the comparison result.
     */
    isSelectedOverlay(type: EditionSvgOverlayTypes, id: string): boolean {
        if (!type || !id) {
            return;
        }
        const overlay = new EditionSvgOverlay(type, id);
        return JSON.stringify(overlay) === JSON.stringify(this.selectedOverlay);
    }

    /**
     * Public method: selectOverlay.
     *
     * It emits a given svg overlay
     * to the {@link selectOverlayRequest}.
     *
     * @param {EditionSvgOverlayTypes} type The given type of the svg overlay.
     * @param {string} id The given id of the svg overlay.
     * @returns {void} Emits the svg overlay.
     */
    selectOverlay(type: EditionSvgOverlayTypes, id: string): void {
        if (!type || !id) {
            return;
        }
        const overlay = new EditionSvgOverlay(type, id);
        this.selectOverlayRequest.emit(overlay);
    }

    /**
     * Public method: selectSvgSheet.
     *
     * It emits a given id of a selected svg sheet
     * to the {@link selectSvgSheetRequest}.
     *
     * @param {string} id The given sheet id.
     * @returns {void} Emits the id.
     */
    selectSvgSheet(id: string): void {
        if (!id) {
            return;
        }
        this.selectSvgSheetRequest.emit(id);
    }
}
