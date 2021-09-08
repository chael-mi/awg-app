"use strict";(self.webpackChunkawg_app=self.webpackChunkawg_app||[]).push([[499],{6499:(o,d,e)=>{e.r(d),e.d(d,{ContactViewModule:()=>s});var a=e(4762),t=e(7716),l=e(5577),i=e(4213);var p=e(2824),h=e(3951),g=e(5942);let n=class{constructor(w,f){this.coreService=w,this.router=f,this.imprintTitle="Impressum",this.imprintId="awg-imprint",this.citationTitle="Zitation",this.citationId="awg-citation",this.documentationTitle="Dokumentation",this.documentationId="awg-documentation",this.dateFormat="d. MMMM yyyy"}ngOnInit(){this.routeToSidenav(),this.provideMetaData(),this.today=Date.now()}provideMetaData(){this.pageMetaData=this.coreService.getMetaDataSection(g.id.page),this.contactMetaData=this.coreService.getMetaDataSection(g.id.contact)}routeToSidenav(){this.router.navigate([{outlets:{side:"contactInfo"}}],{preserveFragment:!0,queryParamsHandling:"preserve"})}};n.ctorParameters=()=>[{type:h.pX},{type:i.F0}],n=(0,a.gn)([(0,t.wA2)({selector:"awg-contact-view",template:'\x3c!-- content: contact --\x3e\n\n\x3c!-- citation --\x3e\n\x3c!-- citation heading --\x3e\n<awg-heading [title]="citationTitle" [id]="citationId"></awg-heading>\n\n\x3c!-- citation description --\x3e\n<div class="awg-citation-description mb-5">\n    <p class="caps">Empfohlene Zitierweisen:</p>\n\n    <p class="italic">Website:</p>\n    <p class="awg-citation-text">\n        {{ pageMetaData.awgProjectName }}. Projekt-Website:\n        <a href="{{ pageMetaData?.awgProjectUrl }}"> {{ pageMetaData?.awgProjectUrl }} </a>, abgerufen am\n        <span class="awg-citation-date">{{ today | date: dateFormat }}</span\n        >.\n    </p>\n\n    <p class="italic">Online-Edition:</p>\n    <p class="awg-citation-text">\n        {{ pageMetaData.awgProjectName }}. Online-Edition (Version\n        <span class="awg-citation-version">{{ pageMetaData?.version }}</span> vom\n        <span class="awg-citation-version-release">{{ pageMetaData?.versionReleaseDate }}</span\n        >): <a href="{{ pageMetaData?.awgAppUrl }}"> {{ pageMetaData?.awgAppUrl }} </a>, abgerufen am\n        <span class="awg-citation-date">{{ today | date: dateFormat }}</span\n        >.\n    </p>\n</div>\n\n\x3c!-- documentation --\x3e\n\x3c!-- documentation heading --\x3e\n<awg-heading [title]="documentationTitle" [id]="documentationId"></awg-heading>\n\n\x3c!-- documentation description --\x3e\n<div class="awg-documentation-description mb-5">\n    <p class="awg-documentation-text">\n        <span class="caps">GitHub:</span><br />\n        Repository unter:\n        <a href="{{ pageMetaData?.githubUrl }}">\n            {{ pageMetaData?.githubUrl }}\n        </a>\n    </p>\n\n    <p class="awg-documentation-text">\n        <span class="caps">Compodoc:</span><br />\n        Dokumentation von Struktur und Funktionalit\xe4ten der Angular App:\n        <a id="awg-compodoc" href="{{ pageMetaData?.compodocUrl }}"> awg-app documentation </a>\n    </p>\n</div>\n\n\x3c!-- imprint --\x3e\n\x3c!-- imprint heading --\x3e\n<awg-heading [title]="imprintTitle" [id]="imprintId"></awg-heading>\n\n\x3c!-- imprint description --\x3e\n<div class="awg-imprint-description">\n    <p>\n        <span class="caps">Herausgeber:</span><br />\n        {{ pageMetaData.awgProjectName }}<br />\n        {{ contactMetaData.address.institution }}<br />\n        {{ contactMetaData.address.street }}<br />\n        {{ contactMetaData.address.postalCode }}&nbsp;{{ contactMetaData.address.city }}<br />\n        {{ contactMetaData.address.country }}<br /><br />\n    </p>\n\n    <p>\n        <span class="caps">Konzept:</span><br />\n        {{ pageMetaData.awgProjectName }}<br /><br />\n    </p>\n    <p>\n        <span class="caps">Texte/Inhalte:</span><br />\n        Die Verantwortung f\xfcr die Inhalte der Website liegt bei der {{ pageMetaData.awgProjectName }}. Bei inhaltlichen\n        Fragen wenden Sie sich bitte an die unter Kontakt angegebene Adresse.<br /><br />\n    </p>\n    <p>\n        <span class="caps">Materialien, Notentexte und Bilder (vgl. Lizenzierung):</span><br />\n        Digitales Archiv der {{ pageMetaData.awgProjectName }}<br />\n        Online-Edition der {{ pageMetaData.awgProjectName }}<br /><br />\n    </p>\n    <p>\n        <span class="caps">Programmierung &amp; Webdesign:</span><br />\n        Stefan M\xfcnnich<br />\n        Wissenschaftlicher Mitarbeiter der {{ pageMetaData.awgProjectName }}, Basel<br /><a\n            href="mailto:stefan.muennich@unibas.ch"\n            >stefan.muennich [at] unibas [dot] ch</a\n        ><br /><br />\n    </p>\n</div>\n\n\x3c!-- disclaimer description --\x3e\n<div id="awg-disclaimer">\n    <p><span class="caps">Disclaimer/Haftungserkl\xe4rung:</span><br /></p>\n    <p class="italic">Urheberrecht und Lizenzierung:</p>\n    <p>\n        S\xe4mtliche im Rahmen der {{ pageMetaData.awgProjectName }} erarbeiteten und auf ihrer Website oder ihrer\n        Online-Edition ver\xf6ffentlichten Inhalte sowie auch alle Inhalte, die von der Website oder der Online-Edition der\n        Anton Webern Gesamtausgabe aus auf der wissenschaftlichen Plattform KNORA/SALSAH (Projektbereich der Anton\n        Webern Gesamtausgabe) f\xfcr den Nutzer zug\xe4nglich sind, sind urheberrechtlich gesch\xfctzt und werden \u2013 sofern nicht\n        anders deklariert \u2013 zu den Bedingungen der Creative Commons-Lizenz \u201eNamensnennung \u2013 Weitergabe unter gleichen\n        Bedingungen 4.0 International" (<a href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">CC BY-SA-4.0</a\n        >) zur Verf\xfcgung gestellt. Jede davon abweichende Verwertung bedarf der vorherigen schriftlichen Zustimmung\n        durch den jeweiligen Rechteinhaber. Allf\xe4llige Bewilligungsgesuche sind an die\n        {{ pageMetaData.awgProjectName }} zu richten (Kontakt). Alle Rechte an zug\xe4nglich gemachten externen\n        Bildinhalten verbleiben bei den Privateigent\xfcmern bzw. den archivierenden Institutionen, bei denen die Rechte\n        f\xfcr eine allf\xe4llige Weiterverwendung einzuholen sind.\n    </p>\n\n    <p>\n        Der Software-Code dieses Prototyps wird auf\n        <a href="{{ pageMetaData?.githubUrl }}">GitHub</a> unter einer\n        <a href="https://opensource.org/licenses/MIT">MIT</a>-Lizenz zur Verf\xfcgung gestellt.\n    </p>\n\n    <p class="italic">Externe Links:</p>\n    <p>\n        Die {{ pageMetaData.awgProjectName }} hat keinen Einfluss auf und \xfcbernimmt keine Verantwortung f\xfcr die Inhalte\n        der von ihrer Website, von ihrer Online-Edition oder von der wissenschaftlichen Plattform KNORA/SALSAH\n        (Projektbereich der {{ pageMetaData.awgProjectName }}) aus verlinkten externen Internetseiten. Eine Pr\xfcfung bei\n        der Verlinkung ergab keine strafbaren Inhalte auf diesen Seiten. Alle Linkangaben sind ohne Gew\xe4hr.\n        Seitenaufrufe externer Seiten \xfcber diese Links erfolgen auf eigene Gefahr. Dies gilt f\xfcr alle Links auf der\n        Website und der Online-Edition der {{ pageMetaData.awgProjectName }} sowie auf der wissenschaftlichen Plattform\n        KNORA/SALSAH (Projektbereich der Anton Webern Gesamtausgabe).\n    </p>\n\n    <p class="italic">Haftungserkl\xe4rung:</p>\n    <p>\n        Die {{ pageMetaData.awgProjectName }} bem\xfcht sich um richtige und aktualisierte Informationen auf ihrer Website\n        und ihrer Online-Edition, \xfcbernimmt jedoch keinerlei Garantien oder Zusicherungen betreffend der Vollst\xe4ndigkeit\n        der auf dieser enthaltenen bzw. referenzierten Informationen. Prinzipiell erfolgen Zugang, Benutzung und\n        Inanspruchnahme der Dienstleistungen der Website der {{ pageMetaData.awgProjectName }} ausschlie\xdflich auf\n        eigenes Risiko des Nutzers. Weder die Gesamtausgabe noch eine von ihr beigezogene, in Herstellung,\n        Informationseingabe und Informationsvermittlung der Website involvierte Hilfsperson sind in irgendeiner Form\n        haftbar f\xfcr etwaige Sch\xe4den, die im Zusammenhang mit Zugang, Benutzung oder m\xf6glichen St\xf6rungen beim Gebrauch\n        der Website auftreten k\xf6nnten.\n    </p>\n\n    <p class="italic">Google Analytics:</p>\n    <p>\n        Die {{ pageMetaData.awgProjectName }} setzt auf Grundlage ihrer berechtigten Interessen (d.h. Interesse an der\n        Analyse und Optimierung unseres Onlineangebotes im Sinne des Art.\n        <a href="https://dejure.org/gesetze/DSGVO/6.html">6</a> Abs. 1 lit. f. DSGVO) Google Analytics, einen\n        Webanalysedienst der Google LLC (\u201eGoogle\u201c) ein. Google verwendet Cookies. Die durch das Cookie erzeugten\n        Informationen \xfcber Benutzung des Onlineangebotes durch die Nutzer werden in der Regel an einen Server von Google\n        in den USA \xfcbertragen und dort gespeichert.\n    </p>\n\n    <p>\n        Google ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine Garantie, das europ\xe4ische\n        Datenschutzrecht einzuhalten (<a\n            href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active"\n            >https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active</a\n        >).\n    </p>\n\n    <p>\n        Google wird diese Informationen in unserem Auftrag benutzen, um die Nutzung unseres Onlineangebotes durch die\n        Nutzer auszuwerten, um Reports \xfcber die Aktivit\xe4ten innerhalb dieses Onlineangebotes zusammenzustellen und um\n        weitere, mit der Nutzung dieses Onlineangebotes und der Internetnutzung verbundene Dienstleistungen, uns\n        gegen\xfcber zu erbringen. Dabei k\xf6nnen aus den verarbeiteten Daten pseudonyme Nutzungsprofile der Nutzer erstellt\n        werden.\n    </p>\n\n    <p>\n        Die {{ pageMetaData.awgProjectName }} setzt Google Analytics nur mit aktivierter IP-Anonymisierung ein. Das\n        bedeutet, die IP-Adresse der Nutzer wird von Google innerhalb von Mitgliedstaaten der Europ\xe4ischen Union oder in\n        anderen Vertragsstaaten des Abkommens \xfcber den Europ\xe4ischen Wirtschaftsraum gek\xfcrzt. Nur in Ausnahmef\xe4llen wird\n        die volle IP-Adresse an einen Server von Google in den USA \xfcbertragen und dort gek\xfcrzt.\n    </p>\n\n    <p>\n        Die von dem Browser des Nutzers \xfcbermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengef\xfchrt.\n        Die Nutzer k\xf6nnen die Speicherung der Cookies durch eine entsprechende Einstellung ihrer Browser-Software\n        verhindern; die Nutzer k\xf6nnen dar\xfcber hinaus die Erfassung der durch das Cookie erzeugten und auf ihre Nutzung\n        des Onlineangebotes bezogenen Daten an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem\n        sie das unter folgendem Link verf\xfcgbare Browser-Plugin herunterladen und installieren:\n        <a href="https://tools.google.com/dlpage/gaoptout?hl=de">https://tools.google.com/dlpage/gaoptout?hl=de</a>.\n    </p>\n\n    <p>\n        Weitere Informationen zur Datennutzung durch Google, Einstellungs- und Widerspruchsm\xf6glichkeiten, erfahren Sie\n        in der Datenschutzerkl\xe4rung von Google (<a href="https://policies.google.com/technologies/ads"\n            >https://policies.google.com/technologies/ads</a\n        >) sowie in den Einstellungen f\xfcr die Darstellung von Werbeeinblendungen durch Google (<a\n            href="https://adssettings.google.com/authenticated"\n            >https://adssettings.google.com/authenticated</a\n        >).\n    </p>\n\n    <p>Die personenbezogenen Daten der Nutzer werden nach 14 Monaten gel\xf6scht.</p>\n\n    <p>\n        [<a href="https://datenschutz-generator.de/">Erstellt mit Datenschutz-Generator.de von RA Dr. Thomas Schwenke</a\n        >; vom Websiteinhaber angepasst]\n    </p>\n</div>\n',changeDetection:t.n4l.OnPush,styles:[p]})],n);const m=[{path:"",component:n,data:{title:"AWG Online Edition \u2013 Contact"}}],b=[n];let r=class{};r=(0,a.gn)([(0,t.LVF)({imports:[i.Bz.forChild(m)],exports:[i.Bz]})],r);let s=class{};s=(0,a.gn)([(0,t.LVF)({imports:[l.m,r],declarations:[b]})],s)},2824:o=>{o.exports=""}}]);