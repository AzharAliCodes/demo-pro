import React, { useEffect } from "react";

const TicketPrinter = ({ tickets }) => {
    console.log(tickets);
    
  useEffect(() => {
    if (!tickets || tickets.length === 0) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();

    // Generate a page per ticket
    let content = `
      <html>
        <head>
          <title>Print Tickets</title>
          <style>
            body { margin: 0; padding: 0; font-family: sans-serif; }
            .ticket {
              page-break-after: always;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              text-align: center;
            }
            img { max-width: 300px; height: auto; }
          </style>
        </head>
        <body>
    `;

    tickets.forEach((ticket) => {
      content += `
        <div class="ticket">
          ${ticket ? `<img src="${ticket}" />` : ""}
        </div>
      `;
    });

    content += `
        <script>
          window.onload = function() {
            window.focus();
            window.print();
            setTimeout(() => window.close(), 100);
          };
        </script>
        </body>
      </html>
    `;

    doc.write(content);
    doc.close();

    return () => document.body.removeChild(iframe);
  }, [tickets]);

  return null;
};

export default TicketPrinter;
