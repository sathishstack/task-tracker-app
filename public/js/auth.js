const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await request("/auth/login", "POST", { email, password });

        if (res.token) {
            localStorage.setItem("token", res.token);
            window.location.href = "/dashboard.html";
        }
    } catch (err) {
        // Error toast shown by api.js
    }
};

const register = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await request("/auth/register", "POST", { name, email, password });

        if (res.token) {
            localStorage.setItem("token", res.token);
            window.location.href = "/dashboard.html";
        }
    } catch (err) {
        // Error toast shown by api.js
    }
};