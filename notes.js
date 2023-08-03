const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return "Your notes..."
}
const removeNote = function(title){
    const notes = loadNotes()
    const originalSize = notes.length

    const remainingNotes = notes.filter(function(note){
        return note.title !== title
    })

    const newSize = remainingNotes.length

    if(originalSize === newSize){
        console.log(chalk.inverse.red("No notes removed"));
    } else {
        console.log(chalk.inverse.green("Note removed: " + title));
        saveNotes(remainingNotes)
    }

}

const addNote = function(title,body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })
    if (duplicateNotes.length === 0){
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

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}