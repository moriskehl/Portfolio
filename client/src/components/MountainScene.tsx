/*
 * MountainScene — Strict B/W/Blue variant
 *
 * Features:
 * - White wireframe base, blue peak highlights
 * - Intersection Observer: pauses Three.js render loop when hero leaves viewport
 * - Scroll-driven camera: camera Z position tied to native scroll progress (no hijacking)
 * - Mouse parallax tilt
 * - Exposes `onPauseChange` callback so parent can also pause MatrixRain
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

interface MountainSceneProps {
  onPauseChange?: (paused: boolean) => void;
}

export default function MountainScene({ onPauseChange }: MountainSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pausedRef = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.028);

    // ── Camera ────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    // Base position — scroll will move Z between 22 and 14
    camera.position.set(0, 5, 22);
    camera.lookAt(0, 0.5, 0);

    // ── Terrain geometry ──────────────────────────────────
    const SEGMENTS = 110;
    const SIZE = 42;
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
    geo.rotateX(-Math.PI / 2);

    const noise2D = createNoise2D();
    const pos = geo.attributes.position;
    const colors: number[] = [];

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const nx = x / SIZE;
      const nz = z / SIZE;

      let h =
        noise2D(nx * 2.4, nz * 2.4) * 5.0 +
        noise2D(nx * 5.2, nz * 5.2) * 2.2 +
        noise2D(nx * 11, nz * 11) * 0.9 +
        noise2D(nx * 22, nz * 22) * 0.3;

      const dist = Math.sqrt(x * x + z * z) / (SIZE * 0.5);
      const falloff = Math.max(0, 1 - dist * 1.05);
      h = h * falloff * falloff + Math.max(0, 1 - dist * 0.75) * 2.2;
      h = Math.max(0, h);

      pos.setY(i, h);

      // Color: white base → blue at peaks
      const t = Math.min(h / 9, 1);
      if (t > 0.78) {
        // Peak — blue (#3b82f6 → #93c5fd)
        colors.push(0.58, 0.76, 0.98);
      } else if (t > 0.5) {
        // Upper slope — bright white
        colors.push(0.92, 0.94, 1.0);
      } else if (t > 0.25) {
        // Mid slope — cool white
        colors.push(0.72, 0.78, 0.88);
      } else {
        // Base — dim blue-grey
        colors.push(0.22, 0.28, 0.38);
      }
    }

    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const wireMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.72,
    });

    const mountain = new THREE.Mesh(geo, wireMat);
    mountain.position.y = -3.5;
    scene.add(mountain);

    // ── Mouse parallax ────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Scroll → camera Z (no hijacking) ─────────────────
    // Hero occupies 0–100vh. We map scroll 0→heroHeight to camera Z 22→15
    const onScroll = () => {
      if (pausedRef.current) return;
      const heroHeight = window.innerHeight;
      const progress = Math.min(window.scrollY / heroHeight, 1);
      // Ease: camera moves forward (zoom in) as user scrolls
      camera.position.z = 22 - progress * 8;
      camera.position.y = 5 + progress * 1.5;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Resize ────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Intersection Observer — pause when off-screen ─────
    const observer = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting;
        onPauseChange?.(!entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    // ── Animation loop ────────────────────────────────────
    let animId: number;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (pausedRef.current) return;

      t += 0.003;

      // Slow Y rotation
      mountain.rotation.y = t * 0.2;

      // Mouse parallax tilt
      const targetX = mouseRef.current.y * 0.10;
      const targetZ = mouseRef.current.x * 0.06;
      mountain.rotation.x += (targetX - mountain.rotation.x) * 0.04;
      mountain.rotation.z += (targetZ - mountain.rotation.z) * 0.04;

      // Gentle bob
      mountain.position.y = -3.5 + Math.sin(t * 0.45) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onPauseChange]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 2 }}
    />
  );
}
