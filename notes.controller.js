const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {

    const notes = await getNote()
    
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile("./db.json", JSON.stringify(notes))
    console.log(chalk.green("Note was added!"))
}

async function getNote() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" })
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNote()
    console.log(chalk.bgBlue("Here is the list of notes:"))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    });
}

async function removeNote(noteId) {
    const notes = await getNote()
    const filterNotes = []
    notes.map((note) => {
        note.id !== String(noteId) ? filterNotes.push(note) : ""
    })
    await fs.writeFile("./db.json", JSON.stringify(filterNotes))
    console.log(chalk.green("Note was removed!"))
}

module.exports = {
    addNote, printNotes, removeNote
}
