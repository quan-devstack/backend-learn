const homeController = {
  viewHomepage: (req, res) => {
    const title = "I am EJS - An Template Engine";
    const users = ["user1", "user2", "user3"];
    res.render("home/index", { title, users });
  },
};

module.exports = homeController;
