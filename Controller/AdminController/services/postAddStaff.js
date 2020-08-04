const Teacher = require("../../../ModelClass/Class/Teacher");
const Employee = require("../../../ModelClass/Class/EmployeeTrainingDepartment");
const Subject = require("../../../ModelClass/Class/Subject");
const flag = require("../../../ModelClass/Helper/resource/Flag")

const postAddStaff =  async (req, res, next) => {
    const {username, password, identityCard, fullName, dob, address, phoneNumber, gender, typeUser} = req.body;
    const typeUserInt = parseInt(typeUser,10);
    const genderInt = parseInt(gender,10);
    if (typeUserInt === flag.TYPE_USER.TEACHER)
    {
        const subjectID = req.body;
        const newTeacher = new Teacher(
            username,
            username,
            password,
            identityCard,
            fullName,
            dob,
            genderInt,
            address,
            1,
            typeUserInt,
            phoneNumber,
            subjectID
        );
        await Teacher.Save(newTeacher);
    }
    if (typeUserInt === flag.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT)
    {
        const newEmployee = new Employee(
            username,
            username,
            password,
            identityCard,
            fullName,
            dob,
            genderInt,
            address,
            1,
            typeUserInt,
            phoneNumber,
        );
        await Employee.Save(newEmployee);
    }
    req.flash("success_msg", "Thành công.");
    res.redirect(`/admin/employee`);    
}

module.exports = postAddStaff;