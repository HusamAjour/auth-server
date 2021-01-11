module.exports = (err, req, res, next) => {
  console.log('inside Err Handler');
  res.status(500); // internal server error status code
  res.json({ error: 'We have an issue we will fix it soon!' });
};
