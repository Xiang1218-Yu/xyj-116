import { DissectionGuide, AnatomyLayer } from '../types';

export const dissectionGuides: DissectionGuide[] = [
  {
    id: 'abdominal-dissection',
    title: '腹部解剖步骤',
    description: '系统学习腹部区域的逐层解剖方法，掌握腹壁层次和腹腔脏器的位置关系。',
    category: 'abdominal',
    estimatedDuration: '30-45分钟',
    difficulty: 'intermediate',
    prerequisites: [
      '了解基本解剖学术语',
      '熟悉人体解剖方位术语',
      '掌握解剖层次的基本概念'
    ],
    learningObjectives: [
      '掌握腹壁的五层结构',
      '识别腹腔主要脏器的位置',
      '理解腹膜与脏器的关系',
      '掌握腹部解剖的标准操作流程'
    ],
    icon: '🩺',
    steps: [
      {
        id: 'abd-step-1',
        stepNumber: 1,
        title: '观察腹部皮肤',
        description: '首先观察腹部皮肤的特征和表面标志。',
        detailedInstruction: '请将视角调整到正面，仔细观察腹部皮肤。注意脐部的位置，它通常位于第四腰椎水平。观察腹白线的走行，它是两侧腹直肌鞘之间的纤维组织。注意腹股沟韧带的位置，它从髂前上棘延伸至耻骨结节。这些表面标志是进行腹部切口的重要参考。',
        targetLayer: AnatomyLayer.SKIN,
        highlightStructureIds: ['skin-whole'],
        cameraView: 'front',
        tips: [
          '脐是重要的体表标志，对应L3-L4椎间盘水平',
          '腹白线是腹部手术常用切口位置',
          '腹股沟韧带是腹股沟区的重要边界'
        ],
        safetyNotes: [
          '皮肤切口应按照皮纹方向进行，以减少瘢痕形成'
        ]
      },
      {
        id: 'abd-step-2',
        stepNumber: 2,
        title: '剥离皮肤层，观察皮下脂肪',
        description: '切开并剥离皮肤，暴露皮下脂肪组织。',
        detailedInstruction: '现在剥离皮肤层，可以看到皮下脂肪组织。腹部脂肪的厚度因人而异，通常在脐周较厚。注意观察浅筋膜的两层结构：脂肪层（Camper筋膜）和膜性层（Scarpa筋膜）。在腹股沟韧带下方约一横指处，股动脉的搏动可以通过脂肪层触及。',
        targetLayer: AnatomyLayer.FAT,
        highlightStructureIds: ['fat-abdominal', 'fat-subcutaneous'],
        cameraView: 'front',
        tips: [
          '皮下脂肪中含有浅静脉和皮神经',
          'Scarpa筋膜在会阴部延续为Colles筋膜',
          '腹部抽脂术主要去除此层脂肪'
        ],
        safetyNotes: [
          '注意保护走行于浅筋膜内的皮神经和浅表静脉'
        ]
      },
      {
        id: 'abd-step-3',
        stepNumber: 3,
        title: '暴露肌肉层，观察腹直肌',
        description: '去除脂肪组织，暴露腹部肌肉层。',
        detailedInstruction: '继续剥离至肌肉层，可以看到腹直肌位于腹白线两侧，被腹直肌鞘包裹。腹直肌有3-4个腱划，与腹直肌鞘前壁紧密相连。注意观察腹外斜肌、腹内斜肌和腹横肌的纤维走行方向，它们共同构成腹壁的外侧群肌肉。',
        targetLayer: AnatomyLayer.MUSCLE,
        highlightStructureIds: ['muscle-abdominis', 'muscle-chest'],
        cameraView: 'front',
        tips: [
          '腹直肌鞘前层完整，后层在弓状线以下缺如',
          '三对扁肌的腱膜在腹白线处交织',
          '腹肌收缩可增加腹压，协助排便、呕吐等'
        ],
        safetyNotes: [
          '切开腹直肌鞘时注意保护肌纤维',
          '避免损伤走行于肌间隙的神经血管'
        ]
      },
      {
        id: 'abd-step-4',
        stepNumber: 4,
        title: '打开腹腔，观察脏器排列',
        description: '切开腹壁进入腹腔，观察腹腔脏器的正常位置。',
        detailedInstruction: '现在进入内脏层，可以看到腹腔内的脏器排列。右上方是肝脏，呈红褐色，质地柔软。肝脏下方是胆囊，储存胆汁。左上方是胃，呈J形，上接食管，下连十二指肠。胃下方是横结肠，再往下是盘曲的小肠。注意观察脏器的毗邻关系，这对于理解疾病的传播途径非常重要。',
        targetLayer: AnatomyLayer.ORGAN,
        highlightStructureIds: ['liver', 'stomach', 'intestines', 'spleen'],
        cameraView: 'front',
        tips: [
          '肝脏大部分位于右季肋区和腹上区',
          '胃的位置可因体型和充盈程度变化',
          '小肠长约5-7米，分为十二指肠、空肠和回肠'
        ],
        safetyNotes: [
          '打开腹膜时注意避免损伤下方的脏器',
          '观察脏器时动作要轻柔，避免人为损伤'
        ]
      },
      {
        id: 'abd-step-5',
        stepNumber: 5,
        title: '观察深部脏器和腹膜后结构',
        description: '将脏器轻轻拉开，观察腹膜后的肾脏等结构。',
        detailedInstruction: '将肠管轻轻向一侧拉开，可以看到腹膜后间隙的结构。两侧肾脏位于脊柱两旁，约在T12-L3水平。右肾因受肝脏影响，位置略低于左肾。肾脏上方是肾上腺，是重要的内分泌器官。注意观察输尿管的走行，它从肾盂向下延伸至膀胱。',
        targetLayer: AnatomyLayer.ORGAN,
        highlightStructureIds: ['kidney-left', 'kidney-right', 'bladder'],
        cameraView: 'front',
        tips: [
          '肾门约平第1腰椎椎体，是肾血管、肾盂出入的部位',
          '腹膜后器官还有胰腺、腹主动脉、下腔静脉等',
          '肾的被膜从内到外依次为纤维囊、脂肪囊和肾筋膜'
        ],
        safetyNotes: [
          '牵拉脏器时力度要适中，避免撕裂血管',
          '腹膜后间隙出血容易扩散，需特别注意'
        ]
      },
      {
        id: 'abd-step-6',
        stepNumber: 6,
        title: '观察骨性支架',
        description: '最后观察支撑腹腔的骨性结构。',
        detailedInstruction: '现在可以看到支撑腹腔的骨性结构。胸廓下部（肋弓）保护着上腹部的肝脏、脾脏等脏器。脊柱是身体的中轴，腰椎部分承受着上半身的重量。骨盆由髋骨、骶骨和尾骨组成，形成盆腔的骨性边界，保护膀胱、直肠等盆腔脏器。',
        targetLayer: AnatomyLayer.SKELETON,
        highlightStructureIds: ['spine', 'pelvis', 'ribcage'],
        cameraView: 'front',
        tips: [
          '肋弓最低点平对第2、3腰椎之间',
          '骨盆入口是真假骨盆的分界线',
          '腰椎棘突宽而短，呈板状水平伸向后方'
        ],
        safetyNotes: [
          '解剖操作完成后，需清点所有器械和纱布',
          '逐层缝合关闭腹壁，注意各层的对合'
        ]
      }
    ]
  },
  {
    id: 'thoracic-dissection',
    title: '胸腔解剖步骤',
    description: '掌握胸腔的解剖层次和心肺等重要脏器的结构与毗邻关系。',
    category: 'thoracic',
    estimatedDuration: '40-50分钟',
    difficulty: 'intermediate',
    prerequisites: [
      '熟悉呼吸系统基本结构',
      '了解心脏的外形和大血管',
      '掌握纵隔的概念和分部'
    ],
    learningObjectives: [
      '掌握胸壁的层次结构',
      '熟悉胸腔脏器的位置和形态',
      '理解纵隔的分区和内容',
      '掌握心肺的解剖要点'
    ],
    icon: '❤️',
    steps: [
      {
        id: 'thor-step-1',
        stepNumber: 1,
        title: '观察胸前区体表标志',
        description: '识别胸前区的重要表面标志。',
        detailedInstruction: '请将视角调整到正面，观察胸前区的体表标志。胸骨角位于胸骨柄与体连接处，平对第2肋软骨，是计数肋骨的重要标志。两侧锁骨呈S形弯曲，内侧端与胸骨柄相连。乳头通常位于第4肋间隙水平，男性略高于女性。这些标志对于胸心外科手术切口的定位至关重要。',
        targetLayer: AnatomyLayer.SKIN,
        highlightStructureIds: ['skin-whole', 'skin-head'],
        cameraView: 'front',
        tips: [
          '胸骨角是重要的骨性标志，平对第4胸椎椎体下缘',
          '锁骨下静脉在锁骨内侧端后方汇入头臂静脉',
          '心尖搏动通常位于第5肋间隙左锁骨中线内侧'
        ],
        safetyNotes: [
          '胸壁切口需避开重要的神经血管'
        ]
      },
      {
        id: 'thor-step-2',
        stepNumber: 2,
        title: '剥离皮肤和皮下组织',
        description: '切开皮肤，暴露皮下脂肪和浅筋膜。',
        detailedInstruction: '剥离皮肤层，暴露皮下组织。胸前区的脂肪组织中含有丰富的浅静脉，如胸腹壁静脉。注意观察乳房的位置和形态，它位于胸大肌表面，由乳腺、脂肪和结缔组织构成。乳房的淋巴回流主要注入腋淋巴结，这对于乳腺癌的转移途径具有重要临床意义。',
        targetLayer: AnatomyLayer.FAT,
        highlightStructureIds: ['fat-subcutaneous'],
        cameraView: 'front',
        tips: [
          '乳房悬韧带（Cooper韧带）对乳房起支持固定作用',
          '乳腺癌侵犯Cooper韧带可导致皮肤凹陷',
          '胸骨旁淋巴结沿胸廓内血管排列'
        ],
        safetyNotes: [
          '解剖乳房时注意保护输乳管，它们以乳头为中心呈放射状排列'
        ]
      },
      {
        id: 'thor-step-3',
        stepNumber: 3,
        title: '暴露胸壁肌肉',
        description: '去除皮下组织，暴露胸壁肌肉层。',
        detailedInstruction: '继续剥离至肌肉层，可以看到胸大肌覆盖胸前区大部分区域。胸大肌起自锁骨内侧半、胸骨和第1-6肋软骨，止于肱骨大结节嵴。其深面是胸小肌，起自第3-5肋骨，止于肩胛骨喙突。注意观察前锯肌的肌齿，它贴附于胸廓侧壁，止于肩胛骨内侧缘。',
        targetLayer: AnatomyLayer.MUSCLE,
        highlightStructureIds: ['muscle-chest', 'muscle-bicep-left', 'muscle-bicep-right'],
        cameraView: 'front',
        tips: [
          '胸大肌收缩可使臂内收和旋内',
          '前锯肌瘫痪可出现翼状肩',
          '胸肌间淋巴结位于胸大、小肌之间'
        ],
        safetyNotes: [
          '切断胸大肌时注意保护其深面的神经血管'
        ]
      },
      {
        id: 'thor-step-4',
        stepNumber: 4,
        title: '打开胸腔，观察心肺',
        description: '沿肋间隙切开胸壁，进入胸腔观察心肺。',
        detailedInstruction: '现在进入内脏层，打开胸腔可以看到两侧的肺和中间的心脏。心脏位于中纵隔，约2/3在中线左侧，1/3在中线右侧。心尖朝向左前下方，心底朝向右后上方。两侧肺呈圆锥形，尖朝上，底朝下。注意观察肺裂，左肺有斜裂，分为上、下两叶；右肺有斜裂和水平裂，分为上、中、下三叶。',
        targetLayer: AnatomyLayer.ORGAN,
        highlightStructureIds: ['heart', 'lung-left', 'lung-right'],
        cameraView: 'front',
        tips: [
          '心脏大小约与本人拳头相当',
          '左肺前缘下部有心切迹',
          '肺门是主支气管、肺血管、神经和淋巴管出入的部位'
        ],
        safetyNotes: [
          '打开胸腔时注意避免损伤胸膜和肺',
          '胸膜腔负压对于维持肺的膨胀至关重要'
        ]
      },
      {
        id: 'thor-step-5',
        stepNumber: 5,
        title: '观察纵隔结构',
        description: '将肺向两侧拉开，观察纵隔的详细结构。',
        detailedInstruction: '将两肺向两侧轻轻拉开，可以清楚地看到纵隔的结构。前纵隔位于胸骨与心包之间，内含胸腺遗迹和淋巴结。中纵隔包含心脏和心包。后纵隔位于心包与脊柱之间，内含食管、气管、主动脉胸段、奇静脉、胸导管和迷走神经等。注意观察大血管的走行，主动脉弓发出三大分支：头臂干、左颈总动脉和左锁骨下动脉。',
        targetLayer: AnatomyLayer.ORGAN,
        highlightStructureIds: ['heart', 'spinal-cord'],
        cameraView: 'front',
        tips: [
          '纵隔肿瘤好发于各自的好发部位，如前纵隔的胸腺瘤',
          '食管胸部位于后纵隔，全长约25厘米',
          '胸导管收集全身3/4区域的淋巴'
        ],
        safetyNotes: [
          '解剖后纵隔时注意保护重要的神经血管',
          '食管有三个生理性狭窄，是异物易滞留和肿瘤好发部位'
        ]
      },
      {
        id: 'thor-step-6',
        stepNumber: 6,
        title: '观察胸廓骨性结构',
        description: '最后观察胸廓的骨性支架。',
        detailedInstruction: '现在可以看到完整的骨性胸廓。它由12块胸椎、12对肋骨和1块胸骨共同围成，呈上窄下宽的圆锥形。胸廓上口较小，由第1胸椎、第1肋和胸骨柄上缘围成。胸廓下口较宽，被膈封闭。注意观察肋骨的走行，它们从前上方向后下方倾斜，这种结构有助于增加胸廓的活动度。',
        targetLayer: AnatomyLayer.SKELETON,
        highlightStructureIds: ['ribcage', 'sternum', 'spine', 'clavicle-left', 'clavicle-right'],
        cameraView: 'front',
        tips: [
          '胸廓的形态可因年龄、性别和健康状况而有所不同',
          '第1-7肋为真肋，直接与胸骨相连',
          '第8-10肋为假肋，第11-12肋为浮肋'
        ],
        safetyNotes: [
          '肋骨骨折好发于第4-7肋，因其长而固定',
          '儿童胸廓富有弹性，不易骨折，老年人则相反'
        ]
      }
    ]
  }
];

export const getDissectionGuideById = (id: string): DissectionGuide | undefined => {
  return dissectionGuides.find(g => g.id === id);
};

export const getDissectionGuidesByCategory = (category: string): DissectionGuide[] => {
  return dissectionGuides.filter(g => g.category === category);
};
