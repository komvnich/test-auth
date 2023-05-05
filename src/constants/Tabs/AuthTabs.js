import {AuthMethod} from "@/components/partials/Auth/AuthMethod";
import {RegMethod} from "@/components/partials/Auth/RegMethod";

export const AUTH_TABS = [
    {
        key: '1',
        label: `Увiйти`,
        children: (
            <AuthMethod/>
        ),
    },
    {
        key: '2',
        label: `Реєстрація`,
        children: (
            <RegMethod/>
        ),
    },
];