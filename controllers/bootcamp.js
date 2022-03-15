//importing mongoose schema
const Bootcamp = require('../models/Bootcamps')
const ErrorResponse = require('../utils/customError');
// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            status: 'success',
            count: bootcamps.length,
            data: bootcamps
        });

    } catch (error) {
        next(error)
    }
}
// @desc    create bootcamps
// @route   POST /api/v1/bootcamps
// @access  Private

exports.createBootcamp = async (req, res, next) => {
    //the data is added according to model and validation checks are done
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(200).json({
            status: 'success',
            data: bootcamp
        });
    } catch (error) {
        next(error)
    }
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public

exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        //if the id is not found but in valid format
        //return because you can set properties more than once even though thery are in if statements etc.
        if (!bootcamp) {
            //correct format but not found
            return next(new ErrorResponse(`bootcamp not found with id: ${req.params.id}`, 404));
        }
        res.status(200).json({
            status: 'success',
            id: req.params.id,
            data: bootcamp
        });
    } catch (error) {
        // next(new ErrorResponse(`bootcamp not found with id: ${req.params.id}`, 404));
        next(error);
    }
}
// @desc    Update single bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        //if the id is not found but in valid format
        //return because you can set properties more than once even though thery are in if statements etc.
        if (!bootcamp) {
            return next(new ErrorResponse(`bootcamp not found with id: ${req.params.id}`, 404));
        }
        res.status(200).json({
            status: 'success',
            id: req.params.id,
            data: bootcamp
        });
    } catch (error) {
        next(error)
    }
}
// @desc    Delete single bootcamps
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        //if the id is not found but in valid format
        //return because you can set properties more than once even though thery are in if statements etc.
        if (!bootcamp) {
            return next(new ErrorResponse(`bootcamp not found with id: ${req.params.id}`, 404));
        }
        res.status(200).json({
            status: 'success',
            id: req.params.id,
            data: bootcamp
        });
    } catch (error) {
        next(error)
    }
}
