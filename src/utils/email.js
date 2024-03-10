import nodemailer from"nodemailer";



async function sendEmail({from=process.env.EMAIL , to ,cc,bcc,subject , text , html,attachments=[]}={}){


  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
    tls:{
      rejectUnauthorized:false 
    }
  });
  
  const info = await transporter.sendMail({
      from: `"Amighous" <${from}>`, 
      to, 
      subject,
      cc,
      bcc, 
      text, 
      html,
      attachments 
  });
  
    
    
    return info.rejected.length?false:true
}

export default sendEmail