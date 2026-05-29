import { useEffect } from 'react'

// Prevents the document body from scrolling while an overlay (drawer,
// bottom-sheet, modal) is open. Restores the previous overflow on close.
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [locked])
}
