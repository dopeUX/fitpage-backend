const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const data = require('./data');
const dataValues = require('./dataValues');

app.use(express.json());
app.use(cors());


router.route('/').get(async(req, res)=>{
  res.send('hello server');
});

router.route('/get-data').get(async(req, res)=>{
  res.send(data);
});

///// Code to calculate values on server side ---------------------------
// router.route('/get-detailed-data').get(async(req, res)=>{
//    const detailedData = data.find(o=>o.id==req.query.id);
//    let d = detailedData?.criteria.map((x,i)=>{
//     switch (x.type) {
//       case 'plain_text':
//         return x.text;
//       case 'variable':  
//        let text = x.text;
//         console.log(Object.keys(x.variable))
//         Object.keys(x.variable).forEach((variable, index)=>{
//         //  text=x.text.replace('$1', '-3');
//          if(x.variable[variable].type=='value'){
//            text = x.text.replace(variable, x.variable[variable].values[0]);
//          }
//          else if(x.variable[variable].type=='indicator'){
//            text = x.text.replace(variable, x.variable[variable].default_value);
//          }
//       })
//         return text;  
//       default:
//         return null;
//     }
     
//    })
  
//    res.send(d);  
// })
////////////////////////////

router.route('/get-detailed-data').get(async(req, res)=>{
  const detailedData = data.find(o=>o.id==req.query.id);
  const values = dataValues[req.query.id];
  res.send({criteria:detailedData.criteria, dataValues:values});
});

router.route('/get-detailed-data-values').get(async(req, res)=>{
  const detailedData = data.find(o=>o.id==req.query.id);
  const dataValues = detailedData.criteria[req.query.index].variable[req.query.variable].values;
  res.send(dataValues);
})

app.listen(3000, ()=>{
  console.log('server started');
});

app.use(router);