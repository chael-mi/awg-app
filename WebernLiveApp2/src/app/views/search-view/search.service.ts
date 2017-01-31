import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../api-service/api.service';
import { SearchResponseJson } from '../../api-service/api-objects';

@Injectable()
export class SearchService extends ApiService {

    private searchType: string = 'fulltext';
    private projectId: number = 6;

    // ################################
    //
    //  fulltextSearch via salsah api
    //
    // ################################
    getFulltextSearchData(searchString: string): Observable<SearchResponseJson> {
        let url: string = '/search/' + searchString + '?searchtype=' + this.searchType + '&filter_by_project=' + +this.projectId;
        return this.httpGet(url);
    }

    convertSearchResults(results: SearchResponseJson): SearchResponseJson {
        results['subjects'].forEach(res => {
            // clean value labels
            res.valuelabel[0] = res.valuelabel[0].replace(' (Richtext)', '');
            res.obj_id = res.obj_id.replace('_-_local', '');

            // =>Chronologie =>Ereignis: salsah standoff needs to be converted before displaying
            // valuetype_id 14 = valuelabel 'Ereignis'
            if (res.valuetype_id[0] == '14') {
                let htmlstr: string = this.convert(res.value[0]['utf8str'], res.value[0]['textattr']);

                // replace salsah links
                htmlstr = this.replaceSalsahLink(htmlstr);

                // strip & replace <p>-tags for displaying objtitle
                htmlstr = htmlstr.replace(/<\/p><p>/g, '<br />');
                htmlstr = htmlstr.replace(/<p>|<\/p>/g, '');
                htmlstr = htmlstr.replace(htmlstr, '«$&»');
                res.value[0] = htmlstr;
            }
        });
        return results;
    }



    // ################################
    //
    //  converts linear salsah standoff
    //  (string with textattributes)
    //  to html using plugin "convert_lin2html"
    //
    // ################################
    private convert(str: string, attr): string {
        console.log('SearchService#convert: called func');
        return str;
        // TODO: implement plugin
        // return convert_lin2html(JSON.parse(attr), str);
    }


    // ################################
    //
    //  finds inner salsah links in richtext
    //  and replaces them with click-directive
    //
    // ################################
    private replaceSalsahLink(str: string): string {
        // TODO: add type
        let patNum = /\d{4,8}/,    // regexp for object id (4-7 DIGITS)
            patLink = /<a href="(http:\/\/www.salsah.org\/api\/resources\/\d{4,8})" class="salsah-link">(.*?)<\/a>/i, // regexp for salsah links
            p;

        // check only for salsah links
        while (p = patLink.exec(str)) {
            // i.e.: as long as patLink is detected in str do...

            // identify resource id
            let res_id = patNum.exec(p[1])[0];

            // replace href attribute with click-directive
            // linktext is stored in second regexp-result p[2]
            str = str.replace(p[0], '<a (click)="showObject(' + res_id + ')">' + p[2] + '</a>');
        } //END while

        return str;
    }; //END replaceSalsahLink (func)



}
