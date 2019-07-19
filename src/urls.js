const HOME_PATH = '/';
const POST_PATH = HOME_PATH + 'post/:id';
const POST_FORM_PATH = HOME_PATH + 'post-form';
const PASSWORD_GENERATOR_PATH = HOME_PATH + 'password-generator';

let BACKEND_API_URL = 'http://localhost:5000/posts';

if (process.env.NODE_ENV === 'production') {
  BACKEND_API_URL = '/posts';
}

export { HOME_PATH, POST_PATH, POST_FORM_PATH, PASSWORD_GENERATOR_PATH, BACKEND_API_URL };
