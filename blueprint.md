
# Blueprint: Landing Page Jualan Mobil Bekas

## Ikhtisar Aplikasi

**Tujuan:** Membuat landing page yang sangat efektif untuk menjual mobil bekas. Fokus utamanya adalah untuk menghasilkan prospek (leads) berkualitas tinggi dan mendorong konversi (misalnya, permintaan informasi, test drive, atau penjualan langsung).

**Target Pengguna:** Calon pembeli mobil bekas yang mencari kendaraan berkualitas dengan harga bersaing secara online.

## Desain & Gaya (Berfokus pada Konversi)

Landing page ini akan mengadopsi desain yang modern, profesional, dan dapat dipercaya untuk memberikan kesan pertama yang kuat.

1.  **Palet Warna:**
    *   **Utama:** Abu-abu gelap (`#222831`) dan Biru Laut (`#3A4750`) untuk menciptakan nuansa premium dan dapat dipercaya.
    *   **Aksen (CTA):** Oranye Terang (`#F9A826`) untuk tombol *Call-to-Action* (CTA) agar menonjol dan menarik perhatian.
    *   **Teks & Latar Belakang:** Putih (`#FFFFFF`) dan abu-abu muda (`#EEEEEE`) untuk keterbacaan maksimal dan tampilan yang bersih.

2.  **Tipografi:**
    *   **Judul:** `Poppins`, Bold - Font yang modern dan mudah dibaca, memberikan kesan tegas dan jelas.
    *   **Teks Umum:** `Lato`, Regular - Sangat mudah dibaca untuk deskripsi dan informasi detail.

3.  **Visual:**
    *   **Ikonografi:** Menggunakan ikon yang bersih dan modern (misalnya, dari Font Awesome) untuk menyoroti fitur utama seperti "Mesin Terinspeksi", "Garansi", "Bebas Banjir".
    *   **Gambar:** Gambar mobil berkualitas tinggi dengan latar belakang yang bersih. Akan menggunakan placeholder gambar yang relevan.
    *   **Efek Visual:** Efek *hover* pada kartu mobil dan tombol, serta bayangan lembut (`drop-shadow`) untuk memberikan kedalaman dan nuansa interaktif.

## Struktur & Fitur Halaman

Struktur halaman dirancang secara strategis untuk memandu pengguna dari titik awal hingga konversi.

1.  **Header & Navigasi:**
    *   Logo di sebelah kiri.
    *   Menu navigasi sederhana: `Beranda`, `Stok Mobil`, `Mengapa Kami?`, `Hubungi Kami`.
    *   Navigasi akan tetap terlihat (*sticky*) saat menggulir.

2.  **Hero Section:**
    *   **Headline Kuat:** "Temukan Mobil Bekas Impian Anda: Terinspeksi, Bergaransi, dan Harga Terbaik."
    *   **Sub-headline:** "Kami menyediakan mobil bekas berkualitas yang telah melewati 150+ titik inspeksi profesional."
    *   **CTA Utama:** Tombol besar berwarna oranye dengan teks "Lihat Stok Mobil".
    *   **Gambar Latar:** Gambar mobil yang menarik dan berkualitas tinggi.

3.  **Bagian Keunggulan ("Mengapa Memilih Kami?"):**
    *   Menggunakan layout berbasis ikon untuk menyoroti 3-4 keunggulan utama.
    *   Contoh:
        *   **Inspeksi Profesional:** "Setiap mobil telah lulus inspeksi ketat."
        *   **Harga Transparan:** "Tidak ada biaya tersembunyi."
        *   **Garansi Mesin:** "Garansi hingga 1 tahun untuk ketenangan Anda."
        *   **Proses Cepat & Mudah:** "Bawa pulang mobil impian Anda dalam 24 jam."

4.  **Bagian Stok Mobil (Fitur Utama):**
    *   Judul: "Stok Pilihan Minggu Ini".
    *   **Filter/Pencarian Sederhana:** Opsi untuk filter berdasarkan Merek (Toyota, Honda, dll.) dan Tipe (SUV, Sedan, dll.).
    *   **Kartu Mobil (Web Component `car-card`):**
        *   Gambar mobil.
        *   Nama mobil dan tahun.
        *   Info utama: Kilometer, Transmisi (Matic/Manual), Bahan Bakar.
        *   Harga yang jelas.
        *   Tombol CTA "Lihat Detail" atau "Hubungi via WhatsApp".

5.  **Bagian Testimoni Pelanggan:**
    *   Menampilkan 2-3 kutipan testimoni dari pelanggan yang puas.
    *   Termasuk nama dan foto (opsional) untuk membangun kepercayaan sosial (*social proof*).

6.  **Formulir Kontak (Lead Capture):**
    *   Judul yang mengajak: "Dapatkan Penawaran Spesial" atau "Jadwalkan Test Drive".
    *   Formulir sederhana: Nama, Nomor WhatsApp, dan Mobil yang Diminati (opsional).
    *   Tombol submit yang jelas dengan teks "Kirim Sekarang".

7.  **Footer:**
    *   Informasi kontak lengkap: Alamat, Nomor Telepon, Email.
    *   Tautan ke media sosial.
    *   Hak cipta.

## Rencana Implementasi

1.  **Tahap 1: Struktur HTML & Blueprint**
    *   Buat `blueprint.md` (Selesai).
    *   Inisialisasi `index.html` dengan struktur semantik (menggunakan tag `<header>`, `<main>`, `<section>`, `<footer>`).
    *   Siapkan link untuk CSS dan JavaScript.

2.  **Tahap 2: Styling dengan CSS**
    *   Implementasikan desain visual yang telah direncanakan di `style.css`.
    *   Gunakan CSS Variables untuk warna dan font agar mudah dikelola.
    *   Terapkan layout responsif menggunakan Flexbox dan Grid.
    *   Tambahkan efek visual (hover, shadow).

3.  **Tahap 3: Interaktivitas dengan JavaScript**
    *   Buat Web Component `<car-card>` di `main.js` untuk menampilkan mobil secara dinamis dan modular.
    *   Tambahkan *event listener* untuk fungsionalitas filter.
    *   Implementasikan navigasi *smooth scroll*.

4.  **Tahap 4: Finalisasi & Review**
    *   Isi konten (teks dan gambar placeholder).
    *   Lakukan pengecekan error di konsol.
    *   Pastikan semua CTA berfungsi dan halaman sepenuhnya responsif di berbagai perangkat.
