import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '@awg-core/services/api-service';
import { GeoNames } from '@awg-core/core-models';
import {
    ContextJson,
    GeoDataItemJson,
    GeoDataJson,
    HlistItemJson,
    HlistJson,
    IncomingItemJson,
    ResourceContextResponseJson,
    ResourceFullResponseJson,
    SearchResponseJson,
    SelectionItemJson,
    SelectionJson,
    SubjectItemJson
} from '@awg-shared/api-objects';
import {
    ResourceDetail,
    ResourceDetailContent,
    ResourceDetailGroupedIncomingLinks,
    ResourceDetailHeader,
    ResourceDetailImage,
    ResourceDetailIncomingLink,
    ResourceDetailProperty
} from '@awg-views/data-view/models';
import { PropertyJson } from '@awg-shared/api-objects/resource-response-formats/src/property-json';

/**
 * Declared variable: htmlConverter.
 *
 * It provides access to the embedded htmlConverter plugin (see `/src/plugins/htmlConverter`).
 */
declare var htmlConverter: any;

/**
 * Declared variable: dateConverter.
 *
 * It provides access to the embedded dateConverter plugin (see `/src/plugins/dateConverter`).
 */
declare var dateConverter: any;

/**
 * The Conversion service.
 *
 * It handles the conversion of the HTTP response data (JSON)
 * from the given (SALSAH) API into a form that can be
 * displayed via HTML.
 *
 * Provided in: `root`.
 */
@Injectable({
    providedIn: 'root'
})
export class ConversionService extends ApiService {
    /**
     * Public variable: filteredOut.
     *
     * It keeps the number of filtered duplicates of a search response list.
     */
    filteredOut: number;

    /**
     * Public method: getNestedArraysTotalItems.
     *
     * It sums up the total items (length) of all
     * arrays nested in an ResourceDetailGroupedIncomingLinks
     * object.
     *
     * @param {ResourceDetailGroupedIncomingLinks} obj The given grouped incoming links object.
     * @returns {number} The number of total items (length) of the nested array.
     */
    getNestedArraysTotalItems(obj: ResourceDetailGroupedIncomingLinks): number {
        let totalItems = 0;
        // iterate over object keys
        Object.keys(obj).forEach(key => {
            // sum up length of array nested in object
            totalItems += obj[key].length;
        });
        return totalItems;
    }

    /**
     * Public method: convertFullTextSearchResults.
     *
     * It converts the results of a full text search
     * to be displayed via HTML.
     *
     * @param {SearchResponseJson} searchResults The given results of a search request.
     * @returns {SearchResponseJson} The converted full text search results.
     */
    convertFullTextSearchResults(searchResults: SearchResponseJson): SearchResponseJson {
        if (!searchResults.subjects) {
            return searchResults;
        }

        // TODO: refactor with reduce??
        searchResults.subjects.forEach(subject => {
            // clean value labels
            subject.valuelabel[0] = subject.valuelabel[0].replace(' (Richtext)', '');
            subject.obj_id = subject.obj_id.replace('_-_local', '');

            // =>Chronologie: salsah standoff needs to be converted before displaying
            // valuetype_id 14 = valuelabel 'Ereignis'
            if (subject.valuetype_id[0] === '14' && subject.value[0]) {
                let htmlstr = '';
                const utf8str: string = subject.value[0].utf8str;
                const textattr: string = subject.value[0].textattr;

                // check if there is standoff, otherwise leave res.value[0] alone
                // because when retrieved from cache the standoff is already converted
                if (utf8str && textattr) {
                    htmlstr = this.convertStandoffToHTML(utf8str, textattr);

                    // replace salsah links
                    htmlstr = this.replaceSalsahLink(htmlstr);

                    // strip & replace <p>-tags for displaying
                    htmlstr = this.replaceParagraphTags(htmlstr);

                    subject.value[0] = htmlstr;
                }
            }
        });
        // remove duplicates from response
        searchResults.subjects = this.distinctSubjects(searchResults.subjects);
        return searchResults;
    }

