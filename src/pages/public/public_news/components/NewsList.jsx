import React, { useRef, useEffect } from 'react';
import NewsHero from './NewsHero';
import NewsItem from './NewsItem';

const NewsList = ({ featured, items = [], onScrollEndChange }) => {
  const listRef = useRef(null)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 1
    if (typeof onScrollEndChange === 'function') onScrollEndChange(atBottom)
  }, [items, onScrollEndChange])

  const handleScroll = (e) => {
    const el = e.target
    const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 1
    if (typeof onScrollEndChange === 'function') onScrollEndChange(atBottom)
  }

  // Smooth scroll implementation using requestAnimationFrame to avoid jumpy wheel behavior
  const scrollAnim = useRef(null)
  useEffect(() => {
    return () => {
      if (scrollAnim.current) cancelAnimationFrame(scrollAnim.current)
    }
  }, [])

  const smoothScrollBy = (delta) => {
    const el = listRef.current
    if (!el) return
    const start = el.scrollTop
    const max = el.scrollHeight - el.clientHeight
    const end = Math.max(0, Math.min(start + delta, max))
    const duration = 500
    const t0 = performance.now()

    if (scrollAnim.current) cancelAnimationFrame(scrollAnim.current)

    const step = (now) => {
      const t = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - t, 4) // easeOutQuart (gentler)
      el.scrollTop = start + (end - start) * eased
      if (t < 1) scrollAnim.current = requestAnimationFrame(step)
      else scrollAnim.current = null
    }

    scrollAnim.current = requestAnimationFrame(step)
  }

  const handleWheel = (e) => {
    const el = listRef.current
    if (!el) return

    const isScrollingDown = e.deltaY > 0
    const isScrollingUp = e.deltaY < 0
    const canScrollDown = el.scrollTop < el.scrollHeight - el.clientHeight
    const canScrollUp = el.scrollTop > 0

    if ((isScrollingDown && canScrollDown) || (isScrollingUp && canScrollUp)) {
      e.preventDefault()
      e.stopPropagation()

      // Even smaller factor for a very gentle feel
      const factor = 0.12
      const delta = e.deltaY * factor
      smoothScrollBy(delta)
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
        <div className="md:col-span-2">
          <div className="sticky top-6 self-start">
            <NewsHero article={featured} />
          </div>
        </div>

        <aside className="md:col-span-1">
          <div className="bg-transparent">
            {/* Make the news list scrollable within the sidebar area. Keep minimal change. */}
            <div 
              ref={listRef} 
              onScroll={handleScroll} 
              onWheel={handleWheel}
              className="max-h-130 overflow-y-scroll pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#CBD5E0 #F7FAFC'
              }}
            >
              {items.map((it, i) => (
                <NewsItem key={i} item={it} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsList;
