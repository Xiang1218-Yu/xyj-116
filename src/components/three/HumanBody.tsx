import { useMemo } from 'react';
import { Organ } from './Organ';
import { OrganLabel } from './OrganLabel';
import { anatomyStructures } from '../../data/anatomyData';
import { useAnatomyStore } from '../../store/useAnatomyStore';
import { useLabelStore } from '../../store/useLabelStore';
import { useSelectionStore } from '../../store/useSelectionStore';
import { useIsolateStore } from '../../store/useIsolateStore';
import { AnatomyLayer, ANATOMY_LAYER_ORDER, BodySystem } from '../../types';

export function HumanBody() {
  const { currentLayer, activeSystem, isLayerVisible } = useAnatomyStore();
  const { showLabels, labelScale, showLatinName } = useLabelStore();
  const { selectedStructureId } = useSelectionStore();
  const { isIsolated, isolatedStructureId, isolatedPosition } = useIsolateStore();

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

  const shouldShowLabel = (structureId: string): boolean => {
    if (showLabels === 'off') return false;
    if (showLabels === 'all') return true;
    return selectedStructureId === structureId;
  };

  const getLabelPosition = (structure: typeof anatomyStructures[0]): [number, number, number] => {
    if (isIsolated && isolatedStructureId === structure.id) {
      return isolatedPosition;
    }
    return structure.geometry.position;
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

      {showLabels !== 'off' && renderedStructures.map((structure) => {
        if (!shouldShowLabel(structure.id)) return null;
        return (
          <OrganLabel
            key={`label-${structure.id}`}
            position={getLabelPosition(structure)}
            name={structure.name}
            latinName={structure.latinName}
            color={structure.geometry.color}
            scale={labelScale}
            showLatinName={showLatinName}
            isSelected={selectedStructureId === structure.id}
          />
        );
      })}
    </group>
  );
}
