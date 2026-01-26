# xRegistry MCP Server Documentation

Model Context Protocol (MCP) server for accessing and searching xRegistry instances.

## What is xRegistry MCP Server?

xRegistry MCP Server is a [Model Context Protocol](https://spec.modelcontextprotocol.io/specification/) server that enables AI assistants to discover and interact with [xRegistry](https://github.com/xregistry/spec)-compliant component registries. It provides a standardized way for AI tools to access software component metadata, schemas, messages, and other resources managed in xRegistry instances.

## Key Features

- 🔌 **Universal Registry Access** - Connect to any xRegistry instance via HTTP
- 🔍 **Smart Discovery** - Browse groups, resources, and versions
- 🎯 **Precise Search** - Filter and search across registry content
- 📦 **Export Capability** - Download registry data as documents
- 🤖 **AI-Ready** - 7 MCP tools for seamless AI assistant integration
- 📋 **Specification Compliant** - Implements xRegistry Core v1.0-rc2

## Installation

### TypeScript/Node.js

```bash
npm install @spec-works/xregistry-mcp-server
```

### Quick Start with npx

```bash
npx @spec-works/xregistry-mcp-server
```

## MCP Configuration

Add to your MCP settings file (e.g., Claude Desktop config):

```json
{
  "mcpServers": {
    "xregistry": {
      "command": "npx",
      "args": ["-y", "@spec-works/xregistry-mcp-server"]
    }
  }
}
```

Or if installed globally:

```json
{
  "mcpServers": {
    "xregistry": {
      "command": "xregistry-mcp-server"
    }
  }
}
```

## Available Tools

The server provides 7 tools for AI assistants:

### 1. `xregistry_connect`

Connect to an xRegistry instance and retrieve its metadata, model, and capabilities.

**Parameters:**
- `registry_url` (required) - Base URL of the xRegistry instance
- `name` (optional) - Friendly name for this connection

**Example:**
```typescript
{
  "registry_url": "https://spec-works.github.io/registry/",
  "name": "SpecWorks Factory"
}
```

### 2. `xregistry_list_groups`

List all groups in the registry (e.g., component groups, schema groups).

**Parameters:**
- `registry_url` (required) - Base URL of the xRegistry instance
- `group_type` (required) - Type of group (e.g., "componentgroups", "schemagroups")
- `inline` (optional) - Include resources in each group
- `filter` (optional) - Filter expression

### 3. `xregistry_list_resources`

List all resources in a specific group.

**Parameters:**
- `registry_url` (required) - Base URL
- `group_type` (required) - Type of group
- `group_id` (required) - Group identifier
- `resource_type` (required) - Type of resource (e.g., "components", "schemas")
- `inline` (optional) - Include full details
- `filter` (optional) - Filter expression

### 4. `xregistry_get_resource`

Get detailed information about a specific resource and its versions.

**Parameters:**
- `registry_url` (required)
- `group_type` (required)
- `group_id` (required)
- `resource_type` (required)
- `resource_id` (required)
- `include_versions` (optional) - Include all versions (default: true)

### 5. `xregistry_get_version`

Get detailed information about a specific resource version.

**Parameters:**
- `registry_url` (required)
- `group_type` (required)
- `group_id` (required)
- `resource_type` (required)
- `resource_id` (required)
- `version_id` (required)

### 6. `xregistry_search`

Search for resources across all groups using filter expressions.

**Parameters:**
- `registry_url` (required)
- `query` (required) - Search query or filter expression
- `resource_type` (optional) - Filter by resource type
- `attributes` (optional) - Map of attribute filters

### 7. `xregistry_export`

Export the entire registry or a subset as a single document.

**Parameters:**
- `registry_url` (required)
- `inline` (optional) - Include all nested entities (default: true)
- `filter` (optional) - Filter expression

See the [Tools Reference](tools.md) for complete details and examples.

## Usage Examples

See the [Usage Guide](usage.md) for detailed examples of:
- Connecting to registries
- Browsing components
- Searching for resources
- Exporting registry data
- Working with component metadata

## Specifications

This server implements:

- [xRegistry Core Specification v1.0-rc2](https://github.com/xregistry/spec/blob/main/core/spec.md)
- [xRegistry HTTP Binding](https://github.com/xregistry/spec/blob/main/core/http.md)
- [Model Context Protocol](https://spec.modelcontextprotocol.io/specification/)

## Architecture

The server consists of three main components:

1. **MCP Server** (`index.ts`) - Handles MCP protocol communication
2. **xRegistry Client** (`client.ts`) - Implements xRegistry HTTP API
3. **Tool Handlers** (`tools.ts`) - Defines and executes MCP tools

## Requirements

- Node.js 18.0 or later
- Network access to xRegistry instances

## Development

### Build from Source

```bash
git clone https://github.com/spec-works/xRegistry-MCP-Server.git
cd xRegistry-MCP-Server/typescript
npm install
npm run build
```

### Watch Mode

```bash
npm run watch
```

## Contributing

Contributions welcome! See the [GitHub repository](https://github.com/spec-works/xRegistry-MCP-Server) for:
- Issue tracking
- Pull request guidelines
- Development setup

## License

MIT License - see [LICENSE](https://github.com/spec-works/xRegistry-MCP-Server/blob/main/LICENSE) for details.

## Links

- **GitHub Repository**: [github.com/spec-works/xRegistry-MCP-Server](https://github.com/spec-works/xRegistry-MCP-Server)
- **xRegistry Spec**: [github.com/xregistry/spec](https://github.com/xregistry/spec)
- **Model Context Protocol**: [spec.modelcontextprotocol.io](https://spec.modelcontextprotocol.io/specification/)
- **SpecWorks Factory**: [spec-works.github.io](https://spec-works.github.io)
- **Component Registry**: [spec-works.github.io/registry](https://spec-works.github.io/registry/)
