"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
const path = __importStar(require("path"));
class FolderPickerModal extends obsidian_1.Modal {
    constructor(plugin) {
        super(plugin.app);
        this.plugin = plugin;
    }
    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: 'Choose a file' });
        // Obtain the folder tree
        const folderTree = this.plugin.getFolderTree();
        // Afficher l'arborescence à partir de la racine
        this.renderFolderTree(folderTree, contentEl);
    }
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
    renderFolderTree(tree, parentEl, parentPath = '') {
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
                    // Empty the current content and display the subfolders
                    parentEl.empty();
                    this.renderFolderTree(tree[folderName], parentEl, folderPath);
                }
                else {
                    // Create the note in the selected folder
                    this.selectFolder(folderPath);
                }
            });
        }
    }
    selectFolder(folder) {
        this.plugin.createNoteInFolder(folder).then((newFile) => {
            if (newFile) {
                new obsidian_1.Notice(`Note created in ${newFile.path}`);
                // Open the note after creation
                this.plugin.openNewNote(newFile);
            }
        });
        this.close();
    }
}
class NewNoteLocationPlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addCommand({
                id: 'create-note-in-folder',
                name: 'Create note in a chosen folder',
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    new FolderPickerModal(this).open();
                })
            });
        });
    }
    getFolderTree() {
        const folders = this.app.vault.getAllLoadedFiles().filter(file => file instanceof obsidian_1.TAbstractFile && file.children);
        const tree = {};
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
    createNoteInFolder(folderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let newFileName = "New Note.md";
            let newFilePath = path.join(folderPath, newFileName);
            // Check if a file with this name already exists
            let counter = 1;
            while (yield this.app.vault.adapter.exists(newFilePath)) {
                newFileName = `New Note ${counter}.md`; // Add a number to the file name
                newFilePath = path.join(folderPath, newFileName);
                counter++;
            }
            // Create the new note
            const newFile = yield this.app.vault.create(newFilePath, "# Nouvelle Note");
            return newFile;
        });
    }
    // New method to open the note after creation
    openNewNote(newFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const leaf = this.app.workspace.activeLeaf;
            if (leaf) {
                yield leaf.openFile(newFile); // Usage of activeLeaf's openFile
                new obsidian_1.Notice(`Note créée et ouverte : ${newFile.path}`);
            }
        });
    }
}
exports.default = NewNoteLocationPlugin;
