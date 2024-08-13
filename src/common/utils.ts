import { IPaginatedData, IResponse } from "./models/response.interface";

export function createResponse<T>(data: T | T[] | IPaginatedData<T> | null, params: Partial<IResponse<T>> = {}): IResponse<T> {
  let normalizedData: T[] = [];
  let count: number;

  if (data !== null) {
    if (Array.isArray(data)) {
      normalizedData = data;
      count = data.length;
    } else if (typeof data === 'object' && 'data' in data) {
      normalizedData = data.data;
      count = data.count;
    } else {
      normalizedData = [data];
      count = 1;
    }
  }

  const response: IResponse<T> = {
    data: normalizedData,
    count,
    status: {
      code: 200,
      message: 'Success',
    },
    ...params,
  };

  if (data !== null && typeof data === 'object' && 'totalPages' in data && 'currentPage' in data) {
    response.totalPages = data.totalPages;
    response.currentPage = data.currentPage;
  }

  return response;
}