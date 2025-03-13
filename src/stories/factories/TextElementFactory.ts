import type { TextElement } from '$lib/types.js';

import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

export const createTextElement = ({ attributes = {}, block_index = 0, subtype = null } = {}) => {
	const start_offset = faker.number.int({ max: 1000 });
	const end_offset = faker.number.int({ min: start_offset + 1 });

	return {
		attributes,
		block_index,
		end_offset,
		start_offset,
		subtype: subtype || sample(['add', 'bold', 'del', 'italic', 'note', 'quote']),
		type: 'text_element'
	} as TextElement;
};

export const createTextElements = (n = 1) => {
	return Array(n).map((x) => createTextElement({ block_index: x }));
};
