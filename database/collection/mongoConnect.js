const welderList = require('mongoose');

welderList.Promise= global.Promise;

welderList.connect('mongodb://localhost:27017/Welderlist').then(
  (client)=>{
    console.log('conected to mongoosedb server');
  },
  (err)=>{
    console.log('cant connect to mongoose server: ',err);
  }
);

module.exports={welderList}
