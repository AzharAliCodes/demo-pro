import React, { useEffect } from "react"
import QRCode from "qrcode"

const TicketPrinter = (tickets) => {
useEffect(() => {
  if (tickets.tickets.ID === 0) return;
  const people = tickets.tickets.people
console.log(tickets.tickets.ID, people );

  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();

  const generateQR = async (text) => {
    return await QRCode.toDataURL(text);
  };

  const createContent = async () => {
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
    let id = tickets.tickets.ID
    for (let i = 0; i < people; i++) {
      const qrDataUrl = await generateQR(id.toString());
      id =id+1
      content += `
        <div class="ticket">
          <img src="${qrDataUrl}" />
        </div>
      `;
    }

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
  };

  createContent();

  return () => {
    document.body.removeChild(iframe);
  };
}, [tickets]);

  return null;
};

export default TicketPrinter;
