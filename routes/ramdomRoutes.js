const express = require('express')
const generate = require('../randoms')
const { fork } = require('child_process')

const app = express()
app.get('/', (req, res) => res.send('OK'))
app.get('/api/randoms', (req, res) => {

    const cant = req.query.cant || 500000000

    const computo = fork('../ramdoms.js')
    computo.send({cant})
    computo.on('message', result => {
        return res.json(result)
    })


})

app.listen(process.env.port || 8080)