jQuery.validator.addMethod(
  "validFullname",
  function (value, element) {
    return (
      value.indexOf(" ") > 0 &&
      value.split(" ")[0].length > 1 &&
      value.split(" ")[1].length > 1
    );
  },
  "Please enter a valid fullname"
);

jQuery.validator.addMethod(
  "lettersonly",
  function (value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
  },
  "fullname must contain only letters and spaces"
);

jQuery.validator.addMethod(
  "validUsername",
  function (value, element) {
    return value.indexOf(" ") < 0;
  },
  "Please enter a valid username"
);

jQuery.validator.addMethod(
  "validEmail",
  function (value, element) {
    return /^[0-9-+]+$/i.test(value);
  },
  "Please enter a valid phone number"
);

jQuery.validator.addMethod(
  "validEmail",
  function (value, element) {
    return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value);
  },
  "Please enter a valid email address."
);

jQuery.validator.addMethod(
  "validRole",
  function (value, element) {
    return value == "student" || value == "instructor";
  },
  "hey little hacker 🤣"
);

$signupForm = $(".signupForm");
$signupForm.validate({
  rules: {
    fullname: {
      required: true,
      minlength: 5,
      validFullname: true,
      lettersonly: true,
    },
    username: {
      required: true,
      validUsername: true,
      minlength: 3,
    },
    email: {
      required: true,
      validEmail: true,
    },
    role: {
      required: true,
      validRole: true,
    },
    phone: {
      required: true,
    },
    password: {
      required: true,
      minlength: 8,
    },
    repassword: {
      required: true,
      equalTo: "#password",
    },
  },

  messages: {
    fullname: {
      required: "User must have a Fullname",
      minlength: "fullname must have at least 5 characters",
    },
    username: {
      required: "User must have a username",
      minlength: "username must have at least 3 characters",
    },
    email: {
      required: "User must have an email",
    },
    role: {
      required: "Please select your role",
    },
    phone: {
      required: "User must have a phone number",
    },
    password: {
      required: "User must have a password",
      minlength: "password must have at least 8 characters",
    },
    repassword: {
      required: "User must confirm password",
      equalTo: "password not match",
    },
  },

  errorPlacement: function (error, element) {
    if (element.is(":radio")) {
      error.appendTo(element.parents(".form__input__group"));
    } else {
      error.insertAfter(element);
    }
  },
});

$loginForm = $(".loginForm");
$loginForm.validate({
  rules: {
    email: {
      required: true,
      validEmail: true,
    },
    password: {
      required: true,
    },
  },

  messages: {
    email: {
      required: "Please enter your email",
    },
    password: {
      required: "Please enter your password",
    },
  },
});

$updateForm = $(".updateForm");
$updateForm.validate({
  rules: {
    fullname: {
      required: true,
      minlength: 5,
      validFullname: true,
    },
    username: {
      required: true,
      validUsername: true,
      minlength: 3,
    },
    email: {
      required: true,
      validEmail: true,
    },
    role: {
      required: true,
    },
    phone: {
      required: true,
    },
  },

  messages: {
    fullname: {
      required: "User must have a Fullname",
      minlength: "fullname must have at least 5 characters",
    },
    username: {
      required: "User must have a username",
      minlength: "username must have at least 3 characters",
    },
    email: {
      required: "User must have an email",
    },
    role: {
      required: "Please select your role",
    },
    phone: {
      required: "User must have a phone number",
    },
  },

  errorPlacement: function (error, element) {
    if (element.is(":radio")) {
      error.appendTo(element.parents(".form__input__group"));
    } else {
      error.insertAfter(element);
    }
  },
});

$uploadCVForm = $(".uploadCVForm");
$uploadCVForm.validate({
  rules: {
    uploadCV: {
      required: true,
      extension: "png|jpeg|jpg",
    },
  },

  messages: {
    uploadCV: {
      required: "Please upload your cv",
      extension: "file type not accepted",
    },
  },
});

$blockForm = $(".blockForm");
$blockForm.validate({
  rules: {
    reasons: {
      required: true,
    },
  },

  messages: {
    reasons: {
      required: "Please set the reasons",
    },
  },
});
