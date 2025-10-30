class CarCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const car = JSON.parse(this.getAttribute('data-car'));

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                :host(:hover) {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
                }
                .card-image img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .card-content {
                    padding: 20px;
                }
                h3 {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.4rem;
                    margin: 0 0 10px 0;
                    color: #222831;
                }
                .price {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #F9A826;
                    margin-bottom: 15px;
                }
                .details {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    font-size: 0.9rem;
                    color: #555;
                    margin-bottom: 20px;
                }
                .details span {
                    padding: 5px 10px;
                    background: #f4f4f4;
                    border-radius: 5px;
                }
                .cta-button {
                    display: inline-block;
                    background-color: #F9A826;
                    color: #222831;
                    padding: 10px 20px;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 700;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
                .cta-button:hover {
                    background-color: #ffb74d;
                }
            </style>
            <div class="card-container">
                <div class="card-image">
                    <img src="${car.image}" alt="${car.name}">
                </div>
                <div class="card-content">
                    <h3>${car.name}</h3>
                    <div class="price">${car.price}</div>
                    <div class="details">
                        <span>${car.details.mileage}</span>
                        <span>${car.details.transmission}</span>
                        <span>${car.details.fuel}</span>
                    </div>
                    <a href="#contact" class="cta-button">Hubungi Sales</a>
                </div>
            </div>
        `;
    }
}

customElements.define('car-card', CarCard);

// Sample Car Data
const cars = [
    {
        id: 1, name: 'Toyota Avanza G 2022',
        price: 'Rp 210.000.000',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
        brand: 'toyota', type: 'mpv',
        details: { mileage: '15.000 km', transmission: 'Manual', fuel: 'Bensin' }
    },
    {
        id: 2, name: 'Honda Brio RS 2023',
        price: 'Rp 190.000.000',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
        brand: 'honda', type: 'sedan',
        details: { mileage: '5.000 km', transmission: 'Otomatis', fuel: 'Bensin' }
    },
    {
        id: 3, name: 'Suzuki Ertiga GL 2021',
        price: 'Rp 185.000.000',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
        brand: 'suzuki', type: 'mpv',
        details: { mileage: '25.000 km', transmission: 'Otomatis', fuel: 'Bensin' }
    },
    {
        id: 4, name: 'Toyota Fortuner VRZ 2020',
        price: 'Rp 450.000.000',
        image: 'https://images.unsplash.com/photo-1616422285422-092f7842a5a2?q=80&w=2072&auto=format&fit=crop',
        brand: 'toyota', type: 'suv',
        details: { mileage: '35.000 km', transmission: 'Otomatis', fuel: 'Diesel' }
    },
     {
        id: 5, name: 'Honda CR-V Prestige 2022',
        price: 'Rp 550.000.000',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
        brand: 'honda', type: 'suv',
        details: { mileage: '12.000 km', transmission: 'Otomatis', fuel: 'Bensin' }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const carList = document.getElementById('car-list');
    const carInterestSelect = document.getElementById('car-interest');
    const brandFilter = document.getElementById('brand-filter');
    const typeFilter = document.getElementById('type-filter');

    function populateCars(filteredCars) {
        carList.innerHTML = ''; // Clear existing list
        filteredCars.forEach(car => {
            const carCard = document.createElement('car-card');
            carCard.setAttribute('data-car', JSON.stringify(car));
            carList.appendChild(carCard);
        });
    }

    function populateInterestDropdown() {
        cars.forEach(car => {
            const option = document.createElement('option');
            option.value = car.name;
            option.textContent = car.name;
            carInterestSelect.appendChild(option);
        });
    }

    function filterCars() {
        const selectedBrand = brandFilter.value;
        const selectedType = typeFilter.value;

        const filteredCars = cars.filter(car => {
            const brandMatch = selectedBrand === 'all' || car.brand === selectedBrand;
            const typeMatch = selectedType === 'all' || car.type === selectedType;
            return brandMatch && typeMatch;
        });

        populateCars(filteredCars);
    }

    // Initial population
    populateCars(cars);
    populateInterestDropdown();

    // Add event listeners for filters
    brandFilter.addEventListener('change', filterCars);
    typeFilter.addEventListener('change', filterCars);

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
