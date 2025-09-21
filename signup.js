document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("signup-form").addEventListener("submit", function(e) {
        e.preventDefault();

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirm-password").value.trim();
        let fullName = document.getElementById("full-name").value.trim(); // Corrected ID
        let phone = document.getElementById("phone").value.trim(); // Corrected ID

        let errors = [];

        if (!email || !password || !confirmPassword || !fullName || !phone) {
            errors.push("Semua bidang harus diisi.");
        }

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            errors.push("Format email tidak valid.");
        }

        if (password.length < 8) {
            errors.push("Kata sandi minimal 8 karakter.");
        }

        if (password !== confirmPassword) {
            errors.push("Konfirmasi kata sandi tidak sesuai.");
        }

        if (fullName.length < 3 || fullName.length > 32) {
            errors.push("Nama lengkap minimal 3 karakter dan maksimal 32 karakter.");
        }
        if (/\d/.test(fullName)) {
            errors.push("Nama lengkap tidak boleh mengandung angka.");
        }

        let phonePattern = /^08[0-9]{8,14}$/;
        if (!phone.match(phonePattern)) {
            errors.push("Nomor handphone tidak valid. Harus dimulai dengan '08' dan berisi 10-16 digit angka.");
        }

        if (errors.length > 0) {
            alert("Terjadi kesalahan:\n- " + errors.join("\n- "));
        } else {
            alert("Pendaftaran berhasil! Akun anda telah dibuat.");
            window.location.href = "login.html";
        }
    });
});
