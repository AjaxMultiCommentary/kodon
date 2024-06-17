import fs from 'node:fs';
import path from 'node:path';

export function loadBibliographies(bibliographiesDirectory = 'bibliographies') {
    const allFiles = fs.readdirSync(bibliographiesDirectory);
    const bibliographies = allFiles
        .filter((f) => path.extname(f) === '.json')
        .map((f) => ({
            name: path.basename(f).replace(`${path.extname(f)}`, ''),
            items: JSON.parse(fs.readFileSync(`${bibliographiesDirectory}/${f}`, 'utf-8'))
        }));
    const csls = allFiles
        .filter((f) => path.extname(f) === '.csl')
        .map((f) => ({
            name: path.basename(f).replace(`${path.extname(f)}`, ''),
            template: fs.readFileSync(`${bibliographiesDirectory}/${f}`, 'utf-8')
        }));

    return { bibliographies, csls };
}
