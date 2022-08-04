import express from 'express';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  app.get('/filteredimage', async (req, res) => {
    const imageUrl = req.query.image_url;
    if (!imageUrl) {
      return res.status(400).send('image_url query param is mandatory');
    }
    const filteredImage = await filterImageFromURL(imageUrl);
    res.sendFile(filteredImage, () => {
      deleteLocalFiles([filteredImage]);
    });
  });
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();