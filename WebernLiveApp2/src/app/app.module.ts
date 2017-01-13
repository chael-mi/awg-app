import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//TODO: remove AlertModule?
import { AlertModule, ButtonsModule, CarouselModule, ModalModule } from 'ng2-bootstrap';

//
// main app component/module & routes
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//
// app modules
import { CoreModule } from './core/core.module';
import { EditionsModule } from './views/edition-view/editions.module';

//
// views
import { ContactViewComponent } from './views/contact-view/contact-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { PageNotFoundViewComponent } from './views/page-not-found-view/page-not-found-view.component';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { StructureViewComponent } from './views/structure-view/structure-view.component';


@NgModule({
    imports: [
        AlertModule.forRoot(), ButtonsModule.forRoot(),
        CarouselModule.forRoot(), ModalModule.forRoot(),

        BrowserModule, HttpModule,

        CoreModule,
        EditionsModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,

        ContactViewComponent,
        HomeViewComponent,
        PageNotFoundViewComponent,
        SearchViewComponent,
        StructureViewComponent,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
