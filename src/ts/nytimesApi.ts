import * as $ from 'jquery';

let defaultBasePath = 'http://api.nytimes.com/svc/topstories/v2';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

/* tslint:disable:no-unused-variable */

export class Article {
    'section': string;
    'subsection': string;
    'title': string;
    'abstract': string;
    'url': string;
    'thumbnailStandard': string;
    'shortUrl': string;
    'byline': string;
    'itemType': string;
    'updatedDate': string;
    'createdDate': string;
    'publishedDate': string;
    'materialTypeFacet': string;
    'kicker': string;
    'desFacet': Array<string>;
    'orgFacet': Array<string>;
    'perFacet': Array<string>;
    'geoFacet': Array<string>;
    'multimedia': Array<ArticleMultimedia>;
    'relatedUrls': Array<ArticleRelatedUrls>;
}

export class ArticleMultimedia {
    'url': string;
    'format': string;
    'height': number;
    'width': number;
    'type': string;
    'subtype': string;
    'caption': string;
    'copyright': string;
}

export class ArticleRelatedUrls {
    'suggestedLinkText': string;
    'url': string;
}

export class InlineResponse200 {
    'results': Array<Article>;
}


export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: JQueryAjaxSettings): void;
}

export class HttpBasicAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(requestOptions: any): void {
        requestOptions.username = this.username;
        requestOptions.password = this.password;
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string;

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: JQueryAjaxSettings): void {
        requestOptions.headers[this.paramName] = this.apiKey;
    }
}

export class OAuth implements Authentication {
    public accessToken: string;

    applyToRequest(requestOptions: JQueryAjaxSettings): void {
        requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
    }
}

export class VoidAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(requestOptions: JQueryAjaxSettings): void {
        // Do nothing
    }
}

export enum StoriesApiApiKeys {
    apikey,
}

export class StoriesApi {
    protected basePath = defaultBasePath;
    protected defaultHeaders : any = {};

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
        'apikey': new ApiKeyAuth('query', 'api-key'),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    public setApiKey(key: StoriesApiApiKeys, value: string) {
        this.authentications[StoriesApiApiKeys[key]].apiKey = value;
    }
    private extendObj<T1, T2 extends T1>(objA: T2, objB: T2): T1|T2 {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
            objA[key] = objB[key];
            }
        }
        return objA;
    }

    /**
     * The Top Stories API returns a list of articles and associated images currently on the specified section.  Support JSON and JSONP.
     * @summary Top Stories
     * @param section The section the story appears in.
     * @param format if this is JSONP or JSON
     * @param callback The name of the function the API call results will be passed to. Required when using JSONP. This parameter has only one valid value per section. The format is {section_name}TopStoriesCallback.
     */
    public sectionFormatGet (section: string, format: string, callback?: string) : JQueryPromise<{ response: JQueryXHR; body: InlineResponse200;  }> {
        let localVarPath = this.basePath + '/{section}.{format}'
            .replace('{' + 'section' + '}', String(section))
            .replace('{' + 'format' + '}', String(format));
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);


        // verify required parameter 'section' is not null or undefined
        if (section === null || section === undefined) {
            throw new Error('Required parameter section was null or undefined when calling sectionFormatGet.');
        }

        // verify required parameter 'format' is not null or undefined
        if (format === null || format === undefined) {
            throw new Error('Required parameter format was null or undefined when calling sectionFormatGet.');
        }

        if (callback !== undefined) {
            queryParameters['callback'] = callback;
        }


        localVarPath = localVarPath + "?" + $.param(queryParameters);


        let reqHasFile = false;
        let reqDict = {};
        let reqFormData = new FormData();

        let requestOptions: JQueryAjaxSettings = {
            url: localVarPath,
            type: 'GET',
            headers: headerParams,
            processData: false
        };

        if (Object.keys(reqDict).length) {
            requestOptions.data = reqHasFile ? reqFormData : JSON.stringify(reqDict);
            requestOptions.contentType = reqHasFile ? false : 'application/json; charset=utf-8';
        }

        this.authentications.apikey.applyToRequest(requestOptions);

        this.authentications.default.applyToRequest(requestOptions);

        let dfd = $.Deferred();
        $.ajax(requestOptions).then(
            (data: InlineResponse200, textStatus: string, jqXHR: JQueryXHR) =>
                dfd.resolve({ response: jqXHR, body: data }),
            (xhr: JQueryXHR, textStatus: string, errorThrown: string) =>
                dfd.reject({ response: xhr, body: errorThrown })
        );
        return dfd.promise();
    }
}