/* eslint-disable no-console */

const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    login: 'test_github_user',
    avatar_url: 'https://www.fillmurray.com/g/200/300',
    email: 'test@test.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
