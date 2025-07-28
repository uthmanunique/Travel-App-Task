// travel-app-task/src/services/hotelService.ts
import axios, { AxiosError } from 'axios';

const RAPIDAPI_KEY = 'f6834f1a55mshbd3aa21fcb6e19ep1f2bfdjsn308705e9184c';

export const searchHotels = async (params: {
  dest_id: string;
  checkin_date: string;
  checkout_date: string;
  adults_number: number;
  currency_code?: string;
  children_age?: string;
  room_qty?: number;
  page_number?: number;
}) => {
  console.log('Environment Variables:', {
    NEXT_PUBLIC_RAPIDAPI_KEY: RAPIDAPI_KEY,
    NODE_ENV: process.env.NODE_ENV,
  });
  if (!RAPIDAPI_KEY) {
    throw new Error('NEXT_PUBLIC_RAPIDAPI_KEY is not defined. Ensure .env.local is in the project root with NEXT_PUBLIC_RAPIDAPI_KEY.');
  }

  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      dest_id: params.dest_id,
      search_type: 'CITY',
      arrival_date: params.checkin_date,
      departure_date: params.checkout_date,
      adults: params.adults_number.toString(),
      currency_code: params.currency_code || 'AED',
      children_age: params.children_age || '0,17',
      room_qty: params.room_qty?.toString() || '1',
      page_number: params.page_number?.toString() || '1',
      units: 'metric',
      temperature_unit: 'c',
      languagecode: 'en-us',
      location: 'US',
    },
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    return response.data.data?.hotels || [];
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error details:', {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      headers: axiosError.response?.headers,
    });
    if (axiosError.response?.status === 401) {
      throw new Error('401 Unauthorized: Invalid API key or authentication issue');
    } else if (axiosError.response?.status === 429) {
      throw new Error('429 Rate Limit Exceeded: Too many requests');
    } else {
      throw new Error(`Failed to fetch hotels: ${axiosError.message}`);
    }
  }
};
