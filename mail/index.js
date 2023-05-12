import { format } from 'date-fns';
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
        from: "uvbs.online@gmail.com", 
        to, 
        subject: "One Time Password", 
        text: "Password Change", 
        html: `
            Hi ${name},
            <br >
            Your password : <b>${password}</b>
            <br >
            This is the One Time Password, use this password to change a new password for your UVBS.
        `,
    });
}

export const mailToOrderPlacement = async (to, name, order) => {
    let createdAt = format(new Date(order?.createdAt), "d MMM yyyy");
    createdAt.toString();

    let deliveryDate = format(new Date(order?.deliveryDate), "d MMM yyyy");
    deliveryDate.toString();

    let products = await JSON.parse(order?.products)
    let totalProducts = products?.length;
    let totalItems = 0;

    await products?.map(p => totalItems = totalItems + p?.quantity)

    await transporter.sendMail({
        from: "uvbs.online@gmail.com", 
        to, 
        subject: "Order Placed", 
        text: "Order Placed", 
        html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>UVBS Order Confirmation</title>
        </head>
        <body style="background-color: rgb(248, 252, 255) !important; font-family: 'Roboto'; display: flex !important; align-items: center !important; justify-content: center !important; flex-direction: column !important; min-width: 100vw !important; max-width: 1024px !important;>
        
            <img src="https://dl.dropboxusercontent.com/s/79qunbwvarzijqg/fg.png?dl=0" width="100%" height="100px" style="object-fit: cover;" alt="">

            <div style="text-align: center !important; margin: 20px; min-width: 100% !important">
                <h5 style="margin: 10px;">Hi <span style="color: rgb(0, 123, 255);">${name}</span></h5>
                <h2 style="margin: 0;">Your order has been placed</h2>
            </div>

            <div style="background-color: rgba(0, 119, 255, 0.827); color: white; padding: 10px; border-radius: 10px;">
                <h6 style="margin: 0; text-align: center;"><span style="color: black; margin-right: 5px;">Order ID: </span> ${order?.id}</h6>
            </div>

            <div style="min-width: 100% !important; display: flex !important; align-items: center !important; justify-content: center !important; flex-wrap: wrap;">
                <div style="margin: 20px; background-color: white;  max-width: 40% !important; padding: 20px; box-shadow: 4px 4px 30px rgba(0, 136, 255, 0.071); border-radius: 20px;">
                    <div style="display: flex !important; align-items: center !important; gap: 5px;">
                        <img style="width: 15px; padding: 5px; background-color: rgb(239, 249, 255); border-radius: 50%;" src="https://img.icons8.com/fluency-systems-filled/48/339AF0/shopping-cart.png" alt="">
                        <h6 style="margin: 0; margin: 10px 0 0 5px;">Order</h6>
                    </div>
                    <div style="margin-top:15px; font-size: 10px; font-weight: bold;">
                        <p style="margin: 2px;">Order Date: <span style="color: rgb(0, 183, 255);">${createdAt}</span></p>
                        <p style="margin: 2px;">Order Status: <span style="color: rgb(0, 183, 255);">${order?.status}</span></p>
                        <p style="margin: 2px;">Estimated Delivery: <span style="color: rgb(0, 183, 255);">${order?.deliveryDate}</span></p>
                        <p style="margin: 2px;">Payment Mode: <span style="color: rgb(0, 183, 255);">${order?.payment_mode}</span></p>
                        <p style="margin: 2px;">Payment Status: <span style="color: rgb(0, 183, 255);">${order?.payment_status}</span></p>
                    </div>
                </div>
        
                <div style="margin: 20px; background-color: white;  max-width: 40% !important; padding: 20px; box-shadow: 4px 4px 30px rgba(0, 136, 255, 0.071); border-radius: 20px;">
                    <div style="display: flex !important; align-items: center !important; gap: 5px;">
                        <img style="width: 15px; padding: 5px; background-color: rgb(239, 249, 255); border-radius: 50%;" src="https://img.icons8.com/fluency-systems-filled/48/339AF0/marker.png" alt="">
                        <h6 style="margin: 0; margin: 10px 0 0 5px;">Shipping</h6>
                    </div>
                    <div style="margin-top: 15px; font-size: 10px; font-weight: bold;">
                        <p style="margin: 2px;">${order?.line1}</p>
                        <p style="margin: 2px;">${order?.line2}</p>
                        <p style="margin: 2px;">${order?.city}</p>
                        <p style="margin: 2px;">${order?.state}</p>
                        <p style="margin: 2px;">${order?.country}</p>
                        <p style="margin: 2px;">${order?.zip}</p>
                    </div>
                </div>
            </div>

            <div style="width: 90%;">
                <div style="display: flex !important; align-items: center !important; gap: 10px;">
                    <img style="width: 20px; padding: 7px; background-color: rgb(239, 249, 255); border-radius: 50%;" src="https://img.icons8.com/fluency-systems-filled/48/339AF0/purchase-order.png" alt="">
                    <h5 style="margin: 0; margin: 10px 0 0 5px;">Order Summary</h5>
                </div>
                <div style="margin-top: 20px; min-width: 100% !important; font-size: small;">
                    <div style="display: flex !important; align-items: center !important; justify-content: space-between; flex-wrap: wrap;">
                        <p style="margin: 2px;">Total Products</p>
                        <p style="margin: 2px; margin-left: auto;">${totalProducts}</p>
                    </div>
                    <div style="display: flex !important; min-width: 100% !important; align-items: center !important; justify-content: space-between; flex-wrap: wrap;">
                        <p style="margin: 2px;">Total Items</p>
                        <p style="margin: 2px; margin-left: auto;">${totalItems}</p>
                    </div><div style="margin-top: 10px; display: flex !important; align-items: center !important; justify-content: space-between; flex-wrap: wrap;">
                        <p style="margin: 2px; font-weight: bold;">Total Price</p>
                        <p style="margin: 2px; font-weight: bold; font-size: x-large; margin-left: auto;">₹${order?.price}</p>
                    </div>
                </div>
            </div>


        </body>
        `,
    });
}
