// Base url
const API_BASE_URL = 'http://127.0.0.1:8000/api';
export const API_BASE_URL_STORAGE = 'http://127.0.0.1:8000';


async function apiService<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  
  // Siapkan header default
  const headers: HeadersInit | any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  // Tambahkan token Authorization jika ada
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

     // Cek jika status response adalah 204 (No Content)
    if (response.status === 204) {
      // Kembalikan null atau objek kosong yang sesuai sebagai T
      return null as T;
    }

    const data = await response.json();

    if (!response.ok) {
      throw data; 
    }

    return data;
  } catch (error) {
    console.error('API Service Error:', error);
    // Lempar kembali error agar komponen yang memanggil bisa menanganinya
    throw error;
  }
}


/**
 * Fungsi helper baru untuk request API yang mengandung file (multipart/form-data).
 */
export async function apiUploadService<T>(endpoint: string, formData: FormData, method: 'POST' | 'PUT' = 'POST'): Promise<T> {
    const token = localStorage.getItem('token');

    const headers: HeadersInit = {
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Untuk method PUT, kita gunakan POST dan tambahkan _method di FormData
    if (method === 'PUT') {
        formData.append('_method', 'PUT');
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST', // Selalu POST untuk FormData
            headers,
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    } catch (error) {
        console.error('API Upload Service Error:', error);
        throw error;
    }
}

export default apiService;
