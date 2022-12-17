# Take a look over Codespace backend project

This is an apiRest that handles all the information and endpoints of the
codespace website

Here you can find a quick guide to see how this project works and how
to use it

### Starting with...

## Autenticacion and authorization and register

### `/users/register`

METHOD POST

To have the full experience we recomend you to register here...

To make a good request you only need to follow this simple steps

1. Use the method post
2. Send a json file
3. Make sure your file has this form:

```
{
    "name": "Jhon",
    "lastname": "Smith",
    "username": "normalusername",
    "email":"personalmail@gmail.com",
    "password":"pasfds124233"
}
```

Make sure you have all the listed properties because they are all required by our amazing joi scheema.

If you followed the listed steps now the server should reply to you with an acces token wooo hooooooooo

Now you are ready to use the api

### `/users/login`

TOKEN REQUIRED METHOD POST

As any other server we have an endpoint to authenticate our users

With method post just just as in the las example send a request with this form

```
{
    "username":"george",
    "password":"pass123"
}
```

If you followed the listed steps now the server should reply to you with an acces token wooo hooooooooo

Now you are ready to use the api

## JavaScript right here right now

This part can be a little tricky make sure to pay attention so you know what each endpoint does

### `/javascript`

METHOS GET

This is a free endpoint where you can get a random JavaScript snippet from our SnippetsJavaSript mongodb collection, amazing right?

To use it just make a get petition and wait for your snippet

### `/javascript/create`

TOKEN REQUIRED METHOD POST

Okay now this is the tricky part i talked about before, to create a javascript snippet you need:

1. Understand what are the Database collections of this project and take a look at their schemmas
2. Create an account and get yourself a nice token , we need to autorizate you
3. Make a post request with the token in the authorization header, and follow this form in the body

```
{
    "language":"JavaScript",
    "textCode": "const tokenValidator = async (req, res, next) => {\r\n  const headerAuth = req.header(\"Authorization\");\r\n  if (!headerAuth) {\r\n    const error = new Error(\"The token is missing\");\r\n    error.status = 401;\r\n    next(error);\r\n  } else {\r\n    const token = headerAuth.replace(\"Bearer \", \"\");\r\n    try {\r\n      jsonwebtoken.verify(token, process.env.SECRET_HEHE);\r\n      next();\r\n    } catch (error) {\r\n      error.status = 401;\r\n      next(error);\r\n    }\r\n  }\r\n};",
    "title": "token validator"
}
```

4. Now you should get a json with your profile with that snippet added to your `snippetsJavaScript` property

But whyy????????????????

because i am a bad developer and that's how it works for now, refactoring coming soon,

### `/javascript/edit`

TOKEN REQUIRED METHOD PATCH

To use this endpoint it's as easy as following the steps of the last example, just make sure to not change the language property,
pls dont
Take into account any edit in the snippet will be seen by all the users not just your javaScript collection

Send a patch request with this json form:

```
{
  "snippetId": "jkjl43242ousfd6871",
  "updatedProperty": {  "title": "I am a new snippet title"}
}
```

Dont forget the token :) and use a mongoId as the snippeId property, you can find them in you userState
The api will reply with the updated snippet object

### `javascript/delete`

TOKEN REQUIRED METHOD DELETE

To use this endpoint it's as easy as following the steps of the create example, with this endpoint you are only deleting the snippet from your personal collection, not the snippet in the SnippetsJavaScript collection

Send a delete request with this json form:

```
{
    "snippetId": "622a2c7aa578f53206c9836a"
}
```

And the api will reply with Your UserState without the snippet in your javascript collection

## The user and his profile

### `user`

TOKEN REQUIRED METHOD GET

This is an easy one you just need your token and boom you get your personal data, simple right?

```
{
    "_id": "6228a2052cc76662b3b8c990",
    "name": "GergeMapMaster",
    "lastname": "polanco",
    "username": "george",
    "email": "george5@gmail.com",
    "password": "$2b$10$FU9E4RIxp3wt6sZgvagRUOGCGeshcYbzwgORLav4gQt3Ahklp.Qpu",
    "pet": "basic",
    "membership": "basic",
    "scoreHistoryWpm": [],
    "snippetsJavaScript": [
        {
            "_id": "62273e455e1654cd7ad00941",
            "language": "JavaScript",
            "textCode": "const startServer = (app, port) =>\r\n  new Promise((resolve, reject) => {\r\n    const server = app.listen(port, () => {\r\n      debug(`The server it's up in http://localhost:${port}`);\r\n      resolve();\r\n    });\r\n\r\n    server.on(\"error\", (error) => {\r\n      debug(`Oh no the server couldnt start ${error.message}`);\r\n      reject();\r\n    });\r\n  });\r\n\r\nmodule.exports = startServer;",
            "title": "start an express server",
            "__v": 0
        },
        {
            "_id": "622c9d4da39bdb58b4af72e1",
            "language": "JavaScript",
            "textCode": "const hacerCommitsPequeños = true; \n\nif (hacerCommitsPequeños) {\n   console.log(\"Ole is happy\"); \n}\nif(This works){\nconsole.log(tengo un crud completo)\n}\n console.log(bug-fixed)",
            "title": "OMG IT WORKS!!!",
            "__v": 0
        },
        {
            "_id": "622cbcb6dc934c9774ff2826",
            "language": "JavaScript",
            "textCode": "dgssgd this is smooth like butter",
            "title": "smooth li butter that how this app is",
            "__v": 0
        },
        {
            "_id": "622d27da1c00e83c57a644a4",
            "language": "JavaScript",
            "textCode": "nbbn",
            "title": "hbnbv",
            "__v": 0
        }
    ],
    "snippetsPhyton": [],
    "snippetsCsharp": [],
    "scoreHistoryAccuracy": [],
    "scoreHistoryPerCharacter": [],
    "__v": 0,
    "snippetsTypeScript": [
        {
            "_id": "6228b158611c53bc237d8c09",
            "language": "TypeScript",
            "textCode": "function padLeft(padding: number | string, input: string) {\r\n  if (typeof padding === \"number\") {\r\n    return \" \".repeat(padding) + input;\r\n  }\r\n  return padding + input;\r\n}",
            "title": "basics of typeScript",
            "__v": 0
        }
    ]
}
```
