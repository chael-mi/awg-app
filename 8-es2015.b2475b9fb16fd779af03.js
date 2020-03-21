(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"/jvW":function(t,e,i){"use strict";i.r(e),e.default=""},"9wbs":function(t,e,i){"use strict";i.r(e),e.default=""},"Bh2/":function(t,e,i){"use strict";i.r(e),e.default=""},JAkG:function(t,e,i){"use strict";i.r(e),e.default='\x3c!-- content: bibliography list --\x3e\n<ul class="bibliography">\n    <li\n        *ngFor="let bibItem of bibList; trackBy: trackById"\n        [class.selected]="bibItem === selectedBibItem"\n        (click)="onItemSelect(bibItem)"\n    >\n        <span class="badge">{{ bibItem.value[0] }}</span>\n        <awg-bibliography-detail *ngIf="bibItem.obj_id === selectedBibItem.obj_id" [objId]="bibItem.obj_id">\n        </awg-bibliography-detail>\n    </li>\n</ul>\n'},TLbp:function(t,e,i){"use strict";i.r(e),e.default='<span [innerHtml]="bibEntry$ | async | bibFormat"></span>\n'},YYos:function(t,e,i){"use strict";i.r(e),e.default="<p>\n  bibliography-search works!\n</p>\n"},gxKZ:function(t,e,i){"use strict";i.r(e),e.default='\x3c!-- content: bibliography --\x3e\n<awg-bibliography-search></awg-bibliography-search>\n\n<p>Lade ... {{ (bibList$ | async)?.subjects.length }} von {{ nhits }} Eintr\xe4gen</p>\n\n<awg-bibliography-list\n    *ngIf="isBibListLoaded && (bibList$ | async) as bibList"\n    [bibList]="bibList.subjects"\n    (selectItemRequest)="onItemSelect($event)"\n>\n</awg-bibliography-list>\n'},iCE9:function(t,e,i){"use strict";i.r(e);var r=i("mrSG"),s=i("8Y7J"),a=i("PCNd");let l=class{};l=Object(r.a)([Object(s.n)({selector:"awg-bibliography-search",template:__importDefault(i("YYos")).default,styles:[__importDefault(i("Bh2/")).default]})],l);var o=i("W28f");let n=class{constructor(){this.selectItemRequest=new s.w,this.selectedBibItem=new o.g}ngOnInit(){}onItemSelect(t){this.selectedBibItem=t,this.selectItemRequest.emit(t)}trackById(t){return t.obj_id}};Object(r.a)([Object(s.F)()],n.prototype,"bibList",void 0),Object(r.a)([Object(s.R)()],n.prototype,"selectItemRequest",void 0),n=Object(r.a)([Object(s.n)({selector:"awg-bibliography-list",template:__importDefault(i("JAkG")).default,styles:[__importDefault(i("/jvW")).default]})],n);let b=class{constructor(){this.formatFieldArr=["Author","Titel_unselbst","Titel_selbst","Herausgeber","unpubliziert","Verlagsort","Publikationsdatum","Reihentitel","Seitenangabe"]}transform(t){return t?(this.entry=t,this.formattedEntry=this.getFormatFields("edit",this.entry),this.getFormattedValues(this.formattedEntry),this.getFormatFields("output",this.formattedEntry)):null}getFormatFields(t,e){let i={};for(let r=0;r<this.formatFieldArr.length;r++)e[this.formatFieldArr[r]]&&("edit"===t?i[this.formatFieldArr[r]]=e[this.formatFieldArr[r]]:"output"===t&&(i=0===r?e[this.formatFieldArr[r]]:i+e[this.formatFieldArr[r]]));return i}getFormattedValues(t){return Object.keys(t).forEach(e=>{t[e]=this.getFormattedValueByKey(t,e)}),t}getFormattedValueByKey(t,e){let i="";switch(e){case"Kurztitel":i=this.formatBibTitleShort(t[e]);break;case"Author":i=this.formatBibAuthor(t[e]);break;case"Titel_selbst":i=this.formatBibTitleIndep(t[e]);break;case"Titel_unselbst":i=this.formatBibTitleDep(t[e]);break;case"Herausgeber":i=this.formatBibEditor(t[e]);break;case"unpubliziert":i=this.formatBibUnpublished(t[e]);break;case"Verlagsort":i=this.formatBibPubPlace(t[e]);break;case"Publikationsdatum":i=this.formatBibPubDate(t[e]);break;case"Reihentitel":i=this.formatBibTitleSeries(t[e]);break;case"Seitenangabe":i=this.formatBibPages(t[e]);break;default:i=t[e]}return i}formatBibTitleShort(t){return t?t+" | ":""}formatBibAuthor(t){if(!t)return"";let e="";if("object"==typeof t){e+=this.splitName(t[0],"");const i=Object.keys(t).length;for(let r=1;r<i;r++){const s=r===i-1?" und ":", ";e+=this.splitName(t[r],s)}}else"string"==typeof t&&(e+=this.splitName(t,""));return e+=": ",e}formatBibTitleIndep(t){return t?"Zeitschriftenartikel"!==this.entry.Typ?t+", ":t:""}formatBibTitleDep(t){return t?"\u201e"+t+"\u201c, in: ":""}formatBibEditor(t){if(!t)return"";let e="hg. von ";if("object"==typeof t){e+=this.splitName(t[0],"");const i=Object.keys(t).length;for(let r=1;r<i;r++){const s=r===i-1?" und ":", ";e+=this.splitName(t[r],s)}}else"string"==typeof t&&(e+=this.splitName(t,""));return e+=", ",e}formatBibUnpublished(t){return t?t+" ":""}formatBibPubPlace(t){const e=this.entry.Verlag?this.entry.Verlag:null;if(!t)return e&&console.log('Ort fehlt: "'+e+'" ('+this.entry.Kurztitel+")"),"";let i="";if("object"==typeof t){const r=Object.keys(t).length;if(e)if("object"==typeof e){if(Object.keys(e).length===r)for(let s=0;s<r;s++)s===r-1&&(i+="und "),i+=t[s]+": "+e[s]+", "}else for(let s=0;s<r;s++)i+=s===r-1?t[s]+": "+e+", ":t[s]+", ";else{for(let e=0;e<r;e++)i+=t[e]+", ";this.entry.unpubliziert||console.log('Verlag fehlt: "'+i+'" ('+this.entry.Kurztitel+")")}}else if(e)if(i+=t+": ","object"==typeof e){const t=Object.keys(e).length;for(let r=0;r<t;r++)i+=e[r]+", "}else i+=e+", ";else this.entry.unpubliziert||console.log('Verlag fehlt: "'+i+'" ('+this.entry.Kurztitel+")"),i+=t+", ";return i}formatBibPublisher(t){return""}formatBibPubDate(t){return"Zeitschriftenartikel"===this.entry.Typ?" ("+t+")":" "+t}formatBibTitleSeries(t){return t?" ("+t+")":""}formatBibPages(t){if(!t)return"";let e="";if("object"==typeof t){const i=Object.keys(t).length;for(let r=0;r<i;r++){e+=(0===r?", S. ":", ")+t[r]}}else"string"==typeof t&&t&&(e=", S. "+t);return e}splitName(t,e){let i=[];return t.match(",")?(i=t.split(", "),i.splice(1,0,i.splice(0,1)[0]),e+i[0]+" "+i[1]):e+t}};b=Object(r.a)([Object(s.V)({name:"bibFormat"})],b);var c=i("iInd"),u=i("RJwY"),h=i("vkgz");let f=class{constructor(t){this.bibliographyService=t,this.isBibListLoaded=!1}ngOnInit(){this.getBibList()}getBibList(){this.bibList$=this.bibliographyService.getBibliographyList().pipe(Object(h.a)(t=>{this.nhits=t.nhits,this.isBibListLoaded=!0}))}onItemSelect(t){this.selectedBibItem=t}};f.ctorParameters=()=>[{type:u.a}],f=Object(r.a)([Object(s.n)({selector:"awg-bibliography",template:__importDefault(i("gxKZ")).default,styles:[__importDefault(i("royv")).default]})],f);var p=i("lJxs"),m=i("dJ3e");let d=class{constructor(t,e){this.bibliographyService=t,this.conversionService=e}ngOnInit(){this.getBibEntry(this.objId)}getBibEntry(t){this.bibEntry$=this.bibliographyService.getBibliographyItemDetail(t).pipe(Object(p.a)(t=>this.conversionService.convertObjectProperties(t)))}};d.ctorParameters=()=>[{type:u.a},{type:m.b}],Object(r.a)([Object(s.F)()],d.prototype,"objId",void 0),d=Object(r.a)([Object(s.n)({selector:"awg-bibliography-detail",template:__importDefault(i("TLbp")).default,styles:[__importDefault(i("9wbs")).default]})],d);const g=[{path:"",component:f,children:[{path:"detail/:id",component:d}]}],y=[f,d];let j=class{};j=Object(r.a)([Object(s.K)({imports:[c.e.forChild(g)],exports:[c.e]})],j),i.d(e,"BibliographyModule",(function(){return B}));let B=class{};B=Object(r.a)([Object(s.K)({imports:[a.a,j],declarations:[y,l,n,b],exports:[y,l,n,b]})],B)},royv:function(t,e,i){"use strict";i.r(e),e.default=""}}]);