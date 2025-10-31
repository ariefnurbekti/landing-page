# Blueprint Aplikasi: Website Jual Beli Mobil Bekas

## 1. Ikhtisar & Tujuan

Aplikasi ini adalah sebuah *landing page* modern dan responsif untuk bisnis jual beli mobil bekas. Tujuannya adalah untuk menarik calon pembeli dengan menampilkan stok mobil yang tersedia secara profesional dan menyediakan cara yang mudah bagi mereka untuk menghubungi penjual melalui WhatsApp.

## 2. Struktur Proyek

```
/
|-- index.html       # Halaman utama untuk pengunjung
|-- style.css        # File styling utama
|-- main.js          # Logika interaktif utama (filter, modal, dll.)
|-- admin.html       # Halaman admin untuk mengelola mobil dan leads
|-- admin.js         # Logika untuk halaman admin
|-- blueprint.md     # Dokumentasi ini
|-- README.md
|-- GEMINI.md
```

## 3. Desain & Gaya (Cascading Style Sheets)

### Palet Warna
- **Primary Text & Backgrounds**: `#222831` (Charcoal), `#3A4750` (Dark Gray), `#EEEEEE` (Light Gray)
- **Aksen & CTA**: `#F9A826` (Golden Yellow)
- **WhatsApp Green**: `#25D366`

### Tipografi
- **Headings**: 'Poppins', `font-weight: 700` - Tegas dan modern.
- **Body/Paragraph**: 'Lato', `font-weight: 400` - Mudah dibaca dan bersih.

### Komponen UI
- **Header**: Tetap di atas (sticky) dengan navigasi yang jelas.
- **Tombol (CTA)**: Latar belakang gelap (`#222831`), teks terang, dengan efek *hover* yang halus.
- **Kartu Mobil (Car Card)**: Menggunakan Shadow DOM untuk enkapsulasi. Memiliki efek *lift* saat di-hover. Setiap kartu menampilkan gambar, nama, harga, deskripsi singkat, dan tombol "Tanya Detail".
- **Modal Lead Capture**: Tampilan *overlay* gelap dengan konten modal di tengah. Responsif dan memiliki tombol tutup yang jelas.
- **Tombol CTA Melayang**: Ikon WhatsApp di pojok kanan bawah, tetap terlihat saat halaman di-scroll.

## 4. Fitur & Fungsionalitas (JavaScript)

### Halaman Utama (`main.js`)

1.  **Penyimpanan Data Mobil**: 
    *   Data mobil disimpan di `localStorage` untuk persistensi.
    *   Saat aplikasi pertama kali dimuat, jika `localStorage` kosong, data akan diisi dengan daftar mobil awal (`initialCars`).
    *   Ini memungkinkan data mobil dikelola secara dinamis melalui halaman admin.

2.  **Render Daftar Mobil**: 
    *   Menggunakan **Web Components** (`<car-card>`) untuk merender setiap mobil.
    *   Setiap kartu mobil adalah *custom element* dengan *Shadow DOM*, memastikan gaya dan perilakunya terenkapsulasi dan tidak berkonflik dengan bagian lain dari halaman.

3.  **Filter Mobil**: 
    *   Pengguna dapat memfilter mobil berdasarkan **Merek** (Toyota, Honda, dll.) dan **Tipe** (SUV, MPV, dll.).
    *   Filter bekerja secara *real-time* tanpa perlu me-reload halaman.

4.  **Modal & Lead Capture**: 
    *   **Pemicu Modal**: Modal akan muncul saat:
        1.  Pengguna mengklik tombol "Tanya Detail" pada salah satu kartu mobil.
        2.  Pengguna mengklik tombol CTA WhatsApp yang melayang.
    *   **Pengisian Informasi**: Saat modal terbuka dari kartu mobil, informasi mobil tersebut (mis: "Toyota Avanza G 2022") akan disimpan sementara untuk dimasukkan ke dalam pesan WhatsApp.
    *   **Pengiriman Formulir**:
        1.  Pengguna memasukkan Nama dan Nomor WhatsApp.
        2.  Nomor WhatsApp divalidasi dan diformat ke format internasional (`62...`).
        3.  Informasi *lead* (Nama, WhatsApp, Mobil yang Diminati, Timestamp) disimpan sebagai objek JSON di `localStorage` dengan *key* `leads`.
        4.  Sebuah tab baru akan terbuka dengan URL `https://wa.me/...` yang berisi pesan otomatis. Contoh: "Halo, saya Budi. Saya tertarik dengan mobil Toyota Avanza G 2022."
        5.  Modal akan tertutup dan formulir akan di-reset.

### Halaman Admin (`admin.js`)

1.  **Otentikasi**: (Untuk versi masa depan) - Saat ini, halaman admin dapat diakses langsung, tetapi dapat diamankan dengan login sederhana jika diperlukan.

2.  **Tampilan Leads**: 
    *   Membaca semua data dari `localStorage` dengan *key* `leads`.
    *   Menampilkan semua *lead* yang masuk dalam format tabel yang mudah dibaca, diurutkan dari yang terbaru.

3.  **Manajemen Mobil**: 
    *   Menampilkan semua mobil dari `localStorage` dengan *key* `cars`.
    *   Menyediakan formulir untuk **Menambah**, **Mengedit**, atau **Menghapus** data mobil.
    *   Setiap perubahan akan langsung memperbarui data di `localStorage`, sehingga perubahan tersebut langsung terlihat di halaman utama.

## 5. Rencana Implementasi Saat Ini

- **[✔]** Buat `blueprint.md`.
- **[✔]** Tambahkan struktur HTML untuk modal dan tombol CTA melayang di `index.html`.
- **[✔]** Tambahkan CSS untuk modal, formulir, dan tombol CTA di `style.css`.
- **[✔]** Buat `admin.html` untuk menampilkan leads dan form manajemen mobil.
- **[✔]** Buat `admin.js` untuk mengelola data di `localStorage`.
- **[✔]** Implementasikan semua logika di `main.js`: manajemen data via `localStorage`, logika modal, penanganan formulir, dan pengalihan ke WhatsApp.
