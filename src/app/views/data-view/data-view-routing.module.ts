import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataViewComponent } from './data-view.component';
import { ResourceDetailComponent } from './data-outlets/resource-detail';
import { SearchOverviewComponent } from './data-outlets/search-overview.component';
import { SearchPanelComponent } from './data-outlets/search-panel';
// Import { TimelineComponent } from './data-outlets/timeline/timeline.component';

/* Routes of the DataViewModule */
const DATA_VIEW_ROUTES: Routes = [
    {
        path: '',
        component: DataViewComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'search' },
            {
                path: 'search',
                component: SearchOverviewComponent,
                children: [
                    {
                        path: '',
                        component: SearchPanelComponent,
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'fulltext',
                            },
                            {
                                path: 'fulltext',
                                data: { title: 'AWG Online Edition – Fulltext Search' },
                            },
                            {
                                path: 'extended',
                                data: { title: 'AWG Online Edition – Extended Search' },
                            },
                            {
                                path: 'detail/:id',
                                redirectTo: 'resource/:id',
                            }, // Absolute redirect (replacement of route) to resource/:id,
                        ],
                    },
                ],
            },
            /* Muted for now
            { path: 'timeline', component: TimelineComponent },
            {
                path: 'bibliography',
                loadChildren: () =>
                    import('./data-outlets/bibliography/bibliography.module').then(m => m.BibliographyModule)
            },
            */
        ],
    },
    {
        path: 'resource/:id',
        component: ResourceDetailComponent,
        data: { title: 'AWG Online Edition – Resource Detail' },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'html',
            },
            {
                path: 'html',
                data: { title: 'AWG Online Edition – Resource Detail HTML' },
            },
            {
                path: 'converted-json',
                data: { title: 'AWG Online Edition – Resource Detail JSON Converted' },
            },
            {
                path: 'raw-json',
                data: { title: 'AWG Online Edition – Resource Detail JSON Raw' },
            },
        ],
    },
];

/**
 * Routed components of the {@link DataViewModule}:
 * {@link DataViewComponent}, {@link SearchOverviewComponent},
 * {@link SearchPanelComponent}, {@link ResourceDetailComponent}
 * and {@link TimelineComponent}.
 */
export const routedDataViewComponents = [
    DataViewComponent,
    SearchOverviewComponent,
    SearchPanelComponent,
    ResourceDetailComponent,
    // TimelineComponent
];

/**
 * DataView module routing.
 *
 * It activates the DATA_VIEW_ROUTES, also the lazy-loaded bibliography module.
 */
@NgModule({
    imports: [RouterModule.forChild(DATA_VIEW_ROUTES)],
    exports: [RouterModule],
})
export class DataViewRoutingModule {}
