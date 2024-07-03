const Express = require("express");
const MyRouter = Express.Router();

const users = require("../Models/Users/Users");
const usersSchema = require("../Schema/Users/Users");



//get All
MyRouter.get("/", async (req, res) => {
    const C = await users.find();
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});


MyRouter.post("/Add", async (req, res) => {
    const NewUser = req.body;

    // console.log(NewUser);

    const { error } = usersSchema(NewUser);
    if (error) {
        res.status(404).send({ message: error.details[0].message });
    } else {
        try {
            const UpdateUser = await users.findOne({ email: NewUser.email });
            if (UpdateUser) {
                return res.status(404).send({ message: "User Already Exists" });
            }



            let AddUser = new users(NewUser);
            AddUser = await AddUser.save();

            res.send(AddUser);

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
});



// Update Data 
MyRouter.patch("/Update/:id", async (req, res) => {
    const UpdateUsers = await users.findOne({ _id: req.params.id });
    // console.log(UpdateUsers);
    UpdateUsers.users = req.body.users

    try {
        const C = await UpdateUsers.save();
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});

// Delete Data
MyRouter.delete("/Delete/:id", async (req, res) => {
    const deleteusers = users.findOne({ _id: req.params.id });
    try {
        const C = await deleteusers.remove();
        res.send(C);
    } catch (Error) {
        res.send("Error: " + Error);
    }
});


module.exports = MyRouter;
