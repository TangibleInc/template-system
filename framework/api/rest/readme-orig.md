

# Original plugin documentation

A simple plugin to add [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519) Authentication to the WP REST API. 
Based on the plugin by [Tmeister](https://github.com/Tmeister/wp-api-jwt-auth) which now seems abandoned. 
This plugin has been almost completely rewritten from the ground up and should be 100% compatible with the WordPress-Core PHP standard using [Tigerton plugin boilerplate](http://xprmnt.tigerton.se/).

### Whats the difference from the plugin from Tmeister?
* Rewritten with a new plugin structure and 100% compatibility with WordPress-Core PHP standards.
* Active development (not abandoned)
* Adds new endpoints for more functionality. For example to revoke (log out) a token and to request new password email.
* Adds user meta for all tokens connecting to the login token (internal to WordPress).
* Adds an UI for viewing and revoking all tokens. Also show latest usage, IP and user agent.
* Adds a settings page inside WP admin as an alternative to the constants in `wp-config.php`.

To know more about JSON Web Tokens, please visit [http://jwt.io](http://jwt.io).

## Requirements

### WP REST API V2

This plugin was conceived to extend the [WP REST API V2](https://github.com/WP-API/WP-API) plugin features and, of course, was built on top of it.

So, to use the **Simple JWT Authentication** you need to install and activate [WP REST API](https://github.com/WP-API/WP-API).

### PHP

**Minimum PHP version: 5.3.0**

### Enable PHP HTTP Authorization Header 

#### Shared Hosts

Most of the shared hosts have disabled the **HTTP Authorization Header** by default.

To enable this option you'll need to edit your **.htaccess** file by adding the following:

```
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```

#### WPEngine

To enable this option you'll need to edit your **.htaccess** file by adding the following:

```
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```

## Installation & Configuration

[Download the zip file](https://github.com/jonathan-dejong/simple-jwt-authentication/archive/master.zip) and install it like any other WordPress plugin.

Or clone this repo into your WordPress installation into the wp-content/plugins folder.

### Configure the Secret Key

The JWT needs a **secret key** to sign the token. This **secret key** must be unique and never revealed.

To add the **secret key**, either visit the Simple JWT Authentication settings page or edit your wp-config.php file and add a new constant called **SIMPLE_JWT_AUTHENTICATION_SECRET_KEY**.


```php
define('SIMPLE_JWT_AUTHENTICATION_SECRET_KEY', 'your-top-secret-key');
```

You can use a string from here https://api.wordpress.org/secret-key/1.1/salt/

### Configurate CORS Support

The **Simple JWT Authentication** plugin has the option to activate [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) support.

To enable the CORS Support either visit the Simple JWT Authentication settings page or edit your wp-config.php file and add a new constant called **SIMPLE_JWT_AUTHENTICATION_CORS_ENABLE**


```php
define('SIMPLE_JWT_AUTHENTICATION_CORS_ENABLE', true);
```


Finally activate the plugin within the plugin dashboard.

## Namespace and Endpoints

When the plugin is activated, a new namespace is added.


```
/simple-jwt-authentication/v1
```


Also, a few new endpoints are added to this namespace.


Endpoint | HTTP Verb
--- | ---
*/wp-json/simple-jwt-authentication/v1/token* | POST
*/wp-json/simple-jwt-authentication/v1/token/validate* | POST
*/wp-json/simple-jwt-authentication/v1/token/revoke* | POST
*/wp-json/simple-jwt-authentication/v1/token/refresh* | POST
*/wp-json/simple-jwt-authentication/v1/token/resetpassword* | POST

## Usage
### /wp-json/simple-jwt-authentication/v1/token

This is the entry point for the JWT Authentication.

Validates the user credentials, *username* and *password*, and returns a token to use in a future request to the API if the authentication is correct or error if the authentication fails.

Success response from the server:

```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9qd3QuZGV2IiwiaWF0IjoxNDM4NTcxMDUwLCJuYmYiOjE0Mzg1NzEwNTAsImV4cCI6MTQzOTE3NTg1MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.YNe6AyWW4B7ZwfFE5wJ0O6qQ8QFcYizimDmBy6hCH_8",
    "user_display_name": "admin",
    "user_email": "admin@localhost.dev",
    "user_nicename": "admin",
    "user_id": 1,
    "token_expires": 12000
}
```

Error response from the server:

```json
{
    "code": "jwt_auth_failed",
    "data": {
        "status": 403
    },
    "message": "Invalid Credentials."
}
```

Once you get the token, you must store it somewhere in your application, e.g. in a **cookie** or using **localstorage**.

From this point, you should pass this token to every API call.

#### Sample call using the Authorization header using Promises in ES2016

```javascript
var request = new Request(apiURL + '/wp-json/simple-jwt-authentication/v1/token/validate', {
  method: 'POST',
  headers: new Headers({
	'Content-Type': 'application/json',
	'authorization': 'Bearer ' + user.token
  })
})

fetch(request).then(response => {
  response.json().then(results => {
	if (results.data.status !== 200) {
	  callback(false)
	} else {
	  callback(true)
	}
  })
}).catch(function (err) {
  callback(err)
})
```

#### Sample call using jQuery
```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://sample.com/wp-json/simple-jwt-authentication/v1/token/validate",
  "method": "POST",
  "headers": {
    "bearer": "token",
    "cache-control": "no-cache",
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

#### Sample call using PHP cURL
```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://sample.com/wp-json/simple-jwt-authentication/v1/token/validate",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => array(
    "bearer: token",
    "cache-control: no-cache",
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

#### Sample call using cURL
```
curl -X POST \
  http://sample.com/wp-json/simple-jwt-authentication/v1/token/validate \
  -H 'bearer: token' \
  -H 'cache-control: no-cache' \

```

#### Sample call using NodeJS Native
```javascript
var http = require("http");

var options = {
  "method": "POST",
  "hostname": "sample.com",
  "port": null,
  "path": "/wp-json/simple-jwt-authentication/v1/token/validate",
  "headers": {
    "bearer": "token",
    "cache-control": "no-cache",
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();

```

The **Simple JWT Authentication** will intercept every call to the server and will look for the authorization header, if the authorization header is present, it will try to decode the token and will set the user according with the data stored in it.

If the token is valid, the API call flow will continue as always.

**Sample Headers**

```
POST /resource HTTP/1.1
Host: server.example.com
Authorization: Bearer mF_s9.B5f-4.1JqM
```

### Errors

If the token is invalid an error will be returned. Here are some samples of errors:

**Invalid Credentials**

```json
[
  {
    "code": "jwt_auth_failed",
    "message": "Invalid Credentials.",
    "data": {
      "status": 403
    }
  }
]
```

**Invalid Signature**

```json
[
  {
    "code": "jwt_auth_invalid_token",
    "message": "Signature verification failed",
    "data": {
      "status": 403
    }
  }
]
```

**Expired Token**

```json
[
  {
    "code": "jwt_auth_invalid_token",
    "message": "Expired token",
    "data": {
      "status": 403
    }
  }
]
```

### /wp-json/simple-jwt-authentication/v1/token/validate

This is a simple helper endpoint to validate a token; you only will need to make a POST request sending the Authorization header.

Valid Token Response:

```json
{
  "code": "jwt_auth_valid_token",
  "data": {
    "status": 200
  }
}
```

### /wp-json/simple-jwt-authentication/v1/token/refresh

You may want to renew an active's user token that's about to expire.

This endpoint receives an active token, and returns a new token with an updated expiry timestamp, or error if the token is invalid.

Valid Token Response:
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9qd3QuZGV2IiwiaWF0IjoxNDM4NTcxMDUwLCJuYmYiOjE0Mzg1NzEwNTAsImV4cCI6MTQzOTE3NTg1MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.YNe6AyWW4B7ZwfFE5wJ0O6qQ8QFcYizimDmBy6hCH_8",
    "user_display_name": "admin",
    "user_email": "admin@localhost.dev",
    "user_nicename": "admin",
    "user_id": 1,
    "token_expires": 12000
}
```

## Available Hooks

The **wp-api-jwt-auth** is dev friendly and has five filters available to override the default settings.

#### jwt_auth_cors_allow_headers

The **jwt_auth_cors_allow_headers** allows you to modify the available headers when the CORs support is enabled.

Default Value:

```
'Access-Control-Allow-Headers, Content-Type, Authorization'
```

### jwt_auth_not_before

The **jwt_auth_not_before** allows you to change the [**nbf**](https://tools.ietf.org/html/rfc7519#section-4.1.5) value before the token is created.

Default Value:

```
Creation time - time()
```

### jwt_auth_expire

The **jwt_auth_expire** allows you to change the value [**exp**](https://tools.ietf.org/html/rfc7519#section-4.1.4) before the token is created.

Default Value:

```
time() + (DAY_IN_SECONDS * 7)
```

### jwt_auth_token_before_sign

The **jwt_auth_token_before_sign** allows you to modify all the token data before to be encoded and signed.

Default value:

```php
<?php
$token = array(
    'uuid' => wp_generate_uuid4(),
    'iss' => get_bloginfo('url'),
    'iat' => $issuedAt,
    'nbf' => $notBefore,
    'exp' => $expire,
    'data' => array(
        'user' => array(
            'id' => $user->data->ID,
        )
    )
);
```

### jwt_auth_token_before_dispatch
The **jwt_auth_token_before_dispatch** allows you to modify all the response array before to dispatch it to the client.

Default value:

```php
<?php
$data = array(
    'user_id' => $user->ID,
    'token' => $token,
    'user_email' => $user->data->user_email,
    'user_nicename' => $user->data->user_nicename,
    'user_display_name' => $user->data->display_name,
    'token_expires' => $expire,
);
```

## Credits
[WP REST API V2](http://v2.wp-api.org/)

[PHP-JWT from firebase](https://github.com/firebase/php-jwt)

[PhpUserAgent](https://github.com/donatj/PhpUserAgent)
