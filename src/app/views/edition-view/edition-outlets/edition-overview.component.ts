import { Component, OnInit } from '@angular/core';

import { RouterLinkButton } from '@awg-shared/router-link-button-group/router-link-button.model';
import { EditionConstants, EditionPath } from '@awg-views/edition-view/models';

/**
 * The EditionOverview component.
 *
 * It contains the overview section
 * of the edition view of the app
 * with a {@link RouterLinkButtonGroupComponent} and
 * another router outlet for the edition routes.
 */
@Component({
    selector: 'awg-edition-overview',
    templateUrl: './edition-overview.component.html',
    styleUrls: ['./edition-overview.component.css']
})
export class EditionOverviewComponent implements OnInit {
    /**
     * Public variable: editionButtonArray.
     *
     * It keeps the array for the edition router link buttons.
     */
    editionButtonArray: RouterLinkButton[];

    /**
     * Angular life cycle hook: ngOnInit.
     *
     * It calls the containing methods
     * when initializing the component.
     */
    ngOnInit() {
        this.setButtons();
    }

    /**
     * Public method: setButtons.
     *
     * It initializes the editionButtonArray.
     *
     * @returns {void} Sets the editionButtonArray.
     */
    setButtons(): void {
        const editionPath = new EditionPath(EditionConstants.op12);

        this.editionButtonArray = [
            new RouterLinkButton(editionPath.root, EditionConstants.editionIntro, 'Einleitung', false),
            new RouterLinkButton(editionPath.root, EditionConstants.editionDetail, 'Edierter Notentext', false),
            new RouterLinkButton(editionPath.root, EditionConstants.editionReport, 'Kritischer Bericht', false)
        ];
    }
}
