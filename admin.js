document.addEventListener('DOMContentLoaded', () => {

    // --- SECTION 1: ADD NEW CAR --- //
    const addCarForm = document.getElementById('add-car-form');
    if (addCarForm) {
        addCarForm.addEventListener('submit', function(e) {
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

            const cars = JSON.parse(localStorage.getItem('cars')) || [];
            cars.push(car);
            localStorage.setItem('cars', JSON.stringify(cars));

            const feedback = document.getElementById('feedback-message');
            feedback.textContent = `Mobil ${car.brand} ${car.model} berhasil ditambahkan!`;
            e.target.reset();

            setTimeout(() => { feedback.textContent = ''; }, 3000);
        });
    }

    // --- SECTION 2: CUSTOMER LEADS MANAGEMENT --- //
    const leadsTableBody = document.getElementById('leads-table-body');
    const noLeadsMessage = document.getElementById('no-leads-message');
    const downloadBtn = document.getElementById('download-leads-csv');

    function loadLeads() {
        const leads = JSON.parse(localStorage.getItem('leads')) || [];
        
        if (!leadsTableBody) return; // Exit if table body doesn't exist

        if (leads.length === 0) {
            noLeadsMessage.style.display = 'block';
            leadsTableBody.style.display = 'none';
            downloadBtn.style.display = 'none';
        } else {
            noLeadsMessage.style.display = 'none';
            leadsTableBody.style.display = '';
            downloadBtn.style.display = 'block';

            // Sort leads by most recent first
            leads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            leadsTableBody.innerHTML = ''; // Clear existing rows
            leads.forEach(lead => {
                const row = document.createElement('tr');
                
                // Format timestamp for readability
                const formattedDate = new Date(lead.timestamp).toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${lead.name || '-'}</td>
                    <td>${lead.whatsapp || '-'}</td>
                    <td>${lead.interestedCar || 'Umum'}</td>
                `;
                leadsTableBody.appendChild(row);
            });
        }
    }

    function downloadCSV() {
        const leads = JSON.parse(localStorage.getItem('leads')) || [];
        if (leads.length === 0) {
            alert('Tidak ada data prospek untuk diunduh.');
            return;
        }

        // Define CSV headers
        const headers = ['Tanggal', 'Nama', 'No. WhatsApp', 'Mobil yang Diminati'];
        
        // Convert JSON to CSV rows
        const csvRows = leads.map(lead => {
            const formattedDate = new Date(lead.timestamp).toLocaleString('id-ID');
            const name = `"${lead.name || ''}"`;
            const whatsapp = `"${lead.whatsapp || ''}"`;
            const interestedCar = `"${lead.interestedCar || 'Umum'}"`;
            return [formattedDate, name, whatsapp, interestedCar].join(',');
        });

        // Combine headers and rows
        const csvString = [headers.join(','), ...csvRows].join('\n');

        // Create Blob and trigger download
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'data_prospek_pelanggan.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCSV);
    }

    // Initial load of leads data
    loadLeads();
});
