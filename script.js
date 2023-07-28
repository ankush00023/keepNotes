const addBtn = document.querySelector('#add');

//save the data Local Storage
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea')
    const notes = []; //empty array, we need to add the data entered by the user in the empty note

    textAreaData.forEach((currElem)=>{
        // console.log(currElem.value);
        return notes.push(currElem.value);
    });
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
        <div class="operation">
            <button class="edit"> <i class="fas fa-edit"></i> </button>
            <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
        </div>
        <div class="main ${text ? "" : "hidden"}"> </div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `;
    note.insertAdjacentHTML("afterbegin",htmlData);

    // getting the references
    const editBtn = note.querySelector('.edit');
    const delBtn = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // Delete the Node
    delBtn.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    //toggle the Edit icon
    textArea.value=text;
    mainDiv.innerHTML=text;

editBtn.addEventListener('click',()=>{
    mainDiv.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
});

// get the user value
textArea.addEventListener('change',(event)=> {
    const value = event.target.value;
    mainDiv.innerHTML=value;  
    updateLSData();
})




    // it appends a node as the last child of the node
   document.body.appendChild(note);
   
}
// getting data back from LocalStorage

const getData = JSON.parse(localStorage.getItem('notes'));

if(getData) { getData.forEach((item)=> addNewNote(item) ) }


addBtn.addEventListener('click',() => addNewNote());