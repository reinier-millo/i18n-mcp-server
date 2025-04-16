import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { TranslationCache } from '../data/TranslationCache';

/**
 * Add tool to get all strings
 *
 * @param server  McpServer instance
 */
export const getAllStrings = async (server: McpServer) => {
  server.tool(
    'get_all_strings',
    'This tool will return all strings in the cache for debugging purposes.',
    {},
    async () => {
      const cache = TranslationCache.shared;
      return {
        content: [
          {
            type: 'text',
            text: `${cache.values.join('\n')}`,
          },
        ],
      };
    },
  );
};
