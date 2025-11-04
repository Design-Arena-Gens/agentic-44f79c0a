"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { Product } from '@/data/products';

export type CartItem = { productId: string; quantity: number };

type State = { items: CartItem[] };

type Action =
  | { type: 'add'; productId: string; quantity?: number }
  | { type: 'remove'; productId: string }
  | { type: 'setQty'; productId: string; quantity: number }
  | { type: 'reset' }
  | { type: 'hydrate'; payload: State };

const initialState: State = { items: [] };

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return action.payload;
    case 'add': {
      const exists = state.items.find((i) => i.productId === action.productId);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.productId === action.productId
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      return { items: [...state.items, { productId: action.productId, quantity: action.quantity ?? 1 }] };
    }
    case 'remove':
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    case 'setQty':
      return {
        items: state.items.map((i) => (i.productId === action.productId ? { ...i, quantity: Math.max(1, action.quantity) } : i)),
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  reset: () => void;
  totalQuantity: number;
  totalPrice: number;
  itemsDetailed: Array<{ product: Product; quantity: number }>;
}>({
  items: [],
  add: () => {},
  remove: () => {},
  setQty: () => {},
  reset: () => {},
  totalQuantity: 0,
  totalPrice: 0,
  itemsDetailed: [],
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('neonforge_cart');
      if (raw) dispatch({ type: 'hydrate', payload: JSON.parse(raw) as State });
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem('neonforge_cart', JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(() => {
    const { products } = require('@/data/products');
    const itemsDetailed = state.items
      .map((i) => ({ product: products.find((p: Product) => p.id === i.productId)!, quantity: i.quantity }))
      .filter((x) => x.product);
    const totalQuantity = itemsDetailed.reduce((acc, x) => acc + x.quantity, 0);
    const totalPrice = itemsDetailed.reduce((acc, x) => acc + x.product.price * x.quantity, 0);
    return {
      items: state.items,
      add: (productId: string, q = 1) => dispatch({ type: 'add', productId, quantity: q }),
      remove: (productId: string) => dispatch({ type: 'remove', productId }),
      setQty: (productId: string, quantity: number) => dispatch({ type: 'setQty', productId, quantity }),
      reset: () => dispatch({ type: 'reset' }),
      totalQuantity,
      totalPrice,
      itemsDetailed,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
