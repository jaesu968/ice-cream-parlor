// Centralized storage keys to avoid key collisions
export const STORAGE_KEYS = {
    CACHE: '@cache',
    ICE_CREAM_DATA: '@ice_cream_data',
    TIMESTAMPS: '@timestamps'
}

// Namespaced key generators for organized storage
// get cached data key for a specific endpoint
export const getCacheKey = (endpoint: string): string => `${STORAGE_KEYS.CACHE}:${endpoint}`;
// get ice cream data key for a specific flavor
export const getDataKey = (dataType: string): string => `${STORAGE_KEYS.ICE_CREAM_DATA}:${dataType}`;
// key generator for timestamp information 
export const getTimestampKey = (operation: string): string => `${STORAGE_KEYS.TIMESTAMPS}:${operation}`;