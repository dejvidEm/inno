'use client';

import { useEffect, useRef, useState } from "react"

export default function GoogleMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { rootMargin: "300px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: "100%", height: "400px" }}>
      {visible ? (
        <iframe
          title="Barbershop Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps?q=Ivanská%20cesta%2016733/15%2C%20821%2004%20Bratislava&output=embed"
        />
      ) : null}
    </div>
  )
}