import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './helper/en.json';
import tr from './helper/tr.json';
//empty for now
const resources = {};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translations: en},
    tr: {translations: tr},
  },
  //language to use if translations in user language are not available
  fallbackLng: 'en',
  debug: true,
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: '.',

  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
