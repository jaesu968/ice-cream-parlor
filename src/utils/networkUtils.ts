export const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
  
  // add a loop here
  for (let attempt = 0; attempt < retries; attempt++) {
    // try to find the response via fetch 
    try {
      const response = await fetch(url); 
      // if the response is ok return it 
      if (response.ok) return response; 
    } catch (error){
      // if an error occurs, throw it
      if (attempt === retries  - 1) throw error; 
      // otherwise, await a new Promise that resolves after a delay before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt))); // exponential backoff
    }
  }
  // if all retries fail, throw a generic network error
  throw new Error('Network error. Please check your connection and try again.');
};

export const getErrorMessage = (statusCode: number): string => {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input and try again.',
    404: 'Data not found. The service may be temporarily unavailable.',
    429: 'Too many requests. Please wait a moment before trying again.',
    500: 'Server error. Please try again in a few minutes.',
    503: 'Service temporarily unavailable. Please check back later.'
  };
  
  return messages[statusCode] || 'Something went wrong. Please check your connection and try again.';
};