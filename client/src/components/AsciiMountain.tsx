/*
 * AsciiMountain — Custom canvas ASCII renderer with code snippets
 *
 * Architecture:
 *   Three.js renders to an offscreen WebGL canvas
 *   Each frame: sample pixel brightness → pick a code token from the matching band
 *   Draw tokens onto a 2D overlay canvas with grayscale colour mapping
 *
 *   FULL CONTROLS version — all settings exposed for tuning
 */

import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const MODEL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663475502250/g9AaU56zXeUfHmDy3BTvTM/snowy_mountain_decimated_58ef2822.stl";

// ── ASCII density ramp: 16 bands, darkest → brightest ───────────────────────
// Massive character set per band for fine-grained, photorealistic rendering
const BANDS = [
  // 0 – black / near-black
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  // 1 – barely visible
  [" ", " ", " ", ".", " ", " ", "·", " ", " ", " ", ".", " ", " ", " ", " ", "`"],
  // 2 – faint dots
  [".", "·", ",", "'", "`", ".", "·", ",", ".", "'", "·", ".", ",", "`", ".", "·"],
  // 3 – sparse punctuation
  [":", ";", "'", "\"", "~", "-", ".", "·", ",", "`", "^", ":", ";", "-", "~", "'"],
  // 4 – light strokes
  ["-", "~", "=", "+", "_", "¬", ":", ";", "^", "\"", "¯", "-", "~", "=", "+", "_"],
  // 5 – thin shapes
  ["/", "\\", "|", "(", ")", "[", "]", "{", "}", "<", ">", "!", "¡", "/", "\\", "|"],
  // 6 – light letters
  ["i", "l", "1", "!", ";", ":", "r", "c", "v", "t", "j", "f", "i", "l", "1", "r"],
  // 7 – small letters
  ["n", "u", "o", "a", "e", "s", "z", "x", "k", "y", "w", "p", "q", "d", "b", "m"],
  // 8 – mid letters
  ["T", "L", "J", "7", "F", "I", "C", "Y", "V", "t", "f", "r", "n", "u", "o", "a"],
  // 9 – medium density
  ["E", "Z", "S", "2", "3", "5", "G", "P", "A", "e", "s", "z", "g", "p", "a", "4"],
  // 10 – heavier letters
  ["X", "U", "O", "K", "R", "6", "9", "0", "q", "d", "b", "h", "k", "w", "m", "X"],
  // 11 – bold shapes
  ["D", "H", "N", "V", "W", "Q", "$", "E", "Z", "A", "G", "P", "S", "8", "D", "H"],
  // 12 – dense fills
  ["B", "M", "W", "#", "N", "Q", "D", "K", "H", "8", "&", "R", "G", "0", "B", "M"],
  // 13 – very dense
  ["@", "#", "W", "M", "N", "B", "%", "&", "$", "8", "0", "Q", "D", "@", "#", "W"],
  // 14 – near solid
  ["█", "▓", "@", "#", "W", "M", "B", "N", "%", "&", "$", "8", "█", "▓", "@", "#"],
  // 15 – solid / maximum density
  ["█", "█", "▓", "▓", "█", "▓", "█", "█", "▓", "█", "▓", "█", "█", "▓", "█", "█"],
];

const BAND_TOKENS = BANDS.map(b => [...b]);

interface Controls {
  rotX: number;      // Elevation / tilt
  rotY: number;      // Pitch / manual Y rotation
  rotZ: number;      // Roll
  spinSpeed: number;
  scale: number;
  lightRot: number;
  lightH: number;
  camDist: number;
  animateY: boolean;
  posX: number;      // Model X offset
  posY: number;      // Model Y offset
  fontSize: number;
  cellW: number;
  rowH: number;
  tokenLife: number;   // ms
  tokenStagger: number; // ms
  brightness: number;  // gamma boost
  offscreenRes: number; // 0.25–1.0
}

const DEFAULTS: Controls = {
  rotX: 0,
  rotY: 45,
  rotZ: 0,
  spinSpeed: 4.1,
  scale: 3.0,
  lightRot: 87,
  lightH: -0.7,
  camDist: 1.31,
  animateY: true,
  posX: 0,
  posY: -0.6,
  fontSize: 9,
  cellW: 7,
  rowH: 12,
  tokenLife: 4000,
  tokenStagger: 6000,
  brightness: 1.6,
  offscreenRes: 1.0,
};

interface Props {
  onPauseChange?: (paused: boolean) => void;
}

function lumToColor(lum: number, gamma: number): string {
  const boosted = Math.pow(lum, gamma);
  const v = Math.round(boosted * 255);
  return `rgb(${v},${v},${v})`;
}

export default function AsciiMountain({ onPauseChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const ctrlRef = useRef<Controls>({ ...DEFAULTS });
  const pivotRef = useRef<THREE.Group | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);
  const bboxRef = useRef<THREE.Box3 | null>(null);

  const [ctrl, setCtrl] = useState<Controls>({ ...DEFAULTS });
  const [showPanel, setShowPanel] = useState(true);

  const handlePause = useCallback(
    (p: boolean) => {
      pausedRef.current = p;
      onPauseChange?.(p);
    },
    [onPauseChange]
  );

  // Sync React state → refs
  useEffect(() => {
    ctrlRef.current = ctrl;
    const camera = cameraRef.current;
    const light = lightRef.current;
    const bbox = bboxRef.current;
    const mesh = meshRef.current;
    if (!camera || !light || !bbox || !mesh) return;

    mesh.rotation.x = (ctrl.rotX * Math.PI) / 180;
    mesh.rotation.y = (ctrl.rotY * Math.PI) / 180;
    mesh.rotation.z = (ctrl.rotZ * Math.PI) / 180;
    mesh.scale.setScalar(ctrl.scale);

    // Position offset
    const bboxHeight = bbox.max.z - bbox.min.z;
    mesh.position.x = ctrl.posX * bboxHeight;
    mesh.position.y = ctrl.posY * bboxHeight;

    const d = ctrl.camDist;
    camera.position.set(bbox.max.x * 4 * d, bbox.max.y * d, bbox.max.z * 3 * d);
    camera.lookAt(0, 0, 0);

    const angleRad = (ctrl.lightRot * Math.PI) / 180;
    const radius = bbox.max.z * 2;
    light.position.set(
      Math.cos(angleRad) * radius,
      ctrl.lightH * (bbox.max.y - bbox.min.y),
      Math.sin(angleRad) * radius
    );
  }, [ctrl]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas2d = canvasRef.current;
    if (!container || !canvas2d) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
    scene.add(pointLight);
    lightRef.current = pointLight;
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    const material = new THREE.MeshStandardMaterial({ flatShading: true, side: THREE.DoubleSide });
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });

    const ctx = canvas2d.getContext("2d")!;

    type Cell = { token: string; nextRefresh: number };
    let grid: Cell[][] = [];
    let COLS = 0;
    let ROWS = 0;

    const buildGrid = (w: number, h: number) => {
      const cc = ctrlRef.current;
      COLS = Math.floor(w / cc.cellW);
      ROWS = Math.floor(h / cc.rowH);
      const now = performance.now();
      grid = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({
          token: " ",
          nextRefresh: now + Math.random() * cc.tokenStagger,
        }))
      );
    };

    let pixelBuf: Uint8Array | null = null;
    let offW = 0, offH = 0;

    const sampleLum = (col: number, row: number): number => {
      if (!pixelBuf || offW === 0 || offH === 0) return 0;
      const px = Math.floor(((col + 0.5) / COLS) * offW);
      const py = Math.floor(((row + 0.5) / ROWS) * offH);
      const idx = (py * offW + px) * 4;
      const r = pixelBuf[idx];
      const g = pixelBuf[idx + 1];
      const b = pixelBuf[idx + 2];
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    const pickToken = (lum: number): string => {
      const bandIdx = Math.min(BAND_TOKENS.length - 1, Math.floor(lum * BAND_TOKENS.length));
      const band = BAND_TOKENS[bandIdx];
      return band[Math.floor(Math.random() * band.length)];
    };

    let animId: number;
    let loaded = false;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      if (pausedRef.current || !loaded) return;

      const cc = ctrlRef.current;
      // Scroll-driven Y rotation: map scroll progress (0→full page) to a full 360° turn
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      if (meshRef.current) {
        // Base rotation from scroll + optional continuous spin
        meshRef.current.rotation.y = scrollProgress * Math.PI * 0.3;
        if (cc.animateY) meshRef.current.rotation.y += performance.now() * cc.spinSpeed * 0.0001;
      }

      renderer.render(scene, camera);

      if (offW > 0 && offH > 0) {
        if (!pixelBuf || pixelBuf.length !== offW * offH * 4) {
          pixelBuf = new Uint8Array(offW * offH * 4);
        }
        const gl = renderer.getContext();
        gl.readPixels(0, 0, offW, offH, gl.RGBA, gl.UNSIGNED_BYTE, pixelBuf);
      }

      const now = performance.now();
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = grid[r]?.[c];
          if (!cell) continue;
          if (now >= cell.nextRefresh) {
            const lum = sampleLum(c, ROWS - 1 - r);
            cell.token = pickToken(lum);
            cell.nextRefresh = now + cc.tokenLife + Math.random() * cc.tokenStagger * 0.5;
          }
        }
      }

      ctx.clearRect(0, 0, canvas2d.width, canvas2d.height);
      ctx.font = `${cc.fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = grid[r]?.[c];
          if (!cell) continue;
          const lum = sampleLum(c, ROWS - 1 - r);
          const x = c * cc.cellW;
          if (cell.token === " " || lum < 0.02) continue;
          ctx.fillStyle = lumToColor(lum, cc.brightness);
          ctx.fillText(cell.token, x, r * cc.rowH);
          const tokenW = ctx.measureText(cell.token).width;
          const skipCols = Math.max(0, Math.floor(tokenW / cc.cellW) - 1);
          if (skipCols > 0) c += skipCols;
        }
      }
    };

    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      canvas2d.width = w;
      canvas2d.height = h;
      buildGrid(w, h);

      const cc = ctrlRef.current;
      offW = Math.floor(w * cc.offscreenRes);
      offH = Math.floor(h * cc.offscreenRes);
      renderer.setSize(offW, offH);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const loader = new STLLoader();

    loader.load(
      MODEL_URL,
      (geometry) => {
        geometry.computeVertexNormals();
        const mesh = new THREE.Mesh(geometry, material);
        meshRef.current = mesh;

        mesh.geometry.center();
        mesh.geometry.computeBoundingBox();
        const bbox = mesh.geometry.boundingBox!;
        bboxRef.current = bbox;

        scene.add(mesh);

        const c = ctrlRef.current;
        mesh.scale.setScalar(c.scale);
        const bboxHeight = bbox.max.z - bbox.min.z;
        mesh.position.x = c.posX * bboxHeight;
        mesh.position.y = c.posY * bboxHeight;
        mesh.rotation.x = (c.rotX * Math.PI) / 180;
        mesh.rotation.y = (c.rotY * Math.PI) / 180;
        mesh.rotation.z = (c.rotZ * Math.PI) / 180;

        const d = c.camDist;
        camera.position.set(bbox.max.x * 4 * d, bbox.max.y * d, bbox.max.z * 3 * d);
        camera.lookAt(0, 0, 0);

        const angleRad = (c.lightRot * Math.PI) / 180;
        const radius = bbox.max.z * 2;
        pointLight.position.set(
          Math.cos(angleRad) * radius,
          c.lightH * (bbox.max.y - bbox.min.y),
          Math.sin(angleRad) * radius
        );

        loaded = true;
      },
      undefined,
      (err) => console.error("[AsciiMountain] load error:", err)
    );

    animId = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      ([entry]) => handlePause(!entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      ro.disconnect();
      renderer.dispose();
    };
  }, [handlePause]);

  const update = (key: keyof Controls, val: number | boolean) =>
    setCtrl((prev) => ({ ...prev, [key]: val }));

  // Export current settings to console for easy copy
  const exportSettings = () => {
    const out = JSON.stringify(ctrl, null, 2);
    console.log("// ── Current AsciiMountain Settings ──\n" + out);
    navigator.clipboard?.writeText(out);
  };

  const sliders: { key: keyof Controls; label: string; min: number; max: number; step: number }[] = [
    { key: "rotX",        label: "Elevation (X)",     min: -180,  max: 180,   step: 1     },
    { key: "rotY",        label: "Pitch (Y)",         min: -180,  max: 180,   step: 1     },
    { key: "rotZ",        label: "Roll (Z)",          min: -180,  max: 180,   step: 1     },
    { key: "spinSpeed",   label: "Spin Speed",        min: 0,     max: 20,    step: 0.1   },
    { key: "scale",       label: "Scale",             min: 0.05,  max: 10,    step: 0.01  },
    { key: "posX",        label: "Position X",        min: -2,    max: 2,     step: 0.01  },
    { key: "posY",        label: "Position Y",        min: -2,    max: 2,     step: 0.01  },
    { key: "lightRot",    label: "Light Rotation",    min: 0,     max: 360,   step: 1     },
    { key: "lightH",      label: "Light Height",      min: -2,    max: 4,     step: 0.1   },
    { key: "camDist",     label: "Camera Distance",   min: 0.1,   max: 2,     step: 0.01  },
    { key: "fontSize",    label: "Font Size (px)",    min: 4,     max: 20,    step: 1     },
    { key: "cellW",       label: "Cell Width (px)",   min: 3,     max: 16,    step: 1     },
    { key: "rowH",        label: "Row Height (px)",   min: 6,     max: 24,    step: 1     },
    { key: "tokenLife",   label: "Token Life (ms)",   min: 500,   max: 12000, step: 100   },
    { key: "tokenStagger",label: "Token Stagger (ms)",min: 500,   max: 12000, step: 100   },
    { key: "brightness",  label: "Brightness γ",      min: 0.1,   max: 2,     step: 0.05  },
    { key: "offscreenRes",label: "Render Res",        min: 0.25,  max: 1,     step: 0.05  },
  ];

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 2 }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, background: "#000" }}
      />

      {/* Toggle button */}
      <button
        onClick={() => setShowPanel((p) => !p)}
        style={{
          position: "absolute", bottom: 16, left: 16, zIndex: 100,
          background: "rgba(0,0,0,0.85)", border: "1px solid rgba(59,130,246,0.5)",
          color: "#3b82f6", fontFamily: "monospace", fontSize: 11, padding: "5px 12px",
          cursor: "pointer", letterSpacing: "0.12em", pointerEvents: "all",
        }}
      >
        {showPanel ? "HIDE CONTROLS" : "// CONTROLS"}
      </button>

      {/* Full control panel */}
      {showPanel && (
        <div style={{
          position: "absolute", bottom: 48, left: 16, zIndex: 100, pointerEvents: "all",
          background: "rgba(0,0,0,0.92)", border: "1px solid rgba(255,255,255,0.12)",
          padding: "14px 16px", width: 260, fontFamily: "monospace", fontSize: 11, color: "white",
          maxHeight: "calc(100vh - 120px)", overflowY: "auto",
        }}>
          <div style={{ marginBottom: 10, letterSpacing: "0.12em", color: "#3b82f6", fontSize: 11, fontWeight: "bold" }}>
            // MOUNTAIN CONTROLS
          </div>

          {sliders.map(({ key, label, min, max, step }) => (
            <div key={key} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
                <span style={{ color: "#3b82f6" }}>
                  {(ctrl[key] as number).toFixed(step < 1 ? 2 : 0)}
                </span>
              </div>
              <input
                type="range" min={min} max={max} step={step}
                value={ctrl[key] as number}
                onChange={(e) => update(key, parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }}
              />
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
            <input
              type="checkbox" id="animY" checked={ctrl.animateY}
              onChange={(e) => update("animateY", e.target.checked)}
              style={{ accentColor: "#3b82f6", cursor: "pointer" }}
            />
            <label htmlFor="animY" style={{ cursor: "pointer" }}>Animate Y spin</label>
          </div>

          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            <button
              onClick={() => setCtrl({ ...DEFAULTS })}
              style={{
                flex: 1, background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)", color: "#888",
                fontFamily: "monospace", fontSize: 10, padding: "5px 0", cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              RESET
            </button>
            <button
              onClick={exportSettings}
              style={{
                flex: 1, background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.4)", color: "#3b82f6",
                fontFamily: "monospace", fontSize: 10, padding: "5px 0", cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              EXPORT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
