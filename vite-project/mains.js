import "./style.css";

import * as THREE from "three";

//添加轨道控制器 通过鼠标控制在场景中移动视角
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//场景是一个容器，用于存放所有的对象，相机和灯光
const scene = new THREE.Scene();

//相机（有多种这里是透视相机，模拟人眼识别效果），用于拍摄场景,四个参数分别是视场角，纵横比，近裁剪面，远裁剪面
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
//设置渲染器的比例为设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
//设置为全屏幕大小
renderer.setSize(window.innerWidth, window.innerHeight);
//将相机位置沿着Z轴移动
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//网格材质现在是基础材质
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff6347,
//   wireframe: true,
// });
//网格标准材质 会对光线进行反射
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
//网格标准材质不设置wireframe为true需要光源才能显示物体
//光源 PointLight 从自身向四面八方发光 白色
const pointLight = new THREE.PointLight(0xFFFFFF);
//改变光源位置
pointLight.position.set(0, 0, 5);
//实例化环境光
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
//将光源添加到场景中
scene.add(pointLight, ambientLight);
//实例化一个控制类
const controls = new OrbitControls(camera, renderer.domElement);

//数学辅助工具生成满天星
function addStar() {
  //实例化一个球体几何体，每个球体的半径设置为0.25，24水平经度，24垂直维度
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  //创建材质
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  //材质与球体组成网格
  const star = new THREE.Mesh(geometry, material);
  //随机将星星定位在场景中  randFloatSpread扩展函数-100到100之随机生成
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  //设置星星位置
  star.position.set(x, y, z);
  //将星星添加到场景中
  scene.add(star);
}

//控制星星数量
Array(200).fill().forEach(addStar)

//为星星添加背景
//添加图像使用纹理加载器
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;




//光源助手，来查找点光源的位置
const lightHelper = new THREE.PointLightHelper(pointLight);
//网格助手 来查找环境光
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//纹理映射和法线图
//添加月球纹理
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
//提供法线图改变月球表面
// const normalTexture = new THREE.TextureLoader.load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 5, 5),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    // normalMap:normalTexture 暂无
  })
)
scene.add(moon);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  //控制类 更新
  controls.update();
  renderer.render(scene, camera);
}
animate();
