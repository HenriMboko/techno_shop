var userModel = require("../models/userModel");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
//const usersModel = require("../models/userModel");

const registerUser = async (req, res, next) => {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fileds are required" });

    const duplicateUser = await userModel.findOne({ email }).lean().exec();

    if (duplicateUser)
        return res.status(400).json({ message: "Duplicate Username" });

    //Hach password
    const hashPassword = await bcrypt.hash(password, 10);

    userModel
        .create({
            name,
            email,
            password: hashPassword,
            isAdmin,
        })
        .then((user) => {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToeken(user._id),
            });
        })
        .catch((er) => console.log(er));
};

const loginUser = async (req, res, next) => {
    const { email, password, isAdmin } = req.body;

    const user = await userModel.findOne({ email }).lean().exec();

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToeken(user._id),
        });
    } else {
        res.status(400).json({ message: "credential incorrect..." });
    }
};

//@Get /Profile
//@route Get /api/users/update
//@access Private

const profile_User = async (req, res, next) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        isAdmin: req.user.isAdmin,
    };
    res.status(200).json(user);
};

//@Get Upadate/Profile
//@route Get /api/users/update
//@access Private

const update_User = async (req, res, next) => {
    const { name, email, password, isAdmin } = req.body;

    const user = await userModel.findById(req.user._id);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;

        // Hash password
        user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const userUpdate = await user.save();

    res.status(200).json({
        _id: userUpdate._id,
        email: userUpdate.email,
        name: userUpdate.name,
        isAdmin: userUpdate.isAdmin,
        token: generateToeken(userUpdate._id),
    });
};

// GEt All User
const all_user = async (req, res, next) => {
    const user = await userModel.find({}).exec();

    res.status(200).json(user);
};

//Generate Token
const generateToeken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: 36000 });
};

module.exports = {
    registerUser,
    loginUser,
    profile_User,
    all_user,
    update_User
};
