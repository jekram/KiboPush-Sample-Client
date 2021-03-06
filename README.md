# KiboPush-Sample-Client
KiboPush Sample Client
This is a sample Node.js application which extracts the data from application. KiboPush has officially exposed the REST API which can be found on:

https://staging.kibopush.com/docs/

Users can access KiboPush servers for following tasks:

 1. Get User information
 2. Get Workflows information
 3. Get Pages information
 4. Get Subscribers information
 5. Get Polls information
 6. Get Surveys information
 7.  Get Broadcasts information
 8. Get Auto Posting details
 9. Get LiveChat sessions information
10. Get Page Menu details
11. Access Dashboard details
12. Access Live Chat options
13. Create and Send New Polls
14. Create, Enable and Disable Workflows
15. Send Simple Message Broadcasts

## Credentials

For every user registered on KiboPush, a unique application id and application secret (password) are created. Users can use these credentials to extract the data from KiboPush using REST end points. To authenticate, user’s application would attach the credentials to each HTTP request it sends to KiboPush server. REST API exposed is completely stateless and no sessions are stored for clients. Therefore, it is mandatory for client applications to attach the credentials to each HTTP request. Following parameters are required in the HTTP request headers:

- app_id
- app_secret


We create the HTTP request in following method:

    var headers = {
      'app_id': req.session.kiboappid,
      'app_secret': req.session.kiboappsecret,
      'content-type': 'application/json'
    }
    var options = {
      url: 'https://staging.kibopush.com/api/users/',
      headers: headers,
      rejectUnauthorized: false
    }

We use Node.js module request to send our HTTP request to CloudKibo server:

    router.get('/userInformation', function (req, res, next) {
      console.log(req.session.kiboappid)
      console.log(req.session.kiboappsecret)

      headers = {
        'app_id': req.session.kiboappid,
        'app_secret': req.session.kiboappsecret,
        'content-type': 'application/json'
      }
      var options = {
        url: 'https://staging.kibopush.com/api/users/',
        headers: headers,
        rejectUnauthorized: false
      }

      function callback (error, response, body) {
        console.log('Response-Body', response.body)
        if (!error && response.statusCode === 200) {
          console.log('Response-Parse', JSON.parse(response.body))
          var info = JSON.parse(response.body)
          var array = []
          array.push(info.payload)
          req.session.userId = info.payload.id
          res.render('userInformation', { title: 'User Information', mydata: array })
        } else {
          error = JSON.parse(response.body)
          console.log(error)
          res.render('userInformation', { title: 'User Information', mydata: '', error: error })
        }
      }
      request.get(options, callback)
    });

The above HTTP request would fetch user information of the logged in user

## Setup to run this application

#### Install nodejs

    sudo apt-get update
    sudo apt-get install nodejs
    sudo ln -s `which nodejs` /usr/local/bin/node

install npm, which is the Node.js package manager

    sudo apt-get install npm

source: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server

#### Install Git

    sudo apt-get update
    sudo apt-get install git

#### Clone the application on server from github:
    git clone https://github.com/Cloudkibo/KiboPush-Sample-Client.git

Install server side libraries using:

    npm install

Run the application using

    npm start

For request of new features or correction of any bug found, kindly open a new issue on this Github repository.
Setup to run this application
