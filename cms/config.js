var config = {
  development: {
    name: 'Post Tool',
    serverPort: 3002,
    useCluster: false,
    mongoConnectString: 'mongodb://localhost/ptd-1',
    sessionSecret: '787878d78787878787878787878',
    storage: "cloudinary",
    cloudinaryConfig: { cloud_name: 'posttool', api_key: '681946288916643', api_secret: 'L08_8W3noETBoKaMk9CV8paLlx8' }

  },
  production: {
    name: 'Post Tool',
    serverPort: 3002,
    useCluster: false,
    mongoConnectString: 'mongodb://localhost/ptd-1',
    sessionSecret: '09909090901909090901909090190',
    storage: "cloudinary"
  }
}

module.exports = config[process.env.NODE_ENV || 'development'];