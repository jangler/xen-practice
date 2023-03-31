import { notes } from "./porcupine";
import { modulo } from './util';

const next = document.querySelector('#next') as HTMLButtonElement;
const prompt = document.querySelector('#prompt') as HTMLParagraphElement;
const response = document.querySelector('#response') as HTMLInputElement;
const evaluation = document.querySelector('#evaluation') as HTMLParagraphElement;

let correctAnswer: string | undefined = undefined;

function randomIndex<T>(a: Array<T>): number {
    return Math.floor(Math.random() * a.length);
}

function randomChoice<T>(a: Array<T>): T {
    return a[randomIndex(a)];
}

function nextQuestion() {
    const note1 = randomIndex(notes);
    let note2 = randomIndex(notes);
    while (note2 === note1) {
        note2 = randomIndex(notes);
    }

    const ascending = Math.random() < 0.5;
    prompt.innerText =
        `${randomChoice(notes[note1])} to ${randomChoice(notes[note2])} ` +
        `${ascending ? 'ascending' : 'descending'}?`;

    correctAnswer = (ascending ?
        modulo(note2 - note1, notes.length) :
        modulo(note1 - note2, notes.length)).toString();

    evaluation.innerText = '';
    response.value = '';
}
nextQuestion();

next.addEventListener('click', (event) => {
    nextQuestion();
    setTimeout(() => response.focus(), 100); // debounce enter key
});

response.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        evaluation.innerText = response.value === correctAnswer ?
            `Correct.` :
            `Incorrect. Answer was ${correctAnswer}.`;
        next.focus();
    }
});
