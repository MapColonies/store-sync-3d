import jsLogger from '@map-colonies/js-logger';
import { IJobResponse } from '@map-colonies/mc-priority-queue';
import { IJobParameters, ITaskParameters } from '../../../../src/common/interfaces';
import { JobStatusManager } from '../../../../src/jobStatus/models/jobStatusManager';

let jobStatusManager: JobStatusManager;

describe('ExportManager', () => {
  const jobManagerWrapperMock = {
    getJob: jest.fn(),
  };

  beforeEach(function () {
    jobStatusManager = new JobStatusManager(
      jsLogger({ enabled: false }),
      jobManagerWrapperMock as never
      );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#checkStatus', () => {
    it('resolves without errors', async () => {
      const jobID = '1';
      const job: IJobResponse<IJobParameters, ITaskParameters> = {
        
      }
      jobManagerWrapperMock.getJob.mockResolvedValue();

      const resource = jobStatusManager.getResource();

      // expectation
      expect(resource.kind).toBe('avi');
      expect(resource.isAlive).toBe(false);
    });
  });
});
