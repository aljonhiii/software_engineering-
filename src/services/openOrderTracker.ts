/**
 * Open Order Tracker
 *
 * An order is "open" from the moment the customer presses CONFIRM ORDER until payment succeeds.
 * If the order is abandoned in between — Cancel, Back to Summary, a hardware/browser back gesture,
 * an error that sends the kiosk home, or the kiosk app reloading/crashing — it is reported to the
 * monitoring backend as a cancelled order, exactly once.
 *
 * The same applies to a paid wash cycle: from the moment the progress screen starts the wash until
 * it finishes, an interruption (leaving the screen, reload, crash) marks the cleaning as cancelled.
 * The payment itself stays recorded as paid, because the money was collected.
 *
 * On web both are also kept in localStorage so an interruption by a page reload or crash is
 * reported the next time the kiosk starts. Native builds keep them in memory only.
 */

import { Platform } from 'react-native';
import { ShoeCategory, CleaningService, ServiceAddon, PaymentMethod } from '../types';
import { reportKioskOrderCancelled, updateKioskCleaningStatus } from './kioskMonitoringService';

export interface OpenOrder {
  orderId: string;
  shoeCategory: ShoeCategory | null;
  service: CleaningService | null;
  addons: ServiceAddon[];
  totalPrice: number;
  paymentMethod: PaymentMethod | null;
  openedAt: string;
}

const STORAGE_KEY = 'kixcleen_open_order';
const WASH_STORAGE_KEY = 'kixcleen_active_wash';

interface ActiveWash {
  orderId: string;
  startedAt: string;
}

function canUseStorage(): boolean {
  return Platform.OS === 'web' && typeof window !== 'undefined' && !!window.localStorage;
}

function loadJson<T>(key: string): T | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function saveJson(key: string, value: unknown | null): void {
  if (!canUseStorage()) return;
  try {
    if (value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Storage may be blocked (private mode); in-memory tracking still works
  }
}

function loadStored(): OpenOrder | null {
  return loadJson<OpenOrder>(STORAGE_KEY);
}

function persist(order: OpenOrder | null): void {
  saveJson(STORAGE_KEY, order);
}

// Anything stored before this page load belongs to a session that was interrupted
let interruptedFromPreviousSession: OpenOrder | null = loadStored();
let current: OpenOrder | null = null;

let interruptedWashFromPreviousSession: ActiveWash | null = loadJson<ActiveWash>(WASH_STORAGE_KEY);
let activeWash: ActiveWash | null = null;

/** Called when the customer presses CONFIRM ORDER. */
export function markOrderOpen(order: Omit<OpenOrder, 'openedAt'>): void {
  current = { ...order, openedAt: new Date().toISOString() };
  persist(current);
}

/** Keep the chosen payment method so a cancellation shows how the customer meant to pay. */
export function updateOpenOrderPaymentMethod(orderId: string, method: PaymentMethod | null): void {
  if (current && current.orderId === orderId) {
    current = { ...current, paymentMethod: method };
    persist(current);
  }
}

/** Called once payment succeeds: the order is no longer cancellable. */
export function markOrderPaid(orderId: string): void {
  if (current && current.orderId === orderId) {
    current = null;
    persist(null);
  }
}

/** True while the given order (or any order, if none given) is confirmed but unpaid. */
export function hasOpenOrder(orderId?: string): boolean {
  if (!current) return false;
  return orderId ? current.orderId === orderId : true;
}

/**
 * Report the open order as cancelled and stop tracking it.
 * Safe to call from several places: it only reports once per order.
 */
export function cancelOpenOrder(): boolean {
  if (!current) return false;
  const order = current;
  current = null;
  persist(null);
  reportKioskOrderCancelled({
    orderId: order.orderId,
    shoeCategory: order.shoeCategory,
    service: order.service,
    addons: order.addons,
    totalPrice: order.totalPrice,
    paymentMethod: order.paymentMethod,
  });
  return true;
}

/** Called when the progress screen starts the wash cycle for a paid order. */
export function markWashStarted(orderId: string): void {
  activeWash = { orderId, startedAt: new Date().toISOString() };
  saveJson(WASH_STORAGE_KEY, activeWash);
}

/** Called when the wash cycle completes normally. */
export function markWashFinished(orderId: string): void {
  if (activeWash && activeWash.orderId === orderId) {
    activeWash = null;
    saveJson(WASH_STORAGE_KEY, null);
  }
}

/**
 * Mark a wash that was still running as cancelled (the customer's payment stays recorded).
 * Safe to call from several places: it only reports once per wash.
 */
export function interruptActiveWash(): boolean {
  if (!activeWash) return false;
  const wash = activeWash;
  activeWash = null;
  saveJson(WASH_STORAGE_KEY, null);
  updateKioskCleaningStatus(wash.orderId, 'cancelled');
  return true;
}

/** Report an order or wash left open when the kiosk last stopped (reload, crash, closed tab). */
export function reportInterruptedOrderFromPreviousSession(): void {
  const wash = interruptedWashFromPreviousSession;
  interruptedWashFromPreviousSession = null;
  if (wash) {
    if (!activeWash) saveJson(WASH_STORAGE_KEY, null);
    updateKioskCleaningStatus(wash.orderId, 'cancelled');
  }

  const order = interruptedFromPreviousSession;
  interruptedFromPreviousSession = null;
  if (!order) return;
  // Only clear storage if nothing newer has been opened since this page loaded
  if (!current) persist(null);
  reportKioskOrderCancelled({
    orderId: order.orderId,
    shoeCategory: order.shoeCategory,
    service: order.service,
    addons: order.addons,
    totalPrice: order.totalPrice,
    paymentMethod: order.paymentMethod,
  });
}
