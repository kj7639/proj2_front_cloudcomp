const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Generic GET request helper
 * @param {string} endpoint - API route (e.g., "/avg_macro_nutrients")
 * @param {Object} params - query parameters as key-value object
 */
export async function getData(endpoint, params = {}) {
  try {
    // Build query string
    const query = new URLSearchParams(params).toString();
    const url = `${API_URL}${endpoint}${query ? `?${query}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching API:", error);
    return { error: error.message };
  }
}