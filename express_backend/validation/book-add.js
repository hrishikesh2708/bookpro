const Validator = require("validator");
const isEmpty = require("is-empty");
 module.exports = function validateBook(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.author = !isEmpty(data.author) ? data.author : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Name field is required";
  }

  if (Validator.isEmpty(data.author)) {
    errors.authors = "Author field is required";
  } 
return {
    errors,
    isValid: isEmpty(errors)
  };
};