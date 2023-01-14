const { 
    getPortfolio,
    getPortfolioById,
    savePortfolio,
    updatePortfolio,
    deletePortfolio}=require("../controllers/PortfolioControllers");
 
const router=require("express").Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
router.get('/portfolio', getPortfolio);
router.get('/portfolio/:id', getPortfolioById);
router.post('/portfolio', upload.array('images', 12), savePortfolio);
router.patch('/portfolio/:id', upload.array('images', 12), updatePortfolio);
router.delete('/portfolio/:id', deletePortfolio);
module.exports= router;
