import _ from "lodash";
const checkNumber = (input)=>{
    if (typeof input === "number"){
        return true;
    }
    return !input ||  !!input.match(/^\d+$/);
};
const checkUser = (userName)=>{
    return {
        state: !!(userName && userName.trim().length >= 6 && userName.trim().length <= 16)
    };
};
const checkPassword = (password)=>{
    return {
        state: !!(password && password.trim().length >= 8 && password.trim().length <= 12),
    };
};
const checkCardAndPin = (cardNo, pin)=>{
    const state = (cardNo && cardNo.trim() && pin && pin.trim() && pin.trim().length === 6);
    return {
        state,
        failed: state ? null : (cardNo && cardNo.trim() ? "pin" : "card")
    };
};
const checkCardAndPinWithTerms = (cardNo, pin, agreeConditions)=>{
    const state = (cardNo && cardNo.trim() && pin && pin.trim() && pin.trim().length === 6 && agreeConditions);
    return {
        state,
        failed: state ? null : (cardNo && cardNo.trim()) ? (pin && pin.trim() && pin.trim().length === 6) ? "terms" : "pin" : "card"
    };
};
const checkOTP = (password, confirmPassword)=>{
    const state = (password && password.trim().length >= 8 && password.trim().length <= 12 && confirmPassword && (password === confirmPassword));
    return {
        state,
        failed: state ? null : (password && password.trim().length >= 8 && password.trim().length <= 12 ? "confirmPassword" : "password")
    };

};
const checkUsernamePasswordEmail = (userName,  password, confirmPassword, email, otp)=>{
    const emailAddress = !!(email && email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/));
    const username = !!(userName && userName.trim().length >= 6 && userName.trim().length <= 16);
    const pass = !!(password && password.trim().length >= 8 && password.trim().length <= 12);
    const confirmPass = !!(confirmPassword && (password === confirmPassword));
    const oneTimePassword = !!(otp);
    const state = (username && pass && confirmPass && emailAddress && oneTimePassword);
    const resultObj = {
        username: !username,
        pass: !pass,
        confirmPass: !confirmPass,
        emailAddress: !emailAddress,
        oneTimePassword: !checkUsernamePasswordEmail
        };
    let failed = "";
    _.find(resultObj, (value, key)=>{
        failed = key;
        return value;
    });
    return {
        state,
        failed: state ? null : failed
    };

};
const checkAgreeTerms = (agreeConditions)=>{
    return {
        state: !!(agreeConditions)
    };
};
const checkSecurityQuestions = (securityPhrase, adaptQustion1, adaptQustion2, adaptQustion3, adaptAnswer1, adaptAnswer2, adaptAnswer3)=>{
    const phrase = !!(securityPhrase && securityPhrase.trim().length <= 40);
    const question1 = !!adaptQustion1;
    const question2 = !!adaptQustion2;
    const question3 = !!adaptQustion3;
    const answer1 = !!adaptAnswer1;
    const answer2 = !!adaptAnswer2;
    const answer3 = !!adaptAnswer3;
    const state = (phrase && question1 && answer1 && question2 && answer2 && question3 && answer3);
    const resultObj = {
            phrase: !phrase,
            question1: !question1,
            answer1 : !answer1,
            question2: !question2,
            answer2: !answer2,
            question3: !question3,
            answer3: !answer3
    };
    let failed = "";
    _.find(resultObj, (value, key)=>{
        failed = key;
        return value;
    });
    return {
        state,
        failed: state ? null : failed
    };
};
const checkImageSize = (image)=>{
    return {
        state: !!(Math.round((image.length) * 3 / 4) <= 50000)
    };
};
export default {
    checkNumber,
    checkUser,
    checkPassword,
    checkCardAndPin,
    checkCardAndPinWithTerms,
    checkOTP,
    checkUsernamePasswordEmail,
    checkSecurityQuestions,
    checkAgreeTerms,
    checkImageSize
};
