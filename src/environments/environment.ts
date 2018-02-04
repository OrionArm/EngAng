// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: 'http://localhost:8000/',
  tokenAuth: 'http://localhost:8000/api/v1/auth/login/',
  tokenRefresh: 'http://localhost:8000/api/v1/auth/token-refresh/',
  registrationUrl: 'http://localhost:8000/api/v1/auth/register/',
  userInfo: 'http://localhost:8000/api/v1/auth/user-info/',
  loginSuccess: '/signin/ok',
  users: 'http://localhost:8000/users',
  fbHost: 'https://mind-app-1e5eb.firebaseio.com/',
  OauthLoginEndPointUrl: 'https://oauth.vk.com/authorize',
  clientId: '5998974',
  clientSecret: '74rRjfbE6kyc3hZt6Gy2',
  firebaseConfig: {
    apiKey: 'AIzaSyA6v7RZc1ifCwwuELVNRXNjkZlIFnx99XI',
    authDomain: 'engang-3fdef.firebaseapp.com',
    databaseURL: 'https://engang-3fdef.firebaseio.com',
    projectId: 'engang-3fdef',
    storageBucket: '',
    messagingSenderId: '183735966097'
  }
};
