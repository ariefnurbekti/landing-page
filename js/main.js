document.addEventListener('DOMContentLoaded', function () {
    const pageContainer = document.querySelector('.models_section .container');

    // Keluar jika kita tidak di halaman stok (atau jika data mobil tidak ada)
    if (!pageContainer || !window.carStock) {
        return;
    }

    const ALL_CARS = window.carStock;
    let currentSearchTerm = ''; // Menyimpan istilah pencarian terakhir

    // --- Fungsi Utama untuk Merender Halaman Daftar Mobil ---
    function renderCarListPage(searchTerm = '') {
        currentSearchTerm = searchTerm.toLowerCase();
        const carsToRender = ALL_CARS.filter(car =>
            car.name.toLowerCase().includes(currentSearchTerm)
        );

        // 1. Bangun bagian statis dari halaman (Judul, Search Bar)
        let pageHtml = `
            <h1 class="models_taital">Our Stock</h1>
            <div class="search_form_container">
               <input type="text" id="searchInput" class="form-control" placeholder="Cari mobil berdasarkan nama..." value="${searchTerm}">
            </div>
            <div id="car-list-container" class="row mt-4">
        `;

        // 2. Bangun daftar mobil dinamis
        if (carsToRender.length > 0) {
            carsToRender.forEach((car) => {
                pageHtml += `
                    <div class="col-sm-6 col-md-4 mb-4">
                        <div class="models_box" style="cursor: pointer;" onclick="renderDetailView('${car.id}')">
                            <div class="models_box_img">
                               <img src="${car.images[0]}" alt="${car.name}">
                            </div>
                            <h4 class="car-name">${car.name}</h4>
                            <p class="car-specs">${car.specs.Tahun} | ${car.specs.Transmisi}</p>
                            <p class="car-price">Rp ${car.price.cash.toLocaleString('id-ID')}</p>
                            <a href="#" onclick="renderDetailView('${car.id}'); return false;" class="tanya-btn btn btn-warning btn-block">Lihat Detail</a>
                        </div>
                    </div>`;
            });
        } else {
            pageHtml += '<div class="col-12"><p class="text-center mt-4">Mobil yang cocok dengan pencarian tidak ditemukan.</p></div>';
        }

        pageHtml += '</div>'; // Menutup car-list-container

        // 3. Render HTML dan pasang kembali listener
        pageContainer.innerHTML = pageHtml;
        attachSearchListener();
    }

    // --- Fungsi untuk Merender Tampilan Detail ---
    window.renderDetailView = function(carId) {
        const car = ALL_CARS.find(c => c.id === carId);
        if (!car) return;

        let thumbnails = car.images.map((img, index) => `<img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="document.getElementById('main-image').src='${img}'; document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active')); this.classList.add('active');">`).join('');
        const gallery = `
            <img src="${car.images[0]}" id="main-image" alt="${car.name}">
            <div id="thumbnail-gallery">${thumbnails}</div>
        `;
        let specs = Object.entries(car.specs).map(([key, value]) => `<tr><td>${key.replace(/_/g, ' ')}</td><td>${value}</td></tr>`).join('');
        const specTable = `<table class="spec-table"><tbody>${specs}</tbody></table>`;

        pageContainer.innerHTML = `
            <div id="car-detail-container">
                 <button id="back-to-list-btn" class="btn btn-dark mb-4">&laquo; Kembali ke Daftar</button>
                 <div class="detail-container">
                    <div class="detail-left">${gallery}</div>
                    <div class="detail-right">
                        <h1>${car.name}</h1>
                        <p class="car-price">Rp ${car.price.cash.toLocaleString('id-ID')}</p>
                        <h4 class="mt-4">Spesifikasi</h4>
                        ${specTable}
                    </div>
                 </div>
            </div>`;

        // Pasang listener untuk tombol kembali, dengan mempertahankan istilah pencarian
        document.getElementById('back-to-list-btn').addEventListener('click', () => {
            renderCarListPage(currentSearchTerm);
        });
    }

    // --- Helper untuk memasang listener pencarian ---
    function attachSearchListener() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keyup', function() {
                renderCarListPage(searchInput.value);
            });
        }
    }

    // --- Pemuatan Awal ---
    renderCarListPage();
});
