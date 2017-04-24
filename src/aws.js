"use strict";
var Cognito = require("./amazon-cognito-identity.min.js");
var AWS = require("aws-sdk");
var options = new AWS.Config({
    region: "us-east-1"
});
//const Kenesis = new AWS.Kenesis();
function authorize() {
    var authenticationData = {
        Username: 'dslagle',
        Password: 'MooShoGaiPan0!',
    };
    var authenticationDetails = new Cognito.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId: 'us-east-1_99IKinAx7',
        ClientId: '3kocbmjj8c0mp09b1ejnh7gusf' // Your client id here
    };
    var userPool = new Cognito.CognitoUserPool(poolData);
    var userData = {
        Username: 'dslagle',
        Pool: userPool
    };
    var cognitoUser = new Cognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            AWS.config.region = "us-east-1";
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:5133c8e3-ced1-45d5-9a79-224f967d1f70',
                Logins: {
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_99IKinAx7': result.getIdToken().getJwtToken()
                }
            });
            //fs.writeFileSync("key", result.getIdToken().getJwtToken());
            // http.get("gps", { headers: {
            //     "Authorization": result.getIdToken().getJwtToken()
            // }}).then(response => console.log(response.body))
            //     .catch(err => console.error(err));
            // Instantiate aws sdk service objects now that the credentials have been updated.
            var kinesis = new AWS.Kinesis();
            var params = {
                Data: new Buffer('{ "message": "This is a test." }'),
                PartitionKey: '1',
                StreamName: 'gps',
            };
            kinesis.putRecord(params, function (err, data) {
                if (err)
                    console.log(err, err.stack); // an error occurred
                else
                    console.log(data); // successful response
            });
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
            console.log("Need New Password! Supplying...");
            // the api doesn't accept this field back
            delete userAttributes.email_verified;
            // Get these details and call
            cognitoUser.completeNewPasswordChallenge("MooShoGaiPan0!", userAttributes, this);
        },
        onFailure: function (err) {
            console.error(err);
        },
    });
}
function stream() {
    AWS.config.region = "us-east-1";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: "us-east-1:5133c8e3-ced1-45d5-9a79-224f967d1f70" });
    AWS.config.credentials.get(function (err) {
        if (err) {
            console.error(err);
            process.exit(0);
        }
        var kinesis = new AWS.Kinesis();
        var params = {
            Data: new Buffer('{ "message": "This is a test." }'),
            PartitionKey: '1',
            StreamName: 'gps',
        };
        kinesis.putRecord(params, function (err, data) {
            if (err)
                console.log(err, err.stack); // an error occurred
            else
                console.log(data); // successful response
        });
    });
}
authorize();
