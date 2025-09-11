import React from 'react';
import { Calendar, Package, CreditCard, MapPin, Phone, Mail } from 'lucide-react';

interface InvoiceProps {
  orderData: {
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
  };
}

const Invoice: React.FC<InvoiceProps> = ({ orderData }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto" id="invoice">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="PAKBH Logo"
            className="w-20 h-20 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PAKBH</h1>
            <p className="text-lg text-gray-600">Premium Afro Kinky Bulk Hair</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">FACTURE</h2>
          <p className="text-gray-600">N° {orderData.orderId}</p>
          <p className="text-gray-600">Date: {formatDate(orderData.orderDate)}</p>
        </div>
      </div>

      {/* Company & Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Informations de l'entreprise</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="font-semibold">PAKBH - Premium Afro Kinky by Hanna</p>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin size={16} />
              <span>Montpellier, France</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone size={16} />
              <span>+33 6 34 54 96 49</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail size={16} />
              <span>anaroyes7@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Facturer à</h3>
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <p className="font-semibold">{orderData.customerInfo.name}</p>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail size={16} />
              <span>{orderData.customerInfo.email}</span>
            </div>
            {orderData.customerInfo.phone && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={16} />
                <span>{orderData.customerInfo.phone}</span>
              </div>
            )}
            <div className="flex items-start space-x-2 text-gray-600">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <div>
                <p>{orderData.billingAddress.address}</p>
                <p>{orderData.billingAddress.city}, {orderData.billingAddress.state} {orderData.billingAddress.zipCode}</p>
                <p>{orderData.billingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Détails de la commande</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="border border-gray-300 px-4 py-3 text-left">Produit</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Spécifications</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Quantité</th>
                <th className="border border-gray-300 px-4 py-3 text-right">Prix unitaire</th>
                <th className="border border-gray-300 px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <div className="text-sm">
                      <div>Couleur: {item.shade}</div>
                      <div>Longueur: {item.length}</div>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center font-medium">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total:</span>
                <span className="font-medium">{formatCurrency(orderData.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison:</span>
                <span className="font-medium text-green-600">GRATUITE</span>
              </div>
              {orderData.tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">TVA:</span>
                  <span className="font-medium">{formatCurrency(orderData.tax)}</span>
                </div>
              )}
              <div className="border-t-2 border-gray-300 pt-3">
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">{formatCurrency(orderData.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Informations de paiement</h3>
          <div className="bg-green-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <CreditCard size={16} className="text-green-600" />
              <span className="font-medium">Méthode: {orderData.paymentMethod}</span>
            </div>
            <p className="text-gray-600">Transaction ID: {orderData.transactionId}</p>
            <p className="text-green-700 font-medium">✓ Paiement confirmé</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Livraison</h3>
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Package size={16} className="text-blue-600" />
              <span className="font-medium">Livraison standard gratuite</span>
            </div>
            <p className="text-gray-600">Délai: 5-7 jours ouvrables</p>
            <p className="text-blue-700 font-medium">Numéro de suivi envoyé par email</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-gray-200 pt-6">
        <div className="text-center text-gray-600">
          <p className="mb-2">Merci pour votre commande chez PAKBH!</p>
          <p className="text-sm">
            Pour toute question, contactez-nous: +33 6 34 54 96 49 | anaroyes7@gmail.com
          </p>
          <p className="text-xs mt-4 text-gray-500">
            Cette facture a été générée automatiquement le {formatDate(new Date().toISOString())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;