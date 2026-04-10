/**
 * Generic GET request helper with detailed logging
 * @param {string} endpoint - API route (e.g., "/avg_macro_nutrients")
 * @param {Object} params - query parameters as key-value object
 */
export async function getData(endpoint, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    
    // Always use relative paths - Next.js rewrites will handle routing to external backend if configured
    const url = `/api${endpoint}${query ? `?${query}` : ""}`;

    // For debugging - log the actual URL being called
    console.log("[API] Endpoint:", endpoint, "| Request URL:", url);

    const response = await fetch(url, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // },

      headers: {
        "x-proxy-backend": "true"
      }   

    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    return { error: error.message };
  }


}