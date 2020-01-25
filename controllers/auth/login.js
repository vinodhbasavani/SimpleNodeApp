import httpStatusCodes from 'http-status-codes';

const loginController = {}

loginController.index = (req,res) => {
  return res.status(httpStatusCodes.OK).json({
    status: 'success',
    data: 'login controller'
  });
}

export default loginController;
