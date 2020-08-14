const languages = {
	'en-us': require('./en-us.json'),
	'中文': require('./zh.json'),
	'日本語': require('./ja.json'),
	'Português': require('./pt.json'),
	'Espanhol': require('./es.json'),
	'Українська': require('./ua.json'),
	'Русский': require('./ru.json')
};

const DEFAULT_LANGUAGE = 'en-us';

const getUserLanguage = () => {
	let storedLang = localStorage.getItem('userLanguage');

	if (storedLang != null && languages[storedLang] != null)
		return languages[storedLang];
	else {
		setCurrentLanguage(DEFAULT_LANGUAGE);
		return languages[DEFAULT_LANGUAGE];
	}
};

const setCurrentLanguage = (lang) => {
	if (lang != null && languages[lang] != null) {
		localStorage.setItem('userLanguage', lang);
		location.reload();
	}
	else throw Error("I18n: Cannot set language '" + lang + "'");
};

const getName = (language, key) => {
	if (
		language[key] !== null &&
    language[key] !== void 0
	)
		return language[key];
	else {
		console.warn("I18n: Cannot find name for '" + key + "' in language '" + language.langName + "'");
		return key;
	}
};

class I18n {
	constructor() {
		this.language = getUserLanguage();
		console.log('Language:', this.language.langName);
	}

	get languages() {
		return Object.keys(languages);
	}

	get currentLanguage() {
		return getUserLanguage();
	}
	setCurrentLanguage(lang) {
		return setCurrentLanguage(lang);
	}

	getName(key) {
		return getName(this.language, key);
	}
}

export default new I18n();
