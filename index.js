const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const canvasAPI = require('node-canvas-api')

const test = async () => {
  user = await canvasAPI.getSelf();
  console.log(user);
  id = user.id;
  courses = await canvasAPI.getCoursesByUser(id);

  const currentDate = new Date();

  const activeCourses = courses.filter(course => {
    const endDate = new Date(course.end_at);
    return endDate >= currentDate;
  });

  const activeCourseIds = activeCourses.map(course => course.id);

  console.log(activeCourseIds);

  // assignments = await canvasAPI.getAssignments(activeCourseIds[0], []);
  // console.log(assignments);

  const syllabus = await canvasAPI.getSyllabusOfCourse(activeCourseIds[0]);
  console.log(syllabus.syllabus);
}

test()