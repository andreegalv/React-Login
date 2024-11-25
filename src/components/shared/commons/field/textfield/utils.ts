const REGEX_FIELD_TYPES = {
	ALPHABET: /[a-zA-Z]+$/i,
	ALPHABET_SPACE: /[a-zA-Z ]+$/i,
	NUMERIC: /(\d)*$/,
};

export const isKeyPassValidationForOnlyLetters = (key:string) => {
	return REGEX_FIELD_TYPES.ALPHABET.test(key);
};

export const isKeyPassValidationForLetterAndSpaces = (key:string) => {
	return REGEX_FIELD_TYPES.ALPHABET_SPACE.test(key);
};

export const isKeyPassValidationForNumbers = (key:string) => {
	return REGEX_FIELD_TYPES.NUMERIC.test(key);
};


/*
export const hasInvalidInputType = (key:string, inputTypeRule?: "only-letters") => {
	if (!inputTypeRule) {
		return false;
	}

	switch(inputTypeRule) {
		case InputType.Alphabet:
			return !REGEX_FIELD_TYPES.ALPHABET.test(key);
		case InputType.Numeric:
			return !REGEX_FIELD_TYPES.NUMERIC.test(key);
		case InputType.AlphabetNumeric:
			return !REGEX_FIELD_TYPES.ALPHABET.test(key) && !REGEX_FIELD_TYPES.NUMERIC.test(key);
		case InputType.AlphabetSpace:
			return !REGEX_FIELD_TYPES.ALPHABET_SPACE.test(key);
	}

	return false;
};
*/