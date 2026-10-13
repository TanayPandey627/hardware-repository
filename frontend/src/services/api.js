// API Service for Hardware Platform Backend

const API_BASE_URL = '/api';

/**
 * Helper to handle fetch responses and handle JSON errors cleanly
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorBody = await response.json();
      if (errorBody && errorBody.message) {
        errorMessage = errorBody.message;
      }
    } catch (e) {
      // Failed to parse JSON error payload, keep fallback
    }
    throw new Error(errorMessage);
  }

  // Handle 244 No Content or empty responses
  if (response.status === 244 || response.headers.get('content-length') === '0') {
    return null;
  }

  return await response.json();
}

export const apiService = {
  // Components API
  async getComponents(search = '', category = '') {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    const url = `${API_BASE_URL}/components${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  async getComponentById(id) {
    const response = await fetch(`${API_BASE_URL}/components/${id}`);
    return handleResponse(response);
  },

  async createComponent(data) {
    const response = await fetch(`${API_BASE_URL}/components`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  // Projects API
  async getProjects(search = '', difficulty = '', componentId = null) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (difficulty) params.append('difficulty', difficulty);
    if (componentId) params.append('componentId', componentId);

    const url = `${API_BASE_URL}/projects${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  async getProjectById(id) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    return handleResponse(response);
  },

  async createProject(data) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  }
};
