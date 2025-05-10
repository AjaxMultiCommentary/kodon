import fs from 'node:fs';

import { parse as parseToml } from 'smol-toml';

import CTS_URN from '$lib/cts_urn.js';

import type { EditionConfig, PassageConfig } from '$lib/types.js';

export default function loadConfig(configPath: string) {
    const _doc = fs.readFileSync(configPath, 'utf-8');

    return parseURNs(parseToml(_doc));
}

function parseURNs(config: any) {
    return {
        ...config,
        editions: config.editions.map((edition: EditionConfig) => {
            return {
                ...edition,
                ctsUrn: new CTS_URN(edition.urn).toJSON(),
            };
        }),
        passages: config.table_of_contents.map((passage: PassageConfig) => {
            return {
                ...passage,
                ctsUrn: new CTS_URN(passage.urn).toJSON(),
            };
        })
    };
}