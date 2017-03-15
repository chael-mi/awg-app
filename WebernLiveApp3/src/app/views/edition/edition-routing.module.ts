import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { EditionComponent } from './edition.component';
import { EditionDetailComponent } from './edition-detail/edition-detail.component';
import { EditionIntroComponent } from './edition-intro/edition-intro.component';
import { EditionOverviewComponent } from './edition-overview/edition-overview.component';
import { EditionReportComponent } from './edition-report/edition-report.component';


const editionRoutes: Routes = [
    { path: 'edition', component: EditionComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'overview', component: EditionOverviewComponent },
                    { path: 'intro', component: EditionIntroComponent },
                    { path: 'detail', component: EditionDetailComponent },
                    { path: 'detail/:id', component: EditionDetailComponent },
                    { path: 'report', component: EditionReportComponent },
                    { path: '', redirectTo: 'overview', pathMatch: 'full'}
                ]
            }
        ]
    },
    { path: 'editions', redirectTo: 'edition', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(editionRoutes)],
    exports: [RouterModule]
})
export class EditionRoutingModule { }

export const routedEditionComponents = [
    EditionComponent,
    EditionDetailComponent,
    EditionIntroComponent,
    EditionOverviewComponent,
    EditionReportComponent
];
