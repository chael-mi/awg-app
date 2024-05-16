import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { UtilityService } from '@awg-core/services';
import { Textcritics, TextcriticsList } from '@awg-views/edition-view/models';

/**
 * The TextcriticsList component.
 *
 * It contains the list of textcritical comments
 * of the critical report of the edition view of the app
 * with an {@link EditionTkaTableComponent}.
 */
@Component({
    selector: 'awg-textcritics-list',
    templateUrl: './textcritics-list.component.html',
    styleUrls: ['./textcritics-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextcriticsListComponent {
    /**
     * Input variable: textcriticsData.
     *
     * It keeps the textcritics data.
     */
    @Input()
    textcriticsData: TextcriticsList;

    /**
     * Output variable: navigateToReportFragment.
     *
     * It keeps an event emitter for a fragment id of the edition report.
     */
    @Output()
    navigateToReportFragmentRequest: EventEmitter<string> = new EventEmitter();

    /**
     * Output variable: openModalRequest.
     *
     * It keeps an event emitter to open the modal
     * with the selected modal text snippet.
     */
    @Output()
    openModalRequest: EventEmitter<string> = new EventEmitter();

    /**
     * Output variable: selectSvgSheetRequest.
     *
     * It keeps an event emitter for the selected ids of an edition complex and svg sheet.
     */
    @Output()
    selectSvgSheetRequest: EventEmitter<{ complexId: string; sheetId: string }> = new EventEmitter();

    /**
     * Self-referring variable needed for CompileHtml library.
     */
    ref: TextcriticsListComponent;

    /**
     * Constructor of the TextcriticsComponent.
     *
     * It declares a public instance of the UtilityService and
     * initializes the self-referring ref variable needed for CompileHtml library.
     *
     * @param {UtilityService} utils Instance of the UtilityService.
     */
    constructor(public utils: UtilityService) {
        this.ref = this;
    }

    /**
     * Public method: isTextcriticsForSketch.
     *
     * It checks if the selected textcritics id refers to a sketch.
     *
     * @param {Textcritics} selectedTextcritics The given selected textcritics.
     *
     * @returns {boolean} The result of the check.
     */
    isTextcriticsForSketch(selectedTextcritics: Textcritics): boolean {
        return selectedTextcritics?.id?.includes('_Sk') || false;
    }

    /**
     * Public method: navigateToReportFragment.
     *
     * It emits a given id of a fragment of the edition report
     * to the {@link navigateToReportFragmentRequest}.
     *
     * @param {string} id The given fragment id.
     * @returns {void} Navigates to the edition report.
     */
    navigateToReportFragment(id: string): void {
        if (!id) {
            return;
        }
        this.navigateToReportFragmentRequest.emit(id);
    }

    /**
     * Public method: openModal.
     *
     * It emits a given id of a modal snippet text
     * to the {@link openModalRequest}.
     *
     * @param {string} id The given modal snippet id.
     * @returns {void} Emits the id.
     */
    openModal(id: string): void {
        if (!id) {
            return;
        }
        this.openModalRequest.emit(id);
    }

    /**
     * Public method: selectSvgSheet.
     *
     * It emits the given ids of a selected edition complex
     * and svg sheet to the {@link selectSvgSheetRequest}.
     *
     * @param {object} sheetIds The given sheet ids as { complexId: string, sheetId: string }.
     * @returns {void} Emits the ids.
     */
    selectSvgSheet(sheetIds: { complexId: string; sheetId: string }): void {
        if (!sheetIds?.sheetId) {
            return;
        }
        this.selectSvgSheetRequest.emit(sheetIds);
    }
}
