import {
    GOOD_INDEX_MAX,
    GOOD_INDEX_MIN, HAZARDOUS_INDEX_MAX, HAZARDOUS_INDEX_MIN,
    MODERATE_INDEX_MAX,
    MODERATE_INDEX_MIN,
    Table, UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MAX, UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MIN, UNHEALTHY_INDEX_MAX,
    UNHEALTHY_INDEX_MIN, VERY_UNHEALTHY_INDEX_MAX, VERY_UNHEALTHY_INDEX_MIN
} from "../constants/aqiTable.js";

export const getRemarkFromAqi = (aqIndex) => {
    if (aqIndex >= GOOD_INDEX_MIN && aqIndex <= GOOD_INDEX_MAX)
        return Table.GOOD;
    else if (aqIndex >= MODERATE_INDEX_MIN && aqIndex <= MODERATE_INDEX_MAX) {
        return Table.MODERATE;
    }
    else if (aqIndex >= UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MIN && aqIndex <= UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MAX) {
        return Table.UNHEALTHY_FOR_SENSITIVE;
    }
    else if (aqIndex >= UNHEALTHY_INDEX_MIN && aqIndex <= UNHEALTHY_INDEX_MAX) {
        return Table.UNHEALTHY_FOR_SENSITIVE;
    }
    else if (aqIndex >= VERY_UNHEALTHY_INDEX_MIN && aqIndex <= VERY_UNHEALTHY_INDEX_MAX) {
        return Table.VERY_UNHEALTHY;
    }
    else if (aqIndex >= HAZARDOUS_INDEX_MIN && aqIndex <= HAZARDOUS_INDEX_MAX) {
        return Table.HAZARDOUS;
    }

    return null;
}