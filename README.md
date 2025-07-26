Aplikasi Toko Online Sederhana (Frontend)
Ini adalah frontend untuk aplikasi toko online sederhana yang dibangun menggunakan React, TypeScript, dan Vite. Aplikasi ini menyediakan antarmuka untuk pelanggan berbelanja dan dasbor untuk admin mengelola toko.

Fitur Utama
Tampilan Pelanggan:

Halaman utama dengan daftar produk dan fitur pencarian.

Keranjang belanja interaktif dengan manajemen kuantitas.

Proses checkout yang terintegrasi dengan backend.

Dasbor Admin:

Halaman utama dengan visualisasi data penjualan (grafik garis & donat).

Manajemen produk penuh (CRUD) dengan form modal dan unggah gambar.

Halaman untuk melihat riwayat transaksi.

Autentikasi: Halaman login dan registrasi yang terhubung dengan API JWT.

Desain Responsif: Tampilan dioptimalkan untuk perangkat desktop, tablet, dan mobile.

Teknologi yang Digunakan
Framework: React dengan Vite

Bahasa: TypeScript

Styling: Tailwind CSS

Grafik: Recharts

Ikon: Lucide React

Panduan Instalasi
Berikut adalah langkah-langkah untuk menjalankan proyek ini di lingkungan lokal.

1. Prasyarat
   Node.js (versi 16 atau lebih baru)

NPM atau Yarn

2. Instalasi Proyek
   Clone repository ini:

git clone https://github.com/ezz001-dev/simple-store.git
cd simple-store

Instal dependensi Node.js:

npm install

Konfigurasi URL API:
Buka file src/services/api.ts lalu isi variable
API_BASE_URL dan API_BASE_URL_STORAGE menunjuk ke alamat server backend Laravel

Pastikan Backend Berjalan:
Sebelum menjalankan frontend, pastikan server backend Laravel sudah aktif dan berjalan.

3. Menjalankan Server
   Jalankan server pengembangan Vite:

npm run dev

Aplikasi akan tersedia di http://localhost:5173 (atau port lain yang tersedia).
