const creationsArea = document.querySelector('#meme-creations');
const insertImgBtn = document.querySelector('#insert-img-btn');
const resetBtn = document.querySelector('#reset-btn');
const examples = document.querySelector('#examples');
let statusMsg = document.querySelector('#status');

//Retrieve valid form inputs and send to createMemeCard function for HTML display.
insertImgBtn.addEventListener('click', function(e){
    e.preventDefault();
    const inputUrl = document.querySelector('#img-url-input').value;
    const inputTopText = document.querySelector('#top-text-input').value;
    const inputBottomText = document.querySelector('#bottom-text-input').value;
    if (inputUrl && (inputTopText||inputBottomText)) { // image URL and either top or bottom text input required
        document.querySelector('h2').style.visibility = 'visible'; //reveal 'Your Creations' header
        const newMeme = { inputUrl, inputTopText, inputBottomText };
        createMemeCard(newMeme);
        clearForm();
    }
    else {
        statusMsg.innerText = 'Enter a valid URL and at least one text field.';
    }
})

resetBtn.addEventListener('click', function(e){
    e.preventDefault();
    clearForm();
});

examples.addEventListener('click', function(e){
    e.preventDefault();
    clearForm();
    const formInputs = document.querySelectorAll('input');
    if (e.target.id === 'ex1') {
        formInputs[0].value = 'https://imgflip.com/s/meme/Bad-Luck-Brian.jpg';
        formInputs[1].value = 'finds water in the desert';
        formInputs[2].value = 'drowns';
    }
    else if (e.target.id === 'ex2') {
        formInputs[0].value = 'https://imgflip.com/s/meme/Ancient-Aliens.jpg';
        formInputs[1].value = '';
        formInputs[2].value = 'aliens';
    }
    else if (e.target.id === 'ex3') {
        formInputs[0].value = 'https://imgflip.com/s/meme/X-All-The-Y.jpg';
        formInputs[1].value = 'code';
        formInputs[2].value = 'all the things';
    }
});

function clearForm() {
    statusMsg.innerText = '';
    const formInputs = document.querySelectorAll('input');
    for (let input of formInputs) {
        input.value = '';
    }
}

function createMemeCard(meme) { 
    //Create 'meme card' div element, prepend to gallery section
    const memeCard = document.createElement('div');
    memeCard.setAttribute('class','creation-card');
    memeCard.innerHTML = (`
        <img src="${meme.inputUrl}">
        <div class="top-middle meme-text">${meme.inputTopText}</div>
        <div class="bottom-middle meme-text">${meme.inputBottomText}</div>
        <div class="delete-meme">[ <a href="#">Delete</a> ]</div>
        `);
    creationsArea.prepend(memeCard);

    //listener for delete
    const deleteBtn = memeCard.querySelector('a');
    deleteBtn.addEventListener('click', function(e){
        e.preventDefault();
        let confirmDelete = confirm('Are you sure you want to delete this meme?');
        if (confirmDelete)
            memeCard.remove();
    });
}