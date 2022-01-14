const LIVE = false;     //LIVE: i.e. in development or production(false: dev)

if(LIVE){
    module.exports = require('./prod.js')
}else{
    module.exports = require('./dev.js')
}
