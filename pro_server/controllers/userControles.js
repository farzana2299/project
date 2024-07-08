const users = require("../model/userModel")
const projects = require("../model/projectModels")

const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(400).json("user Allready exist")
        } else {
            const newUser = new users({
                userName, email, password, profile: "", linkdIn: "", gitHub: ""
            })
            await newUser.save()
            res.status(200).json(`${userName} registread sussussfully`)
        }
    } catch (error) {


        res.status(404).json("Register api is not working")

    }
}

//login

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const currentUser = await users.findOne({ email, password })
        if (currentUser) {
            const token = jwt.sign({ _id: currentUser._id }, "superkey123")
            res.status(200).json({ user: currentUser, token })
        }
        else {
            res.status(404).json("incorrect username or password")
        }


    } catch (err) {
        res.status(401).json("Login api not working")


    }

}

exports.addProject = async (req, res) => {
    const { title, overView, languages, gitHub, website } = req.body

    //projectImg=multer
    const proImg = req.file?.filename

    //user id   ==middleware-jwt
    const userId = req.payload
    try {
        const existingPro = await projects.findOne({ gitHub })
        if (existingPro) {
            res.status(406).json("Project already present ! Try with new one")
        }
        else {
            const newPro = new projects({
                title, overView, languages, gitHub, website, proImg, userId
            })
            await newPro.save()
            res.status(200).json(newPro)
        }
    }
    catch (err) {
        res.status(401).json("Adding Project api not working")
    }
}

exports.userProjects = async (req, res) => {
    //id
    const userId = req.payload
    try {
        const allUserProjects = await projects.find({ userId })
        if (allUserProjects) {
            res.status(200).json(allUserProjects)
        }
        else {
            res.status(200).json("User not added any project yet")
        }
    }
    catch (err) {
        res.status(401).json("Project get api is not working")
    }
}

exports.allLimitProjects = async (req, res) => {

    try {
        const allProjects = await projects.find().limit(3)
        if (allProjects) {
            res.status(200).json(allProjects)
        }
        else {
            res.status(200).json("Not added any project yet")
        }
    }
    catch (err) {
        res.status(401).json("Project get api is not working")
    }
}
//searching all to print all projects.
exports.allProjects = async (req, res) => {
    const searchData = req.query.search
    try {
        //req exp query
        const query = {
            languages: { $regex: searchData, $options: "i" }
        }
        const allProjects = await projects.find()
        if (allProjects) {
            res.status(200).json(allProjects)
        }
        else {
            res.status(200).json("Not added any project yet")
        }
    }
    catch (err) {
        res.status(401).json("Project get api is not working")
    }
}
exports.editProject = async (req, res) => {
    const { title, overView, languages, gitHub, website, proImg } = req.body
    //pro image= muler
    const projectImage = req.file ? req.file.filename : proImg
    const { _id } = req.params
    try {
        const existingPro = await projects.findOne({ _id })
        if (existingPro) {
            existingPro.title = title
            existingPro.overView = overView
            existingPro.languages = languages
            existingPro.gitHub = gitHub
            existingPro.website = website
            existingPro.proImg = proImg

            await existingPro.save()
            res.status(200).json("Project updated")
        }
        else {
            res.status(400).json("Project not found")
        }
    }
    catch (err) {
        res.status(401).json("Project edit api is not working")
    }
}

exports.editProfile = async (req, res) => {
    const { userName, gitHub, linkedIn, profile } = req.body
    const userId = req.payload
    const userProfile = req.file ? req.file.filename : profile
    try {
        const selectedUser = await users.findOne({ _id: userId })
        if (selectedUser) {
            selectedUser.userName = userName
            selectedUser.gitHub = gitHub
            selectedUser.linkedIn = linkedIn
            selectedUser.profile = userProfile

            await selectedUser.save()
            res.status(200).json(selectedUser)
        }
    }
    catch (err) {
        res.status(401).json("Profile edit api is not working")
    }
}