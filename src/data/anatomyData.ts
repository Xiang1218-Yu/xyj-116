import { AnatomyStructure, AnatomyLayer, BodySystem } from '../types';

export const anatomyStructures: AnatomyStructure[] = [
  // ==================== 皮肤层 ====================
  {
    id: 'skin-whole',
    name: '皮肤',
    latinName: 'Cutis',
    layer: AnatomyLayer.SKIN,
    system: BodySystem.INTEGUMENTARY,
    geometry: {
      type: 'capsule',
      position: [0, 0, 0],
      scale: [0.9, 1.8, 0.5],
      color: '#E8BEAC'
    }
  },
  {
    id: 'skin-head',
    name: '头皮',
    latinName: 'Scalp',
    layer: AnatomyLayer.SKIN,
    system: BodySystem.INTEGUMENTARY,
    geometry: {
      type: 'sphere',
      position: [0, 2.1, 0],
      scale: [0.35, 0.35, 0.35],
      color: '#E8BEAC'
    }
  },

  // ==================== 脂肪层 ====================
  {
    id: 'fat-abdominal',
    name: '腹部脂肪',
    latinName: 'Panniculus adiposus',
    layer: AnatomyLayer.FAT,
    system: BodySystem.INTEGUMENTARY,
    geometry: {
      type: 'capsule',
      position: [0, -0.2, 0],
      scale: [0.8, 0.6, 0.45],
      color: '#F5E6D3'
    }
  },
  {
    id: 'fat-subcutaneous',
    name: '皮下脂肪',
    latinName: 'Tela subcutanea',
    layer: AnatomyLayer.FAT,
    system: BodySystem.INTEGUMENTARY,
    geometry: {
      type: 'capsule',
      position: [0, 0.8, 0],
      scale: [0.75, 1.2, 0.42],
      color: '#FAF0E6'
    }
  },

  // ==================== 肌肉层 ====================
  {
    id: 'muscle-chest',
    name: '胸大肌',
    latinName: 'Pectoralis major',
    layer: AnatomyLayer.MUSCLE,
    system: BodySystem.MUSCULAR,
    geometry: {
      type: 'box',
      position: [0, 0.8, 0.35],
      scale: [0.7, 0.5, 0.15],
      color: '#C97B6B'
    }
  },
  {
    id: 'muscle-abdominis',
    name: '腹直肌',
    latinName: 'Rectus abdominis',
    layer: AnatomyLayer.MUSCLE,
    system: BodySystem.MUSCULAR,
    geometry: {
      type: 'box',
      position: [0, -0.1, 0.35],
      scale: [0.35, 0.8, 0.12],
      color: '#C97B6B'
    }
  },
  {
    id: 'muscle-bicep-left',
    name: '左侧肱二头肌',
    latinName: 'Biceps brachii sinister',
    layer: AnatomyLayer.MUSCLE,
    system: BodySystem.MUSCULAR,
    geometry: {
      type: 'capsule',
      position: [-0.8, 0.6, 0],
      rotation: [0, 0, 0.3],
      scale: [0.15, 0.45, 0.15],
      color: '#C97B6B'
    }
  },
  {
    id: 'muscle-bicep-right',
    name: '右侧肱二头肌',
    latinName: 'Biceps brachii dexter',
    layer: AnatomyLayer.MUSCLE,
    system: BodySystem.MUSCULAR,
    geometry: {
      type: 'capsule',
      position: [0.8, 0.6, 0],
      rotation: [0, 0, -0.3],
      scale: [0.15, 0.45, 0.15],
      color: '#C97B6B'
    }
  },
  {
    id: 'muscle-quad-left',
    name: '左侧股四头肌',
    latinName: 'Quadriceps femoris sinister',
    layer: AnatomyLayer.MUSCLE,
    system: BodySystem.MUSCULAR,
    geometry: {
      type: 'capsule',
      position: [-0.3, -1.5, 0],
      scale: [0.2, 0.7, 0.2],
      color: '#C97B6B'
    }
  },
  {
    id: 'muscle-quad-right',
    name: '右侧股四头肌',
    latinName: 'Quadriceps femoris dexter',
    layer: AnatomyLayer.MUSCLE,
    system: BodySystem.MUSCULAR,
    geometry: {
      type: 'capsule',
      position: [0.3, -1.5, 0],
      scale: [0.2, 0.7, 0.2],
      color: '#C97B6B'
    }
  },

  // ==================== 内脏层 ====================
  {
    id: 'heart',
    name: '心脏',
    latinName: 'Cor',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.CIRCULATORY,
    geometry: {
      type: 'ellipsoid',
      position: [-0.15, 0.9, 0.1],
      rotation: [0, 0, 0.3],
      scale: [0.2, 0.25, 0.18],
      color: '#E63946'
    }
  },
  {
    id: 'lung-left',
    name: '左肺',
    latinName: 'Pulmo sinister',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.RESPIRATORY,
    geometry: {
      type: 'ellipsoid',
      position: [-0.3, 0.9, 0],
      scale: [0.25, 0.45, 0.2],
      color: '#FFB4A2'
    }
  },
  {
    id: 'lung-right',
    name: '右肺',
    latinName: 'Pulmo dexter',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.RESPIRATORY,
    geometry: {
      type: 'ellipsoid',
      position: [0.3, 0.9, 0],
      scale: [0.28, 0.5, 0.2],
      color: '#FFB4A2'
    }
  },
  {
    id: 'liver',
    name: '肝脏',
    latinName: 'Hepar',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.DIGESTIVE,
    geometry: {
      type: 'ellipsoid',
      position: [0.3, 0.35, 0.1],
      scale: [0.35, 0.28, 0.2],
      color: '#9B5DE5'
    }
  },
  {
    id: 'stomach',
    name: '胃',
    latinName: 'Ventriculus',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.DIGESTIVE,
    geometry: {
      type: 'ellipsoid',
      position: [-0.2, 0.3, 0.1],
      rotation: [0, 0, 0.2],
      scale: [0.28, 0.2, 0.18],
      color: '#F4A261'
    }
  },
  {
    id: 'spleen',
    name: '脾脏',
    latinName: 'Lien',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.CIRCULATORY,
    geometry: {
      type: 'ellipsoid',
      position: [-0.45, 0.25, 0.1],
      rotation: [0, 0, 0.5],
      scale: [0.12, 0.2, 0.08],
      color: '#BC4749'
    }
  },
  {
    id: 'kidney-left',
    name: '左肾',
    latinName: 'Ren sinister',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.ENDOCRINE,
    geometry: {
      type: 'ellipsoid',
      position: [-0.35, 0, 0],
      rotation: [0, 0, 0.2],
      scale: [0.1, 0.2, 0.1],
      color: '#D62828'
    }
  },
  {
    id: 'kidney-right',
    name: '右肾',
    latinName: 'Ren dexter',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.ENDOCRINE,
    geometry: {
      type: 'ellipsoid',
      position: [0.35, 0, 0],
      rotation: [0, 0, -0.2],
      scale: [0.1, 0.2, 0.1],
      color: '#D62828'
    }
  },
  {
    id: 'intestines',
    name: '肠道',
    latinName: 'Intestina',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.DIGESTIVE,
    geometry: {
      type: 'ellipsoid',
      position: [0, -0.3, 0.1],
      scale: [0.5, 0.4, 0.2],
      color: '#E9C46A'
    }
  },
  {
    id: 'bladder',
    name: '膀胱',
    latinName: 'Vesica urinaria',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.DIGESTIVE,
    geometry: {
      type: 'sphere',
      position: [0, -0.7, 0.1],
      scale: [0.15, 0.12, 0.15],
      color: '#F77F00'
    }
  },
  {
    id: 'brain',
    name: '大脑',
    latinName: 'Cerebrum',
    layer: AnatomyLayer.ORGAN,
    system: BodySystem.NERVOUS,
    geometry: {
      type: 'ellipsoid',
      position: [0, 2.1, 0],
      scale: [0.28, 0.28, 0.32],
      color: '#D4A373'
    }
  },

  // ==================== 骨骼层 ====================
  {
    id: 'skull',
    name: '颅骨',
    latinName: 'Cranium',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'sphere',
      position: [0, 2.1, 0],
      scale: [0.3, 0.32, 0.3],
      color: '#F5F1ED'
    }
  },
  {
    id: 'spine',
    name: '脊柱',
    latinName: 'Columna vertebralis',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [0, 0.5, -0.1],
      scale: [0.08, 1.8, 0.08],
      color: '#F5F1ED'
    }
  },
  {
    id: 'sternum',
    name: '胸骨',
    latinName: 'Sternum',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'box',
      position: [0, 0.7, 0.25],
      scale: [0.08, 0.5, 0.05],
      color: '#F5F1ED'
    }
  },
  {
    id: 'ribcage',
    name: '胸廓',
    latinName: 'Cavea thoracis',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'ellipsoid',
      position: [0, 0.8, 0],
      scale: [0.5, 0.55, 0.3],
      color: '#F5F1ED'
    }
  },
  {
    id: 'clavicle-left',
    name: '左侧锁骨',
    latinName: 'Clavicula sinister',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [-0.4, 1.2, 0.15],
      rotation: [0, 0.2, 0.5],
      scale: [0.05, 0.4, 0.05],
      color: '#F5F1ED'
    }
  },
  {
    id: 'clavicle-right',
    name: '右侧锁骨',
    latinName: 'Clavicula dexter',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [0.4, 1.2, 0.15],
      rotation: [0, -0.2, -0.5],
      scale: [0.05, 0.4, 0.05],
      color: '#F5F1ED'
    }
  },
  {
    id: 'humerus-left',
    name: '左侧肱骨',
    latinName: 'Humerus sinister',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [-0.7, 0.5, 0],
      rotation: [0, 0, 0.2],
      scale: [0.06, 0.6, 0.06],
      color: '#F5F1ED'
    }
  },
  {
    id: 'humerus-right',
    name: '右侧肱骨',
    latinName: 'Humerus dexter',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [0.7, 0.5, 0],
      rotation: [0, 0, -0.2],
      scale: [0.06, 0.6, 0.06],
      color: '#F5F1ED'
    }
  },
  {
    id: 'pelvis',
    name: '骨盆',
    latinName: 'Pelvis',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'ellipsoid',
      position: [0, -0.6, 0],
      scale: [0.45, 0.2, 0.3],
      color: '#F5F1ED'
    }
  },
  {
    id: 'femur-left',
    name: '左侧股骨',
    latinName: 'Femur sinister',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [-0.3, -1.3, 0],
      rotation: [0, 0, 0.1],
      scale: [0.08, 0.8, 0.08],
      color: '#F5F1ED'
    }
  },
  {
    id: 'femur-right',
    name: '右侧股骨',
    latinName: 'Femur dexter',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [0.3, -1.3, 0],
      rotation: [0, 0, -0.1],
      scale: [0.08, 0.8, 0.08],
      color: '#F5F1ED'
    }
  },
  {
    id: 'tibia-left',
    name: '左侧胫骨',
    latinName: 'Tibia sinister',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [-0.3, -2.2, 0],
      scale: [0.06, 0.6, 0.06],
      color: '#F5F1ED'
    }
  },
  {
    id: 'tibia-right',
    name: '右侧胫骨',
    latinName: 'Tibia dexter',
    layer: AnatomyLayer.SKELETON,
    system: BodySystem.SKELETAL,
    geometry: {
      type: 'cylinder',
      position: [0.3, -2.2, 0],
      scale: [0.06, 0.6, 0.06],
      color: '#F5F1ED'
    }
  }
];

export const getStructuresByLayer = (layer: AnatomyLayer): AnatomyStructure[] => {
  return anatomyStructures.filter(s => s.layer === layer);
};

export const getStructureById = (id: string): AnatomyStructure | undefined => {
  return anatomyStructures.find(s => s.id === id);
};

export const getStructuresBySystem = (system: BodySystem): AnatomyStructure[] => {
  return anatomyStructures.filter(s => s.system === system);
};
