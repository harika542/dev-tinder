const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress,subject,body) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body}</h1>`
        },
        Text: {
          Charset: "UTF-8",
          Data: "this is the text format email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async (subject,body) => {
  const sendEmailCommand = createSendEmailCommand(
    "hariigidituri@gmail.com",
    "harikagidituri@gmail.com",
    subject,
    body
  );

  try {
    const res = await sesClient.send(sendEmailCommand);
    return res;
  } catch (caught) {
    console.log("------- AWS ACTUAL SERVER ERROR IS HERE -------");
    console.error(caught.message);
    console.log("----------------------------------------------");
    return { success: false, message: caught.message };
  }
};

module.exports = { run };