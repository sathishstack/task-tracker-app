const API_BASE = "http://localhost:5050/api";

const request = async (url, method = "GET", body = null) => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_BASE + url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: "Bearer " + token })
        },
        body: body ? JSON.stringify(body) : null
    });

    return res.json();
};