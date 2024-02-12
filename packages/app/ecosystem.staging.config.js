module.exports = {
  apps: [
    {
      name: 'packd-staging',
      script: './server.js',
      watch: false,
      env: {
        PORT: '31231',
      },
    },
  ],
};
