"use strict";(self.webpackChunkawg_app=self.webpackChunkawg_app||[]).push([[592],{849:(l,d,e)=>{e.d(d,{v:()=>i});class i{constructor(m,r,s,n){this.root=m,this.link=r,this.label=s,this.disabled=n}}},9875:(l,d,e)=>{e.d(d,{K:()=>h});var i=e(655),a=e(5e3),m=e(5121),r=e(8264),s=e(6085);let n=class{constructor(){this.openModalRequest=new a.vpe,this.selectSvgSheetRequest=new a.vpe,this.ref=this}openModal(t){!t||this.openModalRequest.emit(t)}selectSvgSheet(t){!t||this.selectSvgSheetRequest.emit(t)}};n.ctorParameters=()=>[],n.propDecorators={textcriticalComments:[{type:a.IIB}],openModalRequest:[{type:a.r_U}],selectSvgSheetRequest:[{type:a.r_U}]},n=(0,i.gn)([(0,a.wA2)({selector:"awg-edition-tka-table",template:r,changeDetection:a.n4l.OnPush,styles:[s]})],n);let h=class{};h=(0,i.gn)([(0,a.LVF)({imports:[m.m],declarations:[n],exports:[n]})],h)},8372:(l,d,e)=>{e.d(d,{b:()=>r});var i=e(4049),a=e(4482),m=e(5403);function r(s,n=i.z){return(0,a.e)((h,o)=>{let t=null,u=null,p=null;const b=()=>{if(t){t.unsubscribe(),t=null;const c=u;u=null,o.next(c)}};function w(){const c=p+s,g=n.now();if(g<c)return t=this.schedule(void 0,c-g),void o.add(t);b()}h.subscribe((0,m.x)(o,c=>{u=c,p=n.now(),t||(t=n.schedule(w,s),o.add(t))},()=>{b(),o.complete()},void 0,()=>{u=t=null}))})}},6085:l=>{l.exports=".awg-edition-tka-table .measure {\n    width: 10%;\n    white-space: nowrap;\n}\n\n.awg-edition-tka-table .system {\n    width: 8%;\n}\n\n.awg-edition-tka-table .location {\n    width: 15%;\n    white-space: nowrap;\n}\n\n.awg-edition-tka-table .comment {\n    width: auto;\n}\n"},8264:l=>{l.exports='<table aria-label="Table for text-critical comments" class="table table-hover table-condensed awg-edition-tka-table">\n    <thead>\n        <tr>\n            <th scope="col" class="awg-edition-tka-table-header measure">Takt</th>\n            <th scope="col" class="awg-edition-tka-table-header system">System</th>\n            <th scope="col" class="awg-edition-tka-table-header location">Ort im Takt</th>\n            <th scope="col" class="awg-edition-tka-table-header comment">Kommentar</th>\n        </tr>\n    </thead>\n    <tbody *ngIf="textcriticalComments">\n        <tr *ngFor="let textcriticalComment of textcriticalComments">\n            <td><span [compile-html]="textcriticalComment.measure" [compile-html-ref]="ref"></span></td>\n            <td [innerHTML]="textcriticalComment.system"></td>\n            <td [innerHTML]="textcriticalComment.position"></td>\n            <td><span [compile-html]="textcriticalComment.comment" [compile-html-ref]="ref"></span></td>\n        </tr>\n    </tbody>\n</table>\n'}}]);