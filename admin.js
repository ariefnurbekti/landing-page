document.addEventListener('DOMContentLoaded', () => {
    const carForm = document.getElementById('car-form');
    const carListContainer = document.getElementById('car-list-container');
    const leadsTableContainer = document.getElementById('leads-table-container');
    const clearFormBtn = document.getElementById('clear-form-btn');
    
    const carIdField = document.getElementById('car-id');
    const carBrandField = document.getElementById('car-brand');
    const carModelField = document.getElementById('car-model');
    const carYearField = document.getElementById('car-year');
    const carPriceField = document.getElementById('car-price');
    const carTypeField = document.getElementById('car-type');
    const carImageField = document.getElementById('car-image');
    const carDescriptionField = document.getElementById('car-description');

    // --- DATA MANAGEMENT ---
    const getCars = () => JSON.parse(localStorage.getItem('cars') || '[]');
    const saveCars = (cars) => localStorage.setItem('cars', JSON.stringify(cars));
    const getLeads = () => JSON.parse(localStorage.getItem('leads') || '[]');

    // --- RENDER FUNCTIONS ---
    const renderCarList = () => {
        const cars = getCars();
        if (cars.length === 0) {
            carListContainer.innerHTML = '<p>Belum ada mobil di dalam database.</p>';
            return;
        }

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Merek & Model</th>
                    <th>Tahun</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                ${cars.map(car => `
                    <tr data-id="${car.id}">
                        <td>${car.brand} ${car.model}</td>
                        <td>${car.year}</td>
                        <td>${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(car.price)}</td>
                        <td>
                            <button class="admin-button edit-btn">Edit</button>
                            <button class="admin-button delete-button delete-btn">Hapus</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        carListContainer.innerHTML = '';
        carListContainer.appendChild(table);
    };

    const renderLeads = () => {
        const leads = getLeads().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort newest first
        if (leads.length === 0) {
            leadsTableContainer.innerHTML = '<p>Belum ada leads yang masuk.</p>';
            return;
        }

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Waktu</th>
                    <th>Nama</th>
                    <th>WhatsApp</th>
                    <th>Mobil yang Diminati</th>
                </tr>
            </thead>
            <tbody>
                ${leads.map(lead => `
                    <tr>
                        <td>${new Date(lead.timestamp).toLocaleString('id-ID')}</td>
                        <td>${lead.name}</td>
                        <td><a href="https://wa.me/${lead.whatsapp}" target="_blank">${lead.whatsapp}</a></td>
                        <td>${lead.carInfo || 'Tidak spesifik'}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        leadsTableContainer.innerHTML = '';
        leadsTableContainer.appendChild(table);
    };

    // --- FORM & CAR MANIPULATION LOGIC ---
    const clearForm = () => {
        carForm.reset();
        carIdField.value = '';
        carForm.querySelector('.save-button').textContent = 'Simpan Mobil';
    };

    carForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let cars = getCars();
        const carId = carIdField.value;
        
        const carData = {
            brand: carBrandField.value,
            model: carModelField.value,
            year: parseInt(carYearField.value),
            price: parseInt(carPriceField.value),
            type: carTypeField.value,
            image: carImageField.value,
            description: carDescriptionField.value,
        };

        if (carId) { // Editing existing car
            cars = cars.map(car => car.id === carId ? { ...car, ...carData } : car);
        } else { // Adding new car
            carData.id = `car-${Date.now()}`;
            cars.push(carData);
        }
        
        saveCars(cars);
        renderCarList();
        clearForm();
    });

    carListContainer.addEventListener('click', (e) => {
        const carId = e.target.closest('tr')?.dataset.id;
        if (!carId) return;

        if (e.target.classList.contains('delete-btn')) {
            if (confirm('Apakah Anda yakin ingin menghapus mobil ini?')) {
                let cars = getCars();
                cars = cars.filter(car => car.id !== carId);
                saveCars(cars);
                renderCarList();
            }
        }

        if (e.target.classList.contains('edit-btn')) {
            const carToEdit = getCars().find(car => car.id === carId);
            if (carToEdit) {
                carIdField.value = carToEdit.id;
                carBrandField.value = carToEdit.brand;
                carModelField.value = carToEdit.model;
                carYearField.value = carToEdit.year;
                carPriceField.value = carToEdit.price;
                carTypeField.value = carToEdit.type;
                carImageField.value = carToEdit.image;
                carDescriptionField.value = carToEdit.description;
                carForm.querySelector('.save-button').textContent = 'Update Mobil';
                carForm.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    clearFormBtn.addEventListener('click', clearForm);

    // --- INITIAL RENDER ---
    renderCarList();
    renderLeads();
});
