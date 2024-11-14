import { Plugin, Notice, TFile, Modal, App, TAbstractFile } from 'obsidian';
import * as path from 'path';

class FolderPickerModal extends Modal {
    plugin: NewNoteLocationPlugin;

    constructor(plugin: NewNoteLocationPlugin) {
        super(plugin.app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: 'Choose a folder' });

        // Obtain the folder tree
        const folderTree = this.plugin.getFolderTree();
        
        // Display the folder tree from the root
        this.renderFolderTree(folderTree, contentEl);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }

    renderFolderTree(tree: Record<string, any>, parentEl: HTMLElement, parentPath: string = '') {
        for (const folderName in tree) {
            const folderPath = path.join(parentPath, folderName);

            // Creating a button for each folder
            const folderButton = parentEl.createEl('button', { text: folderName });
            
            // Apply CSS style to display buttons vertically
            folderButton.style.display = 'block'; // Each button on a new line
            folderButton.style.marginBottom = '5px'; // Spacing between buttons

            folderButton.addEventListener('click', () => {
                // If the folder contains subfolders, display them
                if (Object.keys(tree[folderName]).length > 0) {
                    parentEl.empty();
                    const selectFolderButton = parentEl.createEl('button', { text: `Select this folder` });
                    selectFolderButton.style.display = 'block';
                    selectFolderButton.style.marginBottom = '5px';
                    selectFolderButton.addEventListener('click', () => this.selectFolder(folderPath));

                    this.renderFolderTree(tree[folderName], parentEl, folderPath);
                } else {
                    // Directly create the note if no subfolders
                    this.selectFolder(folderPath);
                }
            });
        }
    }

    selectFolder(folder: string) {
        this.plugin.createNoteInFolder(folder).then((newFile) => {
            if (newFile) {
                new Notice(`Note created in ${newFile.path}`);
                // Open the note after creation
                this.plugin.openNewNote(newFile);
            }
        });
        this.close();
    }
}

export default class NewNoteLocationPlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: 'create-note-in-folder',
            name: 'Create note in a chosen folder',
            callback: async () => {
                new FolderPickerModal(this).open();
            }
        });
    }

    getFolderTree(): Record<string, any> {
        const folders = this.app.vault.getAllLoadedFiles().filter(file => file instanceof TAbstractFile && file.children) as TAbstractFile[];
        const tree: Record<string, any> = {};

        folders.forEach(folder => {
            const parts = folder.path.split('/');
            let current = tree;

            for (const part of parts) {
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
        });

        return tree;
    }

    async createNoteInFolder(folderPath: string): Promise<TFile | null> {
        let newFileName = "New Note.md";
        let newFilePath = path.join(folderPath, newFileName);

        // Check if a file with this name already exists
        let counter = 1;
        while (await this.app.vault.adapter.exists(newFilePath)) {
            newFileName = `New Note ${counter}.md`; // Add a number to the file name
            newFilePath = path.join(folderPath, newFileName);
            counter++;
        }

        // Create the new note
        const newFile = await this.app.vault.create(newFilePath, "# New Note");
        return newFile;
    }

    // New method to open the note after creation in the main content area
    async openNewNote(newFile: TFile) {
        // Find the first non-sidebar leaf, so it opens in the main content area
        const mainLeaf = this.app.workspace.getLeaf(false);
        if (mainLeaf) {
            await mainLeaf.openFile(newFile); // Open in the primary note area
            new Notice(`Note created and opened: ${newFile.path}`);
        }
    }
}