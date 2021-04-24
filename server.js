const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 6969

//MIDDLE WARE
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json(["Hello"]);
});

let students = [];

app.post("/student", function (req, res) {
  if (req.body.id == "" || req.body.id == undefined) {
    req.body.id = students.length + 1;
  }

  students.push(req.body);

  console.log(students);

  res.json("data added");
});

app.get("/student", function (req, res) {
  res.json(students);
});

app.get("/student/:id", function (req, res) {
  let studentLinkID = req.params.id;
  let student = students.filter((da) => da.id == studentLinkID);
  res.json(student);
});

app.put("/student", function (req, res) {
  // const studentLinkID = req.params.id;
  // console.log(studentLinkID);

  let student = students.filter((stu) => stu.id == req.body.studentID);
  console.log(student);
  console.log(req.body);

  let teacher = teachers.filter((teacher) => teacher.id == req.body.teacherID);
  console.log(teacher);

  student[0].teacher = teacher[0].teacher;
  console.log(student);

  res.json({
    message: "Data is updated",
  });
});

let teachers = [];

app.post("/teacher", function (req, res) {
  if (req.body.id == "" || req.body.id == undefined) {
    req.body.id = teachers.length + 1;
  }
  console.log(req);
  teachers.push(req.body);
  console.log(teachers);

  res.json({ message: "teacher data added" });
});

app.put("/teacher", function (req, res) {
  let teacherLinkID = req.body.id;
  let teacherData = teachers.filter((teacher) => teacher.id == teacherLinkID);
  console.log(teacherData);

  let assignedStudents = req.body.students;
  console.log(assignedStudents);

  teacherData[0].students = assignedStudents;

  console.log(teacherData);

  res.json({
    message: "students recieved",
  });
});

app.get("/teacher", function (req, res) {
  res.json(teachers);
});

app.get("/teacher/:id", function (req, res) {
  let teacherLinkID = req.params.id;
  let teacherData = teachers.filter((teacher) => teacher.id == teacherLinkID);

  res.send(teacherData);
});

//What is difference between patch and put? What is patch?

app.listen(PORT , ()=>{console.log(`Server running on port ${PORT}`)});

// app.put("/teacher", function (req, res) {
//   let teacherLinkID = req.body.id;
//   let teacherData = teachers.filter((teacher) => teacher.id == teacherLinkID);
//   console.log(teacherData);

//   let assignedStudents = req.body.students;

//   teacherData[0].students = assignedStudents;

//   console.log(teacherData);

//   res.json({
//     message: "students recieved",
//   });
// });
