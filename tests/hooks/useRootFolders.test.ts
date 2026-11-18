import { describe, expect, it } from 'vitest';
import { TFolder } from 'obsidian';
import { resolveRootFolderPaths } from '../../src/hooks/useRootFolders';

describe('resolveRootFolderPaths', () => {
    const folders = new Map<string, TFolder>();
    for (const path of ['a/b', 'c']) {
        const folder = new TFolder(path);
        folder.path = path;
        folders.set(path, folder);
    }
    const getFolder = (path: string) => folders.get(path) ?? null;

    it('returns nothing for an empty whitelist', () => {
        expect(resolveRootFolderPaths('', getFolder)).toEqual([]);
    });

    it('normalizes slashes, skips missing paths and duplicates, keeps order', () => {
        const result = resolveRootFolderPaths(['/c', '/missing', ' /a/b/ ', 'c'].join('\n'), getFolder);
        expect(result.map(folder => folder.path)).toEqual(['c', 'a/b']);
    });
});
