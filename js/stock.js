const carStock = [
    {
        id: 'avanza',
        name: 'Toyota Avanza',
        images: ['images/img-1.png', 'images/avanza-interior.jpg', 'images/avanza-side.jpg'], // Menggunakan gambar yang ada
        specs: {
            Tahun: '2023',
            Transmisi: 'Otomatis',
            Mesin: '1500cc',
            Bahan_Bakar: 'Bensin',
            Warna: 'Putih'
        },
        price: {
            cash: 250000000,
            credit: {
                dp: 50000000,
                installment: 5000000,
                tenor: 60
            }
        }
    },
    {
        id: 'brio',
        name: 'Honda Brio',
        images: ['images/img-2.png', 'images/brio-interior.jpg'], // Menggunakan gambar yang ada
        specs: {
            Tahun: '2022',
            Transmisi: 'Manual',
            Mesin: '1200cc',
            Bahan_Bakar: 'Bensin',
            Warna: 'Merah'
        },
        price: {
            cash: 180000000,
            credit: {
                dp: 35000000,
                installment: 3500000,
                tenor: 60
            }
        }
    },
    {
        id: 'pajero',
        name: 'Mitsubishi Pajero',
        images: ['images/img-3.png', 'images/pajero-interior.jpg'], // Menggunakan gambar yang ada
        specs: {
            Tahun: '2024',
            Transmisi: 'Otomatis',
            Mesin: '2400cc',
            Bahan_Bakar: 'Diesel',
            Warna: 'Hitam'
        },
        price: {
            cash: 600000000,
            credit: {
                dp: 120000000,
                installment: 10000000,
                tenor: 60
            }
        }
    }
];

// This makes the carStock available to other scripts
window.carStock = carStock;
