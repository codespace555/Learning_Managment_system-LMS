const login = (req,res) => {
    try {
        res.status(200).send({
            success: true,
            data: "login",
          });
       } catch (e) {
        return res.status(400).send({
            success: false,
            message:  e.message,
          });
       }
}

module.exports = login