(self.webpackChunkawg_app=self.webpackChunkawg_app||[]).push([[599],{3599:(e,n,t)=>{"use strict";t.r(n),t.d(n,{HomeViewModule:()=>p});var i=t(4762),a=t(7716),r=t(1470),s=t(4213);var o=t(5768);let l=class{constructor(e){this.router=e,this.homeViewTitle="Beispieleditionen ausgewa\u0308hlter Skizzen",this.homeViewId="awg-home-view",this.EDITION_WORK_OP12=o.yE.OP12,this.EDITION_WORK_OP25=o.yE.OP25}ngOnInit(){this.routeToSidenav()}routeToSidenav(){this.router.navigate([{outlets:{side:"editionInfo"}}],{preserveFragment:!0,queryParamsHandling:"preserve"})}};l.ctorParameters=()=>[{type:s.F0}],l=(0,i.gn)([(0,a.wA2)({selector:"awg-home-view",template:'\x3c!-- content: home --\x3e\n\n\x3c!-- heading --\x3e\n<awg-heading [title]="homeViewTitle" [id]="homeViewId"></awg-heading>\n\n\x3c!-- header --\x3e\n<div class="para">\n    <h6 class="awg-breadcrumb">\n        {{ EDITION_WORK_OP12.edition.short }} / {{ EDITION_WORK_OP12.series.full }} /\n        {{ EDITION_WORK_OP12.section.full }}\n    </h6>\n\n    <h3 class="awg-edition-info-header">\n        <i class="awg-edition-info-header-title">{{ EDITION_WORK_OP12.titleStatement.title }}</i\n        >&nbsp;<span class="awg-edition-info-header-catalogue">{{ EDITION_WORK_OP12.work.short }}</span> (<a\n            [routerLink]="[EDITION_WORK_OP12.baseRoute, EDITION_WORK_OP12.introRoute.route]"\n            >{{ EDITION_WORK_OP12.type.full }}</a\n        >)\n    </h3>\n\n    <h3 class="awg-edition-info-header">\n        <i class="awg-edition-info-header-title">{{ EDITION_WORK_OP25.titleStatement.title }}</i\n        >&nbsp;<span class="awg-edition-info-header-catalogue">{{ EDITION_WORK_OP25.work.short }}</span> (<a\n            [routerLink]="[EDITION_WORK_OP25.baseRoute, EDITION_WORK_OP25.detailRoute.route]"\n            >{{ EDITION_WORK_OP25.type.full }}</a\n        >\n        &\n        <a [routerLink]="[EDITION_WORK_OP25.baseRoute, EDITION_WORK_OP25.graphRoute.route]">{{\n            EDITION_WORK_OP25.graphRoute.short\n        }}</a\n        >)\n    </h3>\n</div>\n\n\x3c!-- description --\x3e\n<div class="para">\n    <p>Willkommen bei der AWG-APP, dem Prototyp einer Online-Edition der Anton Webern Gesamtausgabe, Basel (AWG).</p>\n    <p>\n        Die online zug\xe4nglichen Bestandteile und Datenbest\xe4nde der AWG-Online-Edition werden als Open Data \xfcber diese\n        Webapplikation pr\xe4sentiert und \xfcber das Software-Framework\n        <a href="https://www.knora.org">Knora</a>/<a href="https://www.salsah.org">SALSAH</a>\n        des\n        <a href="https://dhlab.philhist.unibas.ch">Digital Humanities Lab</a>\n        der Universit\xe4t Basel aufbereitet. Zudem werden die Datenbest\xe4nde durch das\n        <a href="https://dasch.swiss">Data and Service Center for Humanities (DaSCH)</a>\n        zug\xe4nglich gehalten und langfristig aufbewahrt. Das DaSCH garantiert eine Zug\xe4nglichkeit der Daten gem\xe4ss\n        FAIR-Prinzipien, die Zuweisung von digitalen Identifikatoren, maschinenlesbaren Metadaten und den langfristigen\n        Betrieb der technischen Infrastruktur (vgl.\n        <a href="https://dasch.swiss/mission">https://dasch.swiss/mission/</a>).\n    </p>\n    <p>\n        Der Protoyp simuliert bereits in weiten Teilen eine Datenabfrage \xfcber die Programmierschnittstelle (API) von\n        SALSAH (zuk\xfcnftig Knora). Die f\xfcr reale Abfragen im Bereich Online-Edition notwendige\n        <a [routerLink]="[\'/structure\']">Datenstruktur</a> wird zur Zeit von der AWG implementiert.\n    </p>\n    <p>\n        \xdcber den Men\xfcpunkt <em>Beispieledition</em> sind ausgew\xe4hlte Skizzeneditionen zu\n        <a [routerLink]="[EDITION_WORK_OP12.baseRoute, EDITION_WORK_OP12.detailRoute.route]">op. 12</a> sowie\n        <a [routerLink]="[EDITION_WORK_OP25.baseRoute, EDITION_WORK_OP25.detailRoute.route]">op. 25</a> zug\xe4nglich.\n        Bestandteile der Online-Edition umfassen Einleitungen, die edierten Notentexte, kritische Berichte sowie\n        Graphvisualisierungen.\n    </p>\n    <p>\n        Zus\xe4tzlich wird eine einfache <a [routerLink]="[\'/data/search\', \'fulltext\']">Volltextsuche</a> in der Datenbank\n        angeboten, \xfcber die die dort hinterlegten Kontextmaterialien (Werklisten [nach Opuszahl bzw.\n        Moldenhauer-Nummer], Personeninformationen, Briefe &amp; Supplements, Chronologie) abgefragt werden k\xf6nnen.\n    </p>\n    <p>\n        Bei diesem Prototyp handelt es sich um eine Weiterentwicklung einer\n        <a href="https://www.anton-webern.ch/assets/editions/BeispieleditionAWG_3_Skizzen_op12_Online_klein.pdf"\n            >prospektiven Simulation [PDF]</a\n        >\n        vom 31. M\xe4rz 2015 sowie vom 29. Januar 2016. Der Programmcode ist als Open Access-Projekt frei zug\xe4nglich auf\n        <a href="https://github.com/webern-unibas-ch/awg-app">GitHub</a>\n        abgelegt und vollumf\xe4nglich\n        <a href="https://edition.anton-webern.ch/compodoc/index.html">dokumentiert</a>\n        (vgl. <a [routerLink]="[\'/contact\']" fragment="awg-documentation">Dokumentation</a>).\n    </p>\n    <p>Der Prototyp und die Suche werden in ihrer Funktionalit\xe4t sukzessiv erweitert.</p>\n</div>\n',changeDetection:a.n4l.OnPush,styles:[""]})],l);const d=[{path:"",component:l,data:{title:"AWG Online Edition \u2013 Home"}}],h=[l];let u=class{};u=(0,i.gn)([(0,a.LVF)({imports:[s.Bz.forChild(d)],exports:[s.Bz]})],u);let p=class{};p=(0,i.gn)([(0,a.LVF)({imports:[r.m,u],declarations:[h]})],p)}}]);