import jsLogger from '@map-colonies/js-logger';
import { OperationStatus } from '@map-colonies/mc-priority-queue';
import config from 'config';
import httpStatusCodes from 'http-status-codes';
import mockAxios from 'jest-mock-axios';
import { getApp } from '../../../src/app';
import { SERVICES } from '../../../src/common/constants';
import { createUuid } from '../../helpers/helpers';
import { JobStatusRequestSender } from './helpers/requestSender';

describe('jobStatusController', function () {
  let requestSender: JobStatusRequestSender;
  beforeEach(function () {
    const app = getApp({
      override: [
        { token: SERVICES.LOGGER, provider: { useValue: jsLogger({ enabled: false }) } },
        { token: SERVICES.CONFIG, provider: { useValue: config } },
      ],
      useChild: true,
    });
    requestSender = new JobStatusRequestSender(app);
  });
  afterEach(function () {
    // container.reset();
    mockAxios.reset();
  });

  describe('GET /checkStatus', function () {
    describe('Happy Path', function () {
      it('should return 200 status code and the job status and percentage', async function () {
        const jobId = createUuid();
        mockAxios.post.mockResolvedValue({ percentage: 100, status: OperationStatus.COMPLETED });

        const response = await requestSender.checkStatus(jobId);

        expect(response.status).toBe(httpStatusCodes.OK);
        expect(response.body).toHaveProperty('status', OperationStatus.COMPLETED);
        expect(response.body).toHaveProperty('percentage', 100);
      });
    });
    describe('Bad Path', function () {
      // All requests with status code of 400
    });
    describe('Sad Path', function () {
      it('should return 404 status code if job id not exists', async function () {
        const jobId = createUuid();
        mockAxios.post.mockResolvedValue(undefined);

        const response = await requestSender.checkStatus(jobId);

        expect(response.status).toBe(httpStatusCodes.NOT_FOUND);
        expect(response.body).toHaveProperty('message', 'The Job ID is not exists!');
      });

      it('should return 500 status code if job manager is unavaliable', async function () {
        const jobId = createUuid();
        mockAxios.post.mockRejectedValueOnce(new Error('JobManager is not avaliable'));

        const response = await requestSender.checkStatus(jobId);

        expect(response.status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('message', 'JobManager is not avaliable');
      });
    });
  });
});