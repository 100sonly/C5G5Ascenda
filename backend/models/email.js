
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("c5g5_esctest_2024@trial-x2p0347jdxk4zdrn.mlsender.net", "TEST EMAIL C5G5 ESC");

async function send(personalInfo, bookingsDetails, hotelDetails) {
  const recipients = [new Recipient(personalInfo.emailAddress, "Your Client")];
  subject = "Confirmed booking - " + bookingsDetails.hotelName;
  text_body = 
  `<p>Dear ${personalInfo.salutation} ${personalInfo.firstName} ${personalInfo.lastName},<p><br />
  <p>Thank you for booking with Ascendas! The following are the details of your booking:</p>
  <ul>
    <li>Booking ID: ${bookingsDetails.bookingId}</li>
    <li>Name of hotel: ${bookingsDetails.hotelName}</li>
    <li>Hotel Address: ${bookingsDetails.hotelAddress}</li>
    <li>Room booked: ${bookingsDetails.roomName}</li>
    <li>Check In: ${bookingsDetails.checkIn.date}, ${bookingsDetails.checkIn.time}</li>
    <li>Check Out: ${bookingsDetails.checkOut.date}, ${bookingsDetails.checkOut.time}</li>
  </ul>
  <p>We hope you enjoy your stay!</p>`

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(text_body);

  mailerSend.email
	  .send(emailParams)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

module.exports = { send }