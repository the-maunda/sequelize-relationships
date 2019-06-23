var express = require('express');
var router = express.Router();

const companyController = require('../controllers').company;
const branchController = require('../controllers').branch;
const profileController = require('../controllers').profile;
const userController = require('../controllers').user;
const roleController = require('../controllers').role;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Company routes */
router.get('/api/company', companyController.index);
router.get('/api/company/:id', companyController.show);
router.post('/api/company', companyController.create);
router.put('/api/company/:id', companyController.update);
router.delete('/api/company/:id', companyController.delete);

// /* branch routes */
router.get('/api/branch', branchController.index);
router.get('/api/branch/:id', branchController.show);
router.post('/api/branch', branchController.create);
router.put('/api/branch/:id', branchController.update);
router.delete('/api/branch/:id', branchController.delete);


// /* Profile routes */
router.get('/api/profile', profileController.index);
router.get('/api/profile/:id', profileController.show);
router.post('/api/profile', profileController.create);
router.put('/api/profile/:id', profileController.update);
router.delete('/api/profile/:id', profileController.delete);


// /* User routes */
router.get('/api/users', userController.index);
router.get('/api/users/:id', userController.show);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);
router.delete('/api/users/:id', userController.delete);

// /* role routes */
router.get('/api/roles', roleController.index);
router.get('/api/roles/:id', roleController.show);
router.post('/api/roles', roleController.create);
router.put('/api/roles/:id', roleController.update);
router.delete('/api/roles/:id', roleController.delete);

// /* Advanced Routes. */
router.post('/api/role/add_user', roleController.addUser);
router.post('/api/company/add_with_branches', companyController.addWithBranches);

module.exports = router;
