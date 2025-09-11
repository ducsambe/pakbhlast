// Invoice generation utilities
export interface InvoiceData {
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  billingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    name: string;
    shade: string;
    length: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  transactionId: string;
  orderDate: string;
}

export const generateInvoiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `INV-${year}${month}${day}-${random}`;
};

export const formatInvoiceDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const calculateTotals = (items: any[], taxRate: number = 0) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100
  };
};

export const generateInvoiceHTML = (invoiceData: InvoiceData): string => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Facture ${invoiceData.orderId}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .invoice { max-width: 800px; margin: 0 auto; background: white; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
        .logo { width: 80px; height: 80px; }
        .company-info h1 { margin: 0; font-size: 24px; color: #1f2937; }
        .invoice-info { text-align: right; }
        .invoice-info h2 { margin: 0; font-size: 20px; color: #1f2937; }
        .details { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; }
        .section { background: #f9fafb; padding: 20px; border-radius: 8px; }
        .section h3 { margin: 0 0 15px 0; font-size: 16px; color: #1f2937; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th, .items-table td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
        .items-table th { background: #1f2937; color: white; font-weight: bold; }
        .items-table tr:nth-child(even) { background: #f9fafb; }
        .totals { margin-left: auto; width: 300px; background: #f9fafb; padding: 20px; border-radius: 8px; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .total-final { border-top: 2px solid #1f2937; padding-top: 15px; font-size: 18px; font-weight: bold; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="invoice">
        <div class="header">
          <div style="display: flex; align-items: center;">
            <img src="/logo.png" alt="PAKBH Logo" class="logo" style="margin-right: 20px;">
            <div class="company-info">
              <h1>PAKBH</h1>
              <p style="margin: 0; color: #6b7280;">Premium Afro Kinky Bulk Hair</p>
            </div>
          </div>
          <div class="invoice-info">
            <h2>FACTURE</h2>
            <p>N° ${invoiceData.orderId}</p>
            <p>Date: ${formatInvoiceDate(invoiceData.orderDate)}</p>
          </div>
        </div>

        <div class="details">
          <div class="section">
            <h3>Informations de l'entreprise</h3>
            <p><strong>PAKBH - Premium Afro Kinky by Hanna</strong></p>
            <p>Montpellier, France</p>
            <p>+33 6 34 54 96 49</p>
            <p>anaroyes7@gmail.com</p>
          </div>
          <div class="section">
            <h3>Facturer à</h3>
            <p><strong>${invoiceData.customerInfo.name}</strong></p>
            <p>${invoiceData.customerInfo.email}</p>
            ${invoiceData.customerInfo.phone ? `<p>${invoiceData.customerInfo.phone}</p>` : ''}
            <p>${invoiceData.billingAddress.address}</p>
            <p>${invoiceData.billingAddress.city}, ${invoiceData.billingAddress.state} ${invoiceData.billingAddress.zipCode}</p>
            <p>${invoiceData.billingAddress.country}</p>
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Spécifications</th>
              <th style="text-align: center;">Quantité</th>
              <th style="text-align: right;">Prix unitaire</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map(item => `
              <tr>
                <td><strong>${item.name}</strong></td>
                <td>
                  Couleur: ${item.shade}<br>
                  Longueur: ${item.length}
                </td>
                <td style="text-align: center;">${item.quantity}</td>
                <td style="text-align: right;">${formatCurrency(item.price)}</td>
                <td style="text-align: right;"><strong>${formatCurrency(item.price * item.quantity)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span>Sous-total:</span>
            <span>${formatCurrency(invoiceData.subtotal)}</span>
          </div>
          <div class="total-row">
            <span>Livraison:</span>
            <span style="color: #059669; font-weight: bold;">GRATUITE</span>
          </div>
          ${invoiceData.tax > 0 ? `
            <div class="total-row">
              <span>TVA:</span>
              <span>${formatCurrency(invoiceData.tax)}</span>
            </div>
          ` : ''}
          <div class="total-row total-final">
            <span>Total:</span>
            <span>${formatCurrency(invoiceData.total)}</span>
          </div>
        </div>

        <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div class="section">
            <h3>Informations de paiement</h3>
            <p><strong>Méthode:</strong> ${invoiceData.paymentMethod}</p>
            <p><strong>Transaction ID:</strong> ${invoiceData.transactionId}</p>
            <p style="color: #059669; font-weight: bold;">✓ Paiement confirmé</p>
          </div>
          <div class="section">
            <h3>Livraison</h3>
            <p><strong>Livraison standard gratuite</strong></p>
            <p>Délai: 5-7 jours ouvrables</p>
            <p style="color: #2563eb; font-weight: bold;">Numéro de suivi envoyé par email</p>
          </div>
        </div>

        <div class="footer">
          <p><strong>Merci pour votre commande chez PAKBH!</strong></p>
          <p>Pour toute question, contactez-nous: +33 6 34 54 96 49 | anaroyes7@gmail.com</p>
          <p style="font-size: 12px; margin-top: 20px;">
            Cette facture a été générée automatiquement le ${formatInvoiceDate(new Date().toISOString())}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const downloadInvoiceAsPDF = (invoiceData: InvoiceData) => {
  const htmlContent = generateInvoiceHTML(invoiceData);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `Facture-${invoiceData.orderId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};