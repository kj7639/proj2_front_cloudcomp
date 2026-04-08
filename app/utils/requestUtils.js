const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Generic GET request helper with detailed logging
 * @param {string} endpoint - API route (e.g., "/avg_macro_nutrients")
 * @param {Object} params - query parameters as key-value object
 */
export async function getData(endpoint, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_URL}${endpoint}${query ? `?${query}` : ""}`;

    console.log("Fetching API URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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