document.getElementById('add-car-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const car = {
        id: `car-${Date.now()}`,
        brand: document.getElementById('car-brand').value,
        model: document.getElementById('car-model').value,
        year: parseInt(document.getElementById('car-year').value),
        price: parseInt(document.getElementById('car-price').value),
        type: document.getElementById('car-type').value,
        image: document.getElementById('car-image').value,
        description: document.getElementById('car-description').value,
    };

    // Retrieve existing cars from localStorage or initialize an empty array
    const cars = JSON.parse(localStorage.getItem('cars')) || [];

    // Add the new car to the array
    cars.push(car);

    // Save the updated array back to localStorage
    localStorage.setItem('cars', JSON.stringify(cars));

    // Provide feedback to the user
    const feedback = document.getElementById('feedback-message');
    feedback.textContent = `Mobil ${car.brand} ${car.model} berhasil ditambahkan!`;

    // Reset the form
    e.target.reset();

    // Clear the message after 3 seconds
    setTimeout(() => {
        feedback.textContent = '';
    }, 3000);
});
