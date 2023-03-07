const send = (res, data) => {
    res.status(200);
    res.send({
      status: true,
      data,
    });
  };
  
  const error = (res, data, errorCode = 400) => {
    res.status(errorCode);
    res.send({
      status: false,
      data,
    });
  };
  
  module.exports = {
    send,
    error,
  };