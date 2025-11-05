document.addEventListener('DOMContentLoaded', function () {

    const cars = window.carStock; 
    const layoutContainer = document.querySelector('.models_section.layout_padding .container');

    if (!layoutContainer) {
        console.error('Container layout utama tidak ditemukan.');
        return;
    }

    // Fungsi untuk menampilkan daftar mobil
    function renderCarList() {
        // Hapus konten lama dan siapkan container baru
        layoutContainer.innerHTML = `
            <div class="row">
               <div class="col-md-12">
                  <h1 class="models_taital">Our Stock Cars</h1>
               </div>
            </div>
            <div id="car-listings-container">
               <!-- Konten dinamis -->
            </div>
        `;

        const carListingsContainer = document.getElementById('car-listings-container');
        if (!cars || cars.length === 0) {
            carListingsContainer.innerHTML = '<p class="text-center">Tidak ada mobil tersedia.</p>';
            return;
        }

        let carHtml = '';
        cars.forEach((car) => {
            // Ganti onclick untuk memanggil fungsi renderDetailView
            const carCard = `
                <div class="models_section_2" style="cursor: pointer;" onclick="renderDetailView('${car.id}')">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="models_img"><img src="${car.images[0]}" alt="${car.name}"></div>
                        </div>
                        <div class="col-md-6">
                            <h3 class="carolo_text">${car.name}</h3>
                            <p class="ullamco_text">${car.specs.Tahun} | ${car.specs.Transmisi} | ${car.specs.Bahan_Bakar}</p>
                            <div class="price_main">
                                <p class="price_text"><span style="color: #fc9d22;">Harga Tunai</span> Rp ${car.price.cash.toLocaleString('id-ID')}</p>
                                <div class="read_btn">Lihat Detail Lengkap <span class="arrow_icon"><i class="fa fa-long-arrow-right"></i></span></div>
                            </div>
                        </div>
                    </div>
                </div>`;
            carHtml += carCard;
        });
        carListingsContainer.innerHTML = carHtml;
    }

    // Fungsi untuk menampilkan detail mobil (menggantikan halaman baru)
    window.renderDetailView = function(carId) {
        const car = cars.find(c => c.id === carId);
        if (!car) {
            console.error('Data mobil tidak ditemukan!');
            layoutContainer.innerHTML = '<p class="text-center">Mobil tidak ditemukan. <a href="#" onclick="renderCarList(); return false;">Kembali ke daftar</a></p>';
            return;
        }

        // Buat HTML untuk galeri gambar
        let imageGalleryHtml = '';
        if (car.images && car.images.length > 0) {
            imageGalleryHtml = `
                <div class="main_image_container mb-3">
                    <img src="${car.images[0]}" id="main-car-image" class="img-fluid w-100" alt="Main car image">
                </div>
                <div class="thumbnail_container d-flex flex-wrap">`;
            car.images.forEach(img => {
                imageGalleryHtml += `<img src="${img}" class="img-thumbnail m-1" style="width: 100px; height: auto; cursor: pointer;" onclick="document.getElementById('main-car-image').src='${img}'">`;
            });
            imageGalleryHtml += '</div>';
        }

        // Buat HTML untuk spesifikasi
        let specsHtml = '<ul class="list-group list-group-flush"> ';
        for (const [key, value] of Object.entries(car.specs)) {
            specsHtml += `<li class="list-group-item d-flex justify-content-between align-items-center"><strong>${key.replace(/_/g, ' ')}</strong><span>${value}</span></li>`;
        }
        specsHtml += '</ul>';

        // Ganti konten utama dengan tampilan detail
        layoutContainer.innerHTML = `
            <div class="row">
                <div class="col-12 mb-3">
                     <button class="btn btn-dark" onclick="renderCarList()">&laquo; Kembali ke Daftar</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-7">${imageGalleryHtml}</div>
                <div class="col-md-5">
                    <h2 class="font-weight-bold">${car.name}</h2>
                    <div class="price_main_detail my-3">
                        <h3 class="font-weight-bold text-success">Rp ${car.price.cash.toLocaleString('id-ID')}</h3>
                        <p class="text-muted">Harga Tunai</p>
                    </div>
                    <h4 class="mt-4">Spesifikasi Lengkap</h4>
                    ${specsHtml}
                </div>
            </div>
        `;
    }

    // Render daftar mobil saat halaman pertama kali dimuat
    renderCarList();

});
