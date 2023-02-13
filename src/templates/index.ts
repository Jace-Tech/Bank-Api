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
    <style>
      :root {
        --black: #151418;
        --white: #EDE9E8;
        --bg: #e4e5e0;
      }
  
      * {
        margin: 0;
        padding: 0;
        color: var(--black);
        box-sizing: border-box;
        font-family: 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
  
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        ;
      }
  
      .container {
        max-width: 586px;
        margin: 0 auto;
        background: var(--bg);
        min-height: 100vh;
      }
  
      header {
        background-color: var(--black);
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
  
      .header-title {
        color: var(--white);
        text-transform: uppercase;
      }
  
      .content {
        margin-top: 1rem;
        padding: 1rem;
      }
  
      .message {
        font-size: 1rem;
        line-height: 1.7;
        margin: 1rem 0;
      }
  
      footer {
        margin-top: 3rem;
        border-top: 1px solid #ccc;
        padding: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      .footer-text {
        font-size: .8rem;
        color: #999;
      }
  
      .page-title {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }
  
      .bold {
        font-weight: 600;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <header>
        <h2 class="header-title">Fundtrust</h2>
      </header>
  
      <div class="content">
        <h3 class="page-title">Loan Notification</h3>
        {{ message }}
        <p class="message">Love,</p>
        <p class="message bold">The Fundtrust Team.</p>
      </div>
  
      <footer>
        <p class="footer-text">@{{ year }} Fundtrust. All rights reserved.</p>
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

  <style>
    :root {
      --black: #151418;
      --white: #EDE9E8;
      --bg: #e4e5e0;
    }

    * {
      margin: 0;
      color: var(--black);
      padding: 0;
      box-sizing: border-box;
      font-family: 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      ;
    }

    .container {
      max-width: 586px;
      margin: 0 auto;
      background: var(--bg);
      min-height: 100vh;
    }

    header {
      background-color: var(--black);
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .header-title {
      color: var(--white);
      text-transform: uppercase;
    }

    .content {
      margin-top: 1rem;
      padding: 1rem;
    }

    .message {
      font-size: 1rem;
      line-height: 1.7;
      margin: 1rem 0;
    }

    footer {
      margin-top: 3rem;
      border-top: 1px solid #ccc;
      padding: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footer-text {
      font-size: .8rem;
      color: #999;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      table-layout: fixed;
    }

    .table td {
      padding: .8rem;
      text-align: center;
    }

    .table td:nth-child(2) {
      border-left: 1px solid #ccc;
    }

    .table tr {
      border: 1px solid #ccc;
    }

    .text {
      text-align: center;
    }

    .page-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .bold {
      font-weight: 600;
    }
  </style>

</head>

<body>
  <div class="container">
    <header>
      <h2 class="header-title">Fundtrust</h2>
    </header>
    <div class="content">
      <h3 class="page-title">Registration Notification</h3>
      <p class="message">Hello {{ firstname }}</p>
      <p class="message">Welcome to {{ bankName }}, The bank that serves all customers equally on a daily basis.</p>

      <table class="table">
        <tr>
          <td>Account Number</td>
          <td>{{ accountNumber }}</td>
        </tr>

        <tr>
          <td>Account Pin</td>
          <td>{{ accountPin }}</td>
        </tr>

        <tr>
          <td>Account Type</td>
          <td>{{ accountType }}</td>
        </tr>

        <tr>
          <td>Account IBAN</td>
          <td>{{ iban }}</td>
        </tr>
      </table>
    </div>
    <footer>
      <p class="footer-text">@{{ year }} Fundtrust. All rights reserved.</p>
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
  <style>
    :root {
      --black: #151418;
      --white: #EDE9E8;
      --bg: #e4e5e0;
    }

    * {
      margin: 0;
      padding: 0;
      color: var(--black);
      box-sizing: border-box;
      font-family: 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Exo 2', 'Oxygen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      ;
    }

    .container {
      max-width: 586px;
      margin: 0 auto;
      background: var(--bg);
      min-height: 100vh;
    }

    header {
      background-color: var(--black);
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .header-title {
      color: var(--white);
      text-transform: uppercase;
    }

    .content {
      margin-top: 1rem;
      padding: 1rem;
    }

    .message {
      font-size: 1rem;
      line-height: 1.7;
      margin: 1rem 0;
    }

    footer {
      margin-top: 3rem;
      border-top: 1px solid #ccc;
      padding: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footer-text {
      font-size: .8rem;
      color: #999;
    }

    .page-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .bold {
      font-weight: 600;
    }
  </style>
</head>

<body>
  <div class="container">
    <header>
      <h2 class="header-title">Fundtrust</h2>
    </header>

    <div class="content">
      <h3 class="page-title">Transaction Notification</h3>
      {{ message }}
      <p class="message">Love,</p>
      <p class="message bold">The Fundtrust Team.</p>
    </div>

    <footer>
      <p class="footer-text">@{{ year }} Fundtrust. All rights reserved.</p>
    </footer>
  </div>
</body>

</html>`;
