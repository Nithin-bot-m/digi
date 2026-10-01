'use client'

import * as React from 'react'
import * as THREE from 'three'
import { useReducedMotion } from './hooks'

/**
 * Awwwards-Grade Interactive 3D Infinity Ribbon Visual
 *
 * Implements a true WebGL 3D Parametric Lemniscate Knot with:
 * - 3D TubeGeometry flowing through space with 6-stop brand gradient vertex colors
 * - Particle stardust field orbiting the 3D ribbon curve
 * - Mouse parallax tilt & smooth inertia damping
 * - Scroll velocity coupling
 * - Performance optimized: pauses when off-screen, auto-scales on mobile, respects reduced motion
 */

// Brand Palette gradient stops
const COLOR_STOPS = [
  new THREE.Color('#02A3FE'), // Cyan
  new THREE.Color('#2E4BFE'), // Royal Blue
  new THREE.Color('#7B3FFE'), // Violet
  new THREE.Color('#E93BF2'), // Magenta
  new THREE.Color('#FF544D'), // Coral
  new THREE.Color('#FF8E2D'), // Orange
]

// 3D Infinity Lemniscate Curve definition
class InfinityCurve3D extends THREE.Curve<THREE.Vector3> {
  scale: number
  depth: number

  constructor(scale = 3.6, depth = 1.2) {
    super()
    this.scale = scale
    this.depth = depth
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const u = t * Math.PI * 2
    const sinU = Math.sin(u)
    const cosU = Math.cos(u)
    const denom = 1 + sinU * sinU

    // 3D Lemniscate of Gerono with helical z-oscillation
    const x = (this.scale * Math.SQRT2 * cosU) / denom
    const y = (this.scale * Math.SQRT2 * sinU * cosU) / denom
    const z = this.depth * Math.sin(u * 2) * Math.cos(u)

    return optionalTarget.set(x, y, z)
  }
}

