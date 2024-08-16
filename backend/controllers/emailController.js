const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.sendBulkEmail = async (req, res) => {
    try {
        const { recipients, subject, body } = req.body;

        const params = {
            Source: process.env.EMAIL_SOURCE,
            Destination: {
                ToAddresses: recipients
            },
            Message: {
                Subject: { Data: subject },
                Body: {
                    Html: { Data: body }
                }
            }
        };

        await ses.sendEmail(params).promise();
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
