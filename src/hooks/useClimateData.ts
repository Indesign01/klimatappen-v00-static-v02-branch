//First approach
/*
'use client';
import { useState, useEffect } from 'react';
import { CO2EmissionsData, TemperatureData, GlacierData, SeaLevelData } from '@/types/climate';

export function useClimateData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
}*/

////Current
////New appraoch see below
//import { useState, useEffect } from 'react';
//
//interface UseClimateDataOptions {
//  refreshInterval?: number;
//  retryAttempts?: number;
//}
//
//export function useClimateData<T>(
//  endpoint: string,
//  options: UseClimateDataOptions = {}
//) {
//  const [data, setData] = useState<T[]>([]);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState<string | null>(null);
//  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
//
//  const { refreshInterval = 0, retryAttempts = 3 } = options;
//
//  const fetchData = async (attempt = 1): Promise<void> => {
//    try {
//      setError(null);
//      const response = await fetch(endpoint);
//
//      if (!response.ok) {
//        throw new Error(`HTTP error! status: ${response.status}`);
//      }
//
//      const result = await response.json();
//      setData(result);
//      setLastUpdated(new Date());
//    } catch (err) {
//      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//
//      if (attempt < retryAttempts) {
//        // Retry with exponential backoff
//        setTimeout(() => fetchData(attempt + 1), Math.pow(2, attempt) * 1000);
//      } else {
//        setError(`Failed to fetch data after ${retryAttempts} attempts: ${errorMessage}`);
//      }
//    } finally {
//      if (attempt === 1) setLoading(false);
//    }
//  };
//
//  useEffect(() => {
//    fetchData();
//
//    if (refreshInterval > 0) {
//      const interval = setInterval(fetchData, refreshInterval);
//      return () => clearInterval(interval);
//    }
//  }, [endpoint, refreshInterval]);
//
//  return { data, loading, error, lastUpdated, refetch: fetchData };
//}




////Current
////Pausing this and using Care of lint commenting below
//
//// src/hooks/useClimateData.ts
//import { useState, useEffect } from 'react';
//import { API_ENDPOINTS } from '@/lib/constants';
//import { ClimateDataProcessor } from '@/lib/climateDataProcessor';
//
//interface UseClimateDataOptions {
//  refreshInterval?: number;
//  retryAttempts?: number;
//}
//
//// Map internal endpoints to external URLs for static builds
//const ENDPOINT_MAPPING = {
//  '/api/climate/co2': API_ENDPOINTS.CO2,
//  '/api/climate/temperature': API_ENDPOINTS.TEMPERATURE,
//  '/api/climate/glaciers': API_ENDPOINTS.GLACIERS,
//  '/api/climate/sealevel': API_ENDPOINTS.SEALEVEL,
//} as const;
//
//// Data processing functions for each endpoint
//const DATA_PROCESSORS = {
//  '/api/climate/co2': ClimateDataProcessor.processCO2Data,
//  '/api/climate/temperature': ClimateDataProcessor.processTemperatureData,
//  '/api/climate/glaciers': ClimateDataProcessor.processGlacierData,
//  '/api/climate/sealevel': ClimateDataProcessor.processSeaLevelData,
//} as const;
//
//export function useClimateData<T>(
//  endpoint: string,
//  options: UseClimateDataOptions = {}
//) {
//  const [data, setData] = useState<T[]>([]);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState<string | null>(null);
//  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
//
//  const { refreshInterval = 0, retryAttempts = 3 } = options;
//
//  const fetchData = async (attempt = 1): Promise<void> => {
//    try {
//      setError(null);
//
//      const isStaticBuild = process.env.NEXT_PUBLIC_STATIC_BUILD === 'true';
//
//      let response: Response;
//      let result: any;
//
//      if (isStaticBuild && endpoint in ENDPOINT_MAPPING) {
//        // For static builds, fetch directly from external API
//        const externalUrl = ENDPOINT_MAPPING[endpoint as keyof typeof ENDPOINT_MAPPING];
//        response = await fetch(externalUrl);
//
//        if (!response.ok) {
//          throw new Error(`HTTP error! status: ${response.status}`);
//        }
//
//        const rawData = await response.json();
//
//        // Process data client-side using the appropriate processor
//        const processor = DATA_PROCESSORS[endpoint as keyof typeof DATA_PROCESSORS];
//        if (processor) {
//          result = processor(rawData);
//        } else {
//          result = rawData;
//        }
//      } else {
//        // For development/Vercel, use API routes as usual
//        response = await fetch(endpoint);
//
//        if (!response.ok) {
//          throw new Error(`HTTP error! status: ${response.status}`);
//        }
//
//        result = await response.json();
//      }
//
//      setData(result);
//      setLastUpdated(new Date());
//    } catch (err) {
//      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//
//      if (attempt < retryAttempts) {
//        // Retry with exponential backoff
//        setTimeout(() => fetchData(attempt + 1), Math.pow(2, attempt) * 1000);
//      } else {
//        setError(`Failed to fetch data after ${retryAttempts} attempts: ${errorMessage}`);
//
//        // Set fallback data for static builds if available
//        if (process.env.NEXT_PUBLIC_STATIC_BUILD === 'true') {
//          setFallbackData(endpoint);
//        }
//      }
//    } finally {
//      if (attempt === 1) setLoading(false);
//    }
//  };
//
//  const setFallbackData = (endpoint: string) => {
//    // Provide fallback data when external APIs fail in static builds
//    const fallbackData = getFallbackData(endpoint);
//    if (fallbackData) {
//      setData(fallbackData);
//      setLastUpdated(new Date());
//      setError('Using fallback data - external API temporarily unavailable');
//    }
//  };
//
//  useEffect(() => {
//    fetchData();
//
//    if (refreshInterval > 0) {
//      const interval = setInterval(fetchData, refreshInterval);
//      return () => clearInterval(interval);
//    }
//  }, [endpoint, refreshInterval]);
//
//  return { data, loading, error, lastUpdated, refetch: fetchData };
//}
//
//// Fallback data function (you can expand this with actual fallback values)
//function getFallbackData(endpoint: string): any[] | null {
//  const fallbackMap = {
//    '/api/climate/co2': [
//      { year: 2020, total: 36700, gasFlaring: 280, perCapita: 4.8 },
//      { year: 2021, total: 37100, gasFlaring: 290, perCapita: 4.9 },
//      { year: 2022, total: 36800, gasFlaring: 275, perCapita: 4.7 },
//    ],
//    '/api/climate/temperature': [
//      { year: 2020, temperature: 1.02 },
//      { year: 2021, temperature: 1.11 },
//      { year: 2022, temperature: 1.06 },
//    ],
//    // Add more fallback data as needed
//  };
//
//  return fallbackMap[endpoint as keyof typeof fallbackMap] || null;
//}





//Current
//Lint comments
// src/hooks/useClimateData.ts
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/lib/constants';
import { ClimateDataProcessor } from '@/lib/climateDataProcessor';

interface UseClimateDataOptions {
  refreshInterval?: number;
  retryAttempts?: number;
}

// Map internal endpoints to external URLs for static builds
const ENDPOINT_MAPPING = {
  '/api/climate/co2': API_ENDPOINTS.CO2,
  '/api/climate/temperature': API_ENDPOINTS.TEMPERATURE,
  '/api/climate/glaciers': API_ENDPOINTS.GLACIERS,
  '/api/climate/sealevel': API_ENDPOINTS.SEALEVEL,
} as const;

// Data processing functions for each endpoint
const DATA_PROCESSORS = {
  '/api/climate/co2': ClimateDataProcessor.processCO2Data,
  '/api/climate/temperature': ClimateDataProcessor.processTemperatureData,
  '/api/climate/glaciers': ClimateDataProcessor.processGlacierData,
  '/api/climate/sealevel': ClimateDataProcessor.processSeaLevelData,
} as const;

export function useClimateData<T>(
  endpoint: string,
  options: UseClimateDataOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { refreshInterval = 0, retryAttempts = 3 } = options;

  const fetchData = async (attempt = 1): Promise<void> => {
    try {
      setError(null);

      const isStaticBuild = process.env.NEXT_PUBLIC_STATIC_BUILD === 'true';

      let response: Response;
      let result: any;

      if (isStaticBuild && endpoint in ENDPOINT_MAPPING) {
        // For static builds, fetch directly from external API
        const externalUrl = ENDPOINT_MAPPING[endpoint as keyof typeof ENDPOINT_MAPPING];
        response = await fetch(externalUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();

        // Process data client-side using the appropriate processor
        const processor = DATA_PROCESSORS[endpoint as keyof typeof DATA_PROCESSORS];
        if (processor) {
          result = processor(rawData);
        } else {
          result = rawData;
        }
      } else {
        // For development/Vercel, use API routes as usual
        response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        result = await response.json();
      }

      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      if (attempt < retryAttempts) {
        // Retry with exponential backoff
        setTimeout(() => fetchData(attempt + 1), Math.pow(2, attempt) * 1000);
      } else {
        setError(`Failed to fetch data after ${retryAttempts} attempts: ${errorMessage}`);

        // Set fallback data for static builds if available
        if (process.env.NEXT_PUBLIC_STATIC_BUILD === 'true') {
          setFallbackData(endpoint);
        }
      }
    } finally {
      if (attempt === 1) setLoading(false);
    }
  };

  const setFallbackData = (endpoint: string) => {
    // Provide fallback data when external APIs fail in static builds
    const fallbackData = getFallbackData(endpoint);
    if (fallbackData) {
      setData(fallbackData);
      setLastUpdated(new Date());
      setError('Using fallback data - external API temporarily unavailable');
    }
  };

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, refreshInterval]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
}

// Fallback data function (you can expand this with actual fallback values)
function getFallbackData(endpoint: string): any[] | null {
  const fallbackMap = {
    '/api/climate/co2': [
      { year: 2020, total: 36700, gasFlaring: 280, perCapita: 4.8 },
      { year: 2021, total: 37100, gasFlaring: 290, perCapita: 4.9 },
      { year: 2022, total: 36800, gasFlaring: 275, perCapita: 4.7 },
    ],
    '/api/climate/temperature': [
      { year: 2020, temperature: 1.02 },
      { year: 2021, temperature: 1.11 },
      { year: 2022, temperature: 1.06 },
    ],
    // Add more fallback data as needed
  };

  return fallbackMap[endpoint as keyof typeof fallbackMap] || null;
}