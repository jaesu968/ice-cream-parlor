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