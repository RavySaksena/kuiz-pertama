document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('health-insurance-form');
    const resultBox = document.getElementById('result');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('full-name-ktp').value;
            const birthDate = new Date(document.getElementById('birth-date').value);
            const occupation = document.getElementById('occupation').value;
            const isSmoker = parseInt(document.querySelector('input[name="smoker"]:checked').value);
            const hasHypertension = parseInt(document.querySelector('input[name="hypertension"]:checked').value);
            const hasDiabetes = parseInt(document.querySelector('input[name="diabetes"]:checked').value);

            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            const basePremium = 2000000;
            let multiplier = 0;
            if (age <= 20) {
                multiplier = 0.1;
            } else if (age <= 35) {
                multiplier = 0.2;
            } else if (age <= 50) {
                multiplier = 0.25;
            } else {
                multiplier = 0.4;
            }

            const k1 = isSmoker;
            const k2 = hasHypertension;
            const k3 = hasDiabetes;

            const finalPremium = basePremium + (multiplier * basePremium) + (k1 * 0.5 * basePremium) + (k2 * 0.4 * basePremium) + (k3 * 0.5 * basePremium);

            const insuranceData = {
                product: 'Asuransi Kesehatan',
                fullName: fullName,
                age: age,
                occupation: occupation,
                premiumAmount: finalPremium,
            };
            sessionStorage.setItem('insuranceData', JSON.stringify(insuranceData));

            document.getElementById('display-name').textContent = fullName;
            document.getElementById('display-age').textContent = `${age} tahun`;
            document.getElementById('display-occupation').textContent = occupation;
            document.getElementById('display-base-premium').textContent = formatRupiah(basePremium);
            document.getElementById('display-final-premium').textContent = formatRupiah(finalPremium);

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