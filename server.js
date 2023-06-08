const express = require('express');
const app = express();
const port = 5000;
const OPEN_HOUR = 9;
const CLOSE_HOUR = 17;


app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use((req,res,next) => {
    const date = new Date()
    const day = date.getDay()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second =date.getSeconds()
    if(day >= 1 && day <= 5){
        req.day = 0
    } else if (day===6){
        req.day=2
    }
    else{req.day=1}
    if (hour < OPEN_HOUR || hour >= CLOSE_HOUR) {
        req.workinghours = false; 
        req.hour = OPEN_HOUR - hour + 24;}
    req.minute = 60-minute;
    req.second =60-second
    req.workinghours=(day >= 1 && day <= 5 && hour >= OPEN_HOUR && hour <= CLOSE_HOUR)    //here test closing hours
    //req.workinghours=(day >= 0 && day <= 6 && hour >= 00 && hour <= 23)     //here test opening hours
    next()
  
  });
 

app.get('/',(req,res)=>{
    res.render('home', { workinghours: req.workinghours ,day:req.day, hour :req.hour, minute :req.minute ,second:req.second});
})
app.get('/services',(req,res)=>{
    res.render(__dirname+'/views/services.ejs',{ workinghours: req.workinghours ,day:req.day, hour :req.hour, minute :req.minute ,second:req.second})
})

app.get('/contact',(req,res)=>{
    res.render(__dirname+'/views/contact.ejs',{ workinghours: req.workinghours ,day:req.day, hour :req.hour, minute :req.minute ,second:req.second})
})
app.listen(port, console.log('App is live now on port ' + port));