import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fileTranslationEs from "./resources/es";

if (!i18n.isInitialized) {
	i18n
		.use(initReactI18next)
		.init({
			ns: [ "common" ],
			resources: {
				es: { ...fileTranslationEs }
			},
			lng: "es",
			fallbackLng: "es",
			interpolation: {
				escapeValue: false,
				skipOnVariables: false
			}
		})
		.then(() => undefined)
		.catch((err) => console.error(err));
}

export default i18n;