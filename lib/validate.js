export function blogValidate(values) {
  const errors = {};

  // name validation
  if (!values.username) {
    errors.username = "Please enter your Account-Name";
  }

  // title validation
  if (!values.title) {
    errors.username = "Required";
  }

  // highlight validation
  if (values.highlight.length < 20) {
    errors.highlight = "Please enter highlight about 20 words !";
  } else if (values.highlight.length > 400) {
    errors.highlight = "Please enter highlight about 20-400 words !";
  }
  // blog validation
  if (!values.blog) {
    errors.blog = "Required";
  } else if (values.blog.length < 100) {
    errors.blog = "Minimum Length of your blog is 100 words.";
  }

  return errors;
}

export function contactValidate(values) {
  const errors = {};

  // email validation
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //   subject validation
  if (!values.subject) {
    errors.subject = "Required";
  }

  //   Mesaage validation

  if (!values.message) {
    errors.message = "Required";
  }
}
