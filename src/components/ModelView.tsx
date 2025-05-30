import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { Dispatch, SetStateAction, Suspense } from "react";
import * as THREE from "three";
import IPhone from "./IPhone";
import Lights from "./Lights";
import Loader from "./Loader";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationSize,
  size,
  item,
}: {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group>;
  gsapType: string;
  // controlRef: ;
  setRotationSize: Dispatch<SetStateAction<number>>;
  size: string;
  item: {
    title: string;
    color: string[];
    img: string;
  };
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`size-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationSize(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
