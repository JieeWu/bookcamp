/** @type {import('next').NextConfig} */
const nextConfig = {
  // 預設情況,有發ajax,會幫你渲染兩次
  reactStrictMode: true,

  // Server Side Render時可使用
  env :{
    API_SERVER: 'http://18.177.136.227:3002'
  },
  server: {
    port: 80, // 您想要的端口號
  },
}

module.exports = nextConfig
