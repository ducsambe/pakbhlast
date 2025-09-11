import  { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  shade: string;
  length: string;
  quantity?: number;
  slug: string; // Add this line
  packSize?: number;
  originalPrice?: number;
  discount?: number;
  savings?: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);


const addToCart = (product: any) => {
  setItems(prevItems => {
    const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: (updatedItems[existingItemIndex].quantity || 1) + 1
      };
      return updatedItems;
    } else {
      return [...prevItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        shade: product.shade || product.color,
        length: product.length,
        quantity: 1,
        slug: product.slug || generateSlug(product.name) // Ensure slug is included
      }];
    }
  });
};

// In your CartContext.tsx
const generateSlug = (name: string): string => {
  // Extract the relevant parts from the product name
  const match = name.match(/PAKBH\s+(.+?)\s+Afro Kinky Bulk Hair\s+-\s+(\d+")/);
  
  if (match) {
    const color = match[1].toLowerCase().replace(/\s+/g, '-');
    const length = match[2].replace('"', '');
    return `afro-kinky-${color}-${length}`;
  }
  
  // Fallback for other products
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace('pakbh-', '')
    .replace('-afro-kinky-bulk-hair-', '-afro-kinky-');
};

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};