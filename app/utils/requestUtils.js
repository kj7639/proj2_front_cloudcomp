const API_URL = '/api/proxy';  // ← Proxy through your own Next.js server

if (!API_URL) {
  console.error('Proxy not configured');
}

/**
 * Generic GET request helper - proxies through Next.js API
 * @param {string} endpoint - API route (e.g., "/avg_macro_nutrients") 
 * @param {Object} params - query parameters
 */
export async function getData(endpoint, params = {}) {
  try {
    // Build query string
    const query = new URLSearchParams(params).toString();
    const url = `${API_URL}${endpoint}${query ? `?${query}` : ""}`;

    console.log('Proxying to:', url);  // Debug log

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

