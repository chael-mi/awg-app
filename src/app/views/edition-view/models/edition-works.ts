import { AppConfig } from '@awg-app/app.config';
import { EditionConstants } from './edition-constants';
import { EditionWork } from './edition-work.model';

/**
 * The EditionWorksModel class.
 *
 * It is used in the context of the edition view
 * to store work information of the editions.
 */
export class EditionWorks {
    /**
     * An EditionWork object for Opus 12.
     */
    static readonly op12: EditionWork = new EditionWork(
        {
            title: 'Vier Lieder',
            catalogueType: EditionConstants.opus,
            catalogueNumber: '12'
        },
        {
            editors: [
                {
                    name: 'Thomas Ahrend',
                    homepage: AppConfig.AWG_PROJECT_URL + 'index.php?id=3'
                }
            ],
            lastModified: '29. Januar 2020'
        },
        {
            route: '/op12',
            short: '',
            full: ''
        },
        EditionConstants.series1,
        EditionConstants.section5,
        EditionConstants.sketchEdition
    );

    /**
     * An EditionWork object for Opus 25.
     */
    static readonly op25: EditionWork = new EditionWork(
        {
            title: 'Drei Lieder nach Gedichten von Hildegard Jone',
            catalogueType: EditionConstants.opus,
            catalogueNumber: '25'
        },
        {
            editors: [
                {
                    name: 'Thomas Ahrend',
                    homepage: AppConfig.AWG_PROJECT_URL + 'index.php?id=3'
                }
            ],
            lastModified: '29. Januar 2020'
        },
        {
            route: '/op25',
            short: '',
            full: ''
        },
        EditionConstants.series1,
        EditionConstants.section5,
        EditionConstants.sketchEdition
    );
}
