
document.addEventListener('DOMContentLoaded', function () {

    let currentlyInquiredCarId = null;

    // --- Langkah 2: Menyiapkan Data Mobil ---
    function initializeCarData() {
        const carsInStorage = localStorage.getItem('cars');
        if (!carsInStorage) {
            const initialCars = [
                { id: 1, name: 'Carolo car', year: 2023, price: 30000.00, image: 'images/img-1.png', description: 'Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur' },
                { id: 2, name: 'New Carolo car', year: 2024, price: 35000.00, image: 'images/img-2.png', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { id: 3, name: 'Classic Carolo', year: 2022, price: 28000.00, image: 'images/img-3.png', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
            ];
            localStorage.setItem('cars', JSON.stringify(initialCars));
            console.log('Data mobil awal telah dimuat ke localStorage.');
        } else {
            console.log('Data mobil sudah ada di localStorage.');
        }
    }

    // --- Langkah 3: Merender Mobil Secara Dinamis ---
    function renderCars() {
        const carListingsContainer = document.getElementById('car-listings-container');
        const cars = JSON.parse(localStorage.getItem('cars')) || [];

        if (!carListingsContainer) return; // Guard clause

        if (cars.length === 0) {
            carListingsContainer.innerHTML = '<p class="text-center">Tidak ada mobil yang tersedia saat ini.</p>';
            return;
        }

        let carHtml = '';
        cars.forEach((car, index) => {
            const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(car.price);
            const carDetailsHtml = `
                <h3 class="carolo_text"><span class="number_text">0${car.id}</span> ${car.name}</h3>
                <p class="ullamco_text">${car.description}</p>
                <div class="price_main">
                    <p class="price_text"><span style="color: #fc9d22;">Price</span> ${formattedPrice}</p>
                    <div class="read_btn">
                        <a href="#" class="ask-detail-btn" data-toggle="modal" data-target="#inquiryModal" data-car-id="${car.id}">Tanya Detail<span class="arrow_icon"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span></a>
                    </div>
                </div>
            `;
            const carImageHtml = `<div class="models_img"><img src="${car.image}"></div>`;

            if (index % 2 === 0) {
                carHtml += `<div class="models_section_2"><div class="row"><div class="col-md-6">${carImageHtml}</div><div class="col-md-6">${carDetailsHtml}</div></div></div>`;
            } else {
                carHtml += `<div class="models_section_2"><div class="row"><div class="col-md-6">${carDetailsHtml}</div><div class="col-md-6">${carImageHtml}</div></div></div>`;
            }
        });

        carListingsContainer.innerHTML = carHtml;
        console.log('Daftar mobil telah dirender secara dinamis.');
    }

    // --- Langkah 4: Logika Modal dan Pengiriman WhatsApp ---
    function setupModalLogic() {
        // Menyimpan ID mobil saat modal akan ditampilkan
        $('#inquiryModal').on('show.bs.modal', function (event) {
            const button = $(event.relatedTarget); // Tombol yang memicu modal
            currentlyInquiredCarId = button.data('car-id'); // Ambil ID mobil dari data-* attribute
            console.log("Modal dibuka untuk mobil ID:", currentlyInquiredCarId);
        });

        // Menangani pengiriman formulir
        const inquiryForm = document.getElementById('inquiryForm');
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const customerName = document.getElementById('customerName').value;
                const customerWaNumber = document.getElementById('customerWaNumber').value;
                const cars = JSON.parse(localStorage.getItem('cars')) || [];
                const inquiredCar = cars.find(car => car.id === currentlyInquiredCarId);

                if (!inquiredCar) {
                    alert('Error: Mobil tidak ditemukan!');
                    return;
                }

                // Simpan Prospek ke localStorage
                const leads = JSON.parse(localStorage.getItem('leads')) || [];
                const newLead = {
                    id: Date.now(), // ID unik berdasarkan waktu
                    carId: inquiredCar.id,
                    carName: inquiredCar.name,
                    customerName: customerName,
                    customerWaNumber: customerWaNumber,
                    date: new Date().toISOString()
                };
                leads.push(newLead);
                localStorage.setItem('leads', JSON.stringify(leads));

                // Buat dan kirim pesan WhatsApp
                const message = `Halo, saya tertarik dengan mobil ${inquiredCar.name} (Tahun ${inquiredCar.year}). Mohon info lebih lanjut. Nama saya ${customerName}.`;
                const whatsappUrl = `https://wa.me/${customerWaNumber}?text=${encodeURIComponent(message)}`;
                
                window.open(whatsappUrl, '_blank');
                
                console.log("Prospek baru disimpan:", newLead);
                alert("Terima kasih! Mengalihkan ke WhatsApp...");

                // Reset form dan tutup modal
                inquiryForm.reset();
                $('#inquiryModal').modal('hide');
            });
        }
    }

    // Panggil semua fungsi inisialisasi
    initializeCarData();
    renderCars();
    setupModalLogic();
});
