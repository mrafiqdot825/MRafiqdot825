"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5ebe1, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfdf9f6, 0.7);
    scene.add(ambientLight);

    const pointLightPurple = new THREE.PointLight(0xd7bdb0, 4, 30);
    pointLightPurple.position.set(5, 5, 5);
    scene.add(pointLightPurple);

    const pointLightCyan = new THREE.PointLight(0xb8907d, 4, 30);
    pointLightCyan.position.set(-5, -5, 5);
    scene.add(pointLightCyan);

    // 3. Floating Glass Spheres Group
    const glassGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.2,
      color: 0xf5ebe1,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const sphereCount = 12;
    const spheres: THREE.Mesh[] = [];

    for (let i = 0; i < sphereCount; i++) {
      const scale = Math.random() * 0.8 + 0.4;
      const sphere = new THREE.Mesh(sphereGeo, glassMaterial);
      sphere.scale.set(scale, scale, scale);
      sphere.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      spheres.push(sphere);
      glassGroup.add(sphere);
    }
    scene.add(glassGroup);

    // 4. Digital Core Planet
    const coreGeo = new THREE.IcosahedronGeometry(2.5, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd7bdb0,
      wireframe: true,
      emissive: 0xc9a999,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xb8907d,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // 5. Floating Binary Code Particle Cloud
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 30;
      particlePos[i + 1] = (Math.random() - 0.5) * 20;
      particlePos[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePos, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xd7bdb0,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Mouse Interaction & Physics Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const timer = new THREE.Timer();

    const animate = (timestamp?: number) => {
      timer.update(timestamp);
      const elapsedTime = timer.getElapsed();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate central core
      coreMesh.rotation.x = elapsedTime * 0.15;
      coreMesh.rotation.y = elapsedTime * 0.25;

      innerMesh.rotation.x = -elapsedTime * 0.3;
      innerMesh.rotation.y = -elapsedTime * 0.4;

      // Rotate particle cloud
      particleSystem.rotation.y = elapsedTime * 0.03;

      // Animate spheres float
      spheres.forEach((s, idx) => {
        s.position.y += Math.sin(elapsedTime * 0.8 + idx) * 0.005;
        s.rotation.x += 0.005;
        s.rotation.y += 0.008;
      });

      // Move light positions based on mouse & time
      pointLightPurple.position.x = Math.sin(elapsedTime * 0.7) * 6 + mouseX * 5;
      pointLightPurple.position.y = Math.cos(elapsedTime * 0.5) * 6 + mouseY * 5;

      pointLightCyan.position.x = -Math.sin(elapsedTime * 0.6) * 6 - mouseX * 5;
      pointLightCyan.position.y = -Math.cos(elapsedTime * 0.8) * 6 - mouseY * 5;

      // Camera parallax tilt
      camera.position.x = mouseX * 2;
      camera.position.y = mouseY * 2;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      timer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-85"
    />
  );
}
