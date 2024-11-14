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
        this.folders = [];
        this.plugin = plugin;
    }
    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: 'Choisissez un dossier' });
        // Obtenir tous les dossiers
        this.folders = this.plugin.getFolders();
        // Ajouter un bouton pour chaque dossier
        this.folders.forEach((folder) => {
            const button = contentEl.createEl('button', { text: folder });
            button.addEventListener('click', () => this.selectFolder(folder));
        });
    }
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
    selectFolder(folder) {
        this.plugin.createNoteInFolder(folder).then((newFile) => {
            if (newFile) {
                new obsidian_1.Notice(`Note créée dans ${newFile.path}`);
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
                name: 'Créer une note dans un dossier choisi',
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    new FolderPickerModal(this).open();
                })
            });
        });
    }
    getFolders() {
        const folders = this.app.vault.getAllLoadedFiles().filter(file => file instanceof obsidian_1.TFolder);
        return folders.map(folder => folder.path);
    }
    createNoteInFolder(folderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFileName = "New Note.md";
            const newFilePath = path.join(folderPath, newFileName);
            // Vérifier si le dossier existe
            const folderExists = yield this.app.vault.adapter.exists(folderPath);
            if (!folderExists) {
                // Si le dossier n'existe pas, créez-le
                try {
                    yield this.app.vault.createFolder(folderPath);
                    new obsidian_1.Notice(`Dossier créé : ${folderPath}`);
                }
                catch (error) {
                    new obsidian_1.Notice(`Erreur lors de la création du dossier : ${error}`);
                    return null;
                }
            }
            // Créer la nouvelle note
            const newFile = yield this.app.vault.create(newFilePath, "# Nouvelle Note");
            return newFile;
        });
    }
}
exports.default = NewNoteLocationPlugin;
