import fs from 'node:fs';
import { parse as parseToml } from 'smol-toml';
import CTS_URN from '../cts_urn.js';
export default function loadConfig(configPath) {
    const _doc = fs.readFileSync(configPath, 'utf-8');
    return parseURNs(parseToml(_doc));
}
function parseURNs(config) {
    return {
        ...config,
        editions: config.editions.map((edition) => {
            return {
                ...edition,
                ctsUrn: new CTS_URN(edition.urn).toJSON(),
            };
        }),
        passages: config.table_of_contents.map((passage) => {
            return {
                ...passage,
                ctsUrn: new CTS_URN(passage.urn).toJSON(),
            };
        })
    };
}
