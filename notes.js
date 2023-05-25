const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {
    const notes = loadNotes()

    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicatedNote = notes.find((note) => note.title === title)

    if (!duplicatedNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added')
    } else {
        console.log('Note title taken')
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch(e) {
        return []
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notesToKeep.length !== notes.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('note removed'))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
    
}

const listNotes = () => {
    console.log(chalk.blue.bold("Your Notes:"))
    const notes = loadNotes()
    notes.forEach((note) => console.log(" - " + note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((n) => n.title === title)
    debugger
    if(note) {
        console.log(chalk.blue.bold(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red("Note not found"))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};