import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "uvbs.online@gmail.com",
        pass: "rsyfmaggrmxczlht", 
    },
});

export const mailToPasswordChange = async (to, name, password) => {
    await transporter.sendMail({
        from: "UVBS", 
        to, 
        subject: "One Time Password", 
        text: "Password Change", 
        html: `
            Hi ${name},
            <br />
            Your password : <b>${password}</b>
            <br />
            This is the One Time Password, use this password to change a new password for your UVBS.
        `,
    });
}

export const mailToOrderPlacement = async (to, name, ) => {
    await transporter.sendMail({
        from: "UVBS", 
        to, 
        subject: "Order Placed", 
        text: "Order Placed", 
        html: `
            Hi ${name},
            <br />
            <h1> Your order has been placed <h1/>
            <br />
        `,
    });
}