export function ThreeInfinityVisual({
  className = '',
  intensity = 1.0,
  interactive = true,
}: {
  className?: string
  intensity?: number
  interactive?: boolean
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Verify WebGL availability
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return // graceful fallback
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 9.5)

    const isMobile = window.innerWidth < 768
    const dpr = Math.min(isMobile ? 1.5 : 2, window.devicePixelRatio || 1)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25

    container.appendChild(renderer.domElement)

    // Master 3D group
    const ribbonGroup = new THREE.Group()
    scene.add(ribbonGroup)

    // Initial slight diagonal tilt for brand aesthetic
    ribbonGroup.rotation.z = -0.22
    ribbonGroup.rotation.x = 0.28

    // 1. Build 3D Tube with Gradient Vertex Colors
    const curve = new InfinityCurve3D(isMobile ? 2.6 : 3.4, isMobile ? 0.8 : 1.1)
    const tubularSegments = isMobile ? 120 : 200
    const radius = isMobile ? 0.08 : 0.11
    const radialSegments = isMobile ? 8 : 14

    const tubeGeometry = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, true)

    // Calculate vertex colors along the curve length
    const count = tubeGeometry.attributes.position.count
    const colors = new Float32Array(count * 3)
    const colorA = new THREE.Color()
    const colorB = new THREE.Color()

    for (let i = 0; i < count; i++) {
      // Progress along tube u in [0, 1]
      const u = (i / count) % 1
      const scaled = u * (COLOR_STOPS.length - 1)
      const idx = Math.floor(scaled)
      const frac = scaled - idx

      colorA.copy(COLOR_STOPS[idx % COLOR_STOPS.length])
      colorB.copy(COLOR_STOPS[(idx + 1) % COLOR_STOPS.length])
      colorA.lerp(colorB, frac)

      colors[i * 3] = colorA.r
      colors[i * 3 + 1] = colorA.g
      colors[i * 3 + 2] = colorA.b
    }

    tubeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // High-end material with metallic sheen and emissive warmth
    const tubeMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.15,
      metalness: 0.85,
      emissive: new THREE.Color('#0A1A3E'),
      emissiveIntensity: 0.35,
    })

    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial)
    ribbonGroup.add(tubeMesh)

    // 2. Add Floating Orbiting Particle Field
    const particleCount = Math.floor((isMobile ? 120 : 320) * intensity)
    const particleGeo = new THREE.BufferGeometry()
    const pPositions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)
    const pSizes = new Float32Array(particleCount)
    const pData: { t: number; speed: number; offset: THREE.Vector3 }[] = []

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random()
      const pt = curve.getPoint(t)
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.85,
        (Math.random() - 0.5) * 0.85,
        (Math.random() - 0.5) * 0.85,
      )

      pPositions[i * 3] = pt.x + offset.x
      pPositions[i * 3 + 1] = pt.y + offset.y
      pPositions[i * 3 + 2] = pt.z + offset.z

      // Pick a radiant brand color
      const col = COLOR_STOPS[i % COLOR_STOPS.length]
      pColors[i * 3] = col.r
      pColors[i * 3 + 1] = col.g
      pColors[i * 3 + 2] = col.b

      pSizes[i] = Math.random() * (isMobile ? 2.5 : 4.0) + 1.2
      pData.push({
        t,
        speed: (0.0004 + Math.random() * 0.0009) * (Math.random() > 0.3 ? 1 : -0.7),
        offset,
      })
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1))

    // Create a circular glowing sprite for particles
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.35, 'rgba(2, 163, 254, 0.8)')
      grad.addColorStop(0.7, 'rgba(123, 63, 254, 0.3)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 32, 32)
    }
    const particleTexture = new THREE.CanvasTexture(canvas)

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    ribbonGroup.add(particles)

    // 3. Cinematic Scene Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const lightCyan = new THREE.PointLight(0x02a3fe, 3.5, 25)
    lightCyan.position.set(-5, 4, 3)
    scene.add(lightCyan)

    const lightMagenta = new THREE.PointLight(0xe93bf2, 3.0, 25)
    lightMagenta.position.set(5, -4, 3)
    scene.add(lightMagenta)

    const lightOrange = new THREE.PointLight(0xff8e2d, 2.5, 20)
    lightOrange.position.set(0, 5, 2)
    scene.add(lightOrange)

    // 4. Mouse / Touch Interactivity
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.targetX = x * 0.45
      mouse.targetY = y * 0.35
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // Resize Handler
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    onResize()
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    // Visibility management (pause when scrolled off-screen)
    let isVisible = true
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0.05 },
    )
    observer.observe(container)

    // 5. Render Loop with Smooth Damping
    let animationId = 0
    let lastTime = performance.now()
    let scrollRot = 0

    const render = (time: number) => {
      animationId = requestAnimationFrame(render)
      if (!isVisible) return

      const delta = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      // Mouse inertia damping
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      // Continuous gentle idle spin + mouse tilt
      if (!reduced) {
        ribbonGroup.rotation.y += 0.003
        ribbonGroup.rotation.x = 0.28 + mouse.y * 0.35
        ribbonGroup.rotation.z = -0.22 + mouse.x * 0.4

        // Animate particles along the curve
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute
        const posArr = posAttr.array as Float32Array

        for (let i = 0; i < particleCount; i++) {
          const item = pData[i]
          item.t = (item.t + item.speed) % 1
          if (item.t < 0) item.t += 1

          const pt = curve.getPoint(item.t)
          posArr[i * 3] = pt.x + item.offset.x
          posArr[i * 3 + 1] = pt.y + item.offset.y
          posArr[i * 3 + 2] = pt.z + item.offset.z
        }
        posAttr.needsUpdate = true

        // Scroll influence
        scrollRot = window.scrollY * 0.0004
        ribbonGroup.position.y = Math.sin(time * 0.001) * 0.12 - scrollRot * 0.2
      }

      renderer.render(scene, camera)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      observer.disconnect()

      // Clean up GPU resources
      tubeGeometry.dispose()
      tubeMaterial.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      particleTexture.dispose()
      renderer.dispose()

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [reduced, intensity, interactive])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none relative h-full w-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  )
}
