const Portfolio = require("../Models/PortfolioModel");

module.exports.getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find();
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getPortfolioById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.params.id });
        if (portfolio) {
            res.json(portfolio);
        } else {
            res.status(404).json({ message: 'portfolio not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.savePortfolio = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }
        const images = req.files.map(file => file.originalname);
        const portfolio = new Portfolio({
            user: req.body.user,
            images: images,
            categorie: req.body.categorie,
            title: req.body.title,
            description: req.body.description,
        });

        const insertedportfolio = await portfolio.save();
        res.status(201).json(insertedportfolio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.updatePortfolio = async (req, res) => {
    try {
        if (req.files) {
            const images = req.files.map(file => file.path);
            req.body.images = images;
        }
        const updatedportfolio = await Portfolio.updateOne({ portfolio: req.params.id }, { $set: req.body });
        res.status(200).json(updatedportfolio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

 
module.exports.deletePortfolio = async (req, res) => {
    try {
        const deletedportfolio = await Portfolio.deleteOne({_id:req.params.id});
        res.status(200).json(deletedportfolio);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}