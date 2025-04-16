import express from 'express';
import bodyParser from 'body-parser';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readJsonLanguageFile } from './tools/readJsonLanguageFile';
import { getNextChunkForTranslation } from './tools/getNextChunkForTranslation';
import { updateTranslatedItems } from './tools/updateTranslatedItems';
import { debugTranslations } from './tools/debugTranslations';
import { saveTranslations } from './tools/saveTranslations';
import { clearCache } from './tools/clearCache';
import { getAllStrings } from './tools/getAllStrings';

const app = express();
app.use(bodyParser.json());

// Create MCP server
const mcpServer = new McpServer({
  name: 'i18n-translation-server',
  version: '1.0.0',
  description: 'Server for incremental JSON translations',
});

/* Initialize the MCP tools */
readJsonLanguageFile(mcpServer);
getNextChunkForTranslation(mcpServer);
updateTranslatedItems(mcpServer);
saveTranslations(mcpServer);
clearCache(mcpServer);
debugTranslations(mcpServer);
getAllStrings(mcpServer);

mcpServer.connect(new StdioServerTransport());
