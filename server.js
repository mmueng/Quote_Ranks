const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require("express-flash");
const path = require("path");

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/quoteranks", { useNewUrlParser: true });
app.use(express.static(__dirname + "/public/dist/public"));


const AuthorSchema = new mongoose.Schema({
    name: {
        type: String, trim: true, required: [true, "Name field is required. "], minlength: [3, "Name must be at least 3 letters."]
    },
    quotes: [
        {
            content: {
                type: String,
                trim: true,
                required: [true, "A quote field is required."],
                minlength: [3, "A quote must contain at least three characters."]
            },
            votes: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ]
}, { timestamps: true });

const Author = mongoose.model("Author", AuthorSchema);

app.get("/quotes", (req, res) => {
    Author.find()
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }));
});

app.get("/quotes/:id", (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }));
});

app.post("/quotes", (req, res) => {
    Author.create(req.body)
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});
// Edit Name
app.put("/quotes/:id", (req, res) => {
    Author.update({ _id: req.params.id }, req.body, { runValidators: true })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});
//------------------------------------------
// Edit - Add Vote and Content
app.put("/quotes/:id/new", (req, res) => {
    console.log(req.params.id)
    console.log(req.body.quotes)
    Author.update({ _id: req.params.id }, { $push: { quotes: { content: req.body.content } } }, { runValidators: true })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});
//---------------------------------------
// Votessssss
// app.put("/quote/vote/:id", (req, res) => {
//     console.log(req.params.id)
//     console.log(req.body.quotes)
//     Author.findOneAndUpdate({ _id: req.params.id }, { $inc: { 'votes': 1 } }, { new: true })
//         .then(data => res.json({ msg: "Success", result: data }))
//         .catch(err => res.json({ msg: "Error", err: err }))
//     console.log(data)
// });
app.put("/quotes/upvote/:author_id/:quote_id", (req, res) => {
    const { author_id, quote_id } = req.params;
    console.log(author_id)
    console.log(quote_id)
    Author.updateOne({ "quotes._id": quote_id }, { $inc: { 'quotes.$.votes': 1 } }, { new: true })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});
app.put("/quotes/downvote/:author_id/:quote_id", (req, res) => {
    const { author_id, quote_id } = req.params;
    console.log(author_id)
    console.log(quote_id)
    Author.updateOne({ "quotes._id": quote_id }, { $inc: { 'quotes.$.votes': -1 } }, { new: true })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});

// Delete Quote 
app.delete("/quotes/:author_id/:quote_id", (req, res) => {
    const { quote_id, author_id } = req.params;
    console.log(author_id)
    console.log(quote_id)
    Author.findByIdAndUpdate(author_id, { $pull: { quotes: { _id: quote_id } } }, { new: true })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }))
});
// -------------
app.delete("/quotes/:id", (req, res) => {
    Author.findOneAndRemove({ _id: req.params.id })
        .then(data => res.json({ msg: "Success", result: data }))
        .catch(err => res.json({ msg: "Error", err: err }));
});

app.all("*", (req, res) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
})

app.listen(8000, () => ("Listening on port 8000!!!"));