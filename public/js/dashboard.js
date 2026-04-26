async function loadStats() {
    try {
        const res = await request("/dashboard");

        total.textContent = res.totalTasks;
        completed.textContent = res.completedTasks;
        pending.textContent = res.pendingTasks;

        reminders.innerHTML = "";

        if (!res.upcomingReminders.length) {
            reminders.innerHTML = "<li>No upcoming reminders</li>";
        } else {
            res.upcomingReminders.forEach(r => {
                const li = document.createElement("li");
                li.textContent = `${r.message} @ ${new Date(r.remindAt).toLocaleString()}`;
                reminders.appendChild(li);
            });
        }

        // Initialize or update Chart.js inside loadStats so data is available
        const ctx = document.getElementById("chart");
        if (ctx) {
            new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: ["Completed", "Pending"],
                    datasets: [{
                        data: [res.completedTasks, res.pendingTasks],
                        backgroundColor: ["#6366f1", "#f43f5e"], // added some colors for the new theme
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '75%',
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#cbd5e1' } }
                    }
                }
            });
        }

    } catch (err) {
        console.error(err);
    }
}

loadStats();

async function createReminder() {
    const reminderMsg = document.getElementById("reminderMsg");
    const reminderTime = document.getElementById("reminderTime");
    
    const message = reminderMsg.value;
    const remindAt = new Date(reminderTime.value).toISOString();

    try {
        await request("/reminders", "POST", { message, remindAt });
        alert("Reminder set");
        reminderMsg.value = "";
        reminderTime.value = "";
        loadStats(); // Reload stats to show the new reminder
    } catch (err) {
        console.error("Failed to create reminder", err);
    }
}