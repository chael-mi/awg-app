import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditionService } from '../../edition.service';
import { Source } from '../../source';
import { Textcritics } from '../../textcritics';

@Component({
    selector: 'awg-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

    public reportTitle = 'Kritischer Bericht';
    public reportId = 'report';

    public sourceListData: Source[];
    public textcriticsData: Textcritics[];
    private errorMessage: string = undefined;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private editionService: EditionService
    ) { }

    ngOnInit() {
        this.getSourceListAndCommentsData();
        this.scrollTo();
    }

    public onSheetSelect(id: string) {
        this.router.navigate(['/edition/detail', id]);
    }

    private getSourceListAndCommentsData() {
        this.editionService.getSourceListAndCommentsData()
            .subscribe((data) => {
                    this.sourceListData = data[0];
                    this.textcriticsData = data[1];
                },
                error => {
                    this.errorMessage = <any>error;
                }
            );
    }

    private scrollTo(id?: string) {
        console.log('Report: scrollTo(id): ', id);
        // TODO - HACK: remove click once https://github.com/angular/angular/issues/6595 is fixed
        setTimeout(() => {
            this.route.fragment
                .subscribe(
                    f => {
                        if (!f) { return; };
                        console.log('Report#fragment(): ', f);
                        const element = document.querySelector('#' + f);
                        if (element) element.scrollIntoView(element);
                    }
                );
        });
    }

}
