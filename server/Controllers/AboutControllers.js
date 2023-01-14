const About = require("../Models/AboutModel");

 

module.exports.getAbouts = async (req, res) => {
    try {
        const abouts = await About.find();
        res.json(abouts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAboutById = async (req, res) => {
    try {
        const about = await About.findOne({ user: req.params.id });
        if (about) {
            res.json(about);
        } else {
            res.status(404).json({ message: 'About not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 
module.exports.saveAbout = async (req, res) => {
    const about = new About(req.body);
    try {
        const insertedabout = await about.save();
        res.status(201).json(insertedabout);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
module.exports.updateAbout = async (req, res) => {
    try {
        const updatedabout = await About.updateOne({user:req.params.id}, {$set: req.body});
        res.status(200).json(updatedabout);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
module.exports.deleteAbout = async (req, res) => {
    try {
        const deletedabout = await About.deleteOne({_id:req.params.id});
        res.status(200).json(deletedabout);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}