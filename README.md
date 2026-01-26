# xRegistry MCP Server
[![Registry](https://img.shields.io/badge/Registry-SpecWorks-blue)](https://spec-works.github.io/registry/componentgroups/specification-libs/components/xregistry-mcp-server/)

Model Context Protocol (MCP) server for accessing and searching xRegistry instances.

## Overview

This MCP server provides tools for AI assistants to interact with xRegistry-compliant component registries enabling discovery search, and retrieval of software components, schemas, messages, and other resources.

## Specifications

- [xRegistry Core v1.0-rc2](https://github.com/xregistry/spec/blob/main/core/spec.md)
- [xRegistry HTTP Binding](https://github.com/xregistry/spec/blob/main/core/http.md)
- [Model Context Protocol](https://spec.modelcontextprotocol.io/specification/)

## Tools

- `xregistry_connect` - Connect to a registry instance
- `xregistry_list_groups` - List all groups in registry
- `xregistry_list_resources` - List resources in a group
- `xregistry_get_resource` - Get detailed resource info
- `xregistry_get_version` - Get specific version details
- `xregistry_search` - Search across registry
- `xregistry_export` - Export registry as document

## Installation

### TypeScript/Node.js

```bash
npm install @spec-works/xregistry-mcp-server
```

### From Source

```bash
git clone https://github.com/spec-works/xRegistry-MCP-Server.git
cd xRegistry-MCP-Server/typescript
npm install
npm run build
```

## Usage

### As an MCP Server

Add to your MCP settings configuration:

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

Or run from source:

```json
{
  "mcpServers": {
    "xregistry": {
      "command": "node",
      "args": ["path/to/xRegistry-MCP-Server/typescript/dist/index.js"]
    }
  }
}
```

### Example Usage

```typescript
// Connect to a registry
xregistry_connect({
  registry_url: "https://spec-works.github.io/registry/"
})

// List component groups
xregistry_list_groups({
  registry_url: "https://spec-works.github.io/registry/",
  group_type: "componentgroups"
})

// Get a specific component
xregistry_get_resource({
  registry_url: "https://spec-works.github.io/registry/",
  group_type: "componentgroups",
  group_id: "specification-libs",
  resource_type: "components",
  resource_id: "linkset"
})
```

## Repository Structure

```
xRegistry-MCP-Server/
├── README.md
├── specs.json
├── LICENSE
├── typescript/          # TypeScript/Node.js implementation
│   ├── src/
│   │   ├── index.ts    # MCP server entry point
│   │   ├── client.ts   # xRegistry HTTP client
│   │   └── tools.ts    # Tool definitions
│   ├── package.json
│   └── tsconfig.json
└── .github/
    └── workflows/
        └── typescript-ci.yml
```

## Development

```bash
cd typescript
npm install
npm run build    # Compile TypeScript
npm run watch    # Watch mode for development
```

## Testing

```bash
cd typescript
npm test
```

## License

MIT
