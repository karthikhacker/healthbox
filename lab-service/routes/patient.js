const express = require('express');
const router = express.Router();
const upload = require('../../config/multerConfig');
const auth = require('../middleware/auth-middleware');

const { createRecord, readRecords, reportUpload, updatePatientRecord, deletePatientRecord, readRecord, searchRecords } = require('../patient-record/patient-service');

router.post('/report/upload', auth, upload.array('files', 6), reportUpload);
router.post('/create/record', auth, createRecord);
router.get('/records', auth, readRecords);
router.get('/record/:id', auth, readRecord);
router.get('/search/record', auth, searchRecords);
router.put('/patient/record/update', auth, updatePatientRecord);
router.delete('/delete/patient/:id', auth, deletePatientRecord);

module.exports = router;