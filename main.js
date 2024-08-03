/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MediumImporterPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/modal.ts
var import_obsidian = require("obsidian");
var ImportMediumArticleModal = class extends import_obsidian.Modal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
  }
  async createNewNote(title, content, savePath) {
    const { vault, workspace } = this.plugin.app;
    let fileName = title;
    fileName = fileName.replace(/\*/g, "").replace(/"/g, "").replace(/\\/g, "").replace(/\//g, "").replace(/</g, "").replace(/>/g, "").replace(/:/g, " -").replace(/\|/g, "").replace(/\?/g, "");
    new import_obsidian.Notice(`Creating note with title: ${fileName}`);
    try {
      let file = null;
      console.log("savePath:" + savePath);
      console.log("fullpath:" + (0, import_obsidian.normalizePath)(`${savePath}/${fileName}.md`));
      if (savePath != null) {
        file = await vault.create(
          (0, import_obsidian.normalizePath)(`${savePath}/${fileName}.md`),
          content
        );
      } else {
        file = await vault.create(
          (0, import_obsidian.normalizePath)(`${fileName}.md`),
          content
        );
      }
      const leaf = workspace.getLeaf(true);
      await leaf.openFile(file);
    } catch (error) {
      new import_obsidian.Notice(`[Medium Importer] Error: ${error}`);
    }
  }
  async getArticleMarkdownFromId(id, apiKey) {
    const url = `https://medium2.p.rapidapi.com/article/${id}/markdown`;
    const result = await (0, import_obsidian.request)({
      url,
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "medium2.p.rapidapi.com"
      }
    });
    const markdown = JSON.parse(result).markdown;
    return markdown;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Import Medium article" });
    contentEl.createEl("p", {
      cls: "mi-subtitle",
      text: "Enter the URL of the Medium article you want to import."
    });
    contentEl.createEl("p", {
      cls: "mi-subtitle",
      text: "Should be in the format https://medium.com/[published-in]/[title-of-the-article]-[id]"
    });
    const input = contentEl.createEl("input", {
      cls: "mi-input",
      type: "text",
      placeholder: "Medium article URL"
    });
    const button = contentEl.createEl("button", {
      cls: "mi-submit",
      text: "Submit"
    });
    button.addEventListener("click", async () => {
      try {
        contentEl.empty();
        contentEl.createDiv({ cls: "loading-wrapper" }).createSpan({ cls: "loading" });
        if (!this.plugin.settings.rapidAPIKey) {
          new import_obsidian.Notice(
            "[Medium Importer] Please enter your API key with the command 'Set API key'"
          );
          return;
        }
        if (!this.plugin.settings.saveMediumPath) {
          new import_obsidian.Notice(
            "[Medium Importer] Please set savePath from root"
          );
          return;
        }
        const id = input.value.split("-").pop();
        if (!id) {
          new import_obsidian.Notice(
            "[Medium Importer] Invalid URL. Please enter a valid Medium article URL."
          );
          return;
        }
        const markdown = await this.getArticleMarkdownFromId(
          id,
          this.plugin.settings.rapidAPIKey
        );
        console.log(markdown);
        if (!markdown) {
          return;
        }
        const title = markdown.split("#")[1].split("\n")[0];
        const content = markdown;
        await this.createNewNote(title, content, this.plugin.settings.saveMediumPath);
      } catch (error) {
        new import_obsidian.Notice(`[Medium Importer] Unexpected Error: ${error}`);
      }
      this.close();
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/settings.ts
var import_obsidian2 = require("obsidian");
var MediumImporterSettingsTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    let apiInput = null;
    let savePath = null;
    new import_obsidian2.Setting(containerEl).setName("RapidAPI key").setDesc(
      "Create an account at https://rapidapi.com/ to get an API key. Click '\u2713' to save."
    ).addText((text) => {
      text.setPlaceholder("API key");
      apiInput = text;
    }).addExtraButton(
      (button) => button.setIcon("checkmark").setTooltip("Set API key").onClick(async () => {
        if (apiInput == null) return;
        this.plugin.settings.rapidAPIKey = apiInput.getValue();
        apiInput.setValue("");
        await this.plugin.saveSettings();
        new import_obsidian2.Notice("API key set successfully");
      })
    );
    new import_obsidian2.Setting(containerEl).setName("Save Path").setDesc(
      "Path from root to save articles. IE: for /root/Medium enter 'Medium'."
    ).addText((text) => {
      text.setPlaceholder("Save Path");
      savePath = text;
    }).addExtraButton(
      (button) => button.setIcon("checkmark").setTooltip("Save Path").onClick(async () => {
        if (savePath == null) return;
        this.plugin.settings.saveMediumPath = savePath.getValue();
        savePath.setValue("");
        await this.plugin.saveSettings();
        new import_obsidian2.Notice("Path set successfully");
      })
    );
  }
};

// src/main.ts
var MediumImporterPlugin = class extends import_obsidian3.Plugin {
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "import-medium-article",
      name: "Import article from Medium",
      callback: () => {
        new ImportMediumArticleModal(this).open();
      }
    });
    this.addSettingTab(new MediumImporterSettingsTab(this.app, this));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, {}, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
