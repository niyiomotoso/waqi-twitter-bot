export const Table = {
    GOOD: {
        condition: "Good",
        healthy_implication_full: "Air quality is considered satisfactory, and air pollution poses little or no risk",
        healthy_implication_short: "",
        caution: "",
        caution_short: ""
    },
    MODERATE: {
        condition: "Moderate",
        healthy_implication_full: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
        healthy_implication_short: "",
        caution: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.",
        caution_short: "Limit outdoor activities for active individuals, asthma patients due to pollution"
    },
    UNHEALTHY_FOR_SENSITIVE: {
        condition: "Unhealthy for sensitive groups",
        healthy_implication_full: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
        healthy_implication_short: "",
        caution: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion",
        caution_short: "Limit outdoor activities, especially asthma patients due to pollution"
    },
    UNHEALTHY: {
        condition: "Unhealthy",
        healthy_implication_full: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
        healthy_implication_short: "",
        caution: "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion",
        caution_short: "Limit outdoor activity for asthma patients; others, reduce extended exertion."
    },
    VERY_UNHEALTHY: {
        condition: "Very Unhealthy",
        healthy_implication_full: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
        healthy_implication_short: "",
        caution: "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.",
        caution_short: "Asthma patients stay indoors; others, reduce outdoor activity, especially children."
    },
    HAZARDOUS: {
        condition: "Hazardous",
        healthy_implication_full: "Health alert: everyone may experience more serious health effects",
        healthy_implication_short: "",
        caution: "Everyone should avoid all outdoor exertion",
        caution_short: "Everyone should avoid all outdoor exertion"
    },
}

export const EMOJI_STORE = {
    "GOOD": "☁️😊",
    "MODERATE": "🌤🙂",
    "UNHEALTHY_FOR_SENSITIVE": "🌦️😷",
    "UNHEALTHY": "🌫😷",
    "VERY_UNHEALTHY": "🌥️😰",
    "HAZARDOUS": "🚫😰"
}

export const GOOD_INDEX_MIN = 0;
export const GOOD_INDEX_MAX = 50;

export const MODERATE_INDEX_MIN = 51;
export const MODERATE_INDEX_MAX = 100;

export const UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MIN = 101;
export const UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MAX = 150;

export const UNHEALTHY_INDEX_MIN = 151;
export const UNHEALTHY_INDEX_MAX = 200;

export const VERY_UNHEALTHY_INDEX_MIN = 201;
export const VERY_UNHEALTHY_INDEX_MAX = 300;

export const HAZARDOUS_INDEX_MIN = 300;
export const HAZARDOUS_INDEX_MAX = 100000;

export const CONDITION_ARRAY = [Table.GOOD.condition, Table.MODERATE.condition, Table.UNHEALTHY_FOR_SENSITIVE.condition,
    Table.UNHEALTHY.condition, Table.VERY_UNHEALTHY.condition, Table.HAZARDOUS.condition]
