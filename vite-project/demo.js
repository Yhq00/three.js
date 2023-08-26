import './public/styles.css';

import * as THREE from "three";
//创建WebGL实例，动态渲染canvas 并撑满屏幕
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//创建场景和相机
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//创建辅助工具 直角坐标系 正x屏幕右侧 正y向上 正z由内到外
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//设置相机位置
camera.position.set(0, 2, 5);

//创建立体几何体
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

//添加到场景
scene.add(box);

//几何体动画效果
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
//会在最佳帧率下反复被调用
renderer.setAnimationLoop(animate);
renderer.render(scene, camera);