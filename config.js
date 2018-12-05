const dev= {
    DB_URL: 'postgresql://postgres:hataguy@localhost:5432/ireporter',
};

const prod={
    DB_URL: 'postgres://kltnfgcglgqpte:5780034eb6287e7a2d44f0c1e0dcd6fa0722e340d28e01358a6aa2b076430c33@ec2-54-204-40-248.compute-1.amazonaws.com:5432/d9r3jt1juvu6cq',
};
const config=process.env.NODE_ENV==='development'?dev:prod;
console.log(process.env.NODE_ENV);
export default config;
