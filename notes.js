const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const note = loadNotes().find((note) => note.title === title)

    if(note){
        console.log(chalk.green(note.title) + " : " + note.body);
    } else {
        console.log(chalk.inverse.red("Note not found"));
    }

}

const listNotes = () => {
    console.log(chalk.blue("Your notes!"))
    loadNotes().forEach((note) =>{
        console.log(note.title);
    })
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => note.title !== title)

    if(notes.length === remainingNotes.length){
        console.log(chalk.inverse.red("No notes removed"));
    } else {
        console.log(chalk.inverse.green("Note removed: " + title));
        saveNotes(remainingNotes)
    }
}

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green('New note added!'))
    } else {
        console.log(chalk.inverse.red('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

module.exports = {
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}