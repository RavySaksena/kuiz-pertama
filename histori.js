document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('history-container');
    const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    if (history.length > 0) {
        let historyHtml = '<table><thead><tr><th>Nama Produk</th><th>Jenis</th><th>Tanggal Pembelian</th><th>Harga</th><th>Status</th></tr></thead><tbody>';

        history.forEach(item => {
            historyHtml += `
                <tr>
                    <td>${item.product}</td>
                    <td>${item.type}</td>
                    <td>${item.date}</td>
                    <td>${formatRupiah(item.price)}</td>
                    <td class="status-${item.status.toLowerCase()}">${item.status}</td>
                </tr>
            `;
        });

        historyHtml += '</tbody></table>';
        historyContainer.innerHTML = historyHtml;

    } else {
        historyContainer.innerHTML = '<p class="no-history-message">Tidak ada riwayat pembelian.</p>';
    }

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }
});