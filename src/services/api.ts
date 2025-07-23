// Base url
const API_BASE_URL = 'http://127.0.0.1:8000/api';


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

    const data = await response.json();

    if (!response.ok) {
      // Jika response tidak OK (status bukan 2xx), lempar error
      // yang berisi pesan dari server atau pesan default.
      // Ini akan ditangkap oleh block .catch() di tempat pemanggilan.
      throw data; 
    }

    return data;
  } catch (error) {
    console.error('API Service Error:', error);
    // Lempar kembali error agar komponen yang memanggil bisa menanganinya
    throw error;
  }
}

export default apiService;
