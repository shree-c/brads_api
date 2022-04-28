//just like bootcamps controller but for courses
const ErrorResponse = require('../utils/customError');
const async_handler = require('../utils/asynchandler');
const Course = require('../models/Courses');
const Bootcamps = require('../models/Bootcamps');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

exports.getAllCourses = async_handler(async (req, res, next) => {
    //building query is different from executing query
    //use await to execute the query
    let query;
    if (req.params.bootcampId) {
        query = Course.find({
            bootcamp: req.params.bootcampId
        });
    } else {
        //populate the result with info of bootcamps the course is made for
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }
    const courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
}
);

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = async_handler(async (req, res, next) => {
    let query = Course.find({ _id: req.params.id }).populate({
        path: 'bootcamp',
        select: 'name description'
    });
    const course = await query;
    if (!course) {
        return next(
            new ErrorResponse(`no course exists with ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: course
    });
}
);

// @desc    add a course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  private
exports.addCourse = async_handler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    const bootcamp = await Bootcamps.find({ _id: req.params.bootcampId });
    const course = await Course.create(req.body);
    if (!bootcamp) {
        return next(
            new ErrorResponse(`no bootcamp exists with ${req.params.bootcampId}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: course
    });
}
);

// @desc    update a course
// @route   PUT /api/v1/courses/:id
// @access  private
exports.updateCourse = async_handler(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    });
    if (!course) {
        return next(
            new ErrorResponse(`no course exists with ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: course
    });
}
);

// @desc    delete a course
// @route   PUT /api/v1/courses/:id
// @access  private
exports.deleteCourse = async_handler(async (req, res, next) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(`no course exists with ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: course
    });
}
);