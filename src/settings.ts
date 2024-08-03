import {
    App,
    Notice,
    PluginSettingTab,
    Setting,
    TextComponent,
} from "obsidian";
import MediumImporterPlugin from "./main";

export default class MediumImporterSettingsTab extends PluginSettingTab {
    plugin: MediumImporterPlugin;

    constructor(app: App, plugin: MediumImporterPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        let apiInput: TextComponent | null = null;
        let savePath: TextComponent | null = null;
        new Setting(containerEl)
            .setName("RapidAPI key")
            .setDesc(
                "Create an account at https://rapidapi.com/ to get an API key. Click '✓' to save.",
            )
            .addText((text) => {
                text.setPlaceholder("API key");
                apiInput = text;
            })
            .addExtraButton((button) =>
                button
                    .setIcon("checkmark")
                    .setTooltip("Set API key")
                    .onClick(async () => {
                        if (apiInput == null) return;
                        this.plugin.settings.rapidAPIKey = apiInput.getValue();
                        apiInput.setValue("");
                        await this.plugin.saveSettings();
                        new Notice("API key set successfully");
                    }),
            );
            
        new Setting(containerEl)
            .setName("Save Path")
            .setDesc(
                "Path from root to save articles. IE: for /root/Medium enter 'Medium'.",
            )
            .addText((text) => {
                text.setPlaceholder("Save Path");
                savePath = text;
            })
            .addExtraButton((button) =>
                button
                    .setIcon("checkmark")
                    .setTooltip("Save Path")
                    .onClick(async () => {
                        if (savePath == null) return;
                        this.plugin.settings.saveMediumPath = savePath.getValue();
                        savePath.setValue("");
                        await this.plugin.saveSettings();
                        new Notice("Path set successfully");
                    }),
            );
            
    }
}
