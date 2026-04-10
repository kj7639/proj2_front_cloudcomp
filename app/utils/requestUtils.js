const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Generic GET request helper with detailed logging
 * @param {string} endpoint - API route (e.g., "/avg_macro_nutrients")
 * @param {Object} params - query parameters as key-value object
 */
export async function getData(endpoint, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    
    // Build the URL based on whether we're using an external backend or local API proxy
    let url;
    if (API_URL) {
      // If NEXT_PUBLIC_BACKEND_URL is set, remove /api suffix and append endpoint
      const baseURL = API_URL.replace(/\/api\/?$/, "");
      url = `${baseURL}/api${endpoint}${query ? `?${query}` : ""}`;
    } else {
      // Use local relative path (proxied by Next.js)
      url = `/api${endpoint}${query ? `?${query}` : ""}`;
    }

    // For debugging - log the actual URL being called
    console.log("[API] Endpoint:", endpoint, "| Request URL:", url);

    console.log("Fetching API URL:", url);

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