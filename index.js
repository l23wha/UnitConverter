const express = require('express');
const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});


app.get('/convert', (req, res) => {
    // Form se aane wali values yahan milengi
    let inputValue = parseFloat(req.query.value);
    const fromUnit = req.query.from;
    const toUnit = req.query.to;

      if(isNaN(inputValue)){
           return res.send("Please enter a valid number");
      }

      let result=0;

      const lengthToMeters={
         'milimeter':0.001,
         'centimeter':0.01,
         'meter':1,
         'kilometer':1000,
         'inch':0.0254,
         'foot':0.3048,
         'yard':0.9144,
         'mile':1609.34,
      }

      const weightToGrams={
          'miligram':0.001,
          'gram':1,
          'kilogram':1000,
          'ounce':28.3495,
          'pound':453.592
      }

         if(lengthToMeters[fromUnit]!==undefined && lengthToMeters[toUnit]!==undefined){
             let valueInMeters=inputValue*lengthToMeters[fromUnit];
             result=valueInMeters/lengthToMeters[toUnit];
         }

         else if(weightToGrams[fromUnit]!==undefined && weightToGrams[to]!==undefined){
              let valueInGrams=inputValue*weightToGrams[fromUnit]; 
               result=valueInGrams/weightToGrams[toUnit];
         }
         else if((fromUnit==='celsius' || fromUnit==='fahrenheit' || fromUnit==='kelvin') && (toUnit==='celsius' || toUnit===
            'fahrenheit' || toUnit==='kelvin'
         )){

              let celsius;
              // dekho phle input ko celsius meain convert kro 
              if(fromUnit==='celsius')celsius=inputValue;
              else if(fromUnit==='fahrenheit')celsius=(inputValue-32)*5/9;
              else if(fromUnit==='kelvin') celsius=celsius+273.15;

              //ab celsius se target unit me convert kro
              if(toUnit==='celsius')result=celsius;
              else if(toUnit==='fahrenhiet') result=(celsius*9/5)+32;
              else if(toUnit==='kelvin') result=celsius+273.15;

         }else{
            return res.send(`Invalid units or mixing different categories`)
         }


    

    // Abhi ke liye bas test response bhej rahe hain
    res.send(`Converted Value: ${inputValue} (${fromUnit} = <b>${result.toFixed(4)} ${toUnit} </b>`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
