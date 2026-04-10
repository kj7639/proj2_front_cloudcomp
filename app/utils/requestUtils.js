const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Generic GET request helper with detailed logging
 * @param {string} endpoint - API route (e.g., "/avg_macro_nutrients")
 * @param {Object} params - query parameters as key-value object
 */
// export async function getData(endpoint, params = {}) {
//   try {
//     const query = new URLSearchParams(params).toString();
//     const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

//     if (!API_URL) {
//       console.error("NEXT_PUBLIC_BACKEND_URL is undefined!");
//     }

//     const url = `${API_URL.replace(/\/$/, "")}${endpoint}${query ? `?${query}` : ""}`;

export async function getData(endpoint, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    
    const url = `/api${endpoint}${query ? `?${query}` : ""}`;


    // Above added Uncommented code for local development without proxy; keep for reference and uncomment to run backend

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