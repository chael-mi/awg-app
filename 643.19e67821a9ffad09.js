"use strict";(self.webpackChunkawg_app=self.webpackChunkawg_app||[]).push([[643],{6643:(t,d,n)=>{n.r(d),n.d(d,{PageNotFoundViewModule:()=>i});var a=n(655),o=n(5e3),l=n(5121),s=n(1591),p=n(7226),r=n(6269),c=n(9231);let e=class{constructor(){this.pageNotFoundTitle="Entschuldigung, diese Seite gibt es hier nicht\u2026",this.pageNotFoundSubTitle="\u2026 aber m\xf6glicherweise k\xf6nnen wir Ihnen anders weiterhelfen?",this._pageNotFoundImgPath="assets/img/page-not-found/Webern_Books.jpg",this._awgContactUrl=c.X.AWG_PROJECT_URL+"index.php?id=41"}get pageNotFoundImgPath(){return this._pageNotFoundImgPath}get awgContactUrl(){return this._awgContactUrl}};e=(0,a.gn)([(0,o.wA2)({selector:"awg-page-not-found-view",template:p,changeDetection:o.n4l.OnPush,styles:[r]})],e);const h=[{path:"",component:e,data:{title:"AWG Online Edition \u2013 404"}}],w=[e];let g=class{};g=(0,a.gn)([(0,o.LVF)({imports:[s.Bz.forChild(h)],exports:[s.Bz]})],g);let i=class{};i=(0,a.gn)([(0,o.LVF)({imports:[l.m,g],declarations:[w]})],i)},6269:t=>{t.exports=""},7226:t=>{t.exports='<div class="col-12 col-xl-9 awg-page-not-found">\n    <h2 id="awg-page-not-found-title">{{ pageNotFoundTitle }}</h2>\n\n    <h5 id="awg-page-not-found-subtitle">{{ pageNotFoundSubTitle }}</h5>\n\n    <div class="awg-page-not-found-body text-center">\n        <div class="awg-page-not-found-image my-4">\n            <img [src]="pageNotFoundImgPath" width="70%" alt="Page not found" />\n        </div>\n\n        <p id="awg-page-not-found-contact">\n            Kontaktieren sie uns gerne unter:\n            <a [href]="awgContactUrl">anton-webern.ch</a>\n        </p>\n\n        <p id="awg-page-not-found-back" class="mt-4">\n            Zur\xfcck zur Startseite: <a [routerLink]="[\'/home\']" routerLinkActive="active">Home</a>\n        </p>\n    </div>\n</div>\n'}}]);