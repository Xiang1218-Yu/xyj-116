import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

interface PostEffectsProps {
  bloomIntensity?: number;
  vignetteDarkness?: number;
}

export function PostEffects({
  bloomIntensity = 1.5,
  vignetteDarkness = 0.5
}: PostEffectsProps) {
  return (
    <EffectComposer multisampling={8}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      
      <Vignette
        darkness={vignetteDarkness}
        offset={0.5}
      />
    </EffectComposer>
  );
}
