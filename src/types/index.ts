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

export type DiseaseType =
  | 'vascular'
  | 'neoplastic'
  | 'inflammatory'
  | 'degenerative'
  | 'metabolic'
  | 'infectious'
  | 'traumatic'
  | 'autoimmune'
  | 'congenital';

export const DISEASE_TYPE_NAMES: Record<DiseaseType, string> = {
  vascular: '血管性疾病',
  neoplastic: '肿瘤性疾病',
  inflammatory: '炎症性疾病',
  degenerative: '退行性疾病',
  metabolic: '代谢性疾病',
  infectious: '感染性疾病',
  traumatic: '外伤性疾病',
  autoimmune: '自身免疫性疾病',
  congenital: '先天性疾病'
};

export const DISEASE_TYPE_COLORS: Record<DiseaseType, string> = {
  vascular: '#EF4444',
  neoplastic: '#8B5CF6',
  inflammatory: '#F59E0B',
  degenerative: '#6B7280',
  metabolic: '#10B981',
  infectious: '#06B6D4',
  traumatic: '#F97316',
  autoimmune: '#EC4899',
  congenital: '#3B82F6'
};

export const SEVERITY_NAMES: Record<string, string> = {
  mild: '轻度',
  moderate: '中度',
  severe: '重度'
};

export const SEVERITY_COLORS: Record<string, string> = {
  mild: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  severe: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
};

export interface Pathology {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  treatment: string;
  severity: 'mild' | 'moderate' | 'severe';
  diseaseType: DiseaseType;
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

export type AnnotationColor = 'red' | 'yellow' | 'green' | 'blue' | 'purple';

export type AnnotationPriority = 'low' | 'medium' | 'high';

export interface Annotation {
  id: string;
  position: [number, number, number];
  title: string;
  content: string;
  color: AnnotationColor;
  priority: AnnotationPriority;
  createdAt: number;
  updatedAt: number;
  targetStructureId?: string;
}

export const ANNOTATION_COLORS: Record<AnnotationColor, string> = {
  red: '#EF4444',
  yellow: '#F59E0B',
  green: '#10B981',
  blue: '#3B82F6',
  purple: '#8B5CF6'
};

export const ANNOTATION_COLOR_NAMES: Record<AnnotationColor, string> = {
  red: '红色',
  yellow: '黄色',
  green: '绿色',
  blue: '蓝色',
  purple: '紫色'
};

export const ANNOTATION_PRIORITY_NAMES: Record<AnnotationPriority, string> = {
  low: '一般',
  medium: '重要',
  high: '非常重要'
};

export interface DissectionStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  detailedInstruction: string;
  targetLayer: AnatomyLayer;
  highlightStructureIds: string[];
  cameraView?: CameraView;
  tips?: string[];
  safetyNotes?: string[];
}

export interface DissectionGuide {
  id: string;
  title: string;
  description: string;
  category: 'abdominal' | 'thoracic' | 'other';
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningObjectives: string[];
  steps: DissectionStep[];
  icon: string;
}

export const GUIDE_CATEGORY_NAMES: Record<string, string> = {
  abdominal: '腹部解剖',
  thoracic: '胸腔解剖',
  other: '其他解剖'
};

export const DIFFICULTY_NAMES: Record<string, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级'
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: '#10B981',
  intermediate: '#F59E0B',
  advanced: '#EF4444'
};
