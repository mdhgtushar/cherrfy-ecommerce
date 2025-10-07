exports.getAllMedia = (req, res) => {
    res.json([
        {
          "name": "banner.png",
          "url": "http://localhost:5000/uploads/banner.png"
        },
        {
          "name": "logo.jpg",
          "url": "http://localhost:5000/uploads/logo.jpg"
        }
      ])
}