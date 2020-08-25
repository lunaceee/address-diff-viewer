# Address Diff Viewer - (Noyo Coding Challenge)

## Summary

An address diff viewer based on [create-react-app](https://create-react-app.dev/).

![app snapshot](https://github.com/lunaceee/address-diff-viewer/blob/master/src/app-snapshot.png)

## Local development

Clone the reposotory and run `yarn install` to install the dependencies.
[API reference](https://github.com/noyo-technologies/address-history-challenge)

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />

### Notes:

- Using the `/seed` end point gives me two user ids. Each user id has one address. I used the following command to recreate a user id with multiple addresses.

```
curl -X POST http://localhost:5000/addresses --header "content-type: application/json" -d @/tmp/payload.json
```

`/tmp/payload.json` looks like:

```
{
  "user_id": "luna",
  "street_one": "123 Main Street",
  "street_two": "Apt 12",
  "city": "Oakland",
  "state": "CA",
  "zip_code": "94618"
}
```

_Made by: Luna Yu_<br />
_Email: lunaceee@gmail.com_<br />
_Aug 27, 2020_
