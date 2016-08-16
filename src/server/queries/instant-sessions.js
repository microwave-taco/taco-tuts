var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;

function requestInstantSession(req, res, next) {
  var studentID = req.body.studentID;
  var teacherID = req.body.teacherID;
  var subjectID = req.body.subjectID;

  db.one(`INSERT INTO instantSessionRequests (studentID, teacherID, subjectID)
    VALUES ($1, $2, $3) RETURNING *`, [studentID, teacherID, subjectID] )
    .then(respondWithData(res, 'Added live session request'))
    .catch(catchError(next));
}

function getStudentRequests(req, res, next) {
  var authID = req.params.authID;

  db.any(`SELECT * FROM instantSessionRequests AS i
    WHERE i.studentAuthId=$1`, [authID])
    .then(respondWithData(res, 'Found student\'s instant requests'))
    .catch(catchError(next));
}

module.exports = {
  requestInstantSession: requestInstantSession,
  getStudentRequests: getStudentRequests
};