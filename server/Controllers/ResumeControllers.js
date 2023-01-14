const Resume = require("../Models/ResumeModel");

 

module.exports.getResume = async (req, res) => {
    try {
        const resume = await Resume.find();
        res.json(resume);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ user: req.params.id });
        if (resume) {
            res.json(resume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 
module.exports.saveResume = async (req, res) => {
    const resume = new Resume(req.body);
    try {
        const insertedresume = await resume.save();
        res.status(201).json(insertedresume);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
module.exports.updateResume = async (req, res) => {
    try {
        const updatedresume = await Resume.updateOne({user:req.params.id}, {$set: req.body});
        res.status(200).json(updatedresume);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
module.exports.deleteResume = async (req, res) => {
    try {
        const deletedresume = await Resume.deleteOne({_id:req.params.id});
        res.status(200).json(deletedresume);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}