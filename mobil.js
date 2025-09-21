document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('car-insurance-form');
    const resultBox = document.getElementById('result');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const carPrice = parseFloat(document.getElementById('car-price').value);
            const carYear = parseInt(document.getElementById('car-year').value);
            const currentYear = new Date().getFullYear();
            const carAge = currentYear - carYear;
            let premiumAmount = 0;
            let premiumRate = 0;

            if (isNaN(carPrice) || isNaN(carYear) || carPrice <= 0) {
                alert('Mohon masukkan harga dan tahun yang valid.');
                return;
            }

            if (carAge >= 0 && carAge <= 3) {
                premiumRate = 0.025;
            } else if (carAge > 3 && carAge <= 5) {
                if (carPrice < 200000000) {
                    premiumRate = 0.04;
                } else {
                    premiumRate = 0.03;
                }
            } else if (carAge > 5) {
                premiumRate = 0.05;
            } else {
                alert('Tahun pembuatan tidak valid.');
                return;
            }

            premiumAmount = carPrice * premiumRate;
            
            const insuranceData = {
                product: 'Asuransi Mobil',
                carPrice: carPrice,
                carYear: carYear,
                carAge: carAge,
                premiumAmount: premiumAmount
            };
            sessionStorage.setItem('insuranceData', JSON.stringify(insuranceData));

            document.getElementById('display-price').textContent = formatRupiah(carPrice);
            document.getElementById('display-year').textContent = carYear;
            document.getElementById('display-age').textContent = `${carAge} tahun`;
            document.getElementById('display-rate').textContent = `${(premiumRate * 100).toFixed(1)}% per tahun`;
            document.getElementById('display-premium').textContent = formatRupiah(premiumAmount);

            resultBox.style.display = 'block';
            window.scrollTo({
                top: resultBox.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    }

    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }
});