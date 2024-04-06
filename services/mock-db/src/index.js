const express = require('express')
const app = express()
const port = 4000

const post = (id, title, description) => { return { id:id, title:title, description:description }}
const posts = [
    post(0, "Hello World", "This is a description"),
    post(1, "Hello?", "This vvvvvvvvvvvvv is kinda cool"),
    post(2, "Oh...", "Thdasda description"),
]

app.get('/v1/post/random', (req, res) => {
    res.send(posts[Math.floor(Math.random() * posts.length)])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
