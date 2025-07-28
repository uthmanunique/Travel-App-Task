// travel-app-task/src/services/flightService.ts
import axios, { AxiosError } from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const searchFlights = async (params: {
  fromId: string;
  toId: string;
  departDate: string;
  returnDate?: string;
  stops?: string;
  pageNo?: number;
  adults?: number;
  children?: string;
  sort?: string;
  cabinClass?: string;
  currency_code?: string;
}) => {
  console.log('RAPIDAPI_KEY:', RAPIDAPI_KEY); // Debug log
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
    params: {
      fromId: params.fromId,
      toId: params.toId,
      departDate: params.departDate,
      returnDate: params.returnDate,
      stops: params.stops || 'none',
      pageNo: params.pageNo || 1,
      adults: params.adults || 1,
      children: params.children || '0,17',
      sort: params.sort || 'BEST',
      cabinClass: params.cabinClass || 'ECONOMY',
      currency_code: params.currency_code || 'AED',
    },
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY || '',
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
    },
  };

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.request(options);
      return response.data.data || [];
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        console.warn(`Rate limit exceeded (Attempt ${attempt}/${maxRetries}). Waiting...`);
        const retryAfter = axiosError.response.headers['retry-after']
          ? parseInt(axiosError.response.headers['retry-after']) * 1000
          : 5000 * Math.pow(2, attempt - 1); // Exponential backoff: 5s, 10s, 20s
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
      } else if (axiosError.response?.status === 401) {
        console.error('401 Unauthorized: Invalid API key or authentication issue', axiosError.response.data);
        throw error;
      } else {
        console.error('Error fetching flights:', error);
        throw error;
      }
    }
  }
  throw new Error('Max retry attempts reached for rate limit');
};