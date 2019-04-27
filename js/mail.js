var clientId = '492955453822-brk36bo424a72p6jqp5g2dfaiassihf4.apps.googleusercontent.com';
var apiKey = 'lr6W2hVcoXOQrUiQQn8FChbK';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

var scopes =
    'https://mail.google.com/';

function handleAuthResult(authResult)
{
    if(authResult && !authResult.error)
    {
        gapi.client.load('gmail','v1');
    }
}

function sendMessage(headers_obj, message, callback) {
    gapi.auth.authorize(
        {client_id: clientId,scope: scopes,immediate: false});
    gapi.client.load('gmail','v1') 

    var email = '';

    for (var header in headers_obj)
        email += header += ": " + headers_obj[header] + "\r\n";

    email += "\r\n" + message;
    
    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': clientId,
        'resource': {
            'raw': Base64.encodeURI(email)
        }
    });


    return sendRequest.execute(callback);
}

function composeTidy() {

    $('#compose-from').val('');
    $('#compose-email').val('');
    $('#compose-message').val('');

    $('#send-button').addClass('enabled');

}

function sendEmail() {
    $('#send-button').addClass('disabled');

    sendMessage({
            'To': 'william95quintalwilliam@outlook.com',
            'Subject': $('#compose-from') + ' ' + $('#compose-email').val()
        },
        $('#compose-message').val(),
        composeTidy
    );


    return false;
}