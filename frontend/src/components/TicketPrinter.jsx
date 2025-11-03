import React, { useEffect } from "react";
import QRCode from "qrcode"

const TicketPrinter = ({ tickets }) => {    

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

  let content = `
    <html>
      <head>
        <title>Print Tickets</title>
        <style>
          body { margin: 0; padding: 0; font-family: sans-serif; }
          .ticket {
            page-break-after: always;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
          }
        </style>
      </head>
      <body>
  `;

  // Generate QR codes as Data URI synchronously
  const qrPromises = tickets.map(ticket =>
    QRCode.toDataURL(ticket.id.toString())
  );

  Promise.all(qrPromises).then(qrDataUrls => {
    qrDataUrls.forEach((qrDataUrl) => {
      content += `
        <div class="ticket">
          <img src="${qrDataUrl}" />
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
  });

  return () => document.body.removeChild(iframe);
}, [tickets]);

  return null;
};

export default TicketPrinter;

