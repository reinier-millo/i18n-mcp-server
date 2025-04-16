import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { TranslationCache } from '../data/TranslationCache';

/**
 * Add tool to get the next chunk for translation
 * Each chunk is a list of original items that need to be translated,
 * items are separated by new lines
 *
 * @param server  McpServer instance
 */
export const getNextChunkForTranslation = async (server: McpServer) => {
  server.tool(
    'get_next_chunk_for_translation',
    'Get the next chunk for translation. Each chunk is a list of original items that need to be translated, items are separated by new lines.',
    {},
    async (): Promise<{ content: any[] }> => {
      const cache = TranslationCache.shared;
      const chunk = cache.getNextChunk();
      return {
        content: [
          ...(chunk.length > 0
            ? [{ type: 'text', text: chunk.join('\n') }]
            : []),
        ],
      };
    },
  );
};
