const Users = require('../model/user/users');
const MentorVideo = require('../model/mentor/mentor_videos');
const MentorDetails = require('../model/mentor/mentor_details');


// const globalConfig = require('../../../config/config');
// const JWT = require('../../../config/jwt_verify');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
exports.mentorlist = (req, res) => {
  // const userid = JWT(req, res);
  // if (userid != null) {
  let page = (req.body.page > 0) ? req.body.page : 0
  let per_page = (req.body.per_page) ? parseInt(req.body.per_page) : 10;
  let sort = req.body.sort;
  let sortasc = sortbyasc(sort);
  let sortby = sortbylabel(sort)
  let search = req.body.search;
  //- for filter request param e.g
  /* "filter":{
     "company": ["5e2980a7f7af413877158ffd", "5e2980a7f7af4138771590a4" ],
     "department":["5e298147b4124638dff79b28"]
   }
   */
  let filter = req.body.filter
  let filterMatch = [{}] //- passing empty array object if there is no value in filter
  if (filter) filterObject(filter)
  //- text search 
  //- e.g  {searchText: 'TCS'}
  let searchQuery = {}
  if (req.body.searchText) {
    searchQuery['$or'] = []
    searchQuery['$or'].push({ "fullname": { $regex: new RegExp(req.body.searchText, "i") } })
    searchQuery['$or'].push({ "profession.company.name": { $regex: new RegExp(req.body.searchText, "i") } })
    searchQuery['$or'].push({ "profession.designation.name": { $regex: new RegExp(req.body.searchText, "i") } })
    searchQuery['$or'].push({ "profession.department.name": { $regex: new RegExp(req.body.searchText, "i") } })
    searchQuery['$or'].push({ "profession.sector.name": { $regex: new RegExp(req.body.searchText, "i") } })
    searchQuery['$or'].push({ "education.college_name.name": { $regex: new RegExp(req.body.searchText, "i") } })
  }
  // let searchq = (search != '') ? { $match: { "fullname": { $regex: new RegExp(search, "i") } } } : { $match: { "fullname": { $ne: '' } } }
  Users.aggregate([
    // searchq,
    { $match: { usertype: 1, status: 1 } },
    { $project: { email: 1, fullname: 1, countryid: 1, stateid: 1, cityid: 1, photo: 1 } },
    {
      "$lookup": {
        from: 'mentor_details',
        let: { parentid: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$userid", "$$parentid"] } } },
          { $project: { position: 1, profiletype: 1, oldid: 1, _id: 0 } },
        ],
        as: 'mentordetails'
      }
    },
    {
      "$match": {
        "mentordetails.position": {
          "$exists": true
        }
      }
    },
    {
      "$lookup": {
        from: 'countries',
        let: { countryid: "$countryid" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$countryid"] } } },
          { $project: { name: 1, _id: 0 } },
        ],
        as: 'countryid'
      }
    },
    {
      "$lookup": {
        from: 'states',
        let: { stateid: "$stateid" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$stateid"] } } },
          { $project: { name: 1, _id: 0 } },
        ],
        as: 'stateid'
      }
    },
    {
      "$lookup": {
        from: 'cities',
        let: { cityid: "$cityid" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$cityid"] } } },
          { $project: { name: 1, _id: 0 } },
        ],
        as: 'cityid'
      }
    },
    {
      "$lookup": {
        from: 'educations',
        let: { parentid: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$userid", "$$parentid"] } } },
          { $project: { college_name: 1, program: 1, department: 1, end: 1, cpi_cgpa: 1 } },

          { // College Name
            "$lookup": {
              from: "colleges",
              let: { childid: "$college_name" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$childid"] } } },
                { $project: { name: 1, _id: 0 } },
              ],
              as: "college_name"
            }
          },
          { // Program Name
            "$lookup": {
              from: "programs",
              let: { childid: "$program" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$childid"] } } },
                { $project: { name: 1, _id: 0 } },
              ],
              as: "program"
            }
          },
          { // Department Name
            "$lookup": {
              from: "departments",
              let: { childid: "$department" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$childid"] } } },
                { $project: { name: 1, _id: 0 } },
              ],
              as: "department"
            }
          }
        ],
        as: 'education'
      }
    },
    {
      "$lookup": {
        from: 'professionals',
        let: { parentid: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$userid", "$$parentid"] } } },
          { $project: { company: 1, designation: 1, sector: 1, department: 1 } },

          { // Company Name
            "$lookup": {
              from: "companies",
              let: { childid: "$company" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$childid"] } } },
                { $project: { name: 1 } },
              ],
              as: "company"
            }
          },
          { // Designation Name
            "$lookup": {
              from: "designations",
              let: { childid: "$designation" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$childid"] } } },
                { $project: { name: 1 } },
              ],
              as: "designation"
            }
          },
          { // Sector Name
            "$lookup": {
              from: "sectors",
              let: { childid: "$sector" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$childid"] } } },
                { $project: { name: 1 } },
              ],
              as: "sector"
            }
          },
          { // Sector Name
            "$lookup": {
              from: "departments",
              let: { childid: "$department" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$childid"] } } },
                { $project: { name: 1 } },
              ],
              as: "department"
            }
          },
        ],
        as: 'profession'
      }
    },
    { $match: searchQuery },
    {
      $match: {
        $or: filterMatch
      }
    },
    {
      $addFields: {
        "end": "$education.end"
      }
    },
    {
      $addFields: {
        "cpi_cgpa": "$education.cpi_cgpa"
      }
    },
    { $sort: { sortby: sortasc } },
    { "$skip": per_page * page },
    { "$limit": per_page },

  ])
    .exec(function (err, data) {
      res.json({
        status: true,
        data: data,
        count: data.length,
        err: err
      })
    })
  // } else {
  // 	res.json({
  // 		status: 401
  // 	})
  // }
}

/*
  request eg.
    {
      mentorId: "5e298d85bacbc44045008c81"
    }
*/
exports.mentorVideoList = async (req, res) => {
  let mentorVideo = await MentorVideo.find({ userid: ObjectId(req.body.mentorId) })
    .populate({
      path: 'userid', select: 'fullname photo email'
    })
  if (!mentorVideo) {
    return res.json({
      status: 401
    })
  }
  let response = mentorVideo.map(video => {
    return {
      fullname: video.userid.fullname,
      email: video.userid.email,
      photo: video.userid.photo,
      userid: video.userid._id,
      type: video.type,
      question: video.question,
      answer: video.answer,
      link: video.link,
      question_type: video.question_type,
      status: video.status,
      _id: video._id
    }
  })
  return res.json({
    status: true,
    data: response
    // err: err
  })
}

exports.mentorProfile = async (req, res) => {

}
function sortbyasc(sort) {
  switch (sort) {
    case "1":
      return 1
      break;
    case "2":
      return 1
      break;
    case "3":
      return 1
      break;
    case "4":
      return -1
      break;
    case "5":
      return 1
      break;
    case "6":
      return -1
      break;
    default:
      return 1
  }
}


function sortbylabel(sort) {
  switch (sort) {
    case "1":
      return "mentordetails.position"
      break;
    case "2":
      return "createdAt"
      break;
    case "3":
      return "cpi_cgpa"
      break;
    case "4":
      return "cpi_cgpa"
      break;
    case "5":
      return "end"
      break;
    case "6":
      return "end"
      break;
    default:
      return "mentordetails.position"
  }
}
// add more filter on the basis of label
function filterObject(filter) {
  filterMatch = []
  for (let key in filter) {
    if (key == 'company') {
      let mapArray = filter[key].map(val => ObjectId(val))
      filterMatch.push({ 'profession.company._id': { $in: mapArray } })
    }
    if (key == 'sector') {
      let mapArray = filter[key].map(val => ObjectId(val))
      filterMatch.push({ 'profession.sector._id': { $in: mapArray } })
    }
    if (key == 'designation') {
      let mapArray = filter[key].map(val => ObjectId(val))
      filterMatch.push({ 'profession.designation._id': { $in: mapArray } })
    }
    if (key == 'department') {
      let mapArray = filter[key].map(val => ObjectId(val))
      filterMatch.push({ 'profession.department._id': { $in: mapArray } })
    }
  }
}
// function filterByLabel(label) {
//   switch (label) {
//     case "comapny":
//       return 'profession.company.name'
//       break;
//     case "sector":
//       return 'profession.sector.name'
//       break;
//     case "designation":
//       return 'profession.designation.name'
//       break;
//     case "department":
//       return 'profession.department.name'
//       break;
//     default:
//       return 'profession.company.name'
//   }
// }