const Validator = require("validator");
const isEmpty = require("is-empty");
 module.exports = function validateBook(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.authors = !isEmpty(data.authors) ? data.authors : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Name field is required";
  }

  if (Validator.isEmpty(data.authors)) {
    errors.authors = "Author field is required";
  } 
return {
    errors,
    isValid: isEmpty(errors)
  };
};