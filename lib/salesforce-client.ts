// Salesforce REST API Client for downloading files and syncing data

import type { SalesforceContentVersion } from '@/types/salesforce';
import fs from 'fs';
import path from 'path';

/**
 * Salesforce API Configuration
 */
interface SalesforceConfig {
  instanceUrl: string;
  accessToken: string;
  apiVersion?: string;
}

/**
 * Get Salesforce configuration from environment
 */
export function getSalesforceConfig(): SalesforceConfig {
  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;
  const accessToken = process.env.SALESFORCE_ACCESS_TOKEN;

  if (!instanceUrl || !accessToken) {
    throw new Error('Salesforce configuration missing. Set SALESFORCE_INSTANCE_URL and SALESFORCE_ACCESS_TOKEN.');
  }

  return {
    instanceUrl,
    accessToken,
    apiVersion: 'v60.0',
  };
}

/**
 * Download START form PDF from Salesforce ContentVersion
 *
 * @param contentVersionId - Salesforce ContentVersion ID
 * @returns Path to downloaded PDF file
 */
export async function downloadStartFormPDF(
  contentVersionId: string
): Promise<{ filePath: string; fileName: string; fileSize: number }> {
  const config = getSalesforceConfig();

  console.log('[Salesforce Client] Downloading START form PDF:', contentVersionId);

  // Step 1: Get ContentVersion metadata
  const metadataUrl = `${config.instanceUrl}/services/data/${config.apiVersion}/sobjects/ContentVersion/${contentVersionId}`;

  const metadataResponse = await fetch(metadataUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!metadataResponse.ok) {
    const errorText = await metadataResponse.text();
    throw new Error(`Failed to fetch ContentVersion metadata: ${errorText}`);
  }

  const metadata: SalesforceContentVersion = await metadataResponse.json();

  console.log('[Salesforce Client] ContentVersion metadata:', {
    title: metadata.Title,
    extension: metadata.FileExtension,
    size: metadata.ContentSize,
  });

  // Step 2: Download the actual file content (VersionData)
  const downloadUrl = `${config.instanceUrl}/services/data/${config.apiVersion}/sobjects/ContentVersion/${contentVersionId}/VersionData`;

  const fileResponse = await fetch(downloadUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.accessToken}`,
    },
  });

  if (!fileResponse.ok) {
    const errorText = await fileResponse.text();
    throw new Error(`Failed to download file: ${errorText}`);
  }

  // Step 3: Get file content as buffer
  const fileBuffer = await fileResponse.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  // Step 4: Save to local filesystem
  const uploadsDir = path.join(process.cwd(), 'public', 'start-forms');

  // Create directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate filename
  const sanitizedTitle = metadata.Title.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
  const fileName = `${sanitizedTitle}-${contentVersionId}.${metadata.FileExtension}`;
  const filePath = path.join(uploadsDir, fileName);

  // Write file
  fs.writeFileSync(filePath, buffer);

  console.log('[Salesforce Client] File saved:', {
    filePath,
    size: buffer.length,
  });

  // Return path relative to public directory
  const publicPath = `/start-forms/${fileName}`;

  return {
    filePath: publicPath,
    fileName: metadata.Title,
    fileSize: metadata.ContentSize,
  };
}

/**
 * Query Salesforce for ContentVersion information
 *
 * @param contentDocumentId - Salesforce ContentDocument ID
 * @returns Latest ContentVersion for the document
 */
export async function getLatestContentVersion(
  contentDocumentId: string
): Promise<SalesforceContentVersion> {
  const config = getSalesforceConfig();

  const query = `SELECT Id, ContentDocumentId, Title, FileExtension, ContentSize, VersionNumber, CreatedDate FROM ContentVersion WHERE ContentDocumentId = '${contentDocumentId}' AND IsLatest = true LIMIT 1`;

  const queryUrl = `${config.instanceUrl}/services/data/${config.apiVersion}/query?q=${encodeURIComponent(query)}`;

  const response = await fetch(queryUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to query ContentVersion: ${errorText}`);
  }

  const data = await response.json();

  if (!data.records || data.records.length === 0) {
    throw new Error(`No ContentVersion found for ContentDocument: ${contentDocumentId}`);
  }

  return data.records[0];
}

/**
 * Download START form by ContentDocument ID (automatically gets latest version)
 *
 * @param contentDocumentId - Salesforce ContentDocument ID
 * @returns Path to downloaded PDF file
 */
export async function downloadStartFormByDocumentId(
  contentDocumentId: string
): Promise<{ filePath: string; fileName: string; fileSize: number }> {
  console.log('[Salesforce Client] Getting latest version for ContentDocument:', contentDocumentId);

  const contentVersion = await getLatestContentVersion(contentDocumentId);

  return downloadStartFormPDF(contentVersion.Id);
}

/**
 * Test Salesforce connection
 */
export async function testSalesforceConnection(): Promise<boolean> {
  try {
    const config = getSalesforceConfig();

    const response = await fetch(`${config.instanceUrl}/services/data/${config.apiVersion}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('[Salesforce Client] Connection test failed:', error);
    return false;
  }
}
