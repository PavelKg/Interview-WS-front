module.exports = {
  apps : [{
    name      : 'Interview-WS-f',
    script    : 'server.js',
    env: {
      NODE_ENV: 'development',
      NODE_PORT: 7788
    },
    env_production : {
      NODE_ENV: 'production',
      NODE_PORT: 7788
    }
  }],
  deploy : {
    production : {
      user : 'interview',
      host : 'dev.pepex.kg',
      ref  : 'origin/master',
      repo : 'git@github.com:PavelKg/Interview-WS-front.git',
      path : '~/services/interview-frontend',
      'post-deploy' : 'npm i && npm run build &&  pm2 startOrRestart ecosystem.config.js --env production'
    },
    development : {
      user : 'interview',
      host : 'dev.pepex.kg',
      ref  : 'origin/development',
      repo : 'git@github.com:PavelKg/Interview-WS-front.git',
      path : '~/services/interview-frontend',
      'post-deploy' : 'npm i && npm run build &&  pm2 startOrRestart ecosystem.config.js --env development'
    }
  }
};
