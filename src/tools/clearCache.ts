import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { TranslationCache } from '../data/TranslationCache';

/**
 * Add tool to clear the data cache
 *
 * @param server  McpServer instance
 */
export const clearCache = async (server: McpServer) => {
  server.tool('clear_cache', 'Clear the data cache.', {}, async () => {
    TranslationCache.shared.clear();
    return {
      content: [{ type: 'text', text: 'Cache cleared' }],
    };
  });
};
