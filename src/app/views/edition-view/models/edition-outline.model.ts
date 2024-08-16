import { EditionComplex } from './edition-complex.model';
import { EditionRouteConstant } from './edition-route-constant.model';

/**
 * The EditionOutlineSeries interface.
 *
 * It is used in the context of the edition view
 * to structure outline information of the edition series.
 */
export interface EditionOutlineSeries {
    /**
     * The series route of an edition series.
     */
    series: EditionRouteConstant;

    /**
     * The section route of an edition series.
     */
    sections: EditionOutlineSection[];
}

/**
 * The EditionOutlineSection interface.
 *
 * It is used in the context of the edition view
 * to structure outline information of the edition sections.
 */
export interface EditionOutlineSection {
    /**
     * The section route of an edition section.
     */
    section: EditionRouteConstant;

    /**
     * The edition complex types of an edition section.
     */
    complexTypes: EditionOutlineComplexTypes;

    /**
     * Boolean flag if an edition section is disabled.
     */
    disabled: boolean;
}

/**
 * The EditionOutlineComplexTypes interface.
 *
 * It is used in the context of the edition view
 * to structure outline information of the edition complex types.
 */
export interface EditionOutlineComplexTypes {
    /**
     * The opus parts of an edition complex.
     */
    opus: EditionOutlineComplexItem[];

    /**
     * The mnr parts of an edition complex.
     */
    mnr: EditionOutlineComplexItem[];
}

/**
 * The EditionOutlineComplex interface.
 *
 * It is used in the context of the edition view
 * to structure outline information of an edition complex.
 */
export interface EditionOutlineComplexItem {
    /**
     * The edition complex.
     */
    complex: EditionComplex;

    /**
     * Boolean flag if an edition complex is disabled.
     */
    disabled: boolean;
}
