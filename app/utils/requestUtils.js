const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error('NEXT_PUBLIC_API_URL is not defined. Check your .env.local file.');
}

/**
 * Generic GET request helper
 * @param {string} endpoint - API route (e.g., "/avg_macro_nutrients")
 * @param {Object} params - query parameters as key-value object
 */
export async function getData(endpoint, params = {}) {
  if (!API_URL) {
    const msg = 'API URL not configured';
    console.error(msg);
    return { error: msg };
  }

  try {
    // Build query string
    const query = new URLSearchParams(params).toString();
    const url = `${API_URL}${endpoint}${query ? `?${query}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      const msg = `API request failed with status ${response.status}`;
      console.error(msg, { url });
      return { error: msg };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching API:", error);
    return { error: error.message || String(error) };
  }
}