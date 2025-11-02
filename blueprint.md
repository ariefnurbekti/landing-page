# Proyek Jual Beli Mobil "Oberlo"

## Ikhtisar

Proyek ini menggabungkan desain visual dari template "Oberlo" dengan fungsionalitas aplikasi jual beli mobil bekas yang dibuat khusus. Tujuannya adalah untuk menciptakan platform yang menarik secara visual bagi pengguna untuk menelusuri daftar mobil dan bagi admin untuk mengelola inventaris dan prospek.

## Desain & Struktur (Basis: Oberlo)

- **Struktur File:** Proyek akan mempertahankan struktur file asli dari template Oberlo (`index.html`, `css/`, `images/`, `js/`).
- **Tampilan Visual:** Akan mempertahankan estetika modern, palet warna, dan tipografi dari template Oberlo untuk memastikan pengalaman pengguna premium.
- **Responsif:** Desain akan tetap sepenuhnya responsif untuk perangkat seluler dan desktop.

## Fungsionalitas Inti (Aplikasi Jual Beli Mobil)

1.  **Manajemen Inventaris Dinamis:**
    *   Daftar mobil tidak akan statis di HTML.
    *   Data mobil (nama, tahun, harga, gambar, dll.) akan disimpan dalam `localStorage` dan dikelola melalui halaman admin khusus.
    *   Halaman utama akan secara dinamis memuat dan menampilkan mobil dari `localStorage`.

2.  **Fitur "Tanya Detail" (Prospek/Leads via WhatsApp):**
    *   Setiap kartu mobil akan memiliki tombol "Tanya Detail".
    *   Mengklik tombol ini akan membuka modal (pop-up) yang berisi formulir.
    *   Pengguna memasukkan **Nama** dan **Nomor WhatsApp** mereka.
    *   Setelah mengirimkan, aplikasi akan:
        1.  Menyimpan detail prospek (nama, nomor, mobil yang diminati) ke `localStorage`.
        2.  Membuka tab baru yang mengarahkan ke `wa.me` dengan pesan yang sudah diisi sebelumnya untuk memulai percakapan.

3.  **Halaman Admin:**
    *   Akan ada halaman `admin.html` yang terpisah dan dilindungi (di masa depan).
    *   **Fitur Halaman Admin:**
        *   **Melihat Prospek:** Menampilkan daftar semua prospek yang dikumpulkan dari formulir "Tanya Detail".
        *   **Mengelola Inventaris Mobil:** Antarmuka untuk **menambah**, **mengedit**, dan **menghapus** daftar mobil. Perubahan ini akan langsung memengaruhi `localStorage` dan, akibatnya, apa yang ditampilkan di halaman utama.

## Rencana Implementasi Saat Ini

**Tugas:** Mengintegrasikan fungsionalitas jual beli mobil ke dalam template Oberlo.

**Langkah-langkah Selanjutnya:**

1.  **Buat `main.js` untuk Data Mobil:** Inisialisasi data mobil dalam array JavaScript dan simpan ke `localStorage`.
2.  **Render Mobil Secara Dinamis:** Ganti bagian mobil statis di `index.html` dengan kontainer kosong. Gunakan JavaScript untuk mengisi kontainer ini dengan data dari `localStorage`.
3.  **Buat Modal & Logika WhatsApp:** Tambahkan HTML modal ke `index.html` dan tulis skrip untuk menangani pembukaan modal dan pengiriman formulir ke WhatsApp.
4.  **Buat Halaman Admin `admin.html` & `admin.js`:** Bangun antarmuka untuk melihat prospek dan mengelola inventaris mobil.
