const router = require('express').Router();
const Book = require('./Models/book');
const Student = require('./Models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./verifyToken');

// 1st routes for books collection or book model
router.get("/bookdata", async (req, res) => {
    const book = await Book.find();
    res.send(book);
});

router.get("/studlist", async (req, res) => {
    const studl = await Student.find();
    res.send(studl);
});

//-------------------JSONWebToken Api Routes------------------
//user registration using authentication(jwt)
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(req.body.pass, salt);
    const rkuStudent = new Student({
      name: req.body.name,
      rno: req.body.rno,
      email:req.body.email,
      pass:hashpwd,
      branch: req.body.branch,
      dob: req.body.dob,
      gen: req.body.gen1
    });

    await rkuStudent.save();
    res.send(rkuStudent);
  } catch (error) {
    res.send(error);
  }
});
//user login using authentication(jwt)
router.post("/ulogin", async (req, res) => {
  const user = await Student.findOne({ email: req.body.email });
  if (!user) return res.send("Invalid User..."+req.body.email+" Pass: "+req.body.pass);
  const isvalid = await bcrypt.compare(req.body.pass, user.pass);
  if (isvalid) {
    const token = jwt.sign({ _id: user._id }, "privatekey");
    //res.header("Authorization", token);
    res.send({token});
  }
});
//fetch studentslist after Authentication using JWT.
router.get("/rkuStudent", auth, async (req, res) => {
  const rkuStudent = await Student.find();
  res.send(rkuStudent);
});
//-------------------JSONWebToken Api Routes------------------

//to find particular students using enrollment no.
router.get("/rkuStudent/:uid", async (req, res) => {
  const students = await Student.find({ rno: req.params.uid });
  res.send(students);
});

//updating route
router.patch("/rkuStudent/:id",async (req,res)=>{
  try {
    const rkuStudent = await Student.findOne({ _id: req.params.id });
    rkuStudent.name = req.body.name;
    rkuStudent.rno = req.body.rno;
    rkuStudent.email = req.body.email;
    rkuStudent.dob = req.body.dob;
    rkuStudent.branch = req.body.branch;
    rkuStudent.gen = req.body.gen1;
    // console.log(req.body);
    console.log("RKU "+ req.body.branch);
    await rkuStudent.save();
    res.send(rkuStudent);
  } catch (error) {
    res.send(error);
  }
});

//deleting route
router.delete("/rkuStudent/:id", async (req, res) => {
  await Student.deleteOne({ _id: req.params.id }, (err, d) => {
    if (err)
      return res.status(400).send({ err: "Student is not found!! No such data." });
    if (d.deletedCount > 0) res.send("Student data is deleted successfully");
    else res.send("Record doesn't exist or already deleted");
  });
});

module.exports = router;
