const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const canvasAPI = require('node-canvas-api');
const { convert } = require('html-to-text');
const pdf = require('pdf-parse');
const path = require("path");

async function generateResponse(messages) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  return response.data.choices[0].message.content;
}

async function loadCourses() {
  user = await canvasAPI.getSelf();
  id = user.id;
  courses = await canvasAPI.getCoursesByUser(id);

  const currentDate = new Date();

  const activeCourses = courses.filter(course => {
    const endDate = new Date(course.end_at);
    return endDate >= currentDate;
  });

  const activeCourseIds = activeCourses.map(course => course.id);

  return activeCourseIds;
}

async function load(course_id) {
  messages = [{ role: "system", content: `You are a peer mentor that would help students with questions` }]

  const syllabus = await canvasAPI.getSyllabusOfCourse(course_id);
  const syllabusText = convert(syllabus.syllabus, {});
  const syllabusInput = "For context, this is the syllabus of the course: \n" + syllabusText;
  messages.push({role: "user", content: syllabusInput});

  assignments = await canvasAPI.getAssignments(course_id);
  const assignmentDescriptions = assignments.map(asmt => (asmt.name).concat("\n", convert(asmt.description)));
  // messages.push({role: "user", content: "The following messages are some of the assignments for this course"});
  // for (let i = 0; i < assignmentDescriptions.length; i++) {
  //   messages.push({role: "user", content: assignmentDescriptions[i]});
  // }
  // console.log(messages);

  const modules = await canvasAPI.getModules(course_id);
  // console.log(modules);

  const files = await canvasAPI.getFilesByCourse(course_id);
  // console.log(files);

  messages.push({role: "user", content: "and the following are the course contents"})

  for (let i = 0; i < files.length; i++) {
    if (files[i].mime_class == "pdf" || files[i].mime_class == "txt") {
      await canvasAPI.downloadFile(files[i].id, './tempFiles/');
      const pdf_path = './tempFiles/'+files[i].filename;
            // Read the PDF file using fs.readFileSync
      const data = fs.readFileSync(pdf_path);

      pdf(data).then(function(data) {
        const string = data.text.replace(/[^\x00-\x7F]/g, "").split('\n').filter(line => line.split(" ").length > 3).join('\n').slice(0,Math.round(10000/files.length));
        messages.push({ role: 'user', content: string });
      });
    }
  }

  const directory = "./tempFiles/";

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

  return messages;
}

async function chat(messages, message) {
  messages.push({role: "user", content: message});
  return await generateResponse(messages);
}

async function main(){
  active = await loadCourses();
  console.log(active);
  messages = await load(active[5]);
  console.log(messages);
  response = await chat(messages, "I missed lecture 7 and 8, what should content should I cover before the next lecture?");
  console.log(response);
}

app.post('/askQuestion', (req, res) => {
  const question = req.body.question;
  const Messages = req.body.context;
  console.log(question)
  chat(Messages, question)
    .then(response => {
      res.send({ messages: Messages, answer: response});
      console.log(response)
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Something went wrong' });
    });
});

app.post('/loadBot', (req, res) => {
  const course = req.body.course_id;
  console.log(course)
  load(course)
    .then(response => {
      res.send({ context: response});
      console.log(context)
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Something went wrong' });
    });
});

app.post('/loadUser', (req, res) => {
  loadCourses()
    .then(response => {
      res.send({ courses: response});
      console.log(courses)
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Something went wrong' });
    });
});

main()