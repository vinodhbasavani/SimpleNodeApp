import httpStatusCodes from 'http-status-codes';

const registerController = {}

registerController.index = (req,res) => {
  return res.status(httpStatusCodes.OK).json({
    status: 'success',
    data: 'register controller'
  });
}

export default registerController;
