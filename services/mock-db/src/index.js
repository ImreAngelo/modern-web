const express = require('express')
const app = express()
const port = process.env.PORT

const post = (id, title, description) => { return { id:id, title:title, description:description }}
const posts = [
    post(0, "Hello World", "This is a description"),
    post(1, "Hello?", "This vvvvvvvvvvvvv is kinda cool"),
    post(2, "Oh...", "Thdasda description"),
]

app.get('/v1/post/:id', (req, res) => {
    console.log("Requested post with id: " + req.params.id)
    if(req.params.id % 2) {
        console.log("Simulating unauthorized request")
        res.status(301).send({});
        return;
    }

    res.send(posts[Math.floor(Math.random() * posts.length)])
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
