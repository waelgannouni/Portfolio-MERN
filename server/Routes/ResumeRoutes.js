const { 
    getResume,
    getResumeById,
    saveResume,
    updateResume,
    deleteResume}=require("../controllers/ResumeControllers");
 
const router=require("express").Router();
router.get('/resume', getResume);
router.get('/resume/:id', getResumeById);
router.post('/resume', saveResume);
router.patch('/resume/:id', updateResume);
router.delete('/resume/:id', deleteResume);
 
module.exports= router;
