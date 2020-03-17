/*
 * This component is adapted from Mads Holten's Sparql Visualizer
 * cf. https://github.com/MadsHolten/sparql-visualizer
 */
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { from, Observable } from 'rxjs';

import { GraphRDFData } from '@awg-views/edition-view/models/graph.model';
import {
    GraphVisualizerService,
    Triple
} from '@awg-views/edition-view/edition-outlets/edition-graph/graph-visualizer/services/graph-visualizer.service';

import 'codemirror/mode/turtle/turtle';
import 'codemirror/mode/go/go';
import 'codemirror/mode/sparql/sparql';

@Component({
    selector: 'awg-graph-visualizer',
    templateUrl: './graph-visualizer.component.html',
    styleUrls: ['./graph-visualizer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphVisualizerComponent implements OnInit {
    /**
     * Input variable: graphRDFInputData.
     *
     * It keeps the data for the RDF graph.
     */
    @Input()
    graphRDFInputData: GraphRDFData;

    queryType: string;
    queryTime: number;
    queryResult: Observable<Triple[]>;
    resultFieldExpanded = false;
    fitGraphIntoContainer = false;

    defaultForceGraphHeight = 500;

    triples;
    query;

    // Codemirror config
    cmTriplesConfig = {
        lineNumbers: true,
        firstLineNumber: 1,
        lineWrapping: true,
        matchBrackets: true,
        mode: 'turtle'
    };
    cmSparqlConfig = {
        lineNumbers: true,
        firstLineNumber: 1,
        lineWrapping: true,
        matchBrackets: true,
        mode: 'sparql'
    };

    constructor(private editionGraphService: GraphVisualizerService) {}

    ngOnInit() {
        // set initial values
        this.setInitialTriples();
        this.setInitialQuery();

        // perform initial query
        this.doQuery();
    }

    doQuery() {
        // If no prefix is defined in the query, get it from the turtle file
        if (this.query.toLowerCase().indexOf('prefix') === -1) {
            this.query = this.editionGraphService.appendPrefixesToQuery(this.query, this.triples);
        }

        // Get the query type
        this.queryType = this.editionGraphService.getQuerytype(this.query);

        // use only local store for now
        this.queryResult = this.queryLocalstore(this.queryType, this.query, this.triples);
    }

    private queryLocalstore(queryType, query, triples) {
        // Capture start time of query
        const t1 = Date.now();

        // Perform query with client based rdfstore
        try {
            this.resultFieldExpanded = true;

            const result = this.editionGraphService.doQuery(queryType, query, triples);

            // Capture query time
            this.queryTime = Date.now() - t1;

            return from(result);
        } catch (err) {
            console.error('#queryLocalstore got error:', err);

            if (err.message && err.name) {
                if (err.message.indexOf('undefined') !== -1) {
                    this.showErrorMessage('The query did not return any results', 10000);
                }
                this.showErrorMessage(err.name + ': ' + err.message, 10000);
            }

            // Capture query time
            this.queryTime = Date.now() - t1;
            console.log('QUERYTIME:', this.queryTime);

            return from([]);
        }
    }

    fitGraphToContainer(): void {
        this.fitGraphIntoContainer = !this.fitGraphIntoContainer;
    }

    graphClick(URI) {
        console.log('AppComponent# graphClick URI', URI);
    }

    setInitialTriples() {
        if (!this.graphRDFInputData.triples) {
            return;
        }
        this.triples = this.graphRDFInputData.triples;
    }

    setInitialQuery() {
        if (!this.graphRDFInputData.query) {
            return;
        }
        // If no prefix is defined in the query, get it from the turtle file
        this.query = this.graphRDFInputData.query;
    }

    showErrorMessage(message, durationValue?) {
        if (!durationValue) {
            durationValue = 10000;
        }
        console.log(message);
        /*
        this.snackBar.open(message, 'close', {
            duration: durationValue
        });
        */
    }

    tableClick(URI) {
        this.query = `SELECT * WHERE {\n\tBIND(<${URI}> AS ?el)\n\t?el ?key ?value\n}`;
        this.doQuery();
    }
}
