document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('life-insurance-form');
    const resultBox = document.getElementById('result');
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('full-name-ktp').value;
            const birthDate = new Date(document.getElementById('birth-date').value);
            const coverageAmount = parseFloat(document.getElementById('coverage-amount').value);

            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            let premiumRate = 0;
            
            if (age <= 30) {
                premiumRate = 0.002;
            } else if (age > 30 && age <= 50) {
                premiumRate = 0.004;
            } else if (age > 50) {
                premiumRate = 0.01;
            } else {
                alert('Tahun lahir tidak valid.');
                return;
            }

            const premiumAmount = premiumRate * coverageAmount;
            
            const insuranceData = {
                product: 'Asuransi Jiwa',
                fullName: fullName,
                age: age,
                coverageAmount: coverageAmount,
                premiumAmount: premiumAmount,
            };
            sessionStorage.setItem('insuranceData', JSON.stringify(insuranceData));

            document.getElementById('display-name').textContent = fullName;
            document.getElementById('display-age').textContent = `${age} tahun`;
            document.getElementById('display-coverage').textContent = formatRupiah(coverageAmount);
            document.getElementById('display-rate').textContent = `${(premiumRate * 100).toFixed(1)}% per bulan`;
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