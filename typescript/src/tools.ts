/**
 * MCP Tool Definitions and Handlers
 * 
 * Defines all tools exposed by the xRegistry MCP server.
 */

import { XRegistryClient } from "./client.js";

export interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  handler: (client: XRegistryClient, args: any) => Promise<any>;
}

export const tools: Tool[] = [
  {
    name: "xregistry_connect",
    description: "Connect to an xRegistry instance and retrieve its metadata, model, and capabilities",
    inputSchema: {
      type: "object",
      properties: {
        registry_url: {
          type: "string",
          description: "Base URL of the xRegistry instance",
        },
        name: {
          type: "string",
          description: "Optional friendly name for this registry connection",
        },
      },
      required: ["registry_url"],
    },
    handler: async (client, args) => {
      const [registry, model, capabilities] = await Promise.all([
        client.getRegistry({ inline: false }),
        client.getModel().catch(() => null),
        client.getCapabilities().catch(() => null),
      ]);

      return {
        connected: true,
        name: args.name || registry.name || registry.registryid,
        registry,
        model,
        capabilities,
      };
    },
  },

  {
    name: "xregistry_list_groups",
    description: "List all groups (e.g., component groups, schema groups) in the registry",
    inputSchema: {
      type: "object",
      properties: {
        registry_url: {
          type: "string",
          description: "Base URL of the xRegistry instance",
        },
        group_type: {
          type: "string",
          description: "Type of group to list (from model definition, e.g., 'componentgroups', 'schemagroups')",
        },
        inline: {
          type: "boolean",
          description: "Include resources in each group (default: false)",
        },
        filter: {
          type: "string",
          description: "Optional filter expression",
        },
      },
      required: ["registry_url", "group_type"],
    },
    handler: async (client, args) => {
      const groups = await client.listGroups(args.group_type, {
        inline: args.inline,
        filter: args.filter,
      });

      return {
        group_type: args.group_type,
        count: Object.keys(groups).length,
        groups,
      };
    },
  },

  {
    name: "xregistry_list_resources",
    description: "List all resources in a specific group",
    inputSchema: {
      type: "object",
      properties: {
        registry_url: {
          type: "string",
          description: "Base URL of the xRegistry instance",
        },
        group_type: {
          type: "string",
          description: "Type of group (e.g., 'componentgroups')",
        },
        group_id: {
          type: "string",
          description: "Group identifier",
        },
        resource_type: {
          type: "string",
          description: "Type of resource (from model definition, e.g., 'components', 'schemas')",
        },
        inline: {
          type: "boolean",
          description: "Include full resource details (default: false)",
        },
        filter: {
          type: "string",
          description: "Optional filter expression",
        },
      },
      required: ["registry_url", "group_type", "group_id", "resource_type"],
    },
    handler: async (client, args) => {
      const resources = await client.listResources(
        args.group_type,
        args.group_id,
        args.resource_type,
        {
          inline: args.inline,
          filter: args.filter,
        }
      );

      return {
        group_type: args.group_type,
        group_id: args.group_id,
        resource_type: args.resource_type,
        count: Object.keys(resources).length,
        resources,
      };
    },
  },

  {
    name: "xregistry_get_resource",
    description: "Get detailed information about a specific resource and its versions",
    inputSchema: {
      type: "object",
      properties: {
        registry_url: {
          type: "string",
          description: "Base URL of the xRegistry instance",
        },
        group_type: {
          type: "string",
          description: "Type of group",
        },
        group_id: {
          type: "string",
          description: "Group identifier",
        },
        resource_type: {
          type: "string",
          description: "Type of resource",
        },
        resource_id: {
          type: "string",
          description: "Resource identifier",
        },
        include_versions: {
          type: "boolean",
          description: "Include all versions (default: true)",
        },
      },
      required: ["registry_url", "group_type", "group_id", "resource_type", "resource_id"],
    },
    handler: async (client, args) => {
      const resource = await client.getResource(
        args.group_type,
        args.group_id,
        args.resource_type,
        args.resource_id,
        { inline: args.include_versions !== false }
      );

      return resource;
    },
  },

  {
    name: "xregistry_get_version",
    description: "Get detailed information about a specific resource version",
    inputSchema: {
      type: "object",
      properties: {
        registry_url: {
          type: "string",
          description: "Base URL of the xRegistry instance",
        },
        group_type: {
          type: "string",
          description: "Type of group",
        },
        group_id: {
          type: "string",
          description: "Group identifier",
        },
        resource_type: {
          type: "string",
          description: "Type of resource",
        },
        resource_id: {
          type: "string",
          description: "Resource identifier",
        },
        version_id: {
          type: "string",
          description: "Version identifier",
        },
      },
      required: ["registry_url", "group_type", "group_id", "resource_type", "resource_id", "version_id"],
    },
    handler: async (client, args) => {
      const version = await client.getVersion(
        args.group_type,
        args.group_id,
        args.resource_type,
        args.resource_id,
        args.version_id
      );

      return version;
    },
  },

  {
    name: "xregistry_search",
    description: "Search for resources across all groups using filter expressions",
    inputSchema: {
      type: "object",
      properties: {
        registry_url: {
          type: "string",
          description: "Base URL of the xRegistry instance",
        },
        query: {
          type: "string",
          description: "Search query or filter expression",
        },
        resource_type: {
          type: "string",
          description: "Optional: Filter by specific resource type",
        },
        attributes: {
          type: "object",
          description: "Optional: Map of attribute name/value pairs to match",
        },
      },
      required: ["registry_url", "query"],
    },
    handler: async (client, args) => {
      // Get full registry with inline data
      const registry = await client.getRegistry({ inline: true, filter: args.query });

      // Extract all groups
      const results: any[] = [];
      
      // Iterate through all group types in the registry
      for (const [key, value] of Object.entries(registry)) {
        if (key.endsWith("url") || key.endsWith("count") || !value || typeof value !== "object") {
          continue;
        }

        // Check if this is a groups collection
        if (typeof value === "object" && !Array.isArray(value)) {
          for (const [groupId, group] of Object.entries(value as Record<string, any>)) {
            if (!group || typeof group !== "object") continue;

            // Look for resource collections within this group
            for (const [resourceKey, resources] of Object.entries(group)) {
              if (resourceKey.endsWith("url") || resourceKey.endsWith("count")) continue;
              
              if (typeof resources === "object" && !Array.isArray(resources)) {
                // This might be a resource collection
                for (const [resourceId, resource] of Object.entries(resources as Record<string, any>)) {
                  if (!resource || typeof resource !== "object") continue;

                  // Check if matches resource_type filter
                  if (args.resource_type && resourceKey !== args.resource_type) continue;

                  // Check if matches attribute filters
                  if (args.attributes) {
                    const matches = Object.entries(args.attributes).every(
                      ([attrKey, attrValue]) => resource[attrKey] === attrValue
                    );
                    if (!matches) continue;
                  }

                  results.push({
                    group_type: key,
                    group_id: groupId,
                    resource_type: resourceKey,
                    resource_id: resourceId,
                    resource,
                  });
                }
              }
            }
          }
        }
      }

      return {
        query: args.query,
        count: results.length,
        results,
      };
    },
  },

  {
    name: "xregistry_export",
    description: "Export the entire registry or a subset as a single document",
    inputSchema: {
      type: "object",
      properties: {
        registry_url: {
          type: "string",
          description: "Base URL of the xRegistry instance",
        },
        inline: {
          type: "boolean",
          description: "Include all nested entities (default: true)",
        },
        filter: {
          type: "string",
          description: "Optional filter expression for export",
        },
      },
      required: ["registry_url"],
    },
    handler: async (client, args) => {
      const registry = await client.export({
        inline: args.inline !== false,
        filter: args.filter,
      });

      return registry;
    },
  },
];
