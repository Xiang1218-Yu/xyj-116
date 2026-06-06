export enum AnatomyLayer {
  SKIN = 'skin',
  FAT = 'fat',
  MUSCLE = 'muscle',
  ORGAN = 'organ',
  SKELETON = 'skeleton'
}

export enum BodySystem {
  INTEGUMENTARY = 'integumentary',
  MUSCULAR = 'muscular',
  SKELETAL = 'skeletal',
  NERVOUS = 'nervous',
  CIRCULATORY = 'circulatory',
  RESPIRATORY = 'respiratory',
  DIGESTIVE = 'digestive',
  ENDOCRINE = 'endocrine'
}

export type GeometryType = 'box' | 'sphere' | 'capsule' | 'cylinder' | 'ellipsoid';

export interface GeometryConfig {
  type: GeometryType;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
  color: string;
}

export interface AnatomyStructure {
  id: string;
  name: string;
  latinName: string;
  layer: AnatomyLayer;
  system: BodySystem;
  geometry: GeometryConfig;
}

export interface Pathology {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  treatment: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface ClinicalCase {
  id: string;
  title: string;
  patientInfo: string;
  presentation: string;
  diagnosis: string;
  treatment: string;
  outcome: string;
  imageUrl?: string;
}

export interface OrganInfo {
  id: string;
  structureId: string;
  function: string;
  description: string;
  commonPathologies: Pathology[];
  clinicalCases: ClinicalCase[];
}

export const ANATOMY_LAYER_ORDER: AnatomyLayer[] = [
  AnatomyLayer.SKIN,
  AnatomyLayer.FAT,
  AnatomyLayer.MUSCLE,
  AnatomyLayer.ORGAN,
  AnatomyLayer.SKELETON
];

export const LAYER_NAMES: Record<AnatomyLayer, string> = {
  [AnatomyLayer.SKIN]: '皮肤层',
  [AnatomyLayer.FAT]: '脂肪层',
  [AnatomyLayer.MUSCLE]: '肌肉层',
  [AnatomyLayer.ORGAN]: '内脏层',
  [AnatomyLayer.SKELETON]: '骨骼层'
};

export const SYSTEM_NAMES: Record<BodySystem, string> = {
  [BodySystem.INTEGUMENTARY]: '表皮系统',
  [BodySystem.MUSCULAR]: '肌肉系统',
  [BodySystem.SKELETAL]: '骨骼系统',
  [BodySystem.NERVOUS]: '神经系统',
  [BodySystem.CIRCULATORY]: '循环系统',
  [BodySystem.RESPIRATORY]: '呼吸系统',
  [BodySystem.DIGESTIVE]: '消化系统',
  [BodySystem.ENDOCRINE]: '内分泌系统'
};

export type CameraView = 'front' | 'side' | 'back';

export interface ViewState {
  cameraView: CameraView;
  isOrthographic: boolean;
}
