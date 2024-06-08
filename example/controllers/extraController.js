exports.extra = (req, res) => {
    console.log("/extra endpoint is reached");
    res.send("Hello from the extra route!");
};  