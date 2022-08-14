const { getAll } = require('../models/Posts');

let posts = [];

const postForm = document.querySelector('#post-form');

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(postForm);
  formData.get('title');
  formData.get('content');
});

async function handlePageLoad() {
  posts = await getAll();
}
