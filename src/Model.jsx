import { useAnimations, useFBX } from '@react-three/drei'
import { useEffect } from 'react'

export default function Model()
{
    const model = useFBX('./Texting.fbx')
    const animations = useAnimations(model.animations, model)
    model.children.forEach((mesh) =>
    {
        mesh.castShadow = true
    })
    useEffect(() => {
        const action = animations.actions["mixamo.com"]
        action.play()
    }, [])
    return <primitive object={ model } scale={0.005} position={[0.6, -0.81, 0.5]} rotation-y={-1.0} />
}

