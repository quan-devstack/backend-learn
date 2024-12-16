const userController = {
  userPage: (req, res) => {
    // req.query: get the query on URL
    const query = req.query.status;
    const message = req.query.message;
    req.session.message = "F8";
    res.send(
      `
      <h1>This is user page</h1>
      <p>User Status: ${query} </p>
      <p>User Message:${message} </p>
      `
    );
  },

  viewUser: (req, res) => {
    console.log(req.session.message);
    res.send(`All users`);
  },

  viewId: (req, res) => {
    // req.params: get the dynamic value in URL
    const userId = req.params.userId;
    res.send(`Kích hoạt người dùng ${userId}`);
  },
};

module.exports = { userController };
