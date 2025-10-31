document.addEventListener('DOMContentLoaded', () => {

    // --- DATA HANDLING ---
    const initialCars = [
        {
            id: 'car-1678886400000', brand: 'toyota', model: 'Avanza G', year: 2022, price: 210000000, type: 'mpv',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop', description: 'KM 15.000, servis rutin, tangan pertama.'
        },
        {
            id: 'car-1678886400001', brand: 'honda', model: 'Brio RS', year: 2023, price: 190000000, type: 'hatchback',
            image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop', description: 'Warna langka, kondisi seperti baru, pemakaian dalam kota.'
        },
        {
            id: 'car-1678886400002', brand: 'suzuki', model: 'Ertiga GL', year: 2021, price: 185000000, type: 'mpv',
            image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop', description: 'Irit BBM, kabin luas, cocok untuk keluarga.'
        },
        {
            id: 'car-1678886400003', brand: 'toyota', model: 'Fortuner VRZ', year: 2020, price: 450000000, type: 'suv',
            image: 'https://images.unsplash.com/photo-1616422285422-092f7842a5a2?q=80&w=2072&auto=format&fit=crop', description: 'Gagah dan bertenaga, siap untuk segala medan.'
        },
        {
            id: 'car-1678886400004', brand: 'honda', model: 'CR-V Prestige', year: 2022, price: 550000000, type: 'suv',
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop', description: 'Fitur lengkap, sunroof, interior mewah.'
        }
    ];

    function getCars() {
        let cars = localStorage.getItem('cars');
        if (!cars) {
            localStorage.setItem('cars', JSON.stringify(initialCars));
            return initialCars;
        }
        return JSON.parse(cars);
    }

    let allCars = getCars();

    // --- MODAL & FORM LOGIC (REVISED) ---
    const leadModal = document.getElementById('lead-modal');
    const openModalBtn = document.getElementById('open-lead-form');
    const closeModalBtn = document.querySelector('.close-modal');
    const leadForm = document.getElementById('lead-form');
    const interestedCarInput = document.createElement('input');
    interestedCarInput.type = 'hidden';
    interestedCarInput.id = 'interested-car';
    leadForm.appendChild(interestedCarInput);

    const openModal = (carInfo = '') => {
        if (!leadModal) return;
        interestedCarInput.value = carInfo;
        leadModal.classList.add('active');
    };

    const closeModal = () => {
        if (!leadModal) return;
        leadModal.classList.remove('active');
        leadForm.reset();
        interestedCarInput.value = '';
    };

    openModalBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    leadModal.addEventListener('click', (e) => {
        if (e.target === leadModal) {
            closeModal();
        }
    });

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('customer-name').value;
        let whatsapp = document.getElementById('customer-whatsapp').value;
        const interestedCar = interestedCarInput.value;

        if (whatsapp.startsWith('0')) {
            whatsapp = '62' + whatsapp.substring(1);
        }

        const newLead = { name, whatsapp, interestedCar, timestamp: new Date().toISOString() };
        const leads = JSON.parse(localStorage.getItem('leads')) || [];
        leads.push(newLead);
        localStorage.setItem('leads', JSON.stringify(leads));

        let waText = `Halo, saya ${name}. Saya tertarik dengan mobil di situs Anda.`;
        if (interestedCar) {
            waText = `Halo, saya ${name}. Saya tertarik dengan mobil ${interestedCar}.`;
        }
        const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waText)}`;
        window.open(whatsappUrl, '_blank');

        closeModal();
    });


    // --- WEB COMPONENTS ---
    class CarCard extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }

        connectedCallback() {
            const car = JSON.parse(this.getAttribute('data-car'));
            const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(car.price);

            this.shadowRoot.innerHTML = `
                <style>
                    :host { display: block; background: #fff; border-radius: 12px; box-shadow: 0 6px 15px rgba(0,0,0,0.08); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; }
                    :host(:hover) { transform: translateY(-8px); box-shadow: 0 10px 25px rgba(0,0,0,0.12); }
                    .card-image img { width: 100%; height: 220px; object-fit: cover; }
                    .card-content { padding: 20px; }
                    h3 { font-family: 'Poppins', sans-serif; font-size: 1.5rem; margin: 0 0 10px 0; color: #222831; text-transform: capitalize; }
                    .price { font-size: 1.4rem; font-weight: 700; color: #F9A826; margin-bottom: 15px; }
                    .details { font-size: 0.95rem; color: #555; margin-bottom: 20px; min-height: 40px; }
                    .card-cta-button { display: inline-block; width: 100%; box-sizing: border-box; background-color: #222831; color: #EEEEEE; padding: 12px 24px; font-family: 'Poppins', sans-serif; font-weight: 700; text-decoration: none; border-radius: 8px; transition: background-color 0.3s ease; text-align: center; border: none; cursor: pointer; }
                    .card-cta-button:hover { background-color: #3A4750; }
                </style>
                <div class="card-container">
                    <div class="card-image"><img src="${car.image}" alt="${car.brand} ${car.model}"></div>
                    <div class="card-content">
                        <h3>${car.brand} ${car.model}</h3>
                        <div class="price">${formattedPrice}</div>
                        <div class="details"><p>${car.year} | ${car.description}</p></div>
                        <button class="card-cta-button">Tanya Detail</button>
                    </div>
                </div>
            `;

            this.shadowRoot.querySelector('.card-cta-button').addEventListener('click', () => {
                const carInfo = `${car.brand} ${car.model} (${car.year})`;
                openModal(carInfo);
            });
        }
    }

    if (!customElements.get('car-card')) {
        customElements.define('car-card', CarCard);
    }

    // --- APP LOGIC ---
    const carList = document.getElementById('car-list');
    const brandFilter = document.getElementById('brand-filter');
    const typeFilter = document.getElementById('type-filter');

    function populateCars(carsToDisplay) {
        if (!carList) return;
        carList.innerHTML = '';
        if (carsToDisplay.length === 0) {
            carList.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Tidak ada mobil yang cocok dengan kriteria Anda.</p>';
            return;
        }
        carsToDisplay.forEach(car => {
            const carCard = document.createElement('car-card');
            carCard.setAttribute('data-car', JSON.stringify(car));
            carList.appendChild(carCard);
        });
    }

    function filterCars() {
        const selectedBrand = brandFilter.value;
        const selectedType = typeFilter.value;
        const filteredCars = allCars.filter(car => {
            const brandMatch = selectedBrand === 'all' || car.brand === selectedBrand;
            const typeMatch = selectedType === 'all' || car.type === selectedType;
            return brandMatch && typeMatch;
        });
        populateCars(filteredCars);
    }

    // --- INITIALIZATION ---
    if (carList) {
        populateCars(allCars);
    }

    if (brandFilter && typeFilter) {
        brandFilter.addEventListener('change', filterCars);
        typeFilter.addEventListener('change', filterCars);
    }

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
