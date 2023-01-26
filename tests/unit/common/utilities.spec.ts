import { ICreateTaskBody } from '@map-colonies/mc-priority-queue';
import * as utils from '../../../src/common/utilities';
import { ITaskParameters } from '../../../src/common/interfaces';

describe('utilities tests', () => {
  const configMock = {
    get: jest.fn(),
    has: jest.fn(),
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('filesToTasks tests', () => {
    it('Should return tasks successfully', () => {
      const files: string[] = ['a', 'b', 'c', 'd'];
      const expected1: string[] = ['a', 'b', 'c'];
      const expected2: string[] = ['d'];
      configMock.get.mockReturnValue(3);

      const result: ICreateTaskBody<ITaskParameters>[] = utils.filesToTasks(files);

      expect(result.length).toHaveLength(2);
      expect(result[0].parameters.paths).toBe(expected1);
      expect(result[1].parameters.paths).toBe(expected2);
    });
  });
});
