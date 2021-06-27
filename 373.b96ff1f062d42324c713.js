(self.webpackChunkawg_app=self.webpackChunkawg_app||[]).push([[373],{373:(t,e,i)=>{"use strict";i.r(e),i.d(e,{EditionViewModule:()=>E});var o=i(4762),s=i(7716),n=i(1470),r=i(4213);var a=i(5768),d=i(6409);let h=class{constructor(t,e,i){this.editionService=t,this.route=e,this.router=i,this.editionViewTitle="Beispieledition ausgew\xe4hlter Skizzen",this.editionViewId="awg-edition-view"}ngOnInit(){this.routeToSidenav(),this.getEditionWorkFromRoute()}getEditionWorkFromRoute(){this.route.paramMap.subscribe(t=>{const e=t.get("compositionId")?t.get("compositionId"):"";this.editionService.updateEditionWork(a.yE[e.toUpperCase()]),this.editionWork$=this.editionService.getEditionWork()})}routeToSidenav(){this.router.navigate([{outlets:{side:"editionInfo"}}],{preserveFragment:!0,queryParamsHandling:"preserve"})}};h.ctorParameters=()=>[{type:d.O},{type:r.gz},{type:r.F0}],h=(0,o.gn)([(0,s.wA2)({selector:"awg-edition-view",template:'\x3c!-- content: edition-view --\x3e\n\n\x3c!-- heading --\x3e\n<awg-heading [title]="editionViewTitle" [id]="editionViewId"></awg-heading>\n\n<div class="awg-edition-work" *ngIf="editionWork$ | async as editionWork">\n    \x3c!-- TODO: refactor this as selectable breadcrumb --\x3e\n    <h6 class="awg-edition-info-breadcrumb">\n        {{ editionWork.edition.short }} / {{ editionWork.series.full }} / {{ editionWork.section.full }}\n    </h6>\n    <h3 class="awg-edition-info-header">\n        <i class="awg-edition-info-header-title">{{ editionWork.titleStatement.title }}</i\n        >&nbsp;<span class="awg-edition-info-header-catalogue">{{ editionWork.work.short }}</span>\n    </h3>\n    \x3c!-- declamation --\x3e\n    <div class="awg-edition-responsibility mt-3">\n        <p>\n            Ediert von\n            <span class="editor" *ngFor="let editor of editionWork.responsibilityStatement.editors; last as isLast">\n                <a href="{{ editor.homepage }}">{{ editor.name }}</a\n                ><span *ngIf="!isLast">&nbsp;&&nbsp;</span>\n            </span>\n            <br />\n            Versionsdatum: <span class="version">{{ editionWork.responsibilityStatement.lastModified }}</span>\n        </p>\n    </div>\n</div>\n\n\x3c!-- edition routes --\x3e\n<router-outlet></router-outlet>\n',styles:[""]})],h);var l=i(9765),u=i(6782),c=i(849);let p=class{constructor(t){this.editionService=t,this._destroy$=new l.xQ}ngOnInit(){this.getEditionWork()}getEditionWork(){this.editionService.getEditionWork().pipe((0,u.R)(this._destroy$)).subscribe(t=>{this.editionWork=t,this.setButtons()})}setButtons(){this.editionRouterLinkButtons=[new c.v(this.editionWork.baseRoute,this.editionWork.introRoute.route,a.w8.EDITION_INTRO.short,!1),new c.v(this.editionWork.baseRoute,this.editionWork.detailRoute.route,a.w8.EDITION_DETAIL.short,!1),new c.v(this.editionWork.baseRoute,this.editionWork.reportRoute.route,a.w8.EDITION_REPORT.short,!1),new c.v(this.editionWork.baseRoute,this.editionWork.graphRoute.route,a.w8.EDITION_GRAPH.short,!1)]}ngOnDestroy(){this._destroy$.next(!0),this._destroy$.unsubscribe()}};p.ctorParameters=()=>[{type:d.O}],p=(0,o.gn)([(0,s.wA2)({selector:"awg-edition-overview",template:'<awg-router-link-button-group\n    *ngIf="editionRouterLinkButtons"\n    [routerLinkButtons]="editionRouterLinkButtons"\n    [queryParamsHandling]="\'\'"\n>\n</awg-router-link-button-group>\n\n<router-outlet></router-outlet>\n',styles:[""]})],p);let g=class{constructor(){}ngOnInit(){}};g.ctorParameters=()=>[],g=(0,o.gn)([(0,s.wA2)({selector:"awg-edition-section",template:"\x3c!--\n<p>edition-section works!</p>\n--\x3e\n\n<router-outlet></router-outlet>\n",styles:[""]})],g);let _=class{constructor(){}ngOnInit(){}};_.ctorParameters=()=>[],_=(0,o.gn)([(0,s.wA2)({selector:"awg-edition-series",template:"<p>edition-series works!</p>\n\n<router-outlet></router-outlet>\n",styles:[""]})],_);let w=class{constructor(){}ngOnInit(){}};w.ctorParameters=()=>[],w=(0,o.gn)([(0,s.wA2)({selector:"awg-edition-type",template:"<p>edition-type works!</p>\n\n<router-outlet></router-outlet>\n",styles:[""]})],w);const k=[{path:"",component:g,children:[{path:"composition/:compositionId",component:h,children:[{path:"",component:p,children:[{path:a.w8.EDITION_INTRO.route,loadChildren:()=>i.e(18).then(i.bind(i,5018)).then(t=>t.EditionIntroModule)},{path:a.w8.EDITION_DETAIL.route,loadChildren:()=>Promise.all([i.e(592),i.e(663)]).then(i.bind(i,5663)).then(t=>t.EditionDetailModule)},{path:a.w8.EDITION_REPORT.route,loadChildren:()=>Promise.all([i.e(592),i.e(763)]).then(i.bind(i,3876)).then(t=>t.EditionReportModule)},{path:a.w8.EDITION_GRAPH.route,loadChildren:()=>Promise.all([i.e(592),i.e(577)]).then(i.bind(i,1577)).then(t=>t.EditionGraphModule)},{path:"",redirectTo:"/"+a.w8.EDITION_INTRO.route,pathMatch:"full"}]}]}]}],D=[h,p,g,_,w];let I=class{};I=(0,o.gn)([(0,s.LVF)({imports:[r.Bz.forChild(k)],exports:[r.Bz]})],I);let E=class{};E=(0,o.gn)([(0,s.LVF)({imports:[n.m,I],declarations:[D]})],E)},6409:(t,e,i)=>{"use strict";i.d(e,{K:()=>c,O:()=>_});var o=i(4762),s=i(7716),n=i(1841),r=i(5758),a=i(5917),d=i(5242),h=i(5257),l=i(5304),u=i(5768);let c=class{constructor(t){this.http=t,this._assetWorkPath=""}getEditionDetailData(t){this._setAssetWorkPath(t);const e=this._getFolioConvoluteData(),i=this._getSvgSheetsData(),o=this._getTextcriticsListData();return(0,r.D)([e,i,o]).pipe((0,d.d)([new u.yL,new u.vU,new u.Dt]),(0,h.q)(1))}getEditionGraphData(t){this._setAssetWorkPath(t);return this._getGraphData().pipe((0,d.d)(new u.nu),(0,h.q)(1))}getEditionIntroData(t){this._setAssetWorkPath(t);return this._getIntroData().pipe((0,d.d)(new u.Jb),(0,h.q)(1))}getEditionReportData(t){this._setAssetWorkPath(t);const e=this._getSourceListData(),i=this._getSourceDescriptionListData(),o=this._getSourceEvaluationListData(),s=this._getTextcriticsListData();return(0,r.D)([e,i,o,s]).pipe((0,d.d)([new u.LQ,new u.DD,new u.DO,new u.Dt]),(0,h.q)(1))}_setAssetWorkPath(t){const e=t.series.route+t.section.route+t.work.route;this._assetWorkPath=u.w8.EDITION_ASSETS.baseRoute+e}_getFolioConvoluteData(){const t=u.w8.EDITION_ASSETS.folioConvoluteFile,e=`${this._assetWorkPath}/${t}`;return this._getJsonData(e)}_getGraphData(){const t=u.w8.EDITION_ASSETS.graphFile,e=`${this._assetWorkPath}/${t}`;return this._getJsonData(e)}_getIntroData(){const t=u.w8.EDITION_ASSETS.introFile,e=`${this._assetWorkPath}/${t}`;return this._getJsonData(e)}_getSourceListData(){const t=u.w8.EDITION_ASSETS.sourceListFile,e=`${this._assetWorkPath}/${t}`;return this._getJsonData(e)}_getSourceDescriptionListData(){const t=u.w8.EDITION_ASSETS.sourceDescriptionListFile,e=`${this._assetWorkPath}/${t}`;return this._getJsonData(e)}_getSourceEvaluationListData(){const t=u.w8.EDITION_ASSETS.sourceEvaluationListFile,e=`${this._assetWorkPath}/${t}`;return this._getJsonData(e)}_getSvgSheetsData(){const t=u.w8.EDITION_ASSETS.svgSheetsFile,e=`${this._assetWorkPath}/${t}`;return this._getJsonData(e)}_getTextcriticsListData(){const t=u.w8.EDITION_ASSETS.textcriticsFile,e=`${this._assetWorkPath}/${t}`;return this._getJsonData(e)}_getJsonData(t){return this.http.get(t).pipe((0,l.K)(this._handleError("_getJsonData",[])))}_handleError(t,e){return i=>(this._logError(`${t} failed: ${i.message}`),(0,a.of)(e))}_logError(t){console.error(t)}};c.ctorParameters=()=>[{type:n.eN}],c=(0,o.gn)([(0,s.GSi)({providedIn:"root"})],c);var p,g=i(2298);let _=p=class{constructor(){this._bufferSize=1,this._editionWorkSubject=new g.t(this._bufferSize),this._editionWorkStream$=this._editionWorkSubject.asObservable()}static _filterTextcriticalComments(t,e,i){const o=t.measure.replace("[","").replace("]",""),s=t.system.replace("[","").replace("]","");switch(e.type){case u.wN.measure:return o===e.id;case u.wN.system:return s===e.id;case u.wN.item:return i===+e.id}}getTextcriticalComments(t,e){if(t&&e)return t.filter((t,i)=>p._filterTextcriticalComments(t,e,i))}getEditionWork(){return this._editionWorkStream$}updateEditionWork(t){this._editionWorkSubject.next(t)}clearEditionWork(){this._editionWorkSubject.next(null)}};_=p=(0,o.gn)([(0,s.GSi)({providedIn:"root"})],_)}}]);