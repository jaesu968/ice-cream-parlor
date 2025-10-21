import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 
 * create cached data
 * 3 parameters: key, data, expiration time in minutes (default 30 minutes)
 */
export const creatCache = async (key: string, data: any, minutes: number = 30) => {
 // store data in AsyncStorage with expiration timestamps
  const cacheEntry = {
    data,
    expires: Date.now() + minutes * 60 * 1000 // expiration time in milliseconds
  };
  // store the cache entry in AsyncStorage using the cache:${key} format
  await AsyncStorage.setItem(`cache:${key}`, JSON.stringify(cacheEntry));
}



/**
 * Retrieves cached data if it exists and hasn't expired
 */
export const getCache = async (key: string) => {
  // get the cached data from AsyncStorage using the key parameter 
  // with the "cache:" prefix and store it in a constant variable called cached
  const cached = await AsyncStorage.getItem(`cache:${key}`);
  // check if cached data exists 
  // if not return null immediately to indicate no cache is available 
  if (!cached) return null; 
  // if cached data exists use JSON.parse to convert the string back to a TypeScript object
  // and store it in a variable called entry 
  const entry = JSON.parse(cached);
  // add expiration checking logic to automatically clean up expired cache entries
  if (Date.now() > entry.expires) {
    // if the current time is greater than the expiration timestamp 
    // remove the expired cache entry from AsyncStorage
    await AsyncStorage.removeItem(`cache:${key}`);
    return null; // return null to indicate the cache has expired
  }
  // if the cache is still valid return the cached data
  return entry.data;
};

/**
 * Removes a specific cache entry
 */
export const removeCache = async (key: string) => {
  await AsyncStorage.removeItem(`cache:${key}`);
};

/**
 * Clears all cache entries (those with 'cache:' prefix)
 */
export const clearAllCache = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const cacheKeys = keys.filter(key => key.startsWith('cache:'));
  await AsyncStorage.multiRemove(cacheKeys);
};