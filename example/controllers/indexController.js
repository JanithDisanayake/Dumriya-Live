exports.home = (req, res) => {
    console.log("/ endpoint is reached");
    res.send("Hello World!");
};
  
exports.hello = (req, res) => {
    console.log("/hello endpoint is reached");
    res.send("Hello from Lambda!");
};  