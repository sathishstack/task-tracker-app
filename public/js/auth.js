const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await request("/auth/login", "POST", {
        email,
        password
    });

    if (res.token) {
        localStorage.setItem("token", res.token);
        window.location.href = "/dashboard.html";
    } else {
        alert(res.message || "Login failed");
    }
};