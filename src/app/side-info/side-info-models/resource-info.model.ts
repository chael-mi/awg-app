import { SearchResponseWithQuery } from '@awg-views/data-view/models';
import { ResourceInfoResource } from './resource-info-resources.model';

/**
 * The ResourceInfo class.
 *
 * It is used in the context of the resource info
 * to store the data of the search results.
 */
export class ResourceInfo {
    /**
     * The list of results of a search.
     */
    searchResults: SearchResponseWithQuery;

    /**
     * The actually displayed resources.
     */
    resources: IResourceInfoResources;
}

/**
 * The IResourceInfoResources interface.
 *
 * It represents the resource info resources.
 */
export interface IResourceInfoResources {
    /**
     * The current resource.
     */
    current: ResourceInfoResource;

    /**
     * The next resource.
     */
    next: ResourceInfoResource;

    /**
     * The previous resource.
     */
    previous: ResourceInfoResource;
}
