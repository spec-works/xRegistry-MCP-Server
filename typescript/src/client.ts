/**
 * xRegistry HTTP Client
 * 
 * Implements the xRegistry HTTP Binding for accessing registry instances.
 * Spec: https://github.com/xregistry/spec/blob/main/core/http.md
 */

export interface XRegistryResponse {
  specversion: string;
  registryid?: string;
  self: string;
  epoch?: number;
  name?: string;
  description?: string;
  documentation?: string;
  model?: any;
  capabilities?: any;
  [key: string]: any;
}

export interface XRegistryGroup {
  [key: string]: any;
  self: string;
  epoch?: number;
  name?: string;
  description?: string;
}

export interface XRegistryResource {
  [key: string]: any;
  versionid?: string;
  self: string;
  epoch?: number;
  name?: string;
  description?: string;
}

export interface XRegistryVersion {
  versionid: string;
  self: string;
  epoch?: number;
  name?: string;
  description?: string;
  [key: string]: any;
}

export class XRegistryClient {
  constructor(private readonly baseUrl: string) {
    // Ensure base URL doesn't end with slash
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  /**
   * GET / - Retrieve registry metadata
   */
  async getRegistry(options?: {
    inline?: boolean;
    filter?: string;
  }): Promise<XRegistryResponse> {
    const url = this.buildUrl("/", options);
    return this.fetch(url);
  }

  /**
   * GET /model - Retrieve registry model
   */
  async getModel(): Promise<any> {
    const url = `${this.baseUrl}/model`;
    return this.fetch(url);
  }

  /**
   * GET /capabilities - Retrieve registry capabilities
   */
  async getCapabilities(): Promise<any> {
    const url = `${this.baseUrl}/capabilities`;
    return this.fetch(url);
  }

  /**
   * GET /export - Export entire registry
   */
  async export(options?: {
    inline?: boolean;
    filter?: string;
  }): Promise<XRegistryResponse> {
    const url = this.buildUrl("/export", options);
    return this.fetch(url);
  }

  /**
   * GET /<GROUPS> - List all groups of a type
   */
  async listGroups(
    groupType: string,
    options?: {
      inline?: boolean;
      filter?: string;
    }
  ): Promise<{ [key: string]: XRegistryGroup }> {
    const url = this.buildUrl(`/${groupType}`, options);
    const result = await this.fetch(url);
    return result[groupType] || {};
  }

  /**
   * GET /<GROUPS>/<GID> - Get specific group
   */
  async getGroup(
    groupType: string,
    groupId: string,
    options?: {
      inline?: boolean;
    }
  ): Promise<XRegistryGroup> {
    const url = this.buildUrl(`/${groupType}/${groupId}`, options);
    return this.fetch(url);
  }

  /**
   * GET /<GROUPS>/<GID>/<RESOURCES> - List resources in a group
   */
  async listResources(
    groupType: string,
    groupId: string,
    resourceType: string,
    options?: {
      inline?: boolean;
      filter?: string;
    }
  ): Promise<{ [key: string]: XRegistryResource }> {
    const url = this.buildUrl(
      `/${groupType}/${groupId}/${resourceType}`,
      options
    );
    const result = await this.fetch(url);
    return result[resourceType] || {};
  }

  /**
   * GET /<GROUPS>/<GID>/<RESOURCES>/<RID> - Get specific resource
   */
  async getResource(
    groupType: string,
    groupId: string,
    resourceType: string,
    resourceId: string,
    options?: {
      inline?: boolean;
    }
  ): Promise<XRegistryResource> {
    const url = this.buildUrl(
      `/${groupType}/${groupId}/${resourceType}/${resourceId}`,
      options
    );
    return this.fetch(url);
  }

  /**
   * GET /<GROUPS>/<GID>/<RESOURCES>/<RID>/versions - List versions
   */
  async listVersions(
    groupType: string,
    groupId: string,
    resourceType: string,
    resourceId: string,
    options?: {
      inline?: boolean;
    }
  ): Promise<{ [key: string]: XRegistryVersion }> {
    const url = this.buildUrl(
      `/${groupType}/${groupId}/${resourceType}/${resourceId}/versions`,
      options
    );
    const result = await this.fetch(url);
    return result.versions || {};
  }

  /**
   * GET /<GROUPS>/<GID>/<RESOURCES>/<RID>/versions/<VID> - Get specific version
   */
  async getVersion(
    groupType: string,
    groupId: string,
    resourceType: string,
    resourceId: string,
    versionId: string
  ): Promise<XRegistryVersion> {
    const url = `${this.baseUrl}/${groupType}/${groupId}/${resourceType}/${resourceId}/versions/${versionId}`;
    return this.fetch(url);
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(
    path: string,
    options?: {
      inline?: boolean;
      filter?: string;
      [key: string]: any;
    }
  ): string {
    const url = new URL(path, this.baseUrl);

    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * HTTP GET with JSON response
   */
  private async fetch(url: string): Promise<any> {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${response.statusText} - ${url}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    }

    // If not JSON, return as text
    const text = await response.text();
    return { data: text, contentType };
  }
}
