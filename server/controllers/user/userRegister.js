const register = (req,res) => {
   try {
    res.status(200).send({
        success: true,
        data: "register",
      });
   } catch (e) {
    return res.status(400).send({
        success: false,
        message:  e.message,
      });
   }
}

module.exports = register