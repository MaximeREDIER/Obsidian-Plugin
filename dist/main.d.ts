import { Plugin } from 'obsidian';
export default class NewNoteLocationPlugin extends Plugin {
    onload(): void;
    showFolderTreeForNewNote(): void;
    getRootFolder(): any;
    createFolderList(parentFolder: any, onFolderClick: (folder: any) => void): HTMLElement;
    toggleSubfolders(folderEl: HTMLElement, parentFolder: any, folderList: HTMLElement): void;
    createNoteInFolder(folder: any): void;
}
