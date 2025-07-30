import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

const ThreeDModel = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  const handleResize = useCallback(() => {
    if (rendererRef.current && cameraRef.current && mountRef.current) {
      const { clientWidth, clientHeight } = mountRef.current;
      rendererRef.current.setSize(clientWidth, clientHeight);
      cameraRef.current.aspect = clientWidth / clientHeight;
      cameraRef.current.updateProjectionMatrix();
    }
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    
    if (currentMount.children.length === 0) {
        currentMount.appendChild(renderer.domElement);
    }

    const particlesGroup = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x1dc071,
      emissiveIntensity: 0.4,
      roughness: 0.5,
      metalness: 0.8,
    });

    for (let i = 0; i < 200; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      const scale = Math.random() * 0.5 + 0.5;
      particle.scale.set(scale, scale, scale);
      particlesGroup.add(particle);
    }
    scene.add(particlesGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x8c6dfd, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      particlesGroup.rotation.y = elapsedTime * 0.05;
      
      if(cameraRef.current) {
        cameraRef.current.position.x += (mouseX * 2 - cameraRef.current.position.x) * 0.02;
        cameraRef.current.position.y += (mouseY * 2 - cameraRef.current.position.y) * 0.02;
        cameraRef.current.lookAt(scene.position);
      }
      
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        try {
            currentMount.removeChild(renderer.domElement);
        } catch (e) {
            // Abaikan
        }
      }
    };
  }, [handleResize]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }} />;
};

export default ThreeDModel;