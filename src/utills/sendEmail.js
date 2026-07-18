const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } =require("./sesClient.js");
const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [
      ],
      ToAddresses: [
        toAddress,
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<h1>this is the email body</h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "this is the text format email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Hello World! from SES",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more it */
    ],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "hariigidituri@gmail.com",
    "harikagidituri@gmail.com",
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports= { run };