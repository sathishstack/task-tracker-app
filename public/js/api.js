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
        // Not valid JSON, handled below
    }

    if (!res.ok) {
        const errMsg = data.message || "Request failed";
        showToast(errMsg, "error");
        throw new Error(errMsg);
    }

    return data;
}

function showToast(msg, type = "error") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;

    container.appendChild(toast);

    // Trigger reflow to apply transition
    void toast.offsetWidth;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}