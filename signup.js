document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const paymentMethodSelect = document.getElementById('payment-method');
    const cardInfoDiv = document.getElementById('card-info');

    const savedData = JSON.parse(sessionStorage.getItem('insuranceData'));
    const orderSummary = document.querySelector('.order-summary');

    if (savedData) {
        orderSummary.innerHTML = '<h3>Ringkasan Pesanan</h3>';

        let detailsHtml = '';
        if (savedData.product === 'Asuransi Mobil') {
            detailsHtml = `
                <div class="summary-item"><span class="label">Harga Mobil:</span><span class="value">${formatRupiah(savedData.carPrice)}</span></div>
                <div class="summary-item"><span class="label">Tahun Pembuatan:</span><span class="value">${savedData.carYear}</span></div>
                <div class="summary-item"><span class="label">Umur Mobil:</span><span class="value">${savedData.carAge} tahun</span></div>
            `;
        } else if (savedData.product === 'Asuransi Kesehatan') {
            detailsHtml = `
                <div class="summary-item"><span class="label">Nama Lengkap:</span><span class="value">${savedData.fullName}</span></div>
                <div class="summary-item"><span class="label">Umur:</span><span class="value">${savedData.age} tahun</span></div>
                <div class="summary-item"><span class="label">Pekerjaan:</span><span class="value">${savedData.occupation}</span></div>
            `;
        } else if (savedData.product === 'Asuransi Jiwa') {
             detailsHtml = `
                <div class="summary-item"><span class="label">Nama Lengkap:</span><span class="value">${savedData.fullName}</span></div>
                <div class="summary-item"><span class="label">Umur:</span><span class="value">${savedData.age} tahun</span></div>
                <div class="summary-item"><span class="label">Besaran Pertanggungan:</span><span class="value">${formatRupiah(savedData.coverageAmount)}</span></div>
            `;
        }

        orderSummary.innerHTML += `
            <div class="summary-item">
                <span class="label">Produk Asuransi:</span>
                <span class="value">${savedData.product}</span>
            </div>
            ${detailsHtml}
            <div class="summary-item total">
                <span class="label">Total Pembayaran:</span>
                <span class="value">${formatRupiah(savedData.premiumAmount)}</span>
            </div>
        `;
    } else {
        alert('Tidak ada data pesanan. Anda akan diarahkan kembali.');
        window.location.href = 'index.html';
    }

    paymentMethodSelect.addEventListener('change', (e) => {
        if (e.target.value === 'kartu') {
            cardInfoDiv.style.display = 'block';
        } else {
            cardInfoDiv.style.display = 'none';
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const customerName = document.getElementById('customer-name').value;
        const customerEmail = document.getElementById('customer-email').value;

        const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

        const transaction = {
            product: savedData.product,
            type: savedData.product,
            date: new Date().toLocaleDateString('id-ID'),
            price: savedData.premiumAmount,
            status: 'Lunas',
            customerName: customerName,
            customerEmail: customerEmail
        };

        history.push(transaction);
        localStorage.setItem('purchaseHistory', JSON.stringify(history));
        
        sessionStorage.removeItem('insuranceData');

        alert('Pembayaran berhasil! Terima kasih atas pesanan Anda.');
        
        window.location.href = 'histori.html';
    });

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }
});