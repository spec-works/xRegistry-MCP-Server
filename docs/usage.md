# Usage Guide

Practical examples of using xRegistry MCP Server with AI assistants.

## Getting Started

### Prerequisites

1. An AI assistant that supports MCP (e.g., Claude Desktop)
2. xRegistry MCP Server installed
3. Access to an xRegistry instance

### Configuration

Add the server to your MCP settings:

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

## Common Workflows

### 1. Discovering a Registry

First, connect to a registry to explore what's available:

```
Human: Connect to the SpecWorks registry at https://spec-works.github.io/registry/

AI: (uses xregistry_connect tool)
Connected to SpecWorks Factory Component Registry
- Registry ID: specworks-factory
- Component groups: 1 (specification-libs)
- Supports: inline, filter, export capabilities
- Model: componentgroups with components resources
```

### 2. Browsing Components

List all components in a group:

```
Human: What components are available in the specification-libs group?

AI: (uses xregistry_list_resources tool)
Found 7 components in specification-libs:

1. linkset - RFC 9264 linkset library (.NET)
2. icalendar - RFC 5545 calendar library (.NET)
3. markmyword - Markdown/Word converter (.NET)
4. ratelimiter - HTTP rate limiting library (.NET)
5. vcard - RFC 6350 vCard library (.NET)
6. jsondiff - RFC 6902 JSON Patch library (.NET)
7. xregistry-mcp-server - xRegistry MCP server (TypeScript)
```

### 3. Getting Component Details

Get detailed information about a specific component:

```
Human: Tell me about the linkset component

AI: (uses xregistry_get_resource tool)
**Linkset Component**

- Type: library
- Language: C#, Framework: .NET
- License: MIT
- Description: Software component for parsing and serializing linkset documents
- Keywords: linkset, rfc9264, web-linking, hypermedia

Specifications:
- RFC 9264 - Linkset Media Types
- RFC 8288 - Web Linking

Repository: https://github.com/spec-works/linkset
```

### 4. Searching for Components

Search across the registry:

```
Human: Find all TypeScript components

AI: (uses xregistry_search tool)
Found 1 TypeScript component:

**xregistry-mcp-server**
- Type: tool
- Framework: Node.js
- Status: active, Maturity: beta
- 7 MCP tools for AI integration
- Repository: https://github.com/spec-works/xRegistry-MCP-Server
```

### 5. Exporting Registry Data

Export the entire registry for offline use:

```
Human: Export the complete SpecWorks registry

AI: (uses xregistry_export tool)
Exported registry with:
- 1 component group
- 7 components
- Full metadata, artifacts, and dependencies

[Returns complete JSON document]
```

## Advanced Workflows

### Finding Components by Specification

```
Human: Which components implement RFC specifications?

AI: Let me search for components with RFC-related keywords...

(uses xregistry_search and filters)

Found 5 RFC-implementing components:
1. linkset - RFC 9264, RFC 8288
2. icalendar - RFC 5545, RFC 5546
3. vcard - RFC 6350
4. jsondiff - RFC 6902
5. ratelimiter - draft-ietf-httpapi-ratelimit-headers
```

### Comparing Component Versions

```
Human: What's in version 1.0.0 of the linkset component?

AI: (uses xregistry_get_version tool)

**Linkset v1.0.0**

Artifacts:
- NuGet package: SpecWorks.Linkset.1.0.0.nupkg
- Source code: linkset-1.0.0.zip
- API documentation: https://spec-works.github.io/linkset/api/

Build Info:
- Built with: SpecWorks Factory
- .NET version: 8.0
- Build time: 2024-01-15T10:30:00Z
```

### Finding Dependencies

```
Human: What are the dependencies for the markmyword component?

AI: (uses xregistry_get_resource with include_versions)

**MarkMyWord Dependencies**

This component has minimal dependencies:
- System.Text.Json (runtime)
- DocumentFormat.OpenXml (runtime)  
- CommonMark.NET (runtime)

All dependencies are well-established .NET libraries.
```

## Working with Multiple Registries

### Connecting to Different Registries

```
Human: Connect to both SpecWorks and another registry

AI: 
(uses xregistry_connect for each)

Connected to 2 registries:

1. SpecWorks Factory
   - URL: https://spec-works.github.io/registry/
   - Components: 7
   - Focus: Specification-based libraries

2. [Other Registry]
   - URL: https://example.com/registry/
   - [Details...]
```

### Cross-Registry Search

```
Human: Find all JSON Schema components across all registries

AI:
(searches each connected registry)

Results from SpecWorks Factory:
- No JSON Schema components found

Results from [Other Registry]:
- [Results if any...]
```

## Integration Scenarios

### For Developers

**Finding Implementation Libraries:**

```
Human: I need to parse iCalendar files in .NET. What's available?

AI: (searches and recommends)

Perfect match: **iCalendar component**
- .NET library implementing RFC 5545
- NuGet package: ICalendar.Net
- Installation: dotnet add package ICalendar.Net
- Documentation: https://spec-works.github.io/iCalendar/

This library provides full RFC 5545 support for parsing, validating,
and serializing iCalendar data.
```

### For Architects

**Technology Stack Planning:**

```
Human: Show me all the .NET libraries for web standards

AI: (searches by language and filters by keywords)

Found 6 .NET libraries implementing web standards:
1. linkset - Web linking (RFC 9264, 8288)
2. vCard - Contact data (RFC 6350)
3. iCalendar - Calendar data (RFC 5545)
4. JsonDiff - JSON operations (RFC 6902)
5. RateLimiter - HTTP rate limiting
6. MarkMyWord - Document conversion

All are MIT licensed and actively maintained.
```

### For QA/Testing

**Specification Compliance Verification:**

```
Human: Which component versions implement RFC 9264?

AI: (queries component metadata)

**linkset v1.0.0** implements RFC 9264

Compliance Details:
- Linkset JSON Format (Section 4.2): ✅ Supported
- Link Target Attributes (RFC 8288 Section 3.4): ✅ Supported
- Link Relations (RFC 8288 Section 3.3): ✅ Supported

Test Coverage: 20+ tests including specification examples
```

## Troubleshooting

### Connection Issues

```
Human: I can't connect to the registry

AI: Let me check...
(attempts xregistry_connect)

Error: Unable to reach https://spec-works.github.io/registry/

Suggestions:
1. Verify the URL is correct
2. Check your network connection
3. Ensure the registry server is accessible
4. Try https://spec-works.github.io/registry/ (with trailing slash)
```

### No Results Found

```
Human: Find Python components

AI: (searches with language filter)

No Python components found in SpecWorks Factory registry.

This registry currently focuses on:
- .NET/C# libraries (6 components)
- TypeScript/Node.js tools (1 component)

Would you like me to:
1. Show all available languages?
2. Search another registry?
3. List all components regardless of language?
```

## Tips and Best Practices

1. **Start Broad, Then Narrow**
   - First connect and explore the registry structure
   - Then search or filter for specific needs

2. **Use Inline Wisely**
   - Set `inline: true` when you need full details
   - Set `inline: false` for quick overviews

3. **Leverage Search**
   - Use attribute filters for precise results
   - Combine multiple criteria for complex searches

4. **Export for Offline**
   - Export registry data for local analysis
   - Useful for generating reports or documentation

5. **Check Multiple Sources**
   - Component registry for metadata
   - GitHub repository for source code
   - Documentation site for usage guides

## Next Steps

- Explore the [Tools Reference](tools.md) for complete API details
- Visit the [GitHub Repository](https://github.com/spec-works/xRegistry-MCP-Server) for source code
- Try the examples with your own AI assistant
- Report issues or contribute improvements
