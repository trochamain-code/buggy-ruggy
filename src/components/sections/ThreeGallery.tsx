import { useRef, useEffect } from "react";
import * as THREE from "three";
import { galleryImages } from "@/lib/data";

const IMAGE_HEIGHT = 180;
const IMAGE_GAP = 28;
const MAX_IMAGE_WIDTH = 500;
const BAND_HEIGHT = 220;

const BANDS = 8;
const IMAGES_PER_BAND = [11, 12, 11, 12, 12, 11, 12, 12]; // ~93 images across 8 bands

function getBandImages(bandIndex: number) {
  const start = IMAGES_PER_BAND.slice(0, bandIndex).reduce((a, b) => a + b, 0);
  const count = IMAGES_PER_BAND[bandIndex] ?? 11;
  return galleryImages.slice(start, start + count);
}

interface BandResult {
  texture: THREE.Texture;
  sequenceWidth: number;
  totalWidth: number;
}

function createTextureForBand(bandIndex: number): Promise<BandResult> {
  return new Promise((resolve) => {
    const images = getBandImages(bandIndex);
    let loaded = 0;
    const imgData: { img: HTMLImageElement; width: number; height: number }[] = [];

    if (images.length === 0) {
      resolve({ texture: new THREE.Texture(), sequenceWidth: 0, totalWidth: 0 });
      return;
    }

    images.forEach((image) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        let w = Math.round(IMAGE_HEIGHT * ratio);
        let h = IMAGE_HEIGHT;
        if (w > MAX_IMAGE_WIDTH) {
          w = MAX_IMAGE_WIDTH;
          h = Math.round(w / ratio);
        }
        imgData.push({ img, width: w, height: h });
        loaded++;
        if (loaded === images.length) drawBand();
      };
      img.onerror = () => {
        loaded++;
        if (loaded === images.length) drawBand();
      };
      img.src = image.src;
    });

    function drawBand() {
      const CLONE_COUNT = 3;
      let seqW = 0;
      for (const d of imgData) seqW += d.width + IMAGE_GAP;
      seqW -= IMAGE_GAP;
      const totalW = seqW * CLONE_COUNT;

      const canvas = document.createElement("canvas");
      canvas.width = totalW;
      canvas.height = BAND_HEIGHT;
      const ctx = canvas.getContext("2d")!;

      let x = 0;
      for (let c = 0; c < CLONE_COUNT; c++) {
        for (const d of imgData) {
          const cy = (BAND_HEIGHT - d.height) / 2;
          ctx.globalAlpha = 0.92;
          ctx.drawImage(d.img, x, cy, d.width, d.height);
          x += d.width + IMAGE_GAP;
        }
      }

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      resolve({ texture, sequenceWidth: seqW, totalWidth: totalW });
    }
  });
}

const vertShader = `varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragShader = `precision highp float;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uTextureWidth;
uniform float uSequenceWidth;
uniform float uScroll;
uniform float uSpeed;
uniform float uOffsetY;
uniform float uRotation;
uniform float uBandIndex;
uniform float uCurveAmount;

varying vec2 vUv;

mat2 rotate2d(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
  vec2 pixelCoord = vUv * uResolution;

  // Curve
  float nx = pixelCoord.x / uResolution.x;
  float curve = 4.0 * (nx - 0.5) * (nx - 0.5);
  float curveOffset = (0.5 - curve) * uCurveAmount;

  float bandTop = (uResolution.y - 220.0) * 0.5 + uOffsetY + curveOffset;
  float bandBottom = bandTop + 220.0;
  float bandCenterY = bandTop + 110.0;

  // Rotation
  vec2 rc = vec2(uResolution.x * 0.5, bandCenterY);
  pixelCoord -= rc;
  pixelCoord = rotate2d(uRotation) * pixelCoord;
  pixelCoord += rc;

  vec2 rt = vec2(0.0, bandTop) - rc;
  rt = rotate2d(uRotation) * rt + rc;
  vec2 rb = vec2(0.0, bandBottom) - rc;
  rb = rotate2d(uRotation) * rb + rc;
  bandTop = min(rt.y, rb.y);
  bandBottom = max(rt.y, rb.y);

  if (pixelCoord.y < bandTop - 2.0 || pixelCoord.y > bandBottom + 2.0) { discard; return; }

  float scrollPos = uScroll * uSpeed;
  float wrappedX = mod(pixelCoord.x + scrollPos, uSequenceWidth);
  float texX = (wrappedX + uSequenceWidth) / uTextureWidth;
  float texY = (pixelCoord.y - bandTop) / (bandBottom - bandTop);

  if (texX < 0.0 || texX > 1.0 || texY < 0.0 || texY > 1.0) { discard; return; }

  vec4 color = texture2D(uTexture, vec2(texX, texY));
  if (color.a < 0.3) { discard; return; }

  float edge = min(pixelCoord.y - bandTop, bandBottom - pixelCoord.y);
  if (edge < 2.0) color.a *= smoothstep(0.0, 2.0, edge);

  if (color.a < 0.01) { discard; return; }

  gl_FragColor = color;
}`;

interface BandConfig {
  offsetY: number;
  speed: number;
  rotation: number;
  curveAmount: number;
}

const bandConfigs: BandConfig[] = [
  { offsetY: -195, speed: 0.8, rotation: 0.12, curveAmount: 30 },
  { offsetY: -135, speed: 1.1, rotation: -0.08, curveAmount: 35 },
  { offsetY: -75, speed: 1.4, rotation: 0.1, curveAmount: 28 },
  { offsetY: -15, speed: 0.6, rotation: -0.06, curveAmount: 32 },
  { offsetY: 45, speed: 0.9, rotation: 0.07, curveAmount: 30 },
  { offsetY: 105, speed: 1.2, rotation: -0.1, curveAmount: 34 },
  { offsetY: 165, speed: 0.7, rotation: 0.09, curveAmount: 28 },
  { offsetY: 225, speed: 1.5, rotation: -0.07, curveAmount: 36 },
];

export function ThreeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialsRef = useRef<THREE.ShaderMaterial[]>([]);
  const scrollRef = useRef(0);
  const targetRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const lastYRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";

    sceneRef.current = scene;
    rendererRef.current = renderer;

    let destroyed = false;

    async function initBands() {
      const results = await Promise.all(
        Array.from({ length: BANDS }, (_, i) => createTextureForBand(i)),
      );

      if (destroyed) return;

      results.forEach((result, i) => {
        const config = bandConfigs[i]!;
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uResolution: { value: new THREE.Vector2() },
            uTexture: { value: result.texture },
            uTextureWidth: { value: result.totalWidth },
            uSequenceWidth: { value: result.sequenceWidth },
            uScroll: { value: 0 },
            uSpeed: { value: config.speed },
            uOffsetY: { value: config.offsetY },
            uRotation: { value: config.rotation },
            uBandIndex: { value: i },
            uCurveAmount: { value: config.curveAmount },
          },
          vertexShader: vertShader,
          fragmentShader: fragShader,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });
        materialsRef.current.push(mat);
        const geo = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.z = i * -0.08;
        scene.add(mesh);
      });
    }

    initBands();

    // Wheel
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current += e.deltaY * 1.5;
      velocityRef.current = e.deltaY * 0.12;
    };

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      draggingRef.current = true;
      lastYRef.current = e.touches[0]!.clientY;
      velocityRef.current = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      const dy = e.touches[0]!.clientY - lastYRef.current;
      targetRef.current += dy * 2.2;
      lastYRef.current = e.touches[0]!.clientY;
      velocityRef.current = dy * 0.25;
    };
    const onTouchEnd = () => {
      draggingRef.current = false;
    };

    // Mouse drag
    const onMouseDown = (e: MouseEvent) => {
      draggingRef.current = true;
      lastYRef.current = e.clientY;
      velocityRef.current = 0;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const dy = e.clientY - lastYRef.current;
      targetRef.current += dy * 2;
      lastYRef.current = e.clientY;
      velocityRef.current = dy * 0.2;
    };
    const onMouseUp = () => {
      draggingRef.current = false;
    };

    // Key arrows
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        targetRef.current -= 50;
        velocityRef.current = -8;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        targetRef.current += 50;
        velocityRef.current = 8;
      }
    };

    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    renderer.domElement.addEventListener("touchmove", onTouchMove, { passive: false });
    renderer.domElement.addEventListener("touchend", onTouchEnd);
    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("keydown", onKeyDown);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      for (const mat of materialsRef.current) {
        mat.uniforms.uResolution!.value.set(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", resize);

    function animate() {
      if (destroyed) return;
      const inertia = 0.93;
      if (!draggingRef.current) {
        targetRef.current += velocityRef.current;
        velocityRef.current *= inertia;
        if (Math.abs(velocityRef.current) < 0.3) velocityRef.current = 0;
      }
      const smoothing = draggingRef.current ? 0.3 : 0.08;
      scrollRef.current += (targetRef.current - scrollRef.current) * smoothing;
      for (const mat of materialsRef.current) {
        mat.uniforms.uScroll!.value = scrollRef.current;
        mat.uniforms.uResolution!.value.set(window.innerWidth, window.innerHeight);
      }
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove", onTouchMove);
      renderer.domElement.removeEventListener("touchend", onTouchEnd);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("keydown", onKeyDown);
      for (const mat of materialsRef.current) {
        mat.uniforms.uTexture!.value.dispose();
        mat.dispose();
      }
      materialsRef.current = [];
      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.remove();
    };
  }, []);

  return (
    <section
      id="galeria"
      ref={containerRef}
      className="relative h-svh w-full overflow-hidden bg-[#0a1a2a]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#0a1a2a] to-transparent h-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0a1a2a] to-transparent h-20" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-6 pointer-events-none">
        <span className="font-street text-sm uppercase tracking-[0.3em] text-white/50">
          scroll | drag | ← →
        </span>
        <span className="font-street text-sm uppercase tracking-[0.3em] text-white/50">
          Galería — {galleryImages.length} alfombras
        </span>
      </div>
    </section>
  );
}
