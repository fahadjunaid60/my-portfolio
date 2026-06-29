"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { siLaravel } from "simple-icons";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// A self-solving Rubik's cube with dev-stack logo stickers, rendered with
// Three.js. Scrambles and unscrambles on an endless loop with a slow spin.
export function RubiksCube({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let running = true;
    let rafId = 0;
    const timeouts = new Set<ReturnType<typeof setTimeout>>();

    let w = el.clientWidth || 1;
    let h = el.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
    // Pulled back so the whole cube (plus scramble overhang) stays in frame and
    // reads a touch smaller, with room for the ground shadow below.
    camera.position.set(5.5, 4.4, 7.15);
    camera.lookAt(0, -0.55, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    // More overhead so the ground shadow stays compact under the cube (instead
    // of stretching far to the side and getting clipped at the canvas edge).
    key.position.set(-2.4, 9.5, 4.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 30;
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.bias = -0.0006;
    key.shadow.radius = 7;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xaebdff, 1.0);
    rim.position.set(6, 2.5, -4.5);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xffffff, 0.08));

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0c,
      metalness: 1.0,
      roughness: 0.17,
      clearcoat: 0.7,
      clearcoatRoughness: 0.32,
      envMapIntensity: 1.35,
    });
    const geo = new RoundedBoxGeometry(0.93, 0.93, 0.93, 5, 0.075);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    function roundRect(
      g: CanvasRenderingContext2D,
      x: number,
      y: number,
      ww: number,
      hh: number,
      r: number,
    ) {
      g.beginPath();
      g.moveTo(x + r, y);
      g.arcTo(x + ww, y, x + ww, y + hh, r);
      g.arcTo(x + ww, y + hh, x, y + hh, r);
      g.arcTo(x, y + hh, x, y, r);
      g.arcTo(x, y, x + ww, y, r);
      g.closePath();
    }
    type Spec = { bg: string; draw: (g: CanvasRenderingContext2D) => void };
    const SPECS: Record<string, Spec> = {
      react: {
        bg: "#20232A",
        draw: (g) => {
          g.strokeStyle = "#61DAFB";
          g.lineWidth = 11;
          for (let i = 0; i < 3; i++) {
            g.save();
            g.rotate((i * Math.PI) / 3);
            g.beginPath();
            g.ellipse(0, 0, 104, 40, 0, 0, Math.PI * 2);
            g.stroke();
            g.restore();
          }
          g.fillStyle = "#61DAFB";
          g.beginPath();
          g.arc(0, 0, 20, 0, Math.PI * 2);
          g.fill();
        },
      },
      node: {
        bg: "#2F2F2F",
        draw: (g) => {
          g.fillStyle = "#7FBA42";
          g.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 180) * (60 * i);
            const px = 96 * Math.cos(a),
              py = 96 * Math.sin(a);
            i ? g.lineTo(px, py) : g.moveTo(px, py);
          }
          g.closePath();
          g.fill();
          g.fillStyle = "#fff";
          g.font = "700 48px Arial, sans-serif";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText("node", 0, 4);
        },
      },
      js: {
        bg: "#F7DF1E",
        draw: (g) => {
          g.fillStyle = "#1a1a1a";
          g.font = "700 150px Arial, sans-serif";
          g.textAlign = "right";
          g.textBaseline = "bottom";
          g.fillText("JS", 104, 108);
        },
      },
      ts: {
        bg: "#3178C6",
        draw: (g) => {
          g.fillStyle = "#fff";
          g.font = "700 140px Arial, sans-serif";
          g.textAlign = "right";
          g.textBaseline = "bottom";
          g.fillText("TS", 104, 104);
        },
      },
      csharp: {
        bg: "#68217A",
        draw: (g) => {
          g.fillStyle = "#fff";
          g.font = "700 132px Arial, sans-serif";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText("C#", 0, 8);
        },
      },
      laravel: {
        bg: "#ffffff",
        draw: (g) => {
          const s = 172 / 24;
          g.fillStyle = "#FF2D20";
          g.scale(s, s);
          g.translate(-12, -12);
          g.fill(new Path2D(siLaravel.path));
        },
      },
    };
    const createdTextures: THREE.Texture[] = [];
    function makeStickerTexture(k2: string) {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 256;
      const g = cv.getContext("2d")!;
      const pad = 4,
        r = 46,
        ww = 256 - 2 * pad,
        hh = 256 - 2 * pad;
      const s = SPECS[k2];
      roundRect(g, pad, pad, ww, hh, r);
      g.fillStyle = s.bg;
      g.fill();
      g.save();
      roundRect(g, pad, pad, ww, hh, r);
      g.clip();
      g.translate(128, 128);
      s.draw(g);
      g.restore();
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAniso || 4;
      createdTextures.push(tex);
      return tex;
    }
    const logoForFace: Record<string, string> = {
      pz: "react",
      px: "node",
      py: "js",
      my: "ts",
      mx: "csharp",
      mz: "laravel",
    };
    const stickerMats: Record<string, THREE.MeshPhysicalMaterial> = {};
    for (const fk in logoForFace) {
      const tex = makeStickerTexture(logoForFace[fk]);
      if (fk === "mz") {
        tex.wrapS = THREE.RepeatWrapping;
        tex.repeat.x = -1;
        tex.offset.x = 1;
      }
      stickerMats[fk] = new THREE.MeshPhysicalMaterial({
        map: tex,
        transparent: true,
        metalness: 0,
        roughness: 0.32,
        clearcoat: 0.85,
        clearcoatRoughness: 0.14,
        envMapIntensity: 0.8,
      });
    }
    const tileGeo = new THREE.PlaneGeometry(0.84, 0.84);
    const faceDefs = [
      { key: "px", ax: 0, sign: 1, pos: [0.472, 0, 0], rot: ["y", Math.PI / 2] },
      { key: "mx", ax: 0, sign: -1, pos: [-0.472, 0, 0], rot: ["y", -Math.PI / 2] },
      { key: "py", ax: 1, sign: 1, pos: [0, 0.472, 0], rot: ["x", -Math.PI / 2] },
      { key: "my", ax: 1, sign: -1, pos: [0, -0.472, 0], rot: ["x", Math.PI / 2] },
      { key: "pz", ax: 2, sign: 1, pos: [0, 0, 0.472], rot: null },
      { key: "mz", ax: 2, sign: -1, pos: [0, 0, -0.472], rot: ["y", Math.PI] },
    ] as const;

    const group = new THREE.Group();
    group.rotation.x = 0.18;
    group.rotation.y = -0.4;
    scene.add(group);
    type Cubie = { mesh: THREE.Mesh; pos: number[] };
    const cubies: Cubie[] = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          const m = new THREE.Mesh(geo, mat);
          m.position.set(x, y, z);
          m.castShadow = true;
          m.receiveShadow = true;
          const coord = [x, y, z];
          faceDefs.forEach((fd) => {
            if (coord[fd.ax] === fd.sign) {
              const s = new THREE.Mesh(tileGeo, stickerMats[fd.key]);
              s.position.set(fd.pos[0], fd.pos[1], fd.pos[2]);
              if (fd.rot)
                (s.rotation as unknown as Record<string, number>)[fd.rot[0]] =
                  fd.rot[1] as number;
              s.castShadow = false;
              s.receiveShadow = true;
              m.add(s);
            }
          });
          group.add(m);
          cubies.push({ mesh: m, pos: [x, y, z] });
        }

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.ShadowMaterial({ opacity: 0.45 }),
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.7;
    plane.receiveShadow = true;
    scene.add(plane);

    // Apply a random scramble instantly on load (so the cube starts unsolved);
    // the move list is recorded so the loop can solve it first.
    type ScrMove = { axis: "x" | "y" | "z"; layer: number; dir: number };
    function scrambleInstant(n: number): ScrMove[] {
      const seq: ScrMove[] = [];
      const axes = ["x", "y", "z"] as const;
      for (let i = 0; i < n; i++) {
        const axis = axes[(Math.random() * 3) | 0];
        const layer = [-1, 0, 1][(Math.random() * 3) | 0];
        const dir = Math.random() < 0.5 ? -1 : 1;
        const ai = { x: 0, y: 1, z: 2 }[axis];
        const sel = cubies.filter((c) => c.pos[ai] === layer);
        const pivot = new THREE.Group();
        group.add(pivot);
        sel.forEach((c) => pivot.attach(c.mesh));
        pivot.rotation[axis] = dir * (Math.PI / 2);
        pivot.updateMatrixWorld(true);
        sel.forEach((c) => {
          group.attach(c.mesh);
          c.pos = [
            Math.round(c.mesh.position.x),
            Math.round(c.mesh.position.y),
            Math.round(c.mesh.position.z),
          ];
        });
        group.remove(pivot);
        seq.push({ axis, layer, dir });
      }
      return seq;
    }
    const initialScramble = scrambleInstant(14);

    const SPEED = 1;
    type Move = {
      pivot: THREE.Group;
      axis: "x" | "y" | "z";
      target: number;
      t: number;
      dur: number;
      sel: Cubie[];
      onDone: () => void;
    };
    const moves: Move[] = [];
    function doStep(list: { axis: "x" | "y" | "z"; layer: number; dir: number }[]) {
      return new Promise<void>((res) => {
        if (!list.length) return res();
        const dur = Math.round(440 / SPEED);
        let remaining = list.length;
        const done = () => {
          if (--remaining === 0) res();
        };
        list.forEach((mv) => {
          const ai = { x: 0, y: 1, z: 2 }[mv.axis];
          const sel = cubies.filter((c) => c.pos[ai] === mv.layer);
          const pivot = new THREE.Group();
          group.add(pivot);
          sel.forEach((c) => pivot.attach(c.mesh));
          moves.push({
            pivot,
            axis: mv.axis,
            target: (mv.dir * Math.PI) / 2,
            t: 0,
            dur,
            sel,
            onDone: done,
          });
        });
      });
    }
    function finalize(m: Move) {
      m.pivot.rotation[m.axis] = m.target;
      m.pivot.updateMatrixWorld(true);
      m.sel.forEach((c) => {
        group.attach(c.mesh);
        c.pos = [
          Math.round(c.mesh.position.x),
          Math.round(c.mesh.position.y),
          Math.round(c.mesh.position.z),
        ];
      });
      group.remove(m.pivot);
    }
    function genStep(prevAxis: string | null) {
      const axes = ["x", "y", "z"] as const;
      let axis: "x" | "y" | "z";
      do {
        axis = axes[(Math.random() * 3) | 0];
      } while (axis === prevAxis);
      const roll = Math.random();
      let layers: number[];
      if (roll < 0.5) layers = [-1, 1];
      else if (roll < 0.78) layers = [-1, 0, 1];
      else layers = [Math.random() < 0.5 ? -1 : 1];
      return {
        axis,
        list: layers.map((layer) => ({
          axis,
          layer,
          dir: Math.random() < 0.5 ? -1 : 1,
        })),
      };
    }
    const delay = (ms: number) =>
      new Promise<void>((r) => {
        const id = setTimeout(() => {
          timeouts.delete(id);
          r();
        }, ms);
        timeouts.add(id);
      });
    async function loop() {
      // Solve the initial scramble first, then run the regular cycle.
      await delay(900);
      for (let i = initialScramble.length - 1; i >= 0; i--) {
        if (!running) return;
        const mv = initialScramble[i];
        await doStep([{ axis: mv.axis, layer: mv.layer, dir: -mv.dir }]);
        await delay(Math.round(110 / SPEED));
      }
      await delay(1200);

      while (running) {
        await delay(800);
        if (!running) return;
        const steps: { axis: "x" | "y" | "z"; list: { axis: "x" | "y" | "z"; layer: number; dir: number }[] }[] = [];
        let prev: string | null = null;
        for (let i = 0; i < 11; i++) {
          const s = genStep(prev);
          steps.push(s);
          prev = s.axis;
        }
        for (const s of steps) {
          if (!running) return;
          await doStep(s.list);
          await delay(Math.round(110 / SPEED));
        }
        await delay(1000);
        for (let i = steps.length - 1; i >= 0; i--) {
          if (!running) return;
          const inv = steps[i].list.map((mv) => ({
            axis: mv.axis,
            layer: mv.layer,
            dir: -mv.dir,
          }));
          await doStep(inv);
          await delay(Math.round(110 / SPEED));
        }
      }
    }

    const clock = new THREE.Clock();
    function animate() {
      if (!running) return;
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      group.rotation.y += dt * 0.26 * SPEED;
      for (let i = moves.length - 1; i >= 0; i--) {
        const m = moves[i];
        m.t += dt * 1000;
        const k = Math.min(1, m.t / m.dur);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        m.pivot.rotation[m.axis] = m.target * e;
        if (k >= 1) {
          finalize(m);
          moves.splice(i, 1);
          m.onDone();
        }
      }
      renderer.render(scene, camera);
    }
    animate();
    loop();

    const ro = new ResizeObserver(() => {
      w = el.clientWidth;
      h = el.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(el);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      timeouts.forEach((id) => clearTimeout(id));
      ro.disconnect();
      geo.dispose();
      tileGeo.dispose();
      mat.dispose();
      createdTextures.forEach((t) => t.dispose());
      Object.values(stickerMats).forEach((m) => m.dispose());
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el)
        el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={className} />
  );
}
