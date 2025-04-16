import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { TranslationCache } from '../data/TranslationCache';

/**
 * Add tool to update translated items
 *
 * @param server  McpServer instance
 */
export const updateTranslatedItems = async (server: McpServer) => {
  server.tool(
    'update_translated_items',
    'Update translated items in the cache for a specific language.',
    {
      originalItems: z.array(
        z.string({
          description: 'Array of original items',
        }),
      ),
      language: z.string({
        description: 'Language of the translated items',
      }),
      transaltedItems: z.array(
        z.string({
          description: 'Array of translated items',
        }),
      ),
    },
    async ({ originalItems, language, transaltedItems }) => {
      const cache = TranslationCache.shared;
      cache.updateTranslations(originalItems, language, transaltedItems);
      return {
        content: [
          {
            type: 'text',
            text: `Updated ${originalItems.length} items for ${language}`,
          },
          {
            type: 'text',
            text: `Translations: ${transaltedItems.length}`,
          },
        ],
      };
    },
  );
};
