const list = document.getElementById("tasks");
const loading = document.getElementById("loading");

async function loadTasks() {
    try {
        loading.style.display = "block";

        const res = await request("/tasks");

        list.innerHTML = "";

        if (!res.data?.length) {
            list.innerHTML = "<li>No tasks found</li>";
            return;
        }

        res.data.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-item animate-fade-in";

            const statusClass = task.status === "done" ? "badge-done" : "badge-pending";
            const priorityClass = task.priority ? `badge-${task.priority}` : "badge-medium";

            li.innerHTML = `
                <div class="list-item-content">
                    <div class="list-item-title">${task.title}</div>
                    <div class="list-item-meta">
                        <span class="badge ${statusClass}">${task.status}</span>
                        <span class="badge ${priorityClass}">${task.priority || 'medium'}</span>
                    </div>
                </div>
                <div class="list-item-actions">
                    ${task.status !== 'done' ? `<button class="small" onclick="markDone('${task._id}')">Done</button>` : ''}
                    <button class="small danger" onclick="deleteTask('${task._id}')">Delete</button>
                </div>
            `;

            list.appendChild(li);
        });

    } catch (err) {
        alert(err.message);
    } finally {
        loading.style.display = "none";
    }
}

async function createTask() {
    const title = document.getElementById("title").value;
    const priority = document.getElementById("priority").value;

    if (!title) return alert("Title required");

    try {
        await request("/tasks", "POST", { title, priority });
        document.getElementById("title").value = "";
        loadTasks();
    } catch (err) {
        alert(err.message);
    }
}

async function markDone(id) {
    try {
        await request(`/tasks/${id}`, "PUT", { status: "done" });
        loadTasks();
    } catch (err) {
        alert(err.message);
    }
}

async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;

    try {
        await request(`/tasks/${id}`, "DELETE");
        loadTasks();
    } catch (err) {
        alert(err.message);
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
}

// auto-load
loadTasks();