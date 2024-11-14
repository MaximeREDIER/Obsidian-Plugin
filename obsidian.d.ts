declare module 'obsidian' {
    export interface App {
        vault: Vault;
    }

    export interface Vault {
        create: (path: string, content: string) => Promise<TFile>;
        createFolder: (path: string) => Promise<void>;
        getAllLoadedFiles: () => TFile[];
        adapter: {
            exists: (path: string) => Promise<boolean>;
        };
    }

    export interface TFile {
        path: string;
    }

    export class Modal {
        constructor(app: App);
        open(): void;
        close(): void;
        contentEl: HTMLElement;
    }

    export class Notice {
        constructor(message: string);
    }

    export class Plugin {
        app: App;
        addCommand(command: { id: string; name: string; callback: Function }): void;
    }
}
