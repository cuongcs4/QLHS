const Relatives = require("../../../Model/Class/Relatives");
const flag = require("../../../Model/Helper/resource/Flag");

const getProfile = async (req, res, next) => {
    const user = { ...req.user };
    const listRelativesView = [];
    switch (user.typeUser) {
      case flag.TYPE_USER.STUDENT:
        user.className = await req.user.getClassName();
        const listRelatives = await Relatives.Find(user.id);
        if (listRelatives !== null) {
            for (let i = 0; i < listRelatives.length; i++) {
                const result = listRelatives[i];
                listRelativesView.push({
                    relative: result.relative,
                    fullName: result.fullName,
                    phoneNumber: result.phoneNumber
                })
            }
        }
        break;
  
      case flag.TYPE_USER.TEACHER:
        user.subjectName = await req.user.getSubjectName();
        break;
  
      case flag.TYPE_USER.HOMEROOM_TEACHER:
        user.subjectName = await req.user.getSubjectName();
        user.className = await req.user.getClassName();
        break;
    }

    res.render("profile", {
        title: "Profile",
        style: ["styleProfile.css", "styleTable.css"],
        pagename: "Thông tin cá nhân",
        user,
        listRelativesView,
        type: user.typeUser
      });
};

module.exports = getProfile;
