const Patient = require('../models/patient');
const LabUser = require('../models/lab-user');
const User = require('../../models/user');
const AppError = require('../../utils/appError');
const s3 = require('../../config/awsConfig');

const reportUpload = (req, res) => {
    const results = [];
    req.files.map(file => {
        results.push({ fileName: file.originalname, fileLocation: file.location })
    })
    res.status(200).json(results);
}
const createRecord = async (req, res, next) => {
    try {
        const { first_name, last_name, phone_number, results } = req.body;
        let exisitingUser = await User.findOne({ phone_number });
        let existingPatient = await Patient.findOne({ phone_number });

        if (exisitingUser) {
            if (existingPatient) {
                const updatePatient = await Patient.findOneAndUpdate(
                    { phone_number }, {
                    $push: { results: { $each: results } },
                    $set: {
                        userId: exisitingUser._id,
                        lab_user_id: req.user._id,
                        first_name,
                        last_name,
                        phone_number
                    }
                }
                );
                res.status(200).json({ message: 'Patient record updated.' })
            } else {
                const patientData = new Patient({
                    userId: exisitingUser._id,
                    lab_user_id: req.user._id,
                    first_name,
                    last_name,
                    phone_number,
                    results
                })
                await patientData.save();
                res.status(201).json({ message: 'Patient record created.' });
            }
        } else {
            if (existingPatient) {
                const updateRecord = await Patient.findOneAndUpdate(
                    { phone_number }, {
                    $push: { results: { $each: results } },
                    $set: {
                        lab_user_id: req.user._id,
                        first_name,
                        last_name,
                        phone_number
                    }
                }
                );
                res.status(200).json({ message: 'Patient record updated.' })
            } else {
                const savePatient = new Patient({
                    lab_user_id: req.user._id,
                    first_name,
                    last_name,
                    phone_number,
                    results
                })
                await savePatient.save()
                res.status(201).json({ message: 'Patient record created.' })
            }
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
}
const readRecords = async (req, res, next) => {
    try {
        const page = req.query.page || 0;
        const reportsPerPage = 2;
        const records = await Patient
            .find({ lab_user_id: req.user.id })
            .sort("first_name")
            .skip(page * reportsPerPage)
            .limit(reportsPerPage)
        res.status(200).json({ data: records })
    } catch (error) {
        next(error)
    }
}
const readRecord = async (req, res) => {
    try {
        const patient = await Patient.findById({ _id: req.params.id });
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(200).json({ message: 'No record found.' })
        }
    } catch (error) {

    }
}

const updatePatientRecord = async (req, res, next) => {
    try {
        let { phone_number, first_name, last_name, results } = req.body;
        const existingPatient = await Patient.findOne({ phone_number });
        if (existingPatient) {
            let patientData = {
                first_name,
                last_name,
                results
            }
            const updateUser = await Patient.findOneAndUpdate({ phone_number }, patientData);
            res.status(200).json({ message: 'Patient record updated!.', updateUser })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const deletePatientRecord = async (req, res, next) => {
    try {
        const response = await Patient.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Patient record deleted.', response });
    } catch (error) {
        next(error)
    }
}
const searchRecords = async (req, res, next) => {
    try {
        const { phone_number, first_name } = req.query;
        const queryObj = {}
        if (phone_number) {
            queryObj.phone_number = phone_number;
        }
        if (first_name) {
            queryObj.first_name = { $regex: first_name, $options: 'i' }
        }
        console.log(queryObj)
        const record = await Patient.findOne(queryObj);
        if (record) {
            res.status(200).json(record);
        } else if (!record) {
            res.status(200).json({ message: 'No record found' })
        }
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createRecord,
    readRecords,
    readRecord,
    searchRecords,
    reportUpload,
    updatePatientRecord,
    deletePatientRecord
};