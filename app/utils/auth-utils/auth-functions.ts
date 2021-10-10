async function getTokenFromCreds({username, password}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        resolve('otkealnfdsalfj');
      } else {
        console.log('invalid');
        reject(new Error('Invalid creds.'));
      }
    }, 1500);
  });
}

async function validateToken(token) {
  const tokenStore = ['token1', 'toktok', 'otkealnfdsalfj'];
  const expired = ['token1'];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tokenStore.includes(token)) {
        if (expired.includes(token)) {
          reject(new Error('Expired.'));
        } else {
          resolve(token);
        }
      } else {
        reject(new Error('Invalid token'));
      }
    }, 1000);
  });
}

export {getTokenFromCreds, validateToken};
