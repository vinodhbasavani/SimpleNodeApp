import httpStatusCodes from 'http-status-codes';

const healthController = {};


healthController.index = (req,res) => {
  return res.status(httpStatusCodes.OK).json({
        status: 'success',
        data: 'service is healthy'
    });
}

export default healthController;