    /**
     * Public method: prepareFullTextSearchResultText.
     *
     * It prepares the fulltext search result text
     * to be displayed in the search info.
     *
     * @param {SearchResponseJson} searchResults The given results of a search request.
     * @param {string} searchValue The given query string of a search request.
     * @param {string} searchUrl The given url of a search request.
     * @returns {string} The text to be displayed.
     */
    prepareFullTextSearchResultText(searchResults: SearchResponseJson, searchValue: string, searchUrl: string): string {
        let resText: string;

        if (searchResults.subjects) {
            const length = searchResults.subjects.length;
            const resString: string = length === 1 ? `Resultat` : `Resultate`;
            // resText = `${length}/${searchData.nhits} `;
            resText = `${searchResults.nhits} `;
            resText += `${resString} für "${searchValue}"`;

            if (this.filteredOut > 0) {
                const duplString: string = this.filteredOut === 1 ? `Duplikat` : `Duplikate`;
                resText += ` (${this.filteredOut} ${duplString} entfernt)`;
            }
        } else {
            resText = `Die Abfrage ${searchUrl} ist leider fehlgeschlagen. Wiederholen Sie die Abfrage zu einem späteren Zeitpunkt oder überprüfen sie die Suchbegriffe.`;
        }

        return resText;
    }

    /**
     * Public method: convertObjectProperties.
     *
     * It converts object properties of a resource request
     * to be displayed in the bibliography detail view.
     *
     * @param {ResourceFullResponseJson} resourceData The given resource data.
     * @returns {*} The converted resource object.
     */
    convertObjectProperties(resourceData: ResourceFullResponseJson) {
        const convObj = {};
        console.log('convertdata: ', resourceData);
        // add lastmod state
        convObj['lastmod'] = resourceData.resinfo.lastmod;

        Object.keys(resourceData.props).forEach((key: string) => {
            const prop = resourceData.props[key];
            let propValue = []; // empty text value array

            // check if values property is defined
            if (prop.hasOwnProperty('values') && prop.values !== undefined) {
                // check for gui-elements
                switch (prop.valuetype_id) {
                    case '4':
                        // DATE: salsah object needs to be converted (using plugin "dateConverter")
                        if (prop.values[0] !== '') {
                            propValue[0] = this.convertDateValue(prop.values[0]);
                        }
                        break; // END date

                    case '7':
                        // SELECTION PULLDOWN: selection nodes have to be read seperately
                        // TODO
                        if (prop.values !== []) {
                            propValue = this.convertSelectionValues(prop.values, prop.attributes);
                            console.log('propValue: ', propValue);
                        }
                        break; // END selection

                    case '14':
                        // RICHTEXT: salsah standoff needs to be converted

                        // check for multiple && not empty values
                        if (prop.values.length > 0 && prop.values[0].utf8str !== '') {
                            // clean value labels
                            prop.label = prop.label.replace(' (Richtext)', '');

                            for (let i = 0; i < prop.values.length; i++) {
                                // init
                                let htmlstr = '';

                                // convert linear salsah standoff to html (using plugin "htmlConverter")
                                htmlstr = this.convertStandoffToHTML(prop.values[i].utf8str, prop.values[i].textattr);

                                // replace salsah links & <p>-tags
                                htmlstr = this.replaceSalsahLink(htmlstr);
                                htmlstr = htmlstr.replace('<p>', '').replace('</p>', '');

                                // trim string
                                propValue[i] = htmlstr.trim();

                                // replace bibliography links
                                if (prop.label === 'Online-Zugang') {
                                    propValue[i] = this.adjustBiblioLink(propValue[i]);
                                }
                            }
                        }
                        break; // END richtext

                    default:
                        // '1'=> TEXT: properties come as they are
                        if (prop.values[0] !== '') {
                            for (let i = 0; i < prop.values.length; i++) {
                                propValue[i] = prop.values[i].trim();
                            }
                        }
                } // END switch
                if (propValue.length > 1) {
                    convObj[prop.label] = propValue; // => array
                } else if (propValue.length === 1) {
                    convObj[prop.label] = propValue[0]; // => string
                }
            } // END if value

            // extract publication year from publication date
            /*
             TODO#add:
             let splitDate;
             if (splitDate = convObj['Publikationsdatum']) {
             let s = splitDate.split(' ');
             convObj['Jahr'] = s[s.length-1];
             }
             */
        }); // END forEach PROPS

        return convObj;
    } // END convertObjectProperties (func)

    /**
     * Public method: prepareResourceDetail.
     *
     * It checks if the resource data is accessible and delegates
     * it to the respective resource detail creation methods
     * to return all needed information for a resource detail.
     *
     * @param {ResourceFullResponseJson} resourceData The given resource data.
     * @param {string} currentResourceId The given id of the current resource.
     * @returns {ResourceDetail} The converted resource detail object.
     */
    prepareResourceDetail(resourceData: ResourceFullResponseJson, currentResourceId: string): ResourceDetail {
        if (resourceData.access === 'OK') {
            return this.prepareAccessibleResource(resourceData, currentResourceId);
        } else {
            return this.prepareRestrictedResource(resourceData, currentResourceId);
        }
    }

    /**
     * Private method: prepareRestrictedResource.
     *
     * It prepares header and content of a restricted resource
     * to be displayed via HTML.
     *
     * @param {ResourceFullResponseJson} resourceData The given resource data.
     * @param {string} currentId The given id of the current resource.
     * @returns {ResourceDetail} The resource detail object.
     */
    private prepareRestrictedResource(
        resourceData: ResourceFullResponseJson,
        currentResourceId: string
    ): ResourceDetail {
        const header: ResourceDetailHeader = new ResourceDetailHeader(resourceData, currentResourceId);
        const content = undefined;

        return new ResourceDetail(header, content);
    }

    /**
     * Private method: prepareAccessibleResource.
     *
     * It prepares header and content of an accessible resource
     * to be displayed via HTML.
     *
     * @param {ResourceFullResponseJson} resourceData The given resource data.
     * @param {string} currentResourceId The given id of the current resource.
     * @returns {ResourceDetail} The resource detail object.
     */
    private prepareAccessibleResource(
        resourceData: ResourceFullResponseJson,
        currentResourceId: string
    ): ResourceDetail {
        // convert properties to be displayed via HTML
        resourceData.props = this.convertGUISpecificProps(resourceData.props);

        // prepare parts of resourceDetail
        const header: ResourceDetailHeader = new ResourceDetailHeader(resourceData, currentResourceId);
        const content: ResourceDetailContent = {
            props: this.prepareResourceDetailProperties(resourceData.props),
            images: this.prepareResourceDetailImage(currentResourceId),
            incoming: this.prepareResourceDetailIncomingLinks(resourceData.incoming)
        };
        return new ResourceDetail(header, content);
    }

    /**
     * Private method: prepareResourceDetailImage.
     *
     * It prepares the images content of an accessible resource
     * to be displayed via HTML.
     *
     * @param {string} currentResourceId The given id of the current resource.
     * @returns {ResourceDetailImage[]} The image array of the resource detail.
     */
    private prepareResourceDetailImage(currentResourceId: string): ResourceDetailImage[] {
        // id of image context for api + "/resources/{{:id}}_-_local?reqtype=context"
        // result is an array of ResourceDetailImage
        const images: ResourceDetailImage[] = [];

        // get resource context data
        this.getAdditionalInfoFromApi(ResourceContextResponseJson, currentResourceId).subscribe(
            (contextData: ResourceContextResponseJson) => {
                // check for existing resource_context in response
                // else return undefined output if necessary
                if (!contextData.resource_context.res_id) {
                    // console.log('ConversionService# prepareResourceDetailImage: got no resource_context id\'s from context response: ', contextData);
                    return;
                } else {
                    const context: ContextJson = { ...contextData.resource_context };

                    // IMAGE OBJECT (context == 2)
                    if (context.context === 2 && context.resclass_name === 'image') {
                        if (context.res_id.length === context.firstprop.length) {
                            for (let i = 0; i < context.res_id.length; i++) {
                                // build new ResourceDetailImage-Object from context and index
                                const image = new ResourceDetailImage(context, i);
                                images[i] = image;
                            }
                        } else {
                            console.warn(
                                'ConversionService - Array length for context objects is not consistent with firstprops length!',
                                context
                            );
                            return;
                        }
                        // STANDARD OBJECT (context == 0 || 1)
                    } else if (context.context < 2) {
                        console.log('ConversionService - got no image context', context);
                        return;
                    }
                }
                return images;
            },
            err => console.error(err)
        );
        return images;
    }

    /**
     * Private method: prepareResourceDetailIncomingLinks.
     *
     * It prepares and groups the incoming links content
     * of an accessible resource to be displayed via HTML.
     *
     * @param {IncomingItemJson[]} incomingArray The given IncomingItemJson.
     * @returns {ResourceDetailGroupedIncomingLinks} The grouped incoming links of the resource detail.
     */
    private prepareResourceDetailIncomingLinks(incomingArray: IncomingItemJson[]): ResourceDetailGroupedIncomingLinks {
        const incomingLinks: ResourceDetailIncomingLink[] = [];
        incomingArray.forEach(incoming => {
            incomingLinks.push(new ResourceDetailIncomingLink(incoming));
        });
        return this.groupByRestype(incomingLinks);
    }

    /**
     * Private method: prepareResourceDetailProperties.
     *
     * It prepares the properties content of an accessible resource
     * to be displayed via HTML.
     *
     * @param {PropertyJson[]} props The given properties.
     * @returns {ResourceDetailProperty[]} The properties array of the resource detail.
     */
    private prepareResourceDetailProperties(props: PropertyJson[]): ResourceDetailProperty[] {
        const detailProperties: ResourceDetailProperty[] = [];

        // loop through properties keys
        Object.keys(props).forEach((key: string) => {
            const prop: any = props[key];

            // clean value labels
            if (prop.label) {
                prop.label = prop.label.replace(' (Richtext)', '');
            }

            // push default values into detailProperties
            detailProperties.push(new ResourceDetailProperty(prop.pid, prop.guielement, prop.label, prop.toHtml));
        }); // END forEach props
        return detailProperties;
    }

    /**
     * Private method: convertGUISpecificProps.
     *
     * It converts properties of an accessible resource
     * to be displayed via HTML.
     *
     * In fact, it adds an 'toHtml' property to the props array.
     *
     * @param {PropertyJson[]} props The given properties.
     * @returns {*} The converted resource data.
     */
    private convertGUISpecificProps(props: PropertyJson[]): any {
        // loop through all properties and add toHtml values
        Object.keys(props).forEach((key: string) => {
            props[key] = this.addHtmlValues(props[key]);
        });
        return props;
    }

    /**
     * Private method: convertGUISpecificProps.
     *
     * It adds an 'toHtml' property to the props array
     * of an accessible resource to be displayed via HTML.
     *
     * @param {*} prop The given property.
     * @param {string} [url] A given optional url.
     * @returns {string[]} The converted property.
     */
    private addHtmlValues(prop: any, url?: string): [string] {
        prop.toHtml = [];

        if (prop.values) {
            switch (prop.valuetype_id) {
                case '4': // DATE: salsah object needs to be converted (using plugin "dateConverter")
                    for (let i = 0; i < prop.values.length; i++) {
                        prop.toHtml[i] = this.convertDateValue(prop.values[i]);
                    }
                    break; // END date

                case '6': // LINKVALUE (searchbox): links to another salsah object need to be converted
                    for (let i = 0; i < prop.values.length; i++) {
                        prop.toHtml[i] = this.convertLinkValue(prop, i);
                    }
                    break; // END linkvalue

                case '7': // SELECTION (pulldown): selection nodes have to be called separately
                    prop.toHtml = this.convertSelectionValues(prop.values, prop.attributes);
                    break; // END selection

                case '12': // HLIST: hlist nodes have to be called separately
                    prop.toHtml = this.convertHlistValues(prop.values, prop.attributes);
                    break; // END hlist

                case '14': // RICHTEXT: salsah standoff needs to be converted
                    for (let i = 0; i < prop.values.length; i++) {
                        prop.toHtml[i] = this.convertRichtextValue(prop.values[i].utf8str, prop.values[i].textattr);
                    }
                    break; // END richtext

                case '15': // GeoNAMES: GeoName nodes have to be called separately
                    prop.toHtml = this.convertGeoValues(prop.values);
                    break; // END geonames

                // '1' => TEXT: properties come as they are
                default:
                    for (let i = 0; i < prop.values.length; i++) {
                        prop.toHtml[i] = prop.values[i];
                    }
            } // END switch
        } else {
            // console.log('empty prop.values for', prop.guielement.toUpperCase(), 'in property "', prop.label, '" :::: ');
        }
        return prop;
    }

    /**
     * Private method: convertDateValue.
     *
     * It converts date values of an accessible resource
     * to be displayed via HTML.
     *
     * Conversion goes from Julian Day Number (JDN)
     * to Gregorian Calendar.
     *
     * @param {*} dateObj The given date object.
     * @returns {string} The converted date string.
     */
    private convertDateValue(dateObj: any): string {
        let date = dateConverter(dateObj);
        date = date.replace(' (G)', '');
        return date;
    }

    /**
     * Private method: convertGeoValues.
     *
     * It converts geonames values of an accessible resource
     * to be displayed via HTML.
     *
     * @param {string[]} values The given property values.
     * @returns {string[]} The converted geo names array.
     */
    private convertGeoValues(values: string[]): string[] {
        // values give reference id to api + "/geonames/{{:id}}?reqtype=node"
        // result is an array nodelist (properties: id, label, name) with nodes from 0 to n

        const output = [];

        // identify geonames gui-id from values
        // e.g. ["4136"] or ["4136", "4132"]
        values.forEach((valueId, index) => {
            // get geonames data
            this.getAdditionalInfoFromApi(GeoDataJson, valueId).subscribe((geoNamesData: GeoDataJson) => {
                // check for existing nodelist in geonames response
                // else return empty prop if necessary
                if (!geoNamesData.nodelist) {
                    console.log(
                        'ConversionService# convertGeoValues: got no nodelist from geonames response: ',
                        geoNamesData
                    );
                    return (output[index] = '');
                }
                // snapshot of nodelist array
                const geoDataArray: GeoDataItemJson[] = [...geoNamesData.nodelist];

                // build new GeoNames-Object from geoData array
                const geo: GeoNames = new GeoNames(geoDataArray);

                // construct and return html value
                output[index] = geo.html;
                return output;
            });
        });
        return output;
    }

    /**
     * Private method: convertHlistValues.
     *
     * It converts hierarchy list values of an accessible resource
     * to be displayed via HTML.
     *
     * @param {string[]} values The given property values.
     * @param {string} attributes The given HTML attributes.
     * @returns {string[]} The converted hlist array.
     */
    private convertHlistValues(values: string[], attributes: string): string[] {
        // prop.values give reference id to
        // api + /hlists/{{:id}}
        // result is an array hlist (properties: id, label, name, level) with nodes from 0 to n

        const output = [];

        // identify id of hlist from prop.attributes
        // e.g. "hlist=17"
        const nodeId: string = this.getNodeIdFromAttributes(attributes);

        // get hlist data
        this.getAdditionalInfoFromApi(HlistJson, nodeId).subscribe(
            (hlistData: HlistJson) => {
                // check for existing hlist in response
                // esle return empty prop if necessary
                if (!hlistData.hlist) {
                    console.log('ConversionService# convertHListValue: got no hlist from response: ', hlistData);
                    return output;
                }
                // snapshot of hlist array
                const hlistArray: HlistItemJson[] = [...hlistData.hlist];
                // localize id in hlist array and identify the label
                values.forEach((valueId, index) => {
                    const filteredHlist: HlistItemJson[] = hlistArray.filter(hlistItem => hlistItem.id === valueId);
                    output[index] = filteredHlist[0].label;
                });
                return output;
            },
            err => console.error(err)
        );
        return output;
    }

    /**
     * Private method: convertLinkValue.
     *
     * It converts a link value of an accessible resource
     * to be displayed via HTML.
     *
     * @param {*} prop The given property value.
     * @param {number} index The given index position.
     * @returns {string} The converted link value.
     */
    private convertLinkValue(prop: any, index: number): string {
        // add <a>-tag with click-directive; linktext is stored in "$&"
        const firstValue = prop.value_firstprops[index];
        const replaceValue =
            '<a (click)="ref.navigateToResource(\'' +
            prop.values[index] +
            '\')">$& (' +
            prop.value_restype[index] +
            ')</a>';
        return firstValue.replace(firstValue, replaceValue);
    }

    /**
     * Private method: convertRichtextValue.
     *
     * It converts a rich text value of an accessible resource
     * to be displayed via HTML.
     *
     * @param {string} str The given utf8 string of a rich text property.
     * @param {string} attr The given standoff attributes of a richtext property.
     * @returns {string} The converted rich text value.
     */
    private convertRichtextValue(str: string, attr: string): string {
        // convert salsah standoff to html (using plugin "htmlConverter")
        const rtValue: string = this.convertStandoffToHTML(str, attr);

        // replace salsah links
        return this.replaceSalsahLink(rtValue);
    }

    /**
     * Private method: convertSelectionValues.
     *
     * It converts selection values of an accessible resource
     * to be displayed via HTML.
     *
     * @param {string[]} values The given property values.
     * @param {string} attributes The given HTML attributes.
     * @returns {string[]} The converted selection array.
     *
     * @todo check if it is possible to unify with hlist conversion?
     */
    private convertSelectionValues(values: string[], attributes: string): string[] {
        // values give reference id to api + "/selections/{{:id}}"
        // result is an array of selection labels

        const output = [];

        // identify id of selection-list from attributes
        // e.g. "selection=66"
        const nodeId: string = this.getNodeIdFromAttributes(attributes);

        // get selection-list data
        this.getAdditionalInfoFromApi(SelectionJson, nodeId).subscribe(
            (selectionData: SelectionJson) => {
                // check for existing selection in response
                // else return empty prop if necessary
                if (!selectionData.selection) {
                    console.log(
                        'ConversionService# convertSelectionValues: got no selection from response: ',
                        selectionData
                    );
                    return output;
                }
                // snapshot of selection array
                const selectionArray: SelectionItemJson[] = [...selectionData.selection];
                // localize id in selection-list array and identify the label
                values.forEach((valueId, index) => {
                    const filteredSelection: SelectionItemJson[] = selectionArray.filter(
                        selectionItem => selectionItem.id === valueId
                    );
                    output[index] = filteredSelection[0].label;
                });
                return output;
            },
            err => console.error(err)
        );
        return output;
    }

    /**
     * Private method: convertStandoffToHTML.
     *
     * It converts linear SALSAH standoff
     * (utf8 string with standoff attributes)
     * to html using plugin 'htmlConverter'.
     *
     * @param {string} str The given utf8 string of a rich text property.
     * @param {string} attr The given standoff attributes of a richtext property.
     * @returns {string} The converted standoff.
     *
     * @todo check if it is possible to unify with hlist conversion?
     */
    private convertStandoffToHTML(str: string, attr: string): string {
        if (!str) {
            return;
        }
        if (!attr) {
            return str;
        }
        return htmlConverter(JSON.parse(attr), str);
    }

    /**
     * Private method: getAdditionalInfoFromApi.
     *
     * It makes additional calls to the given (SALSAH) API
     * to get additional resource infos in case of geoames,
     * hlists, selections or image values.
     *
     * @param {*} responseJsonType The given json type of the API response.
     * @param {string} id The given id of a resource.
     * @returns {Observable<any>} The observable of the HTTP response.
     */
    private getAdditionalInfoFromApi(responseJsonType: any, id: string): Observable<any> {
        let queryPath: string;
        switch (responseJsonType) {
            case GeoDataJson:
                queryPath = 'geonames/' + id + '?reqtype=node';
                break;
            case HlistJson:
                queryPath = 'hlists/' + id;
                break;
            case ResourceContextResponseJson:
                queryPath = 'resources/' + id + '_-_local?reqtype=context';
                break;
            case SelectionJson:
                queryPath = 'selections/' + id;
                break;
        }
        return this.getApiResponse(responseJsonType, queryPath);
    }

    /**
     * Private method: getNodeIdFromAttributes.
     *
     * It gets a node id from the prop.attributes
     * of a selections or hlists value.
     *
     * @param {string} attributes The given prop.attributes.
     * @returns {string} id The node id.
     */
    private getNodeIdFromAttributes(attributes: string): string {
        // identify node id from prop.attributes
        // e.g. "hlist=17" or "selection=77"
        return attributes.split('=')[1].toString();
    }

    /**
     * Private method: adjustBiblioLink.
     *
     * It finds internal links in the online-access property
     * of a bibliography link and adjusts the values
     * to be displayed via HTML.
     *
     * @param {string} str The given link string.
     * @example
     * str = '(PDF) http://www.example.com/myPdf.pdf'
     * @returns {string} The adjusted biblio link.
     */
    private adjustBiblioLink(str: string): string {
        if (!str) {
            return;
        }

        let outStr: string;
        let labelStr: string;
        let splitArr: string[];
        let linkRegArr: RegExpExecArray;
        const regExLink = /<a (.*?)>(.*?)<\/a>/i; // regexp for links

        // check for double spaces
        str = str.replace('  ', ' ');

        // split "str" behind closing parentheses
        splitArr = str.split(') ');

        // get label of link from 1st part of splitArr (without opening parentheses)
        labelStr = splitArr[0].replace('(', '');

        // check for link in 2nd part of splitArr
        if (regExLink.exec(splitArr[1])) {
            // ... link with <a> tag
            linkRegArr = regExLink.exec(splitArr[1]);
            outStr = '<a target="_blank" ref="noopener noreferrer" ' + linkRegArr[1] + '>' + labelStr + '</a>';
        } else if (labelStr !== 'DOI') {
            // ... <a> tag is missing, add it
            outStr = '<a target="_blank" ref="noopener noreferrer" href="' + splitArr[1] + '">' + labelStr + '</a>';
        } else {
            // no links, pure string
            outStr = labelStr + ': ' + splitArr[1];
        }
        return outStr;
    }

    /**
     * Private method: replaceSalsahLink.
     *
     * It finds internal salsah links in richtext values
     * and replaces them with Angular click-directives.
     *
     * @param {string} str The given richtext value.
     * @returns {string} The adjusted richtext value.
     */
    private replaceSalsahLink(str: string): string {
        if (!str) {
            return;
        }
        const regNum = /\d{4,8}/; // regexp for object id (4-8 DIGITS)
        const regLink = /<a href="(http:\/\/www.salsah.org\/api\/resources\/\d{4,8})" class="salsah-link">(.*?)<\/a>/i; // regexp for salsah links
        let regArr: RegExpExecArray;

        // check for salsah links in str
        while (regLink.exec(str)) {
            // i.e.: as long as patLink is detected in str do...
            regArr = regLink.exec(str);

            // identify resource id
            const resId = regNum.exec(regArr[1])[0];

            // replace href attribute with click-directive
            // linktext is stored in second regexp-result regArr[2]
            const replaceValue =
                '<a (click)="ref.navigateToResource(\'' +
                resId +
                '\'); $event.stopPropagation()">' +
                regArr[2] +
                '</a>';
            str = str.replace(regArr[0], replaceValue);
        } // END while

        return str;
    }

    /**
     * Private method: replaceParagraphTags.
     *
     * It removes paragraph tags in richtext values
     * and replaces line breaks instead for multiple lines.
     *
     * @param {string} str The given richtext value.
     * @returns {string} The adjusted richtext value.
     */
    private replaceParagraphTags(str: string): string {
        if (!str) {
            return;
        }
        str = str
            .replace(/<\/p><p>/g, '<br />')
            .replace(/<p>|<\/p>/g, '')
            .replace(str, '«$&»');
        return str;
    }

    /**
     * Private method: distinctSubjects.
     *
     * It removes duplicates from an array (SubjectItemJson[]).
     * It checks for every array position (reduce) if the obj_id
     * of the entry at the current position (y) is already
     * in the array (findIndex). If that is not the case it
     * pushes y into x which is initialized as empty array [].
     *
     * See also {@link https://gist.github.com/telekosmos/3b62a31a5c43f40849bb#gistcomment-2137855}.
     *
     * @param {SubjectItemJson[]} subjects The given subject with possible duplicates.
     * @returns {SubjectItemJson[]} The distinct subjects.
     */
    private distinctSubjects(subjects: SubjectItemJson[]): SubjectItemJson[] {
        if (!subjects) {
            return;
        }
        this.filteredOut = 0;
        return subjects.reduce(
            (x, y) => (x.findIndex(e => e.obj_id === y.obj_id) < 0 ? [...x, y] : ((this.filteredOut += 1), x)),
            []
        );
    }

    /**
     * Private method: groupByRestype.
     *
     * It groups an array of incoming links
     * by their resource type.
     *
     * @param {ResourceDetailIncomingLink[]} incomingLinks The given incoming links.
     * @returns {ResourceDetailGroupedIncomingLinks} The grouped incoming links.
     */
    private groupByRestype(incomingLinks: ResourceDetailIncomingLink[]): ResourceDetailGroupedIncomingLinks {
        const groups: ResourceDetailGroupedIncomingLinks = {};
        // iterate over incoming links to group by restype
        incomingLinks.forEach(link => {
            const group = link.restype.label;
            if (group in groups) {
                groups[group].push(link); // push link into existing restype group
            } else {
                groups[group] = [link]; // create restype group and make link the first entry
            }
        });
        return groups;
    }
}
