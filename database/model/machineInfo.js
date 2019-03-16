var mongoose= require('mongoose')


const machineInfo = mongoose.model('machineInfo',{
  Name:{type: 'string',trim:true},
  No:{type:'number'},
  macAdd:{type: 'string',require:true},
  ipAdd:{type:'string',require:true},
})

module.exports={machineInfo}
