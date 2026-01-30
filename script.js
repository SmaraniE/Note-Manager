
function saveNotesToStorage() {
    localStorage.setItem('myNotesApp', JSON.stringify(notes));
}


function loadNotesFromStorage() {
    const storedNotes = localStorage.getItem('myNotesApp');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
}


let notes = []; 
let filterTag = "All";


function render() {
    const list = document.getElementById("notes-list");
    list.innerHTML = "";
    
    const search = document.getElementById("search-input").value.toLowerCase();
    
  
    updateTabUI(); 

    notes.forEach(note => {

        const matchesTab = (filterTag === "All" || note.category === filterTag);
        const matchesSearch = note.title.toLowerCase().includes(search);

        if (matchesTab && matchesSearch) {
            const card = document.createElement("div");

            card.className = "note-card " + note.category; 
            card.innerHTML = `
                <h4>${note.title}</h4>
                <p>${note.content}</p>
                <!-- Display the formatted date and time -->
                <small>${new Date(note.timestamp).toLocaleString()}</small>
                <button onclick="removeNote(${note.id})" class="delete-btn">Delete</button>
            `;
            list.appendChild(card);
        }
    });
}


function updateTabUI() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        btn.classList.remove('active');
        if (filterTag === 'All' && btn.textContent.trim() === 'All') {
            btn.classList.add('active');
        } else if (btn.textContent.trim() === filterTag) {
            btn.classList.add('active');
        }
    });
}


document.getElementById("add-btn").onclick = function() {
    const title = document.getElementById("title-input").value;
    const content = document.getElementById("text-input").value;
    const category = document.getElementById("category-input").value;

    if (!title) return alert("Enter a title!");

    notes.push({ 
        id: Date.now(), 
        title, 
        content, 
        category,
        timestamp: new Date().toISOString() 
    });
    saveNotesToStorage(); 
    render();
    
    
    document.getElementById("title-input").value = "";
    document.getElementById("text-input").value = "";
};


function removeNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotesToStorage(); 
    render();
}


function setFilter(tag) {
    filterTag = tag;
    render();
}


document.getElementById("search-input").oninput = render;

loadNotesFromStorage(); 
render(); 
