#!/usr/bin/env node

/**
 * xRegistry MCP Server
 * 
 * Model Context Protocol server for accessing xRegistry instances.
 * Implements the xRegistry HTTP Binding specification.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { XRegistryClient } from "./client.js";
import { tools } from "./tools.js";

// Create MCP server
const server = new Server(
  {
    name: "xregistry-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// xRegistry client instances (keyed by registry URL)
const clients = new Map<string, XRegistryClient>();

/**
 * Get or create an xRegistry client for a given URL
 */
function getClient(registryUrl: string): XRegistryClient {
  if (!clients.has(registryUrl)) {
    clients.set(registryUrl, new XRegistryClient(registryUrl));
  }
  return clients.get(registryUrl)!;
}

/**
 * List available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  };
});

/**
 * Handle tool execution
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const tool = tools.find((t) => t.name === name);
    if (!tool) {
      throw new Error(`Unknown tool: ${name}`);
    }

    // Get client instance
    const registryUrl = (args as any).registry_url;
    if (!registryUrl) {
      throw new Error("registry_url parameter is required");
    }

    const client = getClient(registryUrl);

    // Execute tool handler
    const result = await tool.handler(client, args as any);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("xRegistry MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
