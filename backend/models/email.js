
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("c5g5_esctest_2024@trial-x2p0347jdxk4zdrn.mlsender.net", "TEST EMAIL C5G5 ESC");

const recipients = [
  new Recipient("chuantian_foo@mymail.sutd.edu.sg", "Your Client")
];

async function send() {
const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setSubject("This is a Subject")
  .setHtml("<strong>AHHHHHHHHH</strong>")
  .setText("This is the text content");

mailerSend.email
	.send(emailParams)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
};

module.exports = {send}