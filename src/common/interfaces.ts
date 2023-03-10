import { Layer3DMetadata } from '@map-colonies/mc-model-types';
import { ICreateJobBody, IJobResponse, OperationStatus } from '@map-colonies/mc-priority-queue';
import { Providers } from './enums';

export interface IConfig {
  get: <T>(setting: string) => T;
  has: (setting: string) => boolean;
}

export interface OpenApiConfig {
  filePath: string;
  basePath: string;
  jsonPath: string;
  uiPath: string;
}

export interface Payload {
  /**
   * Ingestion model unique identifier
   */
  modelId: string;
  /**
   * Model files location path
   */
  modelPath: string;
  /**
   * Model tileset filename
   */
  tilesetFileName: string;
  /**
   * Metadata
   */
  metadata: Layer3DMetadata;
}

export interface IConfigProvider {
  listFiles: (model: string) => Promise<string[]>;
}

export interface IExportConfig {
  configProvider: Providers;
}

export interface IJobParameters {
  metadata: Layer3DMetadata;
}

export interface ITaskParameters {
  paths: string[];
}

export interface IS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  endpointUrl: string;
  bucket: string;
  sslEnabled: boolean;
  forcePathStyle: boolean;
}

export interface IFSConfig {
  pvPath: string;
}

export interface IExportResponse {
  jobID: string;
  status: OperationStatus;
}

export interface IJobStatusResponse {
  percentage: number;
  status: OperationStatus;
}

export interface JobStatusParams {
  jobID: string;
}

export type JobResponse = IJobResponse<IJobParameters, ITaskParameters>;
export type CreateJobBody = ICreateJobBody<IJobParameters, ITaskParameters>;
