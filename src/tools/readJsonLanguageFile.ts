import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { TranslationCache } from '../data/TranslationCache';

/**
 * Add tool to read base i18n json language file
 * The base i18n json language file is the file that contains the original translations
 * Other languages are translated from this file
 *
 * @param server  McpServer instance
 */
export const readJsonLanguageFile = async (server: McpServer) => {
  server.tool(
    'read_json_language_file',
    'Read the base i18n JSON language file and set the target languages for the cache.',
    {
      jsonPath: z.string({
        description: 'Absolute path to the JSON language file',
      }),
      targetLanguages: z.array(
        z.string({
          description: 'Array of target languages to translate to',
        }),
      ),
    },
    async ({ jsonPath, targetLanguages }) => {
      const cache = TranslationCache.shared;
      await cache.loadBaseI18nJsonLanguageFile(jsonPath);
      cache.setTargetLanguages(targetLanguages);
      return {
        content: [
          { type: 'text', text: `Loaded ${cache.numOfEntries} entries` },
        ],
      };
    },
  );
};
