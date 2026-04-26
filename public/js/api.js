const API_BASE = "/api"; // use relative path (served by Express)

async function request(url, method = "GET", body = null) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_BASE + url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: "Bearer " + token })
        },
        body: body ? JSON.stringify(body) : null
    });

    // handle 401 globally
    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login.html";
        return;
    }

    let data = {};
    try {
        data = await res.json();
    } catch (e) {
        console.warn("Response was not valid JSON");
    }

    if (!res.ok) {
        const errMsg = data.message || "Request failed";
        showError(errMsg);
        throw new Error(errMsg);
    }

    return data;
}

function showError(msg) {
    let el = document.getElementById("error");
    if (!el) {
        el = document.createElement("div");
        el.id = "error";
        el.style.color = "red";
        document.body.prepend(el);
    }
    el.textContent = msg;
}