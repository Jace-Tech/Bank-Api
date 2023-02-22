export const LOAN_TEMPLATE = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
      href="https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400;500;600;700&family=Oxygen:wght@300;400;700&display=swap"
      rel="stylesheet">
  </head>


  <body style="box-sizing: border-box; margin: 0; color: #151418; font-family: 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
  <div style="box-sizing: border-box; max-width: 586px; margin: 0 auto; background: #e4e5e0; min-height: 60vh;">
    <header style="box-sizing: border-box; background-color: #151418; padding: 1rem; display: flex; justify-content: center; align-items: center;">
      <h2 style="box-sizing: border-box; color: #EDE9E8; text-transform: uppercase; font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"">Fundtrust</h2>
    </header>

    <div style="box-sizing: border-box; margin-top: 1rem; padding: 1rem;">
      <h3 style="box-sizing: border-box; font-size: 1.5rem; margin-bottom: 1.5rem; font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Loan Notification</h3>
      {{ message }}
      <p style="box-sizing: border-box; font-size: 1rem; line-height: 1.7; margin: 1rem 0;">Love,</p>
      <p style="box-sizing: border-box;  font-size: 1rem; line-height: 1.7; margin: 1rem 0; font-weight: 600;">The Fundtrust Team.</p>
    </div>

    <footer style="margin-top: 3rem; border-top: 1px solid #ccc; padding: 1rem; display: flex; align-items: center; justify-content: center;">
      <p style="text-align: center; box-sizing: border-box; font-size: .8rem; color: #999;">@{{ year }} Fundtrust. All rights reserved.</p>
    </footer>
  </div>
</body>
  </html>`;

export const ACCOUNT_TEMPLATE = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400;500;600;700&family=Oxygen:wght@300;400;700&display=swap"
    rel="stylesheet">

</head>

<body style="box-sizing: border-box; margin: 0; color: #151418; font-family: 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
  <div style=" max-width: 586px; margin: 0 auto; background: #e4e5e0; min-height: 60vh;">
    <header style="background-color: #151418; padding: 1rem; display: flex; justify-content: center; align-items: center;">
      <h2 style="color: #EDE9E8; text-transform: uppercase;">Fundtrust</h2>
    </header>
    <div style="margin-top: 1rem; padding: 1rem;">
      <h3 style="font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 1.5rem; margin-bottom: 1.5rem;">Registration Notification</h3>
      <p style="font-size: 1rem; line-height: 1.7; margin: 1rem 0;">Hello {{ firstname }}</p>
      <p style="font-size: 1rem; line-height: 1.7; margin: 1rem 0;">Welcome to {{ bankName }}, The bank that serves all customers equally on a daily basis.</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; table-layout: fixed;">
        <tr style="border: 1px solid #ccc;">
          <td style="padding: .8rem; text-align: center;">Account Number</td>
          <td style="padding: .8rem; text-align: center; border-left: 1px solid #ccc;">{{ accountNumber }}</td>
        </tr>

        <tr>
          <td style="padding: .8rem; text-align: center;">Account Pin</td>
          <td style="padding: .8rem; text-align: center; border-left: 1px solid #ccc;">{{ accountPin }}</td>
        </tr>

        <tr>
          <td style="padding: .8rem; text-align: center;">Account Type</td>
          <td style="padding: .8rem; text-align: center; border-left: 1px solid #ccc;">{{ accountType }}</td>
        </tr>

        <tr>
          <td style="padding: .8rem; text-align: center;">Account IBAN</td>
          <td style="padding: .8rem; text-align: center; border-left: 1px solid #ccc;">{{ iban }}</td>
        </tr>
      </table>
    </div>
    <footer style="margin-top: 3rem; border-top: 1px solid #ccc; padding: 1rem; display: flex; align-items: center; justify-content: center;">
      <p style="text-align: center; font-size: .8rem; color: #999;">@{{ year }} Fundtrust. All rights reserved.</p>
    </footer>
  </div>
</body>

</html>`;

export const TRANSACTION_TEMPLATE = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Transaction</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400;500;600;700&family=Oxygen:wght@300;400;700&display=swap"
    rel="stylesheet">
</head>

<body style="box-sizing: border-box; margin: 0; color: #151418; font-family: 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
  <div style="box-sizing: border-box; max-width: 586px; margin: 0 auto; background: #e4e5e0; min-height: 60vh;">
    <header style="box-sizing: border-box; background-color: #151418; padding: 1rem; display: flex; justify-content: center; align-items: center;">
      <h2 style="box-sizing: border-box; color: #EDE9E8; text-transform: uppercase; font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"">Fundtrust</h2>
    </header>

    <div style="box-sizing: border-box; margin-top: 1rem; padding: 1rem;">
      <h3 style="box-sizing: border-box; font-size: 1.5rem; margin-bottom: 1.5rem; font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"">Transaction Notification</h3>
      {{ message }}
      <p style="box-sizing: border-box; font-size: 1rem; line-height: 1.7; margin: 1rem 0;">Love,</p>
      <p style="box-sizing: border-box;  font-size: 1rem; line-height: 1.7; margin: 1rem 0; font-weight: 600;">The Fundtrust Team.</p>
    </div>

    <footer style="margin-top: 3rem; border-top: 1px solid #ccc; padding: 1rem; display: flex; align-items: center; justify-content: center;">
      <p style="text-align: center; box-sizing: border-box; font-size: .8rem; color: #999;">@{{ year }} Fundtrust. All rights reserved.</p>
    </footer>
  </div>
</body>

</html>`;

export const ADMIN_NOTIFICATION = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Transaction</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400;500;600;700&family=Oxygen:wght@300;400;700&display=swap"
    rel="stylesheet">
</head>

<body style="box-sizing: border-box; margin: 0; color: #151418; font-family: 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
  <div style="box-sizing: border-box; max-width: 586px; margin: 0 auto; background: #e4e5e0; min-height: 60vh;">
    <header style="box-sizing: border-box; background-color: #151418; padding: 1rem; display: flex; justify-content: center; align-items: center;">
      <h2 style="box-sizing: border-box; color: #EDE9E8; text-transform: uppercase; font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"">Fundtrust</h2>
    </header>

    <div style="box-sizing: border-box; margin-top: 1rem; padding: 1rem;">
      <h3 style="box-sizing: border-box; font-size: 1.5rem; margin-bottom: 1.5rem; font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"">Site Notification</h3>
      {{ message }}
      <p style="box-sizing: border-box; font-size: 1rem; line-height: 1.7; margin: 1rem 0;">Love,</p>
      <p style="box-sizing: border-box;  font-size: 1rem; line-height: 1.7; margin: 1rem 0; font-weight: 600;">The Fundtrust Team.</p>
    </div>

    <footer style="margin-top: 3rem; border-top: 1px solid #ccc; padding: 1rem; display: flex; align-items: center; justify-content: center;">
      <p style="text-align: center; box-sizing: border-box; font-size: .8rem; color: #999;">@{{ year }} Fundtrust. All rights reserved.</p>
    </footer>
  </div>
</body>

</html>`;

export const MESSAGE_STYLES =
  "box-sizing: border-box; font-size: 1rem; line-height: 1.7; margin: 1rem 0;";
