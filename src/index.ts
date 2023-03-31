import { notes } from "./porcupine";
import { modulo } from './util';

const next = document.querySelector('#next') as HTMLButtonElement;
const prompt = document.querySelector('#prompt') as HTMLParagraphElement;
const response = document.querySelector('#response') as HTMLInputElement;
const evaluation = document.querySelector('#evaluation') as HTMLParagraphElement;

let correctAnswers: string[] = [];

function randomIndex<T>(a: Array<T>): number {
    return Math.floor(Math.random() * a.length);
}

function randomChoice<T>(a: Array<T>): T {
    return a[randomIndex(a)];
}

function edostepQuestion(
    note1: number, note2: number, ascending: boolean): [string, string[]] {
    return [
        `${randomChoice(notes[note1])} to ${randomChoice(notes[note2])} ` +
        `${ascending ? 'ascending' : 'descending'}?`,
        [(ascending ?
            modulo(note2 - note1, notes.length) :
            modulo(note1 - note2, notes.length)
        ).toString()],
    ];
}

function noteQuestion(
    note1: number, note2: number, ascending: boolean): [string, string[]] {
    const interval =
        modulo(ascending ? note2 - note1 : note1 - note2, notes.length);
    return [
        `${interval} edosteps ${ascending ? 'above' : 'below'} ` +
        `${randomChoice(notes[note1])}?`,
        notes[note2],
    ];
}

const questionFunctions = [edostepQuestion, noteQuestion];

function nextQuestion() {
    const note1 = randomIndex(notes);
    let note2 = randomIndex(notes);
    while (note2 === note1) {
        note2 = randomIndex(notes);
    }

    const ascending = Math.random() < 0.5;
    [prompt.innerText, correctAnswers] =
        randomChoice(questionFunctions)(note1, note2, ascending);

    evaluation.innerText = '';
    response.value = '';
}
nextQuestion();

next.addEventListener('click', (event) => {
    nextQuestion();
    setTimeout(() => response.focus(), 200); // debounce enter key
});

response.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        evaluation.innerText = correctAnswers.includes(response.value) ?
            `Correct.` :
            (correctAnswers.length === 1 ?
                `Incorrect. Answer was ${correctAnswers[0]}.` :
                `Incorrect. Answers were ${correctAnswers.join(',')}`)
        next.focus();
    }
});
