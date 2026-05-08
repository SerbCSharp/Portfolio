import * as THREE from "three";
import { useState } from "react";
import {
  MeshReflectorMaterial,
  useCursor,
  useTexture,
  OrbitControls,
  Text,
} from "@react-three/drei";
import Lights from "./Lights.jsx";
import Model from "./Model.jsx";

export default function App() {
  return (
    <>
      <OrbitControls makeDefault />
      <Lights />

      <mesh
        receiveShadow
        position-y={-0.82}
        rotation-x={-Math.PI * 0.5}
        scale={6}
      >
        <planeGeometry />
        <MeshReflectorMaterial color="slategrey" side={THREE.DoubleSide} />
      </mesh>

      <Frame
        id="JS"
        name="ThreeJs"
        bg="./textures/Portal.JPG"
        url="https://three-js-eight-henna.vercel.app/"
        position={[-2.3, 0, 0]}
      />
      <Frame
        id="C#"
        name="Microservice"
        bg="./textures/Microservice.JPG"
        url="https://github.com/SerbCSharp/Catalog"
        position={[-1.15, 0, 0]}
      />
      <Frame
        id="C#"
        name="Site view analysis"
        bg="./textures/SiteViewAnalysis.JPG"
        url="https://github.com/SerbCSharp/SiteViewAnalysis"
        position={[0, 0, 0]}
      />
      <Frame
        id="C#"
        name="Telegram Bot"
        bg="./textures/TelegramBot.JPG"
        url="https://github.com/SerbCSharp/TelegramChatBot"
        position={[1.15, 0, 0]}
      />
      <Frame
        id="JS"
        name="React Three Fiber"
        bg="./textures/R3F.JPG"
        url="https://r3-f-three.vercel.app/"
        position={[2.3, 0, 0]}
      />
      <Model />
    </>
  );
}

function Frame({
  id,
  name,
  bg,
  url,
  width = 1.075,
  height = 1.61803398875,
  ...props
}) {
  const [hovered, hover] = useState(false);

  const frameClick = async () => {
    const ip = await fetch("https://api.ipify.org/").then((r) => r.text());
    const visit = {
      ipAddress: ip,
      url: url,
    };

    window.location.href = url;
  };

  useCursor(hovered);
  return (
    <group {...props}>
      <Text
        color="slategrey"
        fontSize={0.1}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        color="slategrey"
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        {id}
      </Text>
      <Text
        color="slategrey"
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        Sergey Belyakov
      </Text>
      <mesh
        onClick={frameClick}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={useTexture(bg)} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
