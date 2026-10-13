/**
 * Local session log.
 *
 * Completed sessions are kept in localStorage so Home and Insights work with
 * or without Firebase. Components subscribe through useSessions(), which is
 * backed by useSyncExternalStore so every view updates the moment the timer
 * records a session (and across browser tabs).
 */
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'pomodoroSessions'
const MAX_SESSIONS = 1000

const listeners = new Set()

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch {
    // Storage unavailable (private mode / quota): keep working in memory only
  }
}

function emit() {
  listeners.forEach((listener) => listener())
}

// Newest first. The snapshot must keep a stable identity between writes.
let cache = load()

export function addSession(session) {
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
  cache = [{ id, ...session }, ...cache].slice(0, MAX_SESSIONS)
  persist()
  emit()
}

export function clearSessions() {
  cache = []
  persist()
  emit()
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return cache
}

export function useSessions() {
  return useSyncExternalStore(subscribe, getSnapshot)
}

// Keep other tabs in sync
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      cache = load()
      emit()
    }
  })
}
