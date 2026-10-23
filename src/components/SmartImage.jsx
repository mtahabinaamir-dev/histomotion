import { useState } from 'react'

// Image with responsive srcset and a graceful branded fallback.
// If a remote photo ever fails, visitors see a gradient panel — never a
// broken-image glyph over a void.
export default function SmartImage({ src, alt, eager = false }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span className="img-fallback" role="img" aria-label={alt}>
        <span aria-hidden="true">◈</span>
      </span>
    )
  }
  const srcSet = [600, 900, 1400].map((w) => `${src.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(', ')
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes="(max-width: 720px) 90vw, 600px"
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  )
}
