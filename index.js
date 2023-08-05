
const chalk = require("chalk")
const express = require("express")
const path = require("path")
const { addNote, getNote, removeNote, editNote } = require('./notes.controller') 


const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', async (req, res) => {
    res.render('index', {
        title: "Express App",
        notes: await getNote(),
        created: false
    })
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: "Express App",
        notes: await getNote(),
        created: true
    })
})

app.put('/:id/:title', async (req, res) => {
    editNote(req.params)
    res.render('index', {
        title: "Express App",
        notes: await getNote(),
        created: false
    })
})

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
    res.render('index', {
        title: "Express App",
        notes: await getNote(),
        created: false
    })
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})