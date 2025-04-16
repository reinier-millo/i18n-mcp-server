import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { TranslationCache } from '../data/TranslationCache';

/**
 * Add tool to save translations
 * Translations are saved to a file in the same directory as the base i18n JSON file
 *
 * @param server  McpServer instance
 */
export const saveTranslations = async (server: McpServer) => {
  server.tool(
    'save_translations',
    'Save translations for a specific language. Translations are saved to a file in the same directory as the base i18n JSON file.',
    {
      langCode: z.string({
        description: 'The language code to savve the translations for it',
      }),
    },
    async ({ langCode }) => {
      const cache = TranslationCache.shared;
      const { filename } = await cache.saveTranslations(langCode);
      return {
        content: [
          {
            type: 'text',
            text: `Translations saved to ${filename}`,
          },
        ],
      };
    },
  );
};
