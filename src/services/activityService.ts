
// travel-app-task/src/services/activityService.ts
import axios, { AxiosError } from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const searchActivities = async (params: {
  city_id: string;
  date: string;
  adults: number;
  currency_code?: string;
}) => {
  console.log('Activity Service Environment Variables:', {
    RAPIDAPI_KEY,
    NODE_ENV: process.env.NODE_ENV,
  });
  if (!RAPIDAPI_KEY) {
    throw new Error('RAPIDAPI_KEY is not defined. Ensure .env.local is in the project root with RAPIDAPI_KEY.');
  }

  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/activities/searchActivities', // Adjust URL if different
    params: {
      city_id: params.city_id,
      date: params.date,
      adults: params.adults.toString(),
      currency_code: params.currency_code || 'AED',
    },
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log('Activity API Response:', JSON.stringify(response.data, null, 2));
    return response.data.data?.activities || [];
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Activity Error details:', {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      headers: axiosError.response?.headers,
    });
    if (axiosError.response?.status === 401) {
      throw new Error('401 Unauthorized: Invalid API key or authentication issue');
    } else if (axiosError.response?.status === 429) {
      throw new Error('429 Rate Limit Exceeded: Too many requests');
    } else {
      throw new Error(`Failed to fetch activities: ${axiosError.message}`);
    }
  }
};
