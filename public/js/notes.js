const notesList = document.getElementById("notes");

async function loadNotes() {
    const res = await request("/notes");
    notesList.innerHTML = "";

    res.data.forEach(n => {
        const li = document.createElement("li");
        li.style.backgroundColor = "rgba(0,0,0,0.2)";
        li.style.padding = "1rem";
        li.style.borderRadius = "var(--radius-sm)";
        li.style.border = "1px solid var(--border)";
        li.className = "animate-fade-in";
        
        const tagsHtml = n.tags.map(t => `<span class="badge badge-low" style="margin-right: 0.2rem;">${t}</span>`).join("");

        li.innerHTML = `
            <h4 style="margin-bottom: 0.5rem; color: var(--primary);">${n.title}</h4>
            <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--text-main);">${n.content || ''}</p>
            <div>${tagsHtml}</div>
        `;
        notesList.appendChild(li);
    });
}

async function createNote() {
    const title = noteTitle.value;
    const content = noteContent.value;
    const tags = noteTags.value.split(",").map(t => t.trim());

    await request("/notes", "POST", { title, content, tags });

    noteTitle.value = "";
    noteContent.value = "";
    noteTags.value = "";

    loadNotes();
}

loadNotes();