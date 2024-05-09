import { Currencies } from "./enums";
import AMDIcon from '@/public/icons/dramIcon.svg'
import USDIcon from '@/public/icons/dollarIcon.svg'
import RUBIcon from '@/public/icons/rubleIcon.svg'


export const getCurrencyIcon = (token: Currencies) => {
    switch (token) {
        case Currencies.AMD:
            return AMDIcon.src
        case Currencies.RUB:
            return RUBIcon.src
        case Currencies.USD:
            return USDIcon.src
        default:
            return ""
    }
}

const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export const stringAvatar = (name: string) => {
    if (!name) {
        return ''
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
}

