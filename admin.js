document.addEventListener('DOMContentLoaded', () => {
    const leadsTableBody = document.getElementById('leads-tbody');
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');

    if (leads.length === 0) {
        leadsTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Belum ada prospek yang masuk.</td></tr>';
        return;
    }

    // Urutkan prospek dari yang terbaru
    leads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    leads.forEach((lead, index) => {
        const row = document.createElement('tr');
        
        const formattedDate = new Date(lead.timestamp).toLocaleString('id-ID', {
            dateStyle: 'medium', 
            timeStyle: 'short'
        });

        row.innerHTML = `
            <td data-label="No.">${index + 1}</td>
            <td data-label="Timestamp">${formattedDate}</td>
            <td data-label="Nama">${lead.name}</td>
            <td data-label="WhatsApp"><a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}" target="_blank">${lead.whatsapp}</a></td>
            <td data-label="Mobil yang Diminati">${lead.carInfo || 'Tidak disebutkan'}</td>
        `;
        leadsTableBody.appendChild(row);
    });
});