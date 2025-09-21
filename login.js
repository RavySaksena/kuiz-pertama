document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Email dan kata sandi harus diisi!");
        return;
    }

    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Format email tidak valid!");
        return;
    }

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
        alert("login sukses, silahkan tuan/nyonya");
        window.location.href = "index.html";
    } else {
        alert("Email atau kata sandi salah. Silakan coba lagi!");
    }

});
