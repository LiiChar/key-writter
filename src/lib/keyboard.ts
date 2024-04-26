export const getLanguage = (char: string) => {
	const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	const rusUpper = rusLower.toUpperCase();
	const enLower = 'abcdefghijklmnopqrstuvwxyz';
	const enUpper = enLower.toUpperCase();
	const rus = rusLower + rusUpper;
	const en = enLower + enUpper;

	if (rus.includes(char)) {
		return 'ru';
	} else if (en.includes(char)) {
		return 'en';
	} else {
		return 'un';
	}
};

export const getIsPressedCapsLock = (e: KeyboardEvent) => {
	return e.getModifierState('CapsLock');
};
