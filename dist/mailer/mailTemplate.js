export function emailVerificationView(token, timeRemaining) {
    const link = `http://localhost:8081/medly/verify/${token}`;
    const minutes = Math.floor(timeRemaining / (1000 * 60));
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const temp = `
       <div style="max-width: 700px;text-align: center; text-transform: uppercase;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to medly</h2>
       <p>Please Follow the link by clicking on the button to verify your email
        </p>
        <div style="text-align:center ;">
          <a href=${link}
         style="background: #277BC0; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>

        </div>

        <p>Your verification link will expire in:
        ${minutes} minutes ${seconds} seconds, for you to verify your email.
        </p>
     </div>
        `;
    return temp;
}
export const htmlTemplates = (otp) => {
    const temp = `
    <div style="max-width: 700; font-size:110%; border: 10px solid #ddd; padding: 50px 20px; marging: auto;">
        <h2 style ="text-transform: uppercase; text-align: center; color: teal;">Welcome to Roodi Technology</h2>
        <p>Hi there, your otp is <span style="font-weight: bold; font-size: 20px">${otp}</span>, it will expire in 30min</p>
    </div>
    `;
    return temp;
};
export function htmlTemplate(otp) {
    const temp = `
      <div style="max-width: 700px;text-align: center;background: #f4f8fd;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to Roodi </h2>
        <div style="text-align:center ; color:black;"><br>
        <h3 style="color: teal;">Hi, Your OTP is ${otp}</h3>
        </div>
     </div>
        `;
    return temp;
}
export function otpMessage(checkOtp) {
    const temp = `
      <div style="max-width: 700px;text-align: center;background: #f4f8fd;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Login OTP</h2>
        <div style="text-align:center ; color:black;"><br>
        <h3 style="color: teal;">Your OTP is ${checkOtp}</h3>
        </div>
     </div>
        `;
    return temp;
}
export function emailVerification() {
    const link = `https://r22h-onboard-and-menu-service.fly.dev/login`;
    const temp = `
       <div style="max-width: 700px;text-align: center; text-transform: uppercase;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to Roodi</h2>
       <p>Please Follow the link by clicking on the button to route you our log in page
        </p>
        <div style="text-align:center ;">
          <a href=${link}
         style="background: #277BC0; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>

         </p>

        </div>

     </div>
        `;
    return temp;
}
export function teacherEmailVerification() {
    const link = `https://r22h-onboard-and-menu-service.fly.dev/login`;
    const temp = `
       <div style="max-width: 700px;text-align: center; text-transform: uppercase;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to Roodi</h2>
       <p>Please Follow the link by clicking on the button to route you our signed in page
        </p>
        <div style="text-align:center ;">
          <a href=${link}
         style="background: #277BC0; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
         <p>Welcome onboard to your class</p>
         </p>

        </div>

     </div>
        `;
    return temp;
}
//# sourceMappingURL=mailTemplate.js.map