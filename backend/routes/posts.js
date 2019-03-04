const express = require("express");
const multer = require("multer");

const Post = require("../models/post");
checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        //path relative to server.js folder
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
// try to extract single file from the request with the image property  
router.post(
    "",
    checkAuth,
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        const url = req.protocol + '://' + req.get("host");
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imagePath: url + "/backend/images/" + req.file.filename,
            creator: req.userData.userId
        });
        //Check if the access is granted
        // console.log(req.userData);
        // return res.status(200).json();
        post.save().then(createdPost => {
            res.status(201).json({
                message: "Post added successfully",
                post: {
                    //Javascript spread object property 
                    ...createdPost,
                    //add or overwrite some extra property
                    id: createdPost._id
                }
            });
        });
    });

router.put(
    "/:id",
    checkAuth,
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        let imagePath = req.body.imagePath; //if not change img : string 
        if (req.file) { // if upload new picture File
            const url = req.protocol + '://' + req.get("host");
            imagePath = url + "/images/" + req.file.filename;
        }
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath,
            creator: req.userData.userId
        });
        // console.log(post);
        Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
            // console.log(result);
            if (result.nModified > 0) {
                res.status(200).json({ message: "Update successfully" });
            }
            else {
                res.status(401).json({ message: "Not Authorized to Update" });
            }
        })
    });

router.get("", (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchPosts;
    console.log(req.query);
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery.then(documents => {
        fetchedPosts = documents;
        // console.log(documents);
        return Post.count();
    }).then(count => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: fetchedPosts,
            maxPosts: count
        });

    })
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        console.log("Delete result", result);
        if (result.nModified > 0) {
            res.status(200).json({ message: "Delete successfully" });
        }
        else {
            res.status(401).json({ message: "Not Authorized to Delete" });
        }
    });
});

module.exports = router;