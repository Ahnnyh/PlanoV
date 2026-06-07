const express = require('express');
const { searchCompanies, searchProviders } = require('../controllers/companyController');
const router = express.Router();

router.get('/', searchCompanies);
router.get('/providers', searchProviders);

module.exports = router;