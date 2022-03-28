import request from 'axios';
import { toast } from 'react-toastify';
import { HTTP_CODE } from '../types/http-code';

export const errorHandle = (error: unknown): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.error(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        toast.error(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.error('Not found');
        break;
    }
  }
};
