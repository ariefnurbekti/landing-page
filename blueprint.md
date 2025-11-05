# Proyek Jual Beli Mobil "Oberlo"

## Ikhtisar

Proyek ini menggabungkan desain visual dari template "Oberlo" dengan fungsionalitas aplikasi jual beli mobil bekas yang dibuat khusus. Tujuannya adalah untuk menciptakan platform yang menarik secara visual bagi pengguna untuk menelusuri daftar mobil dan bagi admin untuk mengelola inventaris dan prospek.

## Desain & Struktur (Basis: Oberlo)

- **Struktur File:** Proyek akan mempertahankan struktur file asli dari template Oberlo (`index.html`, `css/`, `images/`, `js/`).
- **Tampilan Visual:** Akan mempertahankan estetika modern, palet warna, dan tipografi dari template Oberlo untuk memastikan pengalaman pengguna premium.
- **Responsif:** Desain akan tetap sepenuhnya responsif untuk perangkat seluler dan desktop.

## Fungsionalitas Inti (Aplikasi Jual Beli Mobil)

1.  **Daftar Stok Mobil (`stock.html`):**
    *   Halaman `stock.html` berfungsi sebagai galeri utama untuk semua mobil yang tersedia.
    *   Daftar mobil tidak lagi statis di HTML, melainkan dimuat secara dinamis oleh `js/main.js` dari file data pusat, yaitu `js/stock.js`.
    *   Setiap kartu mobil menampilkan ringkasan informasi: gambar utama, nama, beberapa spesifikasi kunci (tahun, transmisi), dan harga tunai.

2.  **Halaman Detail Produk (`product-detail.html`):**
    *   **Tautan dari Halaman Stok:** Setiap kartu mobil di `stock.html` berfungsi sebagai tautan yang membuka halaman detail produk di **tab browser baru**. ID unik mobil (misalnya, `avanza`) diteruskan melalui parameter URL (`product-detail.html?car=avanza`).
    *   **Tampilan Detail Lengkap:** Halaman ini didedikasikan untuk menampilkan informasi lengkap satu mobil, yang diambil secara dinamis oleh `js/product-detail.js`. Fitur-fiturnya meliputi:
        *   **Galeri Foto:** Satu gambar utama yang besar dan beberapa gambar thumbnail yang dapat diklik untuk mengubah gambar utama.
        *   **Judul & Deskripsi:** Nama mobil yang jelas dan deskripsi singkat.
        *   **Tabel Spesifikasi:** Daftar terperinci semua spesifikasi teknis mobil (mesin, transmisi, warna, dll.).
        *   **Rincian Harga:** Menampilkan harga tunai, serta simulasi kredit dengan DP dan cicilan per bulan.
        *   **Tombol WhatsApp:** Tombol untuk menghubungi penjual langsung melalui WhatsApp dengan pesan yang sudah terisi otomatis mengenai mobil yang sedang dilihat.

3.  **Manajemen Data Terpusat (`js/stock.js`):**
    *   Semua data mobil (ID, nama, gambar, spesifikasi, harga) disimpan dalam satu file JavaScript (`js/stock.js`). Ini memudahkan pengelolaan dan pembaruan inventaris di masa mendatang.

4.  **Halaman Admin (Rencana Masa Depan):**
    *   Akan ada halaman `admin.html` yang terpisah dan dilindungi.
    *   **Fitur Halaman Admin:**
        *   **Mengelola Inventaris:** Antarmuka visual untuk **menambah**, **mengedit**, dan **menghapus** data mobil langsung di file `js/stock.js` (atau database di masa depan).

## Rencana Implementasi Saat Ini

**Tugas:** Membuat alur dari halaman stok ke halaman detail produk yang dinamis.

**Langkah-langkah yang Telah Selesai:**

1.  **Buat `product-detail.html`:** Membuat file HTML baru sebagai template untuk halaman detail produk.
2.  **Buat `js/product-detail.js`:** Menulis skrip untuk mengambil data mobil dari URL, memuat detail dari `stock.js`, dan menampilkannya di halaman `product-detail.html`.
3.  **Perbarui `js/stock.js`:** Mengubah struktur data mobil untuk menyertakan ID unik, beberapa gambar untuk galeri, dan spesifikasi yang lebih detail.
4.  **Tulis Ulang `js/main.js`:** Menghapus logika modal lama dan menggantinya dengan fungsi untuk memuat mobil dari `stock.js` dan membuat kartu tautan yang mengarah ke halaman detail.
5.  **Perbarui `stock.html`:** Memastikan kontainer siap untuk diisi oleh `js/main.js`.