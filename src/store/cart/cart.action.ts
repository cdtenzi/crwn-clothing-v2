import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  //check if cartItems conteins the productToAdd
  if (typeof cartItems !== "undefined") {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
    //increment quantity
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    //return the modified array with the new item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  } else return cartItems;
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  if (typeof cartItems !== "undefined") {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToRemove.id
    );
    if (existingCartItem && existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else return cartItems;
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] => {
  if (typeof cartItems !== "undefined")
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
  return cartItems;
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = withMatcher(
  (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
  }
);

export const removeItemFromCart = withMatcher(
  (cartItems: CartItem[], productToremove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToremove);
    return setCartItems(newCartItems);
  }
);

export const clearItemFromCart = withMatcher(
  (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
  }
);
