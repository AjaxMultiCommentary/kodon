import type { Word } from '$lib/types.js';

import { faker } from '@faker-js/faker';

import { createTextElements } from './TextElementFactory.js';

export const createWord = ({
	comments_count = 0,
	line_number = 1,
	text = '',
	urn_index = 1,
	word_index = 1
} = {}) => {
	const guaranteedText = text || faker.lorem.word();

	return {
		commentURNs: [...Array(comments_count).keys()].map(
			(n) => `urn:cts:greekLit:tlg0011.tlg003.kodon-storybook:${n}`
		),
		offset: faker.number.int({ max: 1000 }),
		text: guaranteedText,
		textElements: createTextElements({ howMany: 3 }),
		urn_index,
		urn: `urn:cts:greekLit:tlg0011.tlg003.kodon-tests:${line_number}@${guaranteedText}[${urn_index}]`,
		xml_id: `word_index_${word_index}`
	} as Word;
};

export const createWords = ({ howMany = 1, howManyComments = 0 } = {}) => {
	const stringWords = faker.lorem.words(howMany).split(' ');

	return stringWords.map((s, i) =>
		createWord({
			comments_count: howManyComments,
			line_number: faker.number.int({ min: 0, max: 2000 }),
			text: s,
			word_index: i
		})
	);
};
