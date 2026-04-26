const list = document.getElementById("tasks");
const loading = document.getElementById("loading");

async function loadTasks() {
    try {
        loading.style.display = "block";

        const filterVal = document.getElementById("taskFilter")?.value;
        const url = filterVal ? `/tasks?status=${filterVal}` : "/tasks";

        const res = await request(url);

        list.innerHTML = "";

        if (!res.data?.length) {
            list.innerHTML = `
                <div class="empty-state animate-fade-in">
                    <div class="empty-state-icon">📋</div>
                    <p>No tasks found.</p>
                </div>
            `;
            return;
        }

        res.data.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-item animate-fade-in";

            const statusClass = task.status === "done" ? "badge-done" : "badge-pending";
            const priorityClass = task.priority ? `badge-${task.priority}` : "badge-medium";

            li.innerHTML = `
                <div class="list-item-content">
                    <input class="editable-title list-item-title" value="${task.title.replace(/"/g, '&quot;')}" onchange="updateTaskTitle('${task._id}', this.value, this)" data-original="${task.title.replace(/"/g, '&quot;')}" />
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
        showToast(err.message, "error");
    } finally {
        loading.style.display = "none";
    }
}

async function createTask() {
    const title = document.getElementById("title").value;
    const priority = document.getElementById("priority").value;

    if (!title) return showToast("Title required", "warning");

    try {
        await request("/tasks", "POST", { title, priority });
        document.getElementById("title").value = "";
        showToast("Task created", "success");
        loadTasks();
    } catch (err) {
        // api.js already shows the error toast
    }
}

async function markDone(id) {
    try {
        await request(`/tasks/${id}`, "PUT", { status: "done" });
        showToast("Task marked as done", "success");
        loadTasks();
    } catch (err) {
        // api.js handles error toast
    }
}

async function updateTaskTitle(id, newTitle, inputEl) {
    const oldTitle = inputEl.getAttribute('data-original');
    if (!newTitle.trim()) {
        inputEl.value = oldTitle;
        return showToast("Title cannot be empty", "warning");
    }
    if (newTitle === oldTitle) return;

    try {
        await request(`/tasks/${id}`, "PUT", { title: newTitle });
        showToast("Task renamed", "success");
        loadTasks();
    } catch (err) {
        inputEl.value = oldTitle; // revert
    }
}

async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;

    try {
        await request(`/tasks/${id}`, "DELETE");
        showToast("Task deleted", "success");
        loadTasks();
    } catch (err) {
        // api.js handles error toast
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
}

// auto-load
loadTasks();