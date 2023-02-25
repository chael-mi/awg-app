/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

/**
 *
 *              BasicMessageComponents
 *
 * This module contains interfaces that are used by other modules
 * (message components). It does not represent a particular API V1 request
 * or response format.
 */

import { BasicResponseJson } from './src/basic-response-json';
import {
    KnoraAccess,
    KnoraIRI,
    KnoraListNodeIRI,
    KnoraRights,
    KnoraStatusCode,
    KnoraValue,
    StringOrNumber,
} from './src/basic-type-aliases';
import { LocationItemJson } from './src/location-item-json';
import { ProjectItemJson } from './src/project-item-json';
import { UserDataJson } from './src/userdata-json';

export {
    BasicResponseJson,
    KnoraAccess,
    KnoraIRI,
    KnoraListNodeIRI,
    KnoraRights,
    KnoraStatusCode,
    KnoraValue,
    LocationItemJson,
    ProjectItemJson,
    StringOrNumber,
    UserDataJson,
};
