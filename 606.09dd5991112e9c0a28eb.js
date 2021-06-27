(self.webpackChunkawg_app=self.webpackChunkawg_app||[]).push([[606],{3606:(e,n,t)=>{"use strict";t.r(n),t.d(n,{StructureViewModule:()=>c});var r=t(4762),i=t(7716),s=t(1470),a=t(4213);let u=class{constructor(e){this.router=e,this.structureViewTitle="Datenstrukturmodell",this.structureViewId="awg-structure-view"}ngOnInit(){this.routeToSidenav()}routeToSidenav(){this.router.navigate([{outlets:{side:"structureInfo"}}],{preserveFragment:!0,queryParamsHandling:"preserve"})}};u.ctorParameters=()=>[{type:a.F0}],u=(0,r.gn)([(0,i.wA2)({selector:"awg-structure-view",template:'\x3c!-- content: structure --\x3e\n\n\x3c!-- heading --\x3e\n<awg-heading [title]="structureViewTitle" [id]="structureViewId"></awg-heading>\n\n\x3c!-- description --\x3e\n<p>\n    Das Modell zeigt die f\xfcr eine AWG-Online-Edition projektierte Datenstruktur, die zur Zeit intern in der\n    Webern-SALSAH-Datenbank implementiert wird.\n</p>\n\n<p>\n    Die erforderlichen Objektklassen und Eigenschaften werden von SALSAH intern als RDF (<a\n        href="https://www.w3.org/RDF/"\n        >Resource Description Framework</a\n    >) Triple verwaltet. Sie sind in der Grafik als Ellipsen symbolisiert, deren Verkn\xfcpfungen und Verweise\n    untereinander als Pfeile dargestellt.\n</p>\n\n<p>\n    Komplexere Objektstrukturen, wie die aus mehreren Unter- oder Einzelobjekten zu modellierenden Notentexte oder\n    Kritischen Berichte, sind als Gruppen zusammengefasst. Zudem sind die Schnittstellen zum dokumentarischen Bereich\n    der Webern-SALSAH-Datenbank angedeutet.\n</p>\n\n\x3c!-- svg graphic of structure --\x3e\n<svg\n    version="1.1"\n    xmlns="https://www.w3.org/2000/svg"\n    xmlns:xlink="https://www.w3.org/1999/xlink"\n    viewBox="0 0 1980 1980"\n    id="structure"\n>\n    <image xlink:href="assets/img/WebernGraph.svg" src="assets/img/WebernGraph.png" width="1980" height="1980" />\n</svg>\n',changeDetection:i.n4l.OnPush,styles:[""]})],u);const l=[{path:"",component:u,data:{title:"AWG Online Edition \u2013 Structure"}}],o=[u];let d=class{};d=(0,r.gn)([(0,i.LVF)({imports:[a.Bz.forChild(l)],exports:[a.Bz]})],d);let c=class{};c=(0,r.gn)([(0,i.LVF)({imports:[s.m,d],declarations:[o]})],c)}}]);