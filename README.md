# 🌐 i18n MCP Server

i18n MCP Server is a powerful tool for managing internationalization (i18n) in your projects. It streamlines the
process of translating JSON-based language files by allowing you to use powerful language models to generate
translations directly from a base language file — all through a convenient server interface.

**The MCP server is intended to work with the Cursor IDE using stdio transport. It should also work properly with any
client that supports stdio transport.**

## 💡 Why i18n MCP Server?

- Save hours of manual translation work
- Keep your i18n files consistent and up to date
- Eliminate repetitive copy/paste tasks when scaling your app globally.

## 🚀 Features

### 🌍 Multi-language support

Automatically generate translations in multiple languages from a single base language file.

### 🤖 Translate using models on Cursor

You don't need to pay for additional translation services. Select the translation model you want to use and generate
translations on demand.

### ⚡ Effortless workflow

No need to manually duplicate or edit JSON files — just send a request and get translated files ready to use.

### 🛠️ Developer-friendly

Built with simplicity and speed in mind for seamless integration into development pipelines.

## Working flow

This MCP server helps with incremental translation of JSON files. It provides simple tools to:

1. Get the base language file with all texts in a single language and the set of supported languages.
2. Get chunks of strings to translate. Each chunk will be a list of texts separated by new lines.
3. Update generated translations in the memory cache.
4. Save translations to language-specific JSON files.

## 📦 Installation and configuration

1. Clone the repository

```bash
git clone
```

2. Install dependencies:

```bash
pnpm install # or npm/yarn
```

3. Build the server:

```bash
pnpm run build
```

4. Configure the MCP server on Cursor

Navigate to `Cursor Settings / MCP` and click to add a new MCP server. In the opened JSON, include the server
definition:

```json
{
  "mcpServers": {
    ...
    "i18n-translation-server": {
      "command": "node",
      "args": ["<base-path>/i18n-mcp/dist/mcp_server.js"]
    },
    ...
  }
}
```

You will need to replace `<base-path>` with the correct absolute path to the compiled server.

## 📤 Usage

Once the MCP server is running, you can use the Cursor Agent to interact with the server tools. For example:

```
We are preparing the i18n files for a project and have a base language file. Using the following data, execute the
proposed tasks to prepare the additional required languages.

Base JSON language file: <absolute path to the base language file>
Base language: <base language>
Supported languages: <comma-separated list of supported languages>

These are the tasks that we need to perform:

1. Clear the previous data
2. Read the base JSON language file
3. Get the next chunk
4. For each language in the supported languages, do the following subtasks:
   4.1. Translate all items in the chunk from the base language to the target language. Ensure that the order is
   preserved and that any i18n string parameters are respected.
   4.2. Update the translations for the language
5. Repeat from task 3 until the next chunk does not return any data.
6. After processing all chunks, save translations for each supported language.
```

This request will generate a JSON file for each language in the same folder as the base JSON language file. The current
version was tested using `gpt-4.1` and a chunk size of **250** entries. For other models, this value may need to be
adjusted due to token limits. Another issue that may occur is that the flow can sometimes be interrupted between steps
5 and 6, requiring manual resumption due to the 25 tool call restriction in Cursor.

This is just a proposed task request, but new ones can be written by chaining the defined tools.

**During testing, we noted that language files are generated faster when generating a single language per request,
instead of all at once. Additionally, the response time will depend on the model used.**

## 📚 Future Plans

- Support for multiple caches
- Language file integrity check
- Support dynamic chunk size
- Translation only for missing entries
- Translation only for specific items
- Version tracking for language files
- Better local cache for translations

## 🙌 Contributing

Pull requests and issues are welcome! Let's build a better translation workflow together.

## 📄 License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE). See the [LICENSE](LICENSE) file
for details.
