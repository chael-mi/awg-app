var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"APP_ROUTES","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"home","pathMatch":"full"},{"path":"home","component":"HomeViewComponent","data":{"title":"AWGOnlineEdition–Home"}},{"path":"contact","loadChildren":"@awg-views/contact-view/contact-view.module#ContactViewModule","children":[{"kind":"module","children":[{"name":"CONTACT_VIEW_ROUTES","filename":"src/app/views/contact-view/contact-view-routing.module.ts","module":"ContactViewRoutingModule","children":[{"path":"","component":"ContactViewComponent","data":{"title":"AWGOnlineEdition–Contact"}}],"kind":"module"}],"module":"ContactViewModule"}]},{"path":"data","loadChildren":"@awg-views/data-view/data-view.module#DataViewModule","children":[{"kind":"module","children":[{"name":"DATA_VIEW_ROUTES","filename":"src/app/views/data-view/data-view-routing.module.ts","module":"DataViewRoutingModule","children":[{"path":"","component":"DataViewComponent","children":[{"path":"","pathMatch":"full","redirectTo":"search"},{"path":"search","component":"SearchOverviewComponent","children":[{"path":"","component":"SearchPanelComponent","children":[{"path":"","pathMatch":"full","redirectTo":"fulltext"},{"path":"fulltext","data":{"title":"AWGOnlineEdition–FulltextSearch"}},{"path":"extended","data":{"title":"AWGOnlineEdition–ExtendedSearch"}},{"path":"detail/:id","redirectTo":"resource/:id"}]}]}]},{"path":"resource/:id","component":"ResourceDetailComponent","data":{"title":"AWGOnlineEdition–ResourceDetail"},"children":[{"path":"","pathMatch":"full","redirectTo":"html"},{"path":"html","data":{"title":"AWGOnlineEdition–ResourceDetailHTML"}},{"path":"converted-json","data":{"title":"AWGOnlineEdition–ResourceDetailJSONConverted"}},{"path":"raw-json","data":{"title":"AWGOnlineEdition–ResourceDetailJSONRaw"}}]}],"kind":"module"}],"module":"DataViewModule"}]},{"path":"edition","loadChildren":"@awg-views/edition-view/edition-view.module#EditionViewModule","children":[{"kind":"module","children":[{"name":"EDITION_VIEW_ROUTES","filename":"src/app/views/edition-view/edition-view-routing.module.ts","module":"EditionViewRoutingModule","children":[{"path":"","component":"EditionViewComponent","children":[{"path":"series","component":"EditionSeriesComponent"},{"path":"series/:id","component":"EditionSeriesDetailComponent","children":[{"path":"sections","component":"EditionSectionsComponent"},{"path":"section/:id","component":"EditionSectionDetailComponent"},{"path":"sections/:id","redirectTo":"section/:id","pathMatch":"full"},{"path":"","redirectTo":"sections","pathMatch":"full"}]},{"path":"composition/:compositionId","component":"EditionComplexComponent","children":[{"path":"","component":"EditionDetailNavComponent","children":[{"path":"intro","loadChildren":"./edition-outlets/edition-complex/edition-detail/edition-intro/edition-intro.module#EditionIntroModule","children":[{"kind":"module","children":[{"name":"EDITION_INTRO_ROUTES","filename":"src/app/views/edition-view/edition-outlets/edition-complex/edition-detail/edition-intro/edition-intro-routing.module.ts","module":"EditionIntroRoutingModule","children":[{"path":"","component":"EditionIntroComponent","data":{"title":"AWGOnlineEdition–Intro"}}],"kind":"module"}],"module":"EditionIntroModule"}]},{"path":"sheets","loadChildren":"./edition-outlets/edition-complex/edition-detail//edition-sheets/edition-sheets.module#EditionSheetsModule","children":[{"kind":"module","children":[{"name":"EDITION_SHEETS_ROUTES","filename":"src/app/views/edition-view/edition-outlets/edition-complex/edition-detail/edition-sheets/edition-sheets-routing.module.ts","module":"EditionSheetsRoutingModule","children":[{"path":"","component":"EditionSheetsComponent","data":{"title":"AWGOnlineEdition–Sheets"}}],"kind":"module"}],"module":"EditionSheetsModule"}]},{"path":"report","loadChildren":"./edition-outlets/edition-complex/edition-detail//edition-report/edition-report.module#EditionReportModule","children":[{"kind":"module","children":[{"name":"EDITION_REPORT_ROUTES","filename":"src/app/views/edition-view/edition-outlets/edition-complex/edition-detail/edition-report/edition-report-routing.module.ts","module":"EditionReportRoutingModule","children":[{"path":"","component":"EditionReportComponent","data":{"title":"AWGOnlineEdition–Report"}}],"kind":"module"}],"module":"EditionReportModule"}]},{"path":"graph","loadChildren":"./edition-outlets/edition-complex/edition-detail//edition-graph/edition-graph.module#EditionGraphModule","children":[{"kind":"module","children":[{"name":"EDITION_GRAPH_ROUTES","filename":"src/app/views/edition-view/edition-outlets/edition-complex/edition-detail/edition-graph/edition-graph-routing.module.ts","module":"EditionGraphRoutingModule","children":[{"path":"","component":"EditionGraphComponent","data":{"title":"AWGOnlineEdition–Graph"}}],"kind":"module"}],"module":"EditionGraphModule"}]},{"path":"","redirectTo":"intro","pathMatch":"full"}]}]},{"path":"row-tables","loadChildren":"./edition-outlets/edition-row-tables/edition-row-tables.module#EditionRowTablesModule","children":[{"kind":"module","children":[{"name":"EDITION_ROW_TABLES_ROUTES","filename":"src/app/views/edition-view/edition-outlets/edition-row-tables/edition-row-tables-routing.module.ts","module":"EditionRowTablesRoutingModule","children":[{"path":"","component":"EditionRowTablesComponent","data":{"title":"AWGOnlineEdition–Rowtables"}}],"kind":"module"}],"module":"EditionRowTablesModule"}]}]}],"kind":"module"}],"module":"EditionViewModule"}]},{"path":"editions","redirectTo":"edition","pathMatch":"full"},{"path":"structure","loadChildren":"@awg-views/structure-view/structure-view.module#StructureViewModule","children":[{"kind":"module","children":[{"name":"STRUCTURE_VIEW_ROUTES","filename":"src/app/views/structure-view/structure-view-routing.module.ts","module":"StructureViewRoutingModule","children":[{"path":"","component":"StructureViewComponent","data":{"title":"AWGOnlineEdition–Structure"}}],"kind":"module"}],"module":"StructureViewModule"}]},{"path":"404","loadChildren":"@awg-views/page-not-found-view/page-not-found-view.module#PageNotFoundViewModule","children":[{"kind":"module","children":[{"name":"PAGE_NOT_FOUND_VIEW_ROUTES","filename":"src/app/views/page-not-found-view/page-not-found-view-routing.module.ts","module":"PageNotFoundViewRoutingModule","children":[{"path":"","component":"PageNotFoundViewComponent","data":{"title":"AWGOnlineEdition–404"}}],"kind":"module"}],"module":"PageNotFoundViewModule"}]},{"path":"**","redirectTo":"404","pathMatch":"full"}],"kind":"module"},{"name":"SIDE_INFO_ROUTES","filename":"src/app/side-info/side-info-routing.module.ts","module":"SideInfoRoutingModule","children":[{"path":"contactInfo","component":"ContactInfoComponent","outlet":"side"},{"path":"editionInfo","component":"EditionInfoComponent","outlet":"side"},{"path":"resourceInfo","component":"ResourceInfoComponent","outlet":"side"},{"path":"searchInfo","component":"SearchInfoComponent","outlet":"side"},{"path":"structureInfo","component":"StructureInfoComponent","outlet":"side"}],"kind":"module"}]}
