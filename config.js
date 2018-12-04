const dev= {
    DB_URL: 'postgresql://postgres:hataguy@localhost:5432/haita',
};

const prod={
    DB_URL: 'msm',
};
const config=process.env.NODE_ENV==='development'?prod:dev;
export default config;
