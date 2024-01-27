const addButton = document.querySelector(".addNoteCloser");
const mainNoteBody = document.querySelector('.main-body-closer');
let afternav = document.querySelector('.addNoteSection').style;

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('card-main-container');

    const htmlData =   `<div class="card-closer">
                            <div class="card-header">
                                <button class="edit">    
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </button>
                                <button class="delete">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="card-data ${text ? "" : "hidden"} ">${text}</div>
                            <textarea class="textarea ${text ? "hidden" : ""} ">${text}</textarea>
                        </div>`

    note.insertAdjacentHTML('afterbegin', htmlData);
    mainNoteBody.appendChild(note);

    // references
    let editBtn = note.querySelector('.edit');
    let delBtn = note.querySelector('.delete');
    let main = note.querySelector('.card-data')
    let textarea = note.querySelector('.textarea');

    let updateLSDate = () => {
        const textAreaData = document.querySelectorAll('textarea');
        const notes = [];
        textAreaData.forEach((note) => {
            return notes.push(note.value);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // deleting notes
    delBtn.addEventListener('click', () => {
        note.remove();
        updateLSDate();
    });

    // toggle using edit button
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        main.innerHTML=  value;
        updateLSDate();
    });
}

// getting a data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note) => addNewNote(note));
}

// Event for add note
addButton.addEventListener('click', () => addNewNote());

// Scroll effect
window.addEventListener('scroll', () => {
    if(scrollY > 50){
        afternav.boxShadow = '1px 1px 3px #BA0000';
        afternav.height = '5rem';
    }else if(scrollY < 50){
        afternav.boxShadow = 'none';
        afternav.height = '8rem';
    }
});