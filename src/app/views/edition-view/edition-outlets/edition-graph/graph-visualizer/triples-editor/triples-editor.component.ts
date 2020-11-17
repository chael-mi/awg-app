import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * The TriplesEditor component.
 *
 * It contains the editor for the RDF triples of the {@link GraphVisualizerComponent}.
 */
@Component({
    selector: 'awg-triples-editor',
    templateUrl: './triples-editor.component.html',
    styleUrls: ['./triples-editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriplesEditorComponent implements OnInit {
    /**
     * Input variable: triples.
     *
     * It keeps the input string for the RDF triples.
     */
    @Input()
    triples: string;

    /**
     * Output variable: queryRequest.
     *
     * It keeps an event emitter to perform a query.
     */
    @Output()
    queryRequest: EventEmitter<void> = new EventEmitter();

    /**
     * Output variable: resetTriplesRequest.
     *
     * It keeps an event emitter to reset the triples to their initial state.
     */
    @Output()
    resetTriplesRequest: EventEmitter<void> = new EventEmitter();

    /**
     * Output variable: updateTriplesRequest.
     *
     * It keeps an event emitter to update the triples after editor changes.
     */
    @Output()
    updateTriplesRequest: EventEmitter<string> = new EventEmitter();

    /**
     * Public variable: cmTriplesConfig.
     *
     * It keeps the Codemirror configuration for the triples panel.
     */
    cmTriplesConfig = {
        lineNumbers: true,
        firstLineNumber: 1,
        lineWrapping: true,
        matchBrackets: true,
        mode: 'turtle'
    };

    /**
     * Angular life cycle hook: ngOnInit.
     *
     * It calls the containing methods
     * when initializing the component.
     */
    ngOnInit() {}

    /**
     * Public method: onEditorInputChange.
     *
     * It emits the given triples
     * to the {@link updateTriplesRequest}.
     *
     * @param {string} triples The given triples.
     *
     * @returns {void} Emits the triples.
     */
    onEditorInputChange(triples: string) {
        this.updateTriplesRequest.emit(triples);
    }

    /**
     * Public method: doQuery.
     *
     * It emits a trigger to
     * the {@link queryRequest}.
     *
     * @returns {void} Triggers the request.
     */
    doQuery() {
        this.queryRequest.emit();
    }

    /**
     * Public method: resetTriples.
     *
     * It emits a trigger to
     * the {@link resetTriplesRequest}.
     *
     * @returns {void} Triggers the request.
     */
    resetTriples(): void {
        this.resetTriplesRequest.emit();
    }
}
