module.exports = {
  apps: [
    {
      name: 'packd',
      script: './server.js',
      watch: false,
      env: {
        PORT: '3123',
      },
    },
  ],
};
