const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongodb = require("mongodb");
const URL = process.env.DATABASE_OH_YEAH;
const DB = "studentTeacherProject";
const PORT = process.env.PORT || 6969;

//MIDDLE WARE
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json(["Hello"]);
});

let students = [];

app.post("/student", async function (req, res) {
  try {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let user = await db.collection("student").insertOne(req.body);
    await connection.close();
    console.log(user);

    res.json("data added");
  } catch (error) {
    res.send(error);
  }
});

app.get("/student", async function (req, res) {
  try {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let users = await db.collection("student").find().toArray();
    await connection.close();

    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

app.get("/student/:id", async function (req, res) {
  try {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let user = await db
      .collection("student")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (error) {
    res.send(error);
  }
});

app.put("/student", async function (req, res) {
  try {
    //To do later
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);

    let teacher = await db
      .collection("teachers")
      .findOne({ _id: mongodb.ObjectId(req.body.teacherID) });

    let student = await db.collection("student").updateOne(
      { _id: mongodb.ObjectId(req.body.studentID) },
      {
        $set: {
          teacher: teacher.teacher,
        },
      }
    );

    await connection.close();

    res.json({
      message: "Data is updated",
    });
  } catch (error) {
    res.send(error);
  }
});

let teachers = [];

app.post("/teacher", async function (req, res) {
  try {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let user = await db.collection("teachers").insertOne(req.body);
    await connection.close();
    console.log(user);

    res.json({ message: "teacher data added" });
  } catch (error) {
    res.send(error);
  }
});

// NOT DONE
app.put("/teacher", async function (req, res) {
  try {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);

    let student = await db
      .collection("student")
      .findOne({ _id: mongodb.ObjectId(req.body.studentID) });

    let teacher = await db.collection("teachers").updateOne(
      { _id: mongodb.ObjectId(req.body.teacherID) },
      {
        $push: {
          students: student.student,
        },
      }
    );

    await connection.close();

    res.json({
      message: "Data is updated",
    });
  } catch (error) {
    res.send(error);
  }
});

app.get("/teacher", async function (req, res) {
  let connection = await mongodb.connect(URL);
  let db = connection.db(DB);
  let users = await db.collection("teachers").find().toArray();
  await connection.close();
  res.json(users);
});

app.get("/teacher/:id", async function (req, res) {
  try {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let user = await db
      .collection("teachers")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    res.json(user);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});

