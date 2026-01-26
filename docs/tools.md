# Tools Reference

Complete reference for all MCP tools provided by xRegistry MCP Server.

## xregistry_connect

Connect to an xRegistry instance and retrieve its metadata, model, and capabilities.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry_url` | string | Yes | Base URL of the xRegistry instance |
| `name` | string | No | Friendly name for this registry connection |

### Returns

```json
{
  "connected": true,
  "name": "SpecWorks Factory",
  "registry": {
    "specversion": "1.0-rc2",
    "registryid": "specworks-factory",
    "name": "SpecWorks Factory Component Registry",
    "description": "...",
    "model": { ... },
    "capabilities": { ... }
  },
  "model": { ... },
  "capabilities": { ... }
}
```

### Example

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "name": "SpecWorks Factory"
}
```

---

## xregistry_list_groups

List all groups (e.g., component groups, schema groups) in the registry.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry_url` | string | Yes | Base URL of the xRegistry instance |
| `group_type` | string | Yes | Type of group (e.g., "componentgroups", "schemagroups") |
| `inline` | boolean | No | Include resources in each group |
| `filter` | string | No | Optional filter expression |

### Returns

```json
{
  "group_type": "componentgroups",
  "count": 1,
  "groups": {
    "specification-libs": {
      "componentgroupid": "specification-libs",
      "name": "Specification-Based Libraries",
      "description": "...",
      "componentscount": 7
    }
  }
}
```

### Example

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "group_type": "componentgroups",
  "inline": false
}
```

---

## xregistry_list_resources

List all resources in a specific group.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry_url` | string | Yes | Base URL of the xRegistry instance |
| `group_type` | string | Yes | Type of group (e.g., "componentgroups") |
| `group_id` | string | Yes | Group identifier |
| `resource_type` | string | Yes | Type of resource (e.g., "components", "schemas") |
| `inline` | boolean | No | Include full resource details |
| `filter` | string | No | Optional filter expression |

### Returns

```json
{
  "group_type": "componentgroups",
  "group_id": "specification-libs",
  "resource_type": "components",
  "count": 7,
  "resources": {
    "linkset": { ... },
    "icalendar": { ... },
    "markmyword": { ... },
    "ratelimiter": { ... },
    "vcard": { ... },
    "jsondiff": { ... },
    "xregistry-mcp-server": { ... }
  }
}
```

### Example

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "group_type": "componentgroups",
  "group_id": "specification-libs",
  "resource_type": "components",
  "inline": true
}
```

---

## xregistry_get_resource

Get detailed information about a specific resource and its versions.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry_url` | string | Yes | Base URL of the xRegistry instance |
| `group_type` | string | Yes | Type of group |
| `group_id` | string | Yes | Group identifier |
| `resource_type` | string | Yes | Type of resource |
| `resource_id` | string | Yes | Resource identifier |
| `include_versions` | boolean | No | Include all versions (default: true) |

### Returns

```json
{
  "componentid": "linkset",
  "versionid": "1.0.0",
  "name": "Linkset",
  "description": "Software component for parsing and serializing linkset documents",
  "componenttype": "library",
  "language": "csharp",
  "framework": "dotnet",
  "license": "MIT",
  "repository": "https://github.com/spec-works/linkset",
  "keywords": ["linkset", "rfc9264", "web-linking"],
  "status": "active",
  "maturity": "stable",
  "versions": { ... }
}
```

### Example

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "group_type": "componentgroups",
  "group_id": "specification-libs",
  "resource_type": "components",
  "resource_id": "linkset",
  "include_versions": true
}
```

---

## xregistry_get_version

Get detailed information about a specific resource version.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry_url` | string | Yes | Base URL of the xRegistry instance |
| `group_type` | string | Yes | Type of group |
| `group_id` | string | Yes | Group identifier |
| `resource_type` | string | Yes | Type of resource |
| `resource_id` | string | Yes | Resource identifier |
| `version_id` | string | Yes | Version identifier |

### Returns

```json
{
  "componentid": "linkset",
  "versionid": "1.0.0",
  "name": "Linkset",
  "description": "...",
  "componenttype": "library",
  "language": "csharp",
  "artifacts": [...],
  "dependencies": [...],
  "buildinfo": { ... }
}
```

### Example

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "group_type": "componentgroups",
  "group_id": "specification-libs",
  "resource_type": "components",
  "resource_id": "linkset",
  "version_id": "1.0.0"
}
```

---

## xregistry_search

Search for resources across all groups using filter expressions.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry_url` | string | Yes | Base URL of the xRegistry instance |
| `query` | string | Yes | Search query or filter expression |
| `resource_type` | string | No | Filter by specific resource type |
| `attributes` | object | No | Map of attribute name/value pairs to match |

### Returns

```json
{
  "query": "language=typescript",
  "count": 1,
  "results": [
    {
      "group_type": "componentgroups",
      "group_id": "specification-libs",
      "resource_type": "components",
      "resource_id": "xregistry-mcp-server",
      "resource": { ... }
    }
  ]
}
```

### Example - Search by Language

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "query": "language=typescript",
  "attributes": {
    "language": "typescript"
  }
}
```

### Example - Search by Component Type

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "query": "componenttype=library",
  "resource_type": "components",
  "attributes": {
    "componenttype": "library"
  }
}
```

---

## xregistry_export

Export the entire registry or a subset as a single document.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registry_url` | string | Yes | Base URL of the xRegistry instance |
| `inline` | boolean | No | Include all nested entities (default: true) |
| `filter` | string | No | Optional filter expression for export |

### Returns

Complete registry document with all requested entities:

```json
{
  "specversion": "1.0-rc2",
  "registryid": "specworks-factory",
  "name": "SpecWorks Factory Component Registry",
  "model": { ... },
  "componentgroups": {
    "specification-libs": {
      "components": {
        "linkset": { ... },
        "icalendar": { ... },
        ...
      }
    }
  }
}
```

### Example - Full Export

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "inline": true
}
```

### Example - Filtered Export

```json
{
  "registry_url": "https://spec-works.github.io/registry/",
  "inline": true,
  "filter": "componenttype=library"
}
```

---

## Error Handling

All tools may return errors in the following format:

```json
{
  "error": "Error message describing what went wrong",
  "details": "Additional context about the error"
}
```

Common error scenarios:
- Invalid `registry_url` - Registry not accessible or malformed URL
- Resource not found - Specified group, resource, or version doesn't exist
- Network errors - Connection timeout or network issues
- Invalid parameters - Missing required parameters or invalid types
