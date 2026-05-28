export function renderErrorPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Error</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #fdf2f5;
          color: #c44569;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
          box-sizing: border-box;
          text-align: center;
        }
        .container {
          max-width: 500px;
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(196, 69, 105, 0.1);
        }
        h1 {
          font-size: 24px;
          margin-bottom: 16px;
        }
        p {
          color: #666;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        a {
          display: inline-block;
          background-color: #c44569;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        a:hover {
          background-color: #b3395b;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Something went wrong</h1>
        <p>The showroom application encountered an error during server-side rendering. Please try reloading or head back home.</p>
        <a href="/">Go Home</a>
      </div>
    </body>
    </html>
  `;
}
