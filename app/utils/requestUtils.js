const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Generic GET request helper with detailed logging
 * @param {string} endpoint - API route (e.g., "/avg_macro_nutrients")
 * @param {Object} params - query parameters as key-value object
 */
export async function getData(endpoint, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!API_URL) {
      console.error("NEXT_PUBLIC_BACKEND_URL is undefined!");
    }

    const url = `${API_URL.replace(/\/$/, "")}${endpoint}${query ? `?${query}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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