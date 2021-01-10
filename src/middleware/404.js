module.exports = (req, res, next) => {
    console.log('inside NOTFounf');
    res.status(404);
    res.json({error: 'Not Found!'});
}