
var queryActions = 'SELECT * FROM actions WHERE school_id = ? AND posted_date >= ?';
var queryActionsStars = 'SELECT * FROM actions_stars WHERE school_id = ? AND posted_date >= ?';
var queryActionsStarsUsers = 'SELECT * FROM actions_stars_users WHERE user_id = ? AND school_id = ? AND posted_date >= ?';
var queryPosts = 'SELECT * FROM posts   WHERE school_id = ? AND posted_date >= ?';
var queryPostsStars = 'SELECT * FROM posts_stars WHERE school_id = ? AND posted_date >= ?';
var queryPostsStarsUsers = 'SELECT * FROM posts_stars_users WHERE user_id = ? AND school_id = ? AND posted_date >= ?';
var escuela = 11;
var fecha = '2016-08-01';
var user;

var queries = {
  mysqlQueryPosts: "SELECT post_id, school_id, post_timestamp, poster_id, " +
          "CONCAT(up.first_name,' ', up.father_lastname) AS poster_name, " +
          " p.content, photo, " +
          "IFNULL((stars_total / stars_users), 0) AS stars_avg, " +
          " IFNULL(stars_given, 0) AS stars_given, category, comment_id, " +
          "comment_timestamp, commenter_id, " +
          "CONCAT(uc.first_name,' ', uc.father_lastname) AS commenter_name, " +
          " c.content AS comment_content " +
          "FROM posts p " +
          "LEFT JOIN comments c ON p.post_id = c.parentpost_id " +
          "JOIN users up ON p.poster_id = up.user_id " +
          "LEFT JOIN users uc ON c.commenter_id = uc.user_id " +
          "LEFT JOIN postsstars_peruser stars ON p.post_id = stars.postid AND stars.userid = 2 " +
          "WHERE post_timestamp >= '2016-08-01' " +
          "AND p.school_id = 1 " +
          "ORDER BY post_timestamp DESC, comment_timestamp DESC",
  mysqlQueryActions: "SELECT action_id, school_id, action_timestamp, poster_id, " +
          "CONCAT(ua.first_name,' ', ua.father_lastname) AS poster_name, " +
          "title, act.description, problem, goal, act.start_date, act.due_date, " +
          " act.status, results, category, " +
          "IFNULL((stars_total / stars_users), 0) AS stars_avg,  " +
          "IFNULL(stars_given, 0) AS stars_given, " +
          "task_id, tas.timestamp AS task_timestamp, tas.ownerid,  " +
          "CONCAT(ut.first_name,' ', ut.father_lastname) AS task_ownername, " +
          "tas.description AS task_description, " +
          "tas.startdate AS task_startdate, tas.duedate AS task_duedate, " +
          "tas.status AS task_status " +
          "FROM actions act " +
          "LEFT JOIN tasks tas ON act.action_id = tas.parentaction_id " +
          "JOIN users ua ON act.poster_id = ua.user_id " +
          "LEFT JOIN users ut ON tas.ownerid = ut.user_id " +
          "LEFT JOIN actionsstars_peruser stars ON act.action_id = stars.actionid AND stars.userid = 2 " +
          "WHERE action_timestamp >= '2016-08-01' " +
          "AND act.school_id = 1 " +
          "ORDER BY action_timestamp DESC, task_timestamp DESC"
};
module.exports = queries;


