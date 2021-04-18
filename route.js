const express = require("express");
const StudentData = require("./Model/studentdata");
const Student = require("./Model/student");
const bookdata = require("./Model/book");
const Video = require("./Model/video");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./verifyToken");

const router = express.Router();

router.get("/studentData", async (req, res) => {
  const student = await StudentData.find();
  res.send(student);
});

router.get("/bookdata", async (req, res) => {
  const book = await bookdata.find();
  res.send(book);
});

router.post("/bookdata", async (req, res) => {
  const book = new bookdata({
    name: req.body.name,
    qty: req.body.qty,
  });
  await book.save();
  res.send(book);
});
router.delete("/bookdata/:name", async (req, res) => {
  await bookdata.deleteOne({ name: req.params.name }, (err, d) => {
    if (err)
      return res.status(400).send({ err: "Book is not found!! No such data." });
    if (d.deletedCount > 0) res.send("Book data is deleted successfully");
    else res.send("Record doesn't exist or already deleted");
  });
});
router.patch("/bookdata/:name", async (req, res) => {
  try {
    const book = await bookdata.findOne({ name: req.params.name });
    book.name = req.body.name;
    await book.save();
    res.send(book);
  } catch (error) {
    res.send(error);
  }
});

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashpwd = await bcrypt.hash(req.body.pwd, salt);
  const reg = new StudentData({
    userName: req.body.uname,
    userPwd: hashpwd,
  });
  await reg.save();
  res.send(reg);
});

router.post("/login", async (req, res) => {
  const user = await StudentData.findOne({ userName: req.body.uname });
  if (!user) return res.send("Invalid User...");
  const isvalid = await bcrypt.compare(req.body.pwd, user.userPwd);
  if (isvalid) {
    const token = jwt.sign({ _id: user._id }, "privatekey");
    res.header("auth-token", token);
    res.send(token);
  }
});

router.get("/video", auth, async (req, res) => {
  const video = await Video.find();
  res.send(video);
});

router.post("/video", auth, async (req, res) => {
  const video = new Video({
    title: req.body.title,
    desc: req.body.desc,
    posted_by: req.body.posted_by,
    url: req.body.url,
    likes: req.body.likes,
    cat: req.body.cat,
  });
  await video.save();
  res.send(video);
});

router.get("/pvdata", auth, (req, res) => {
  res.json({
    title: "No Data...!",
    desc: "No Data...!",
  });
});

router.delete("/rkuStudent/:id", async (req, res) => {
  await Student.deleteOne({ _id: req.params.id }, (err, d) => {
    if (err)
      return res.status(400).send({ err: "Student is not found!! No such data." });
    if (d.deletedCount > 0) res.send("Student data is deleted successfully");
    else res.send("Record doesn't exist or already deleted");
  });
});

router.patch("/rkuStudent/:id",async (req,res)=>{
  try {
    const rkuStudent = await Student.findOne({ _id: req.params.id });
    rkuStudent.name = req.body.name;
    rkuStudent.rno = req.body.rno;
    rkuStudent.email = req.body.email;
    rkuStudent.dob = req.body.dob;
    rkuStudent.branch = req.body.branch;
    rkuStudent.gen = req.body.gen;
    // console.log(req.body);
    console.log("RKU "+ req.body.branch);
    await rkuStudent.save();
    res.send(rkuStudent);
  } catch (error) {
    res.send(error);
  }
});

router.post("/rkuStudent", async (req, res) => {
     try {
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(req.body.pass, salt);
       const rkuStudent = new Student({
         name: req.body.name,
         rno: req.body.eno,
         email:req.body.email,
         pass:hashpwd,
         branch: req.body.dept,
         dob: req.body.dob,
         gen: req.body.gen1
       });
       console.log(rkuStudent);
       await rkuStudent.save();
       res.send(rkuStudent);
     } catch (error) {
       res.send("error");
     }
   });
   
   router.get("/rkuStudent", async (req, res) => {
    const rkuStudent = await Student.find();
    res.send(rkuStudent);
  });

  router.post("/ulogin", async (req, res) => {
    const user = await Student.findOne({ email: req.body.email });
    if (!user) return res.send("Invalid User..."+req.body.email+" Pass: "+req.body.pass);
    const isvalid = await bcrypt.compare(req.body.pass, user.pass);
    if (isvalid) {
      const token = jwt.sign({ _id: user._id }, "privatekey");
      // res.header("auth-token", {token});
      res.send({token});
    }
  });

  router.get('/user/:id',auth,async(req,res)=>{
    const user = await StudentData.findOne({_id:req.params.id});
  });

router.post("/register", async (req, res) => {
  try {
    const rkuStudent = new Student({
      name: req.body.name,
      rno: req.body.rno,
      branch: req.body.branch,
      dob: req.body.dob,
      gen: req.body.gen,
    });

    await rkuStudent.save();
    res.send(rkuStudent);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
