import { useMemo } from 'react';
import { Organ } from './Organ';
import { anatomyStructures } from '../../data/anatomyData';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { AnatomyLayer, ANATOMY_LAYER_ORDER, BodySystem } from '../../types';

export function HumanBody() {
  const { currentLayer, activeSystem, isLayerVisible } = useAnatomyStore();

  const currentLayerIndex = ANATOMY_LAYER_ORDER.indexOf(currentLayer);

  const getOpacity = (layer: AnatomyLayer): number => {
    const layerIndex = ANATOMY_LAYER_ORDER.indexOf(layer);
    if (layerIndex < currentLayerIndex) return 0;
    if (layerIndex === currentLayerIndex) return 1;
    if (layerIndex === currentLayerIndex + 1) return 0.3;
    return 0.15;
  };

  const isStructureVisible = (structure: typeof anatomyStructures[0]): boolean => {
    if (!isLayerVisible(structure.layer)) return false;
    
    if (activeSystem !== null && structure.system !== activeSystem) {
      return false;
    }
    
    return true;
  };

  const renderedStructures = useMemo(() => {
    return anatomyStructures
      .filter(structure => isStructureVisible(structure))
      .sort((a, b) => {
        const indexA = ANATOMY_LAYER_ORDER.indexOf(a.layer);
        const indexB = ANATOMY_LAYER_ORDER.indexOf(b.layer);
        return indexB - indexA;
      });
  }, [currentLayer, activeSystem, isLayerVisible]);

  return (
    <group position={[0, 0, 0]}>
      {renderedStructures.map((structure) => (
        <Organ
          key={structure.id}
          structure={structure}
          visible={isLayerVisible(structure.layer)}
          opacity={getOpacity(structure.layer)}
        />
      ))}
    </group>
  );
}
