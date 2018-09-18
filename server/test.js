const sharp = require('sharp');

sharp('public/uploads/1536128832997.jpg')
  .resize(200)
  .toFile('public/uploads/1536128832997_200.jpg', (err, info) => {
    if(err){
      console.log(err);
      return;
    }
    console.log(info);
  });
