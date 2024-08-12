import{a as et,b as rt}from"./chunk-I7PFRKPI.js";var R=class R{};R.OPUS={route:"/op",short:"op.",full:"Opus"},R.MNR={route:"/m",short:"M",full:"Moldenhauer-Nr."},R.MNR_PLUS={route:"/m_plus",short:"M*",full:"Moldenhauer-Nr. (AWG-ID)"};var A=R,m=class m{};m.WORK_EDITION={route:"work-edition",short:"WE",full:"Werkedition"},m.TEXT_EDITION={route:"text-edition",short:"TE",full:"Textedition"},m.SKETCH_EDITION={route:"sketch-edition",short:"SE",full:"Skizzenedition"};var it=m,h=class h{};h.EDITION={route:"/edition",short:"AWG",full:"Anton Webern Gesamtausgabe"},h.PREFACE={route:"preface",short:"Vorwort",full:"Vorwort / Preface"},h.ROWTABLES={route:"row-tables",short:"Reihentabellen",full:"Reihentabellen"},h.COMPLEX={route:"/complex",short:"Editionskomplex",full:"Editionskomplex"},h.SERIES={route:"series",short:"Serien",full:"Editions\xFCbersicht"},h.SERIES_1={route:"1",short:"I",full:"Serie I (Werke mit Opuszahlen)"},h.SERIES_2={route:"2",short:"II",full:"Serie II (Nachgelassene Kompositionen und Fragmente)"},h.SERIES_3={route:"3",short:"III",full:"Serie III (Bearbeitungen von Werken anderer Komponisten)"},h.SECTION={route:"/section/",short:"Abteilung",full:"Abteilungs\xFCbersicht"},h.SECTION_1={route:"1",short:"1",full:"Abteilung 1 (Orchestermusik)"},h.SECTION_2={route:"2",short:"2",full:"Abteilung 2 (Kammer- und Klaviermusik)"},h.SECTION_2A={route:"2a",short:"2a",full:"Abteilung 2a (Kammer- und Klaviermusik: Klaviermusik)"},h.SECTION_2B={route:"2b",short:"2b",full:"Abteilung 2b (Kammer- und Klaviermusik: Kammermusik)"},h.SECTION_3={route:"3",short:"3",full:"Abteilung 3 (Chormusik)"},h.SECTION_4={route:"4",short:"4",full:"Abteilung 4 (Vokalmusik mit Ensemblebegleitung)"},h.SECTION_5={route:"5",short:"5",full:"Abteilung 5 (Klavierlieder)"},h.SERIES_3_SECTION_5={route:"5",short:"5",full:"Abteilung 5 (Klavierausz\xFCge)"},h.EDITION_GRAPH={route:"graph",short:"Graph",full:"Graph"},h.EDITION_INTRO={route:"intro",short:"Einleitung",full:"Einleitung"},h.EDITION_SHEETS={route:"sheets",short:"Edierte Notentexte",full:"Edierte Notentexte"},h.EDITION_REPORT={route:"report",short:"Kritischer Bericht",full:"Kritischer Bericht"};var S=h;var _=class{};var L=class{};var y=class{constructor(t,s,r){if(!t?.catalogueType||!t?.catalogueNumber)return;let i="/",o="&nbsp;";this.titleStatement=rt(et({},t),{catalogueType:this._mapCatalogueType(t.catalogueType)}),this.respStatement=s??new L,this.pubStatement={series:this._mapPubStatement("SERIES_",r?.series),section:this._mapPubStatement("SECTION_",r?.section)},this.complexId=new _,this.complexId.route=this.titleStatement.catalogueType.route,this.complexId.route+=this.titleStatement.catalogueNumber.replace(/\//g,"_"),this.complexId.short=`${this.titleStatement.catalogueType.short}${o}${this.titleStatement.catalogueNumber}`,this.complexId.full=`${this.titleStatement.title} ${this.complexId.short}`;let c=`${S.EDITION.route}${S.COMPLEX.route}`;this.baseRoute=`${c}${this.complexId.route}${i}`}_mapCatalogueType(t){return A[t.toUpperCase()]}_mapPubStatement(t,s){return S[`${t}${s?.toUpperCase()}`]}};var Y=class{};var I;(function(e){e.measure="Takt",e.system="System",e.tka="Anmerkung"})(I||(I={}));var P;(function(e){e.hover="hover",e.fill="fill",e.transparent="transparent"})(P||(P={}));var G=class{constructor(t,s,r){this.type=t,this.id=s,this.typeKey=this._getEnumKeyFromValue(t),this.isSelected=r||!1}_getEnumKeyFromValue(t){return Object.keys(I).find(r=>I[r]===t)}};var H=class{},b=class{};var g=class{};var d=class{};var N=class{};var F=class{};var O=class{};var X=class{};var w=class{};var V=class{},B=class{};var k=class{constructor(t,s){this.svgWidth="100%",this.svgHeight="100%",this.viewBox="0 0 "+t+" "+s}};function u(e,t){if(!Number.isNaN(e))return+(Math.round(+(e+"e"+t))+"e-"+t)}var a=class{constructor(t,s){this.x=t,this.y=s}},M=class{constructor(t,s){this.START_POINT=t,this.END_POINT=s}},W=class{constructor(t,s,r){let{UPPER_LEFT_VERTEX:i,LOWER_RIGHT_VERTEX:o}=t;this.CENTERED_X_POSITION=(i.x+o.x)/2;let c=r?-s:s;this.CENTERED_Y_POSITION=(i.y+o.y)/2-c}},K=class{constructor(t,s){this.SEGMENT_LABEL_ARRAY=[t,s?` ${s}`:""],this.SEGMENT_LABEL=this.SEGMENT_LABEL_ARRAY.join(" "),this.SEGMENT_LABEL_OFFSET=s?5:0}},v=class{constructor(t,s,r,i){this.systems=s,this.sectionPartition=r,this.segmentOffsetCorrection=i;let{startX:o,startY:c,endX:E,endY:n}=this._calculateVertices(t);this.UPPER_LEFT_VERTEX=new a(o,c),this.UPPER_RIGHT_VERTEX=new a(E,c),this.LOWER_RIGHT_VERTEX=new a(E,n),this.LOWER_LEFT_VERTEX=new a(o,n),this.VERTICES_AS_STRING=this._getSegmentVerticesAsString()}_calculateVertices(t){let s=this._calculateX(t,!0),r=this._calculateX(t,!1),i=this._calculateY(t,!0),o=this._calculateY(t,!1);return{startX:s,startY:i,endX:r,endY:o}}_calculateX(t,s){let r=u(this.systems.SYSTEMS_DIMENSIONS.SYSTEMS_WIDTH/this.sectionPartition,2),i=t.position&&t.position<=this.sectionPartition?t.position-1:0,o=this.systems.SYSTEMS_DIMENSIONS.START_X,c=this.segmentOffsetCorrection/2,E=o+i*r+c,n=s?0:r-this.segmentOffsetCorrection;return u(E+n,2)}_calculateY(t,s){let r=s?t.startSystem-1:t.endSystem-1,i=this.systems.SYSTEMS_LINES.SYSTEMS_ARRAYS[r],o=s?i.at(0).START_POINT.y:i.at(-1).END_POINT.y,c=this.segmentOffsetCorrection*(s?-1:1);return u(o+c,2)}_getSegmentVerticesAsString(){return[this.UPPER_LEFT_VERTEX,this.UPPER_RIGHT_VERTEX,this.LOWER_RIGHT_VERTEX,this.LOWER_LEFT_VERTEX,this.UPPER_LEFT_VERTEX].map(s=>`${s.x} ${s.y}`).join(" ")}},$=class{constructor(t,s,r){this.systems=s,this.segmentOffsetCorrection=r,this.sectionPartition=t.sectionPartition??1,this._getContentSections(t)}_getContentSections(t){if(!t.sections){console.error("No sections array in content",t);return}if(t.sections.length>this.sectionPartition){console.error("Sections array is bigger than sectionPartition");return}if(this.systems.NUMBER_OF_SYSTEMS===0){console.error("No systems in folio");return}t.sections.forEach((s,r)=>{this._setProperties(t,s)})}_setProperties(t,s){let{complexId:r,sheetId:i,selectable:o=!0,reversed:c=!1,linkTo:E="",sigle:n,sigleAddendum:T}=t;this.section=s;let f=new K(n,T);this.vertices=new v(s,this.systems,this.sectionPartition,this.segmentOffsetCorrection);let st=new W(this.vertices,f.SEGMENT_LABEL_OFFSET,c);Object.assign(this,{complexId:r,sheetId:i,sigle:n,sigleAddendum:T,selectable:o,reversed:c,linkTo:E,segmentLabelArray:f.SEGMENT_LABEL_ARRAY,segmentLabel:f.SEGMENT_LABEL,centeredXPosition:st.CENTERED_X_POSITION,centeredYPosition:st.CENTERED_Y_POSITION})}},Z=class{constructor({initialOffsetX:t,initialOffsetY:s,formatX:r,formatY:i,factor:o},c){this.FOLIO_ID=c,this.SHEET_WIDTH=r*o,this.SHEET_HEIGHT=i*o,this.OFFSET=new a(t,s),this.UPPER_LEFT_CORNER=this.OFFSET,this.LOWER_RIGHT_CORNER=new a(this.SHEET_WIDTH,this.SHEET_HEIGHT)}},l=class l{constructor(t){this.sheet=t,this.UPPER_MARGIN=this._calculateSheetMargin(this.sheet.SHEET_HEIGHT,l.VERTICAL_MARGIN_FACTOR),this.LOWER_MARGIN=this.UPPER_MARGIN,this.LEFT_MARGIN=this._calculateSheetMargin(this.sheet.SHEET_WIDTH,l.HORIZONTAL_MARGIN_FACTOR),this.RIGHT_MARGIN=this._calculateSheetMargin(this.sheet.SHEET_WIDTH,l.HORIZONTAL_MARGIN_FACTOR/2),this.HORIZONTAL_MARGINS=this.LEFT_MARGIN+this.RIGHT_MARGIN,this.VERTICAL_MARGINS=this.UPPER_MARGIN+this.LOWER_MARGIN}_calculateSheetMargin(t,s){return u(t*s,2)}};l.HORIZONTAL_MARGIN_FACTOR=1/6,l.VERTICAL_MARGIN_FACTOR=.05;var z=l,j=class{constructor(t,s){this.sheet=t,this.systemsMargins=s;let{SHEET_WIDTH:r,SHEET_HEIGHT:i,UPPER_LEFT_CORNER:o}=this.sheet,{HORIZONTAL_MARGINS:c,VERTICAL_MARGINS:E,LEFT_MARGIN:n,UPPER_MARGIN:T}=this.systemsMargins;this.SYSTEMS_WIDTH=r-c,this.SYSTEMS_HEIGHT=i-E,this.START_X=o.x+n,this.START_Y=o.y+T,this.END_X=this.START_X+this.SYSTEMS_WIDTH,this.END_Y=this.START_Y+this.SYSTEMS_HEIGHT}},q=class{constructor(t,s){this.yArray=t,this.systemsDimensions=s,this._calculateSystemLine=r=>{let{START_X:i,END_X:o}=this.systemsDimensions;return new M(new a(i,r),new a(o,r))},this.SYSTEMS_ARRAYS=this._calculateSystemsArrays()}_calculateSystemsArrays(){return this.yArray.map(t=>t.map(this._calculateSystemLine))}},p=class p{constructor(t,s,r,i){this.yArray=t,this.systemsMargins=s,this.systemsDimensions=r,this.zoomFactor=i,this.SYSTEMS_LABELS_ARRAY=this._calculateSystemsLabelArray()}_calculateSystemsLabelArray(){let t=u(this.systemsDimensions.START_X-this.systemsMargins.LEFT_MARGIN*p.LABEL_START_X_OFFSET_FACTOR,2),s=u(p.LABEL_START_Y_OFFSET_FACTOR/this.zoomFactor,2);return this.yArray.map(r=>{let i=r[0]-s;return new a(t,i)})}};p.LABEL_START_X_OFFSET_FACTOR=.6,p.LABEL_START_Y_OFFSET_FACTOR=3;var D=p,J=class{constructor(t,s,r){this.lineSpaceFactor=1.5,this.NUMBER_OF_SYSTEMS=s?parseInt(s,10):0,this.ZOOM_FACTOR=r,this.SYSTEMS_MARGINS=new z(t),this.SYSTEMS_DIMENSIONS=new j(t,this.SYSTEMS_MARGINS);let i=this._calculateSystemYArray();this.SYSTEMS_LINES=new q(i,this.SYSTEMS_DIMENSIONS),this.SYSTEMS_LABELS=new D(i,this.SYSTEMS_MARGINS,this.SYSTEMS_DIMENSIONS,this.ZOOM_FACTOR)}_calculateSystemYArray(){let t=this.SYSTEMS_DIMENSIONS.SYSTEMS_HEIGHT/this.NUMBER_OF_SYSTEMS;return Array.from({length:this.NUMBER_OF_SYSTEMS},(r,i)=>{let o=u(this.SYSTEMS_DIMENSIONS.START_Y+i*t,2);return this._calculateSystemLineArray(o)})}_calculateSystemLineArray(t){return Array.from({length:5},(r,i)=>t+i*this.lineSpaceFactor*this.ZOOM_FACTOR)}},Q=class{constructor(t,s,r=0){this.SHEET=new Z(t,s.folioId),this.SYSTEMS=new J(this.SHEET,s.systems,t.factor),this.CONTENT_SEGMENTS=s.content.map(i=>new $(i,this.SYSTEMS,r))}};var U=class{constructor(t){this.folioId=t.FOLIO_ID,this.upperLeftCorner=t.UPPER_LEFT_CORNER,this.lowerRightCorner=t.LOWER_RIGHT_CORNER}},C=class{constructor(t){this.systemsLabelPositions=t.SYSTEMS_LABELS.SYSTEMS_LABELS_ARRAY,this.systemsLines=t.SYSTEMS_LINES.SYSTEMS_ARRAYS}},x=class{constructor(t){this.complexId=t.complexId,this.sheetId=t.sheetId,this.linkTo=t.linkTo,this.selectable=t.selectable,this.reversed=t.reversed,this.segmentVertices=t.vertices?.VERTICES_AS_STRING,this.segmentLabelArray=t.segmentLabelArray,this.segmentLabel=t.segmentLabel,this.centeredXPosition=t.centeredXPosition,this.centeredYPosition=t.centeredYPosition}},tt=class{constructor(t){this.sheet=new U(t.SHEET),this.systems=new C(t.SYSTEMS),this.contentSegments=t.CONTENT_SEGMENTS.map(s=>new x(s))}};export{it as a,S as b,y as c,Y as d,I as e,P as f,G as g,H as h,b as i,Q as j,tt as k,g as l,d as m,N as n,F as o,O as p,X as q,w as r,V as s,B as t,k as u};
