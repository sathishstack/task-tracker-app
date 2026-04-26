const notesList = document.getElementById("notes");

async function loadNotes() {
    try {
        const res = await request("/notes");
        notesList.innerHTML = "";

        if (!res.data?.length) {
            notesList.innerHTML = `
                <div class="empty-state animate-fade-in" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">📝</div>
                    <p>No notes yet. Start writing!</p>
                </div>
            `;
            return;
        }

        res.data.forEach(n => {
            const li = document.createElement("li");
            li.className = "card animate-fade-in";
            li.style.padding = "1rem";
            
            const tagsHtml = n.tags.map(t => `<span class="badge badge-low" style="margin-right: 0.2rem;">${t}</span>`).join("");
            const parsedContent = n.content ? marked.parse(n.content) : '';

            li.innerHTML = `
                <h4 style="margin-bottom: 0.5rem; color: var(--primary);">${n.title}</h4>
                <div class="markdown-body" style="margin-bottom: 1rem;">${parsedContent}</div>
                <div>${tagsHtml}</div>
            `;
            notesList.appendChild(li);
        });
    } catch (err) {
        showToast(err.message, "error");
    }
}

async function createNote() {
    const title = noteTitle.value;
    const content = noteContent.value;
    const tags = noteTags.value.split(",").map(t => t.trim()).filter(Boolean);

    if (!title) return showToast("Note title is required", "warning");

    try {
        await request("/notes", "POST", { title, content, tags });
        
        noteTitle.value = "";
        noteContent.value = "";
        noteTags.value = "";
        
        showToast("Note saved", "success");
        loadNotes();
    } catch (err) {
        // api.js handles error toast
    }
}

loadNotes();