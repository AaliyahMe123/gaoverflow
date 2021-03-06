var express = require("express")
var mongoose = require("./db/connection.js")

const app = express()

var Question = mongoose.model("Question")

app.listen(4000, () => {
  console.log("app listening on port 4000")
})

app.set("view engine", "hbs")
const bodyParser = require("body-parser")

app.use("/assets", express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}))
// app.engine(".hbs", hbs({
//   extname: ".hbs",
//   partialsDir: "views/",
//   layoutsDir: "views/",
//   defaultLayout: "layout-main"
// }))

app.get("/", (req, res) => {
  Question.find({}).then(questions => {
    res.render("questions-index.hbs", {questions: questions})
  })
})

app.get("/:id", (req, res) => {
  var id = req.params._id
  Question.findOne({id: id}).then(question => {
      res.render("questions-show.hbs", {question: question})
  })
})

app.post("/", (req, res) => {
  Question.create(req.body.question).then(question => {
    res.redirect("/")
  })
})

app.post("/:_id", (req, res) => {
  var id = req.params._id
  Question.findOneAndUpdate({_id: id}, req.body.question, {new: true}).then(question => {
      res.redirect(`/${id}`)
  })
})
