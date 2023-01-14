const { 
    getAbouts,
    getAboutById,
    saveAbout,
    updateAbout,
    deleteAbout}=require("../controllers/AboutControllers");
 
const router=require("express").Router();
router.get('/abouts', getAbouts);
router.get('/abouts/:id', getAboutById);
router.post('/abouts', saveAbout);
router.patch('/abouts/:id', updateAbout);
router.delete('/abouts/:id', deleteAbout);
 
module.exports= router;
