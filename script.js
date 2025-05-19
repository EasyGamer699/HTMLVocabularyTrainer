const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const learnSection = document.getElementById('learn-section');
const card = document.getElementById('card');
const foreignWord = document.getElementById('foreign-word');
const translation = document.getElementById('translation');
const revealButton = document.getElementById('reveal-button');
const correctButton = document.getElementById('correct-button');
const wrongButton = document.getElementById('wrong-button');
const knownButtons = document.getElementById('known-buttons');

let vocabList = [];
let currentVocabIndex = 0;

uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                vocabList = JSON.parse(event.target.result); // Annahme: JSON-Datei
                learnSection.style.display = 'block';
                uploadSection.style.display = 'none';
                showCurrentWord();
            } catch (error) {
                alert('Fehler beim Lesen der Datei. Stellen Sie sicher, dass es eine gültige JSON-Datei ist.');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Bitte wählen Sie eine Datei aus.');
    }
});

revealButton.addEventListener('click', () => {
    foreignWord.style.visibility = 'visible';
    translation.style.visibility = 'visible';
    revealButton.style.display = 'none';
    knownButtons.style.display = 'block';
});

correctButton.addEventListener('click', () => {
    nextWord();
});

wrongButton.addEventListener('click', () => {
    nextWord();
});

function showCurrentWord() {
    if (currentVocabIndex < vocabList.length) {
        foreignWord.textContent = vocabList[currentVocabIndex].vokabel;
        translation.textContent = vocabList[currentVocabIndex].bedeutung;
        foreignWord.style.visibility = 'hidden';
        translation.style.visibility = 'hidden';
        revealButton.style.display = 'block';
        knownButtons.style.display = 'none';
    } else {
        card.textContent = 'Alle Vokabeln gelernt!';
    }
}

function nextWord() {
    currentVocabIndex++;
    showCurrentWord();
}