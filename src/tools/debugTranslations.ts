import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { TranslationCache } from '../data/TranslationCache';

/**
 * Add tool to debug translations
 *
 * @param server  McpServer instance
 */
export const debugTranslations = async (server: McpServer) => {
  server.tool(
    'debug_translations',
    'This tool will return the current translations in the cache for debugging purposes.',
    {},
    async () => {
      const cache = TranslationCache.shared;
      return {
        content: [
          {
            type: 'text',
            text: `Translations: ${JSON.stringify(cache.translations)}`,
          },
        ],
      };
    },
  );
};
