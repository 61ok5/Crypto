import { formLabelClasses } from '@mui/material';
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import en from './en';

i18n
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: 'en',
        debug: formLabelClasses,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: en,
            }, // LANGUAGES
        },
        react: {
            wait: true,
        },
    });

export default i18n;