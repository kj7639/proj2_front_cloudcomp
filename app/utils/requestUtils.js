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

    console.log("Response status:", response.status);

    if (!response.ok) {
      const text = await response.text(); // get raw response for debugging
      console.error("Non-OK response:", text);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;

  } catch (error) {
    console.error("Error fetching API:", error);
    return { error: error.message };
  }


}