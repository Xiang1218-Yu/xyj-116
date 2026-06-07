import { OrganInfo } from '../types';

export const organInfoData: OrganInfo[] = [
  {
    id: 'info-heart',
    structureId: 'heart',
    function: '心脏是循环系统的核心器官，主要功能是泵送血液至全身。通过有节律的收缩和舒张，将富含氧气的血液输送到全身各组织，并将含二氧化碳的血液运回肺部进行气体交换。心脏每天跳动约10万次，泵血约7500升。',
    shortFunction: '循环系统核心，通过节律性舒缩泵送血液至全身。',
    description: '心脏位于胸腔中纵隔内，约2/3位于身体中线左侧，1/3位于右侧。成人心脏重约250-350克，大小与本人拳头相当。心脏分为四个腔室：左心房、左心室、右心房、右心室。左心室壁最厚，负责向全身泵血。',
    commonPathologies: [
      {
        id: 'path-1',
        name: '冠心病',
        description: '冠状动脉粥样硬化导致心肌供血不足的疾病',
        symptoms: ['胸痛（心绞痛）', '胸闷', '放射痛至左肩或下颌', '活动后加重'],
        treatment: '药物治疗（硝酸酯类、他汀类）、介入治疗（PCI）、冠状动脉旁路移植术（CABG）',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-2',
        name: '心力衰竭',
        description: '心脏泵血功能减退，无法满足机体代谢需求',
        symptoms: ['呼吸困难', '下肢水肿', '乏力', '夜间阵发性呼吸困难'],
        treatment: 'ACEI/ARB类药物、β受体阻滞剂、醛固酮受体拮抗剂、心脏再同步化治疗',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-3',
        name: '心律不齐',
        description: '心脏电活动异常导致节律不规则',
        symptoms: ['心悸', '头晕', '昏厥', '胸闷'],
        treatment: '抗心律失常药物、导管消融、植入心脏起搏器或除颤器',
        severity: 'moderate',
        diseaseType: 'vascular'
      }
    ],
    clinicalCases: [
      {
        id: 'case-1',
        title: '急性心肌梗死急诊PCI治疗',
        patientInfo: '男性，58岁，有高血压史10年，吸烟史30年',
        presentation: '患者因"突发胸痛2小时"入院，疼痛呈压榨样，向左肩放射，伴大汗、恶心。心电图示V1-V4导联ST段弓背向上抬高。',
        diagnosis: '急性前壁ST段抬高型心肌梗死。冠脉造影示左前降支近段完全闭塞。',
        treatment: '急诊行冠脉介入治疗（PCI），于闭塞部位植入药物洗脱支架1枚。术后给予双联抗血小板、他汀、β受体阻滞剂等治疗。',
        outcome: '患者术后胸痛缓解，一周后出院。随访6个月，心功能恢复良好，无胸痛发作。'
      },
      {
        id: 'case-2',
        title: '扩张型心肌病心力衰竭管理',
        patientInfo: '女性，62岁，既往无心脏病史，因"进行性呼吸困难1个月"就诊',
        presentation: '患者1个月来逐渐出现活动后呼吸困难，近1周不能平卧，伴双下肢水肿。查体：端坐呼吸，双肺底湿啰音，心率110次/分，心尖区闻及3/6级收缩期杂音。',
        diagnosis: '超声心动图示左室舒张末径68mm，LVEF 28%，全心扩大。诊断为扩张型心肌病，NYHA心功能IV级。',
        treatment: '给予呋塞米利尿、依那普利、美托洛尔缓释片、螺内酯等药物治疗，病情稳定后加用伊伐布雷定控制心率。',
        outcome: '住院2周后症状缓解出院。3个月后复查LVEF提升至38%，患者可正常日常活动。'
      }
    ]
  },
  {
    id: 'info-lung',
    structureId: 'lung-left',
    function: '肺是呼吸系统的主要器官，负责气体交换。吸入的氧气在肺泡中进入血液，同时血液中的二氧化碳排出体外。成人肺约有7亿个肺泡，总面积约70-80平方米，相当于一个网球场大小。',
    shortFunction: '呼吸系统核心，实现氧气与二氧化碳的气体交换。',
    description: '肺位于胸腔内纵隔两侧，右肺分上、中、下三叶，左肺分上、下两叶。肺组织呈海绵状，富有弹性。肺通过气管、支气管与外界相通，完成吸入氧气、排出二氧化碳的呼吸功能。',
    commonPathologies: [
      {
        id: 'path-4',
        name: '肺炎',
        description: '病原微生物感染引起的肺实质炎症',
        symptoms: ['发热', '咳嗽', '咳痰', '胸痛', '呼吸困难'],
        treatment: '抗生素治疗（细菌性）、抗病毒治疗（病毒性）、对症支持治疗',
        severity: 'moderate',
        diseaseType: 'infectious'
      },
      {
        id: 'path-5',
        name: '慢性阻塞性肺疾病（COPD）',
        description: '长期吸烟等因素导致的不可逆性气道阻塞',
        symptoms: ['慢性咳嗽', '咳痰', '活动后气促', '桶状胸'],
        treatment: '戒烟、支气管扩张剂、吸入性糖皮质激素、氧疗、肺康复',
        severity: 'severe',
        diseaseType: 'inflammatory'
      },
      {
        id: 'path-6',
        name: '肺癌',
        description: '肺部恶性肿瘤，与吸烟密切相关',
        symptoms: ['刺激性干咳', '咯血', '体重下降', '胸痛', '声音嘶哑'],
        treatment: '手术切除、化疗、放疗、靶向治疗、免疫治疗',
        severity: 'severe',
        diseaseType: 'neoplastic'
      }
    ],
    clinicalCases: [
      {
        id: 'case-3',
        title: '社区获得性肺炎治疗',
        patientInfo: '男性，35岁，既往体健，淋雨后发热3天',
        presentation: '患者3天前淋雨受凉后出现寒战、高热，体温最高39.8℃，伴咳嗽、咳铁锈色痰，右侧胸痛。',
        diagnosis: '胸部CT示右肺下叶大片实变影。血常规WBC 15.6×10^9/L，中性粒细胞92%。诊断为大叶性肺炎。',
        treatment: '给予头孢曲松联合阿奇霉素抗感染治疗，配合退热、止咳化痰等对症处理。',
        outcome: '治疗48小时后体温恢复正常，1周后复查CT肺部病灶明显吸收，2周后痊愈。'
      }
    ]
  },
  {
    id: 'info-liver',
    structureId: 'liver',
    function: '肝脏是人体最大的消化腺和代谢器官，具有合成蛋白质、分泌胆汁、解毒、储存糖原等重要功能。肝脏参与500多种生化反应，是机体的"化学工厂"。成人肝脏每天合成约12-20g白蛋白，分泌约800-1000ml胆汁。',
    shortFunction: '人体最大消化腺，承担代谢、解毒、合成蛋白质等核心功能。',
    description: '肝脏位于右上腹，重约1200-1500g，分左、右两叶。肝脏血供丰富，25%来自肝动脉，75%来自门静脉。肝脏具有强大的再生能力，切除70%-80%后仍可再生至接近原大小。',
    commonPathologies: [
      {
        id: 'path-7',
        name: '病毒性肝炎',
        description: '肝炎病毒感染引起的肝脏炎症',
        symptoms: ['乏力', '食欲减退', '恶心', '黄疸', '肝区不适'],
        treatment: '抗病毒治疗（慢性乙肝/丙肝）、保肝治疗、休息营养支持',
        severity: 'moderate',
        diseaseType: 'infectious'
      },
      {
        id: 'path-8',
        name: '肝硬化',
        description: '慢性肝病进展至终末期的病理改变',
        symptoms: ['腹水', '食管胃底静脉曲张', '脾功能亢进', '肝性脑病'],
        treatment: '病因治疗、并发症防治、肝移植（终末期）',
        severity: 'severe',
        diseaseType: 'inflammatory'
      },
      {
        id: 'path-9',
        name: '脂肪肝',
        description: '肝细胞内脂肪过度堆积',
        symptoms: ['多无症状', '体检发现肝酶升高', '肝区隐痛'],
        treatment: '生活方式干预（减重、运动、戒酒）、控制血糖血脂',
        severity: 'mild',
        diseaseType: 'metabolic'
      }
    ],
    clinicalCases: [
      {
        id: 'case-4',
        title: '肝硬化食管静脉曲张破裂出血',
        patientInfo: '男性，55岁，乙肝病史20年，诊断肝硬化5年',
        presentation: '患者因"突发呕血1小时"急诊入院，呕血量约800ml，伴黑便、头晕、心慌。血压85/50mmHg，心率120次/分。',
        diagnosis: '诊断为肝硬化失代偿期，食管胃底静脉曲张破裂出血，失血性休克。',
        treatment: '快速扩容、输血、静脉应用生长抑素。急诊胃镜检查见食管中下段重度静脉曲张伴活动性出血，予套扎止血。',
        outcome: '出血成功控制，患者10天后出院。建议后续行经颈静脉肝内门体分流术（TIPS）降低再出血风险。'
      }
    ]
  },
  {
    id: 'info-stomach',
    structureId: 'stomach',
    function: '胃是消化系统的重要器官，主要功能是储存食物、分泌胃液进行初步消化，并将食糜逐步排入十二指肠。胃能容纳约1-2升食物，分泌的盐酸可杀灭细菌，胃蛋白酶原可初步分解蛋白质。',
    shortFunction: '储存和初步消化食物，分泌胃液杀灭细菌、分解蛋白质。',
    description: '胃位于左上腹，呈"J"形，分为贲门、胃底、胃体、胃窦四部分。胃壁由黏膜层、黏膜下层、肌层和浆膜层组成。胃排空时间：流质食物约1-2小时，混合食物约4-6小时。',
    commonPathologies: [
      {
        id: 'path-10',
        name: '消化性溃疡',
        description: '胃黏膜防御因素减弱导致的黏膜缺损',
        symptoms: ['周期性上腹痛', '餐后痛（胃溃疡）', '饥饿痛（十二指肠溃疡）', '反酸嗳气'],
        treatment: '质子泵抑制剂（PPI）、根除幽门螺杆菌、胃黏膜保护剂',
        severity: 'moderate',
        diseaseType: 'inflammatory'
      },
      {
        id: 'path-11',
        name: '慢性胃炎',
        description: '胃黏膜慢性炎症，与幽门螺杆菌感染相关',
        symptoms: ['上腹胀满', '隐痛', '嗳气', '食欲减退'],
        treatment: '根除幽门螺杆菌、对症治疗、饮食调整',
        severity: 'mild',
        diseaseType: 'inflammatory'
      },
      {
        id: 'path-12',
        name: '胃癌',
        description: '胃黏膜上皮来源的恶性肿瘤',
        symptoms: ['上腹痛进行性加重', '体重下降', '呕血黑便', '贫血'],
        treatment: '根治性手术切除、化疗、放疗、靶向治疗',
        severity: 'severe',
        diseaseType: 'neoplastic'
      }
    ],
    clinicalCases: [
      {
        id: 'case-5',
        title: '幽门螺杆菌相关消化性溃疡治疗',
        patientInfo: '女性，42岁，反复上腹痛半年，加重1周',
        presentation: '患者半年来反复出现上腹痛，多在餐后2-3小时出现，进食后缓解，夜间常痛醒。近1周腹痛加重，伴黑便。',
        diagnosis: '胃镜检查示十二指肠球部溃疡（A1期），大小约1.0cm，C13呼气试验阳性（幽门螺杆菌感染）。',
        treatment: '给予四联根除幽门螺杆菌治疗：艾司奥美拉唑+阿莫西林+克拉霉素+枸橼酸铋钾，疗程14天。随后继续PPI治疗4周。',
        outcome: '治疗结束后4周复查胃镜示溃疡愈合，C13呼气试验阴性。患者症状完全缓解。'
      }
    ]
  },
  {
    id: 'info-brain',
    structureId: 'brain',
    function: '大脑是中枢神经系统的最高级部分，负责控制意识、思维、记忆、情感、运动等所有高级神经活动。大脑皮层约有140亿个神经元，通过突触连接形成复杂的神经网络。成人脑重约1300-1500g，占体重的2%-3%，但耗氧量占全身的20%。',
    shortFunction: '中枢神经系统最高级部分，控制意识、思维、记忆、情感等所有高级神经活动。',
    description: '大脑位于颅腔内，由左右两个大脑半球组成，表面有许多沟回增加皮层面积。大脑分额叶（运动、语言、决策）、顶叶（感觉）、颞叶（听觉、记忆）、枕叶（视觉）等功能区。',
    commonPathologies: [
      {
        id: 'path-13',
        name: '脑梗死',
        description: '脑血管阻塞导致脑组织缺血坏死',
        symptoms: ['突发偏瘫', '失语', '意识障碍', '偏身感觉障碍'],
        treatment: '静脉溶栓（发病4.5小时内）、血管内治疗、抗血小板、康复治疗',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-14',
        name: '脑出血',
        description: '脑血管破裂出血导致脑组织受压损伤',
        symptoms: ['突发剧烈头痛', '呕吐', '意识障碍', '脑膜刺激征'],
        treatment: '控制血压、降颅压、手术清除血肿（大量出血）、康复治疗',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-15',
        name: '阿尔茨海默病',
        description: '中枢神经系统退行性病变，老年痴呆最常见类型',
        symptoms: ['进行性记忆力下降', '认知功能减退', '行为异常', '生活不能自理'],
        treatment: '胆碱酯酶抑制剂（多奈哌齐等）、NMDA受体拮抗剂（美金刚）、认知训练、生活照护',
        severity: 'severe',
        diseaseType: 'degenerative'
      }
    ],
    clinicalCases: [
      {
        id: 'case-6',
        title: '急性脑梗死rt-PA静脉溶栓治疗',
        patientInfo: '男性，68岁，突发右侧肢体无力伴言语不清2小时',
        presentation: '患者2小时前早餐时突发右侧肢体无力，不能行走，伴言语含糊，神志清楚。既往有高血压、房颤病史。NIHSS评分12分。',
        diagnosis: '头颅CT排除脑出血，诊断为急性缺血性脑卒中（左侧大脑中动脉供血区），发病时间2小时，在溶栓时间窗内。',
        treatment: '给予重组组织型纤溶酶原激活剂（rt-PA）0.9mg/kg静脉溶栓治疗，同时启动卒中单元综合管理。',
        outcome: '溶栓24小时后右侧肢体肌力从2级恢复至4级，NIHSS评分降至4分。2周后患者可独立行走，出院继续康复训练。'
      }
    ]
  },
  {
    id: 'info-skeleton',
    structureId: 'skull',
    function: '骨骼系统具有支撑身体、保护内脏、运动杠杆、造血、储存矿物质等重要功能。成人共有206块骨，占体重的约20%。骨髓是造血器官，骨组织储存了体内99%的钙。',
    shortFunction: '支撑身体、保护内脏、参与运动、造血并储存矿物质。',
    description: '骨骼分为颅骨、躯干骨和四肢骨三大部分。骨由骨膜、骨质和骨髓组成。骨组织不断进行重塑，成人每年约有10%的骨组织被更新。',
    commonPathologies: [
      {
        id: 'path-16',
        name: '骨折',
        description: '骨的连续性中断，多由外伤引起',
        symptoms: ['局部疼痛', '肿胀', '畸形', '功能障碍', '骨擦感'],
        treatment: '复位、固定（外固定/内固定）、功能锻炼、康复治疗',
        severity: 'moderate',
        diseaseType: 'traumatic'
      },
      {
        id: 'path-17',
        name: '骨质疏松症',
        description: '骨量减少、骨微结构破坏导致骨脆性增加',
        symptoms: ['多无症状', '身高变矮', '驼背', '脆性骨折'],
        treatment: '补充钙和维生素D、双膦酸盐、运动、预防跌倒',
        severity: 'moderate',
        diseaseType: 'metabolic'
      },
      {
        id: 'path-18',
        name: '骨关节炎',
        description: '关节软骨退行性变导致的慢性关节疾病',
        symptoms: ['关节疼痛', '活动后加重', '晨僵（<30分钟）', '关节畸形'],
        treatment: '对症止痛、关节腔注射、关节置换术（终末期）',
        severity: 'moderate',
        diseaseType: 'degenerative'
      }
    ],
    clinicalCases: [
      {
        id: 'case-7',
        title: '老年髋部骨折围手术期管理',
        patientInfo: '女性，78岁，家中不慎摔倒致右髋部疼痛不能站立',
        presentation: '患者摔倒后右侧髋部疼痛，不能站立行走。右下肢呈外旋短缩畸形，髋部叩击痛阳性。',
        diagnosis: '骨盆X线片示右侧股骨颈骨折（Garden IV型）。骨密度检查示重度骨质疏松（T值-3.2）。',
        treatment: '完善术前检查后24小时内行右侧人工股骨头置换术。术后给予低分子肝素抗凝、头孢类抗生素预防感染、规范抗骨质疏松治疗。',
        outcome: '术后第2天患者即可在助行器辅助下站立，1周后可辅助行走。3个月后可独立行走，生活基本自理。'
      }
    ]
  },
  {
    id: 'info-muscle',
    structureId: 'muscle-chest',
    function: '肌肉系统通过收缩产生力和运动，同时维持姿势、产生热量。人体约有600多块骨骼肌，占体重的40%-50%。肌肉收缩所需能量主要来自ATP，剧烈运动时可产生大量热量。',
    shortFunction: '通过收缩产生力和运动，维持身体姿势并产生热量。',
    description: '骨骼肌由肌纤维（肌细胞）组成，每条肌纤维含有大量肌原纤维。肌肉通过肌腱附着于骨骼，跨越关节，收缩时产生关节运动。肌肉具有肥大和萎缩的可塑性。',
    commonPathologies: [
      {
        id: 'path-19',
        name: '肌肉拉伤',
        description: '肌肉过度牵拉导致的肌纤维撕裂',
        symptoms: ['局部疼痛', '压痛', '肿胀', '活动受限'],
        treatment: '休息（RICE原则）、冷敷、加压包扎、抬高患肢、康复锻炼',
        severity: 'mild',
        diseaseType: 'traumatic'
      },
      {
        id: 'path-20',
        name: '肌营养不良',
        description: '遗传性肌肉变性疾病，进行性肌无力和萎缩',
        symptoms: ['进行性肌无力', '走路延迟', 'Gowers征', '小腿假性肥大'],
        treatment: '康复治疗、对症支持、基因治疗（研究中）',
        severity: 'severe',
        diseaseType: 'congenital'
      },
      {
        id: 'path-21',
        name: '重症肌无力',
        description: '自身免疫性神经肌肉接头传递障碍',
        symptoms: ['骨骼肌波动性无力', '晨轻暮重', '眼睑下垂', '复视'],
        treatment: '胆碱酯酶抑制剂、糖皮质激素、免疫抑制剂、胸腺切除',
        severity: 'moderate',
        diseaseType: 'autoimmune'
      }
    ],
    clinicalCases: [
      {
        id: 'case-8',
        title: '重症肌无力胸腺扩大切除术',
        patientInfo: '女性，28岁，反复眼睑下垂伴四肢无力1年',
        presentation: '患者1年前出现左眼睑下垂，晨轻暮重，劳累后加重。近半年出现双侧眼睑下垂，伴四肢无力，上下楼梯困难。',
        diagnosis: '新斯的明试验阳性，血清乙酰胆碱受体抗体（AChR-Ab）阳性。胸部CT示胸腺增生。重复神经电刺激示递减现象。',
        treatment: '予泼尼松+溴吡斯的明治疗后症状部分缓解，后行胸腔镜下胸腺扩大切除术。',
        outcome: '术后6个月患者症状明显改善，泼尼松逐步减量，溴吡斯的明剂量减少，可正常工作生活。'
      }
    ]
  },
  {
    id: 'info-kidney',
    structureId: 'kidney-left',
    function: '肾脏是人体重要的排泄器官，主要功能是生成尿液，排出代谢废物和多余水分，同时调节水、电解质和酸碱平衡。肾脏还具有内分泌功能，分泌促红细胞生成素、肾素、活性维生素D等。两侧肾脏每分钟滤过约125ml血液，每天生成原尿约180升。',
    shortFunction: '生成尿液排出代谢废物，调节水电解质平衡并分泌多种激素。',
    description: '肾脏位于腹膜后脊柱两侧，形如蚕豆，重约120-150g/个。肾实质分为皮质和髓质，肾单位是肾脏的基本功能单位，每个肾约有100万个肾单位。',
    commonPathologies: [
      {
        id: 'path-22',
        name: '急性肾损伤',
        description: '各种原因导致的肾功能快速下降',
        symptoms: ['尿量减少', '水肿', '恶心呕吐', '意识障碍'],
        treatment: '病因治疗、维持水盐平衡、肾脏替代治疗（严重病例）',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-23',
        name: '慢性肾脏病',
        description: '慢性进行性肾损伤，最终发展为尿毒症',
        symptoms: ['早期无症状', '后期乏力、食欲差', '高血压', '下肢水肿'],
        treatment: '低蛋白饮食、控制血压血糖、肾脏替代治疗（透析/移植）',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-24',
        name: '肾结石',
        description: '尿液中结晶物质沉积形成结石',
        symptoms: ['肾绞痛', '血尿', '恶心呕吐', '尿频尿急'],
        treatment: '大量饮水、解痉止痛、体外冲击波碎石、手术取石',
        severity: 'moderate',
        diseaseType: 'metabolic'
      }
    ],
    clinicalCases: [
      {
        id: 'case-9',
        title: '尿毒症维持性血液透析治疗',
        patientInfo: '男性，52岁，糖尿病肾病15年，发现肾功能异常5年',
        presentation: '患者近1个月来出现乏力、食欲减退、恶心，伴下肢水肿、尿量减少。查血肌酐890μmol/L，尿素氮28mmol/L，血红蛋白78g/L。',
        diagnosis: '诊断为2型糖尿病肾病，慢性肾脏病5期（尿毒症期），肾性贫血。',
        treatment: '行右颈内静脉半永久导管置入术，开始维持性血液透析治疗（每周3次，每次4小时）。同时给予促红细胞生成素纠正贫血，控制血压、血糖。',
        outcome: '透析2个月后患者消化道症状缓解，水肿消退，体力恢复。建议行肾移植评估。'
      }
    ]
  },
  {
    id: 'info-spinal-cord',
    structureId: 'spinal-cord',
    function: '脊髓是中枢神经系统的重要组成部分，是大脑与周围神经之间的信息传递通路。脊髓具有传导功能（上行传导感觉、下行传导运动）和反射功能（完成许多基本的反射活动，如膝跳反射、排尿反射等）。成人脊髓长约40-45cm，上端与延髓相连，下端终止于第1腰椎下缘水平。',
    shortFunction: '大脑与周围神经的信息传递通路，兼具传导与反射功能。',
    description: '脊髓位于椎管内，呈前后稍扁的圆柱形，外包被膜。脊髓内部由灰质（神经元胞体）和白质（神经纤维）组成。脊髓分为31个节段：颈髓8节、胸髓12节、腰髓5节、骶髓5节、尾髓1节，每节发出一对脊神经。',
    commonPathologies: [
      {
        id: 'path-25',
        name: '脊髓损伤',
        description: '外伤等原因导致的脊髓结构和功能损害',
        symptoms: ['损伤平面以下运动障碍', '感觉障碍', '大小便功能障碍', '自主神经功能紊乱'],
        treatment: '急性期激素冲击、手术减压、康复治疗、并发症防治',
        severity: 'severe',
        diseaseType: 'traumatic'
      },
      {
        id: 'path-26',
        name: '急性脊髓炎',
        description: '脊髓的炎性脱髓鞘或坏死性病变',
        symptoms: ['急性起病的双下肢瘫痪', '传导束型感觉障碍', '尿便障碍', '发病前常有感染史'],
        treatment: '大剂量激素冲击、免疫球蛋白、康复治疗、对症支持',
        severity: 'severe',
        diseaseType: 'inflammatory'
      },
      {
        id: 'path-27',
        name: '脊髓型颈椎病',
        description: '颈椎退变导致脊髓受压缺血',
        symptoms: ['四肢麻木无力', '行走不稳（踩棉花感）', '大小便功能障碍', '腱反射亢进'],
        treatment: '保守治疗（轻型）、手术减压（中重度）',
        severity: 'severe',
        diseaseType: 'degenerative'
      }
    ],
    clinicalCases: [
      {
        id: 'case-10',
        title: '急性颈髓损伤激素冲击治疗',
        patientInfo: '男性，45岁，车祸致颈部外伤伴四肢活动不能4小时',
        presentation: '患者车祸后颈部疼痛，四肢不能活动，不能自行排尿。查体：C4平面以下深浅感觉消失，四肢肌力0级，腱反射消失，尿潴留。',
        diagnosis: '颈椎MRI示C4-5椎间盘突出，脊髓受压水肿。诊断为C4水平脊髓损伤（ASIA A级）。',
        treatment: '伤后3小时内开始甲泼尼龙冲击治疗（首剂30mg/kg，继以5.4mg/kg/h维持23小时）。伤后第3天行C4-5前路减压融合内固定术。术后予以营养神经、预防感染、康复训练。',
        outcome: '术后3个月复查，患者双上肢肌力恢复至3-4级，双下肢肌力1-2级，可在辅助下坐起。继续康复治疗。'
      }
    ]
  },
  {
    id: 'info-cerebellum',
    structureId: 'cerebellum',
    function: '小脑是重要的运动调节中枢，主要功能包括：维持身体平衡、调节肌张力、协调随意运动。小脑不直接发起运动，但通过整合感觉信息和运动指令，确保运动的准确、协调和流畅。小脑损伤典型表现为"共济失调"。',
    shortFunction: '运动调节中枢，维持身体平衡、调节肌张力、协调随意运动。',
    description: '小脑位于颅后窝，在大脑半球枕叶下方、脑干背侧。成人小脑重约150g，占脑重的约10%，但包含了全脑约50%的神经元。小脑分为左右两个小脑半球和中间的蚓部。',
    commonPathologies: [
      {
        id: 'path-28',
        name: '小脑梗死',
        description: '小脑供血动脉阻塞导致脑组织缺血坏死',
        symptoms: ['眩晕', '恶心呕吐', '行走不稳', '构音障碍', '眼球震颤'],
        treatment: '溶栓（时间窗内）、抗血小板、改善循环、康复治疗',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-29',
        name: '脊髓小脑性共济失调',
        description: '遗传性神经系统变性疾病，小脑萎缩',
        symptoms: ['进行性行走不稳', '双手动作笨拙', '言语含糊', '眼球活动障碍'],
        treatment: '对症支持治疗、康复训练、基因咨询',
        severity: 'severe',
        diseaseType: 'degenerative'
      },
      {
        id: 'path-30',
        name: '小脑肿瘤',
        description: '小脑的原发性或转移性肿瘤',
        symptoms: ['头痛呕吐（颅内压增高）', '共济失调', '眼球震颤', '强迫头位'],
        treatment: '手术切除、放疗、化疗、对症降颅压',
        severity: 'severe',
        diseaseType: 'neoplastic'
      }
    ],
    clinicalCases: [
      {
        id: 'case-11',
        title: '小脑梗死急性溶栓治疗',
        patientInfo: '女性，62岁，突发眩晕伴行走不能2小时',
        presentation: '患者2小时前安静状态下突发眩晕，视物旋转，伴恶心呕吐数次，不能站立行走。既往有高血压、房颤病史。',
        diagnosis: '头颅CT排除脑出血，DWI示左侧小脑半球急性梗死。NIHSS评分6分。',
        treatment: '发病2.5小时，在溶栓时间窗内，给予rt-PA 0.9mg/kg静脉溶栓治疗。同时给予抗血小板、他汀类药物。',
        outcome: '溶栓24小时后患者眩晕明显减轻，可在扶持下行走。1周后可独立行走，仅遗留轻度行走不稳。'
      }
    ]
  },
  {
    id: 'info-brainstem',
    structureId: 'brainstem',
    function: '脑干是连接大脑、小脑和脊髓的"生命中枢"，具有极其重要的功能：1) 传导功能：上下行神经纤维的必经之路；2) 反射中枢：心血管运动中枢、呼吸中枢、呕吐中枢等基本生命中枢；3) 参与睡眠觉醒、意识维持等高级功能。脑干损伤常危及生命。',
    shortFunction: '连接大脑、小脑和脊髓的生命中枢，调控呼吸、心跳等基本生命活动。',
    description: '脑干位于颅后窝，自下而上分为延髓、脑桥、中脑三部分，长约7-8cm。脑干内部结构复杂，包含10对颅神经核团、网状结构和大量上下行传导束。',
    commonPathologies: [
      {
        id: 'path-31',
        name: '脑干梗死',
        description: '脑干供血动脉闭塞导致的缺血性卒中',
        symptoms: ['交叉性瘫痪（同侧颅神经麻痹+对侧肢体偏瘫）', '吞咽困难', '构音障碍', '意识障碍'],
        treatment: '溶栓（时间窗内）、抗血小板、改善循环、支持治疗',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-32',
        name: '脑干出血',
        description: '脑干血管破裂出血，病死率极高',
        symptoms: ['突发昏迷', '呕吐', '针尖样瞳孔', '呼吸节律异常', '中枢性高热'],
        treatment: '控制血压、降颅压、呼吸机支持、对症治疗、手术（慎重）',
        severity: 'severe',
        diseaseType: 'vascular'
      },
      {
        id: 'path-33',
        name: '重症肌无力',
        description: '自身免疫性神经肌肉接头传递障碍',
        symptoms: ['骨骼肌波动性无力', '晨轻暮重', '眼睑下垂', '复视'],
        treatment: '胆碱酯酶抑制剂、糖皮质激素、免疫抑制剂、胸腺切除',
        severity: 'moderate',
        diseaseType: 'autoimmune'
      }
    ],
    clinicalCases: [
      {
        id: 'case-12',
        title: '桥脑梗死致闭锁综合征',
        patientInfo: '男性，56岁，突发四肢瘫痪伴意识清楚1小时',
        presentation: '患者1小时前突发右侧肢体无力，很快进展为四肢瘫痪，不能言语，但神志清楚，能通过眨眼与外界交流。既往有高血压病史10年，吸烟30年。',
        diagnosis: '头颅MRI示双侧桥脑基底部急性梗死。诊断为桥脑梗死，闭锁综合征。',
        treatment: '给予抗血小板、他汀、改善循环等治疗。置入胃管营养支持，气管切开呼吸机辅助呼吸（因咳痰无力）。早期介入康复训练。',
        outcome: '治疗2周后患者左侧肢体肌力恢复至3级，可通过眼球运动交流。6个月随访，患者可借助轮椅活动，通过眼动仪进行简单交流。'
      }
    ]
  }
];

export const getOrganInfoByStructureId = (structureId: string): OrganInfo | undefined => {
  return organInfoData.find(info => info.structureId === structureId);
};

const shortFunctionMap: Record<string, string> = {
  'skin-whole': '人体最大器官，保护深层组织、调节体温、感知外界刺激。',
  'skin-head': '覆盖头部的皮肤，保护颅骨并生长毛发。',
  'fat-abdominal': '腹部皮下脂肪，储存能量、保温并缓冲外力。',
  'fat-subcutaneous': '全身皮下脂肪组织，储存能量、维持体温、保护内脏。',
  'muscle-chest': '胸前壁主要肌肉，参与上臂内收和内旋运动。',
  'muscle-abdominis': '腹前壁核心肌肉，维持腹压、参与躯干前屈和呼吸。',
  'muscle-bicep-left': '左上臂屈肌，主要作用是屈肘和使前臂旋后。',
  'muscle-bicep-right': '右上臂屈肌，主要作用是屈肘和使前臂旋后。',
  'muscle-quad-left': '左大腿前群肌，伸膝、屈髋，是人体最强壮的肌肉之一。',
  'muscle-quad-right': '右大腿前群肌，伸膝、屈髋，是人体最强壮的肌肉之一。',
  'heart': '循环系统核心，通过节律性舒缩泵送血液至全身。',
  'lung-left': '左肺，两叶结构，参与氧气与二氧化碳的气体交换。',
  'lung-right': '右肺，三叶结构，参与氧气与二氧化碳的气体交换。',
  'liver': '人体最大消化腺，承担代谢、解毒、合成蛋白质等核心功能。',
  'stomach': '储存和初步消化食物，分泌胃液杀灭细菌、分解蛋白质。',
  'spleen': '重要免疫器官，储存血液、过滤衰老红细胞、参与免疫应答。',
  'kidney-left': '左肾，生成尿液排出代谢废物，调节水电解质平衡。',
  'kidney-right': '右肾，生成尿液排出代谢废物，调节水电解质平衡。',
  'intestines': '消化吸收的主要场所，包括小肠和大肠。',
  'bladder': '储存尿液的肌性囊状器官，排空时将尿液排出体外。',
  'brain': '中枢神经系统最高级部分，控制意识、思维、记忆、情感等所有高级神经活动。',
  'spinal-cord': '大脑与周围神经的信息传递通路，兼具传导与反射功能。',
  'cerebellum': '运动调节中枢，维持身体平衡、调节肌张力、协调随意运动。',
  'brainstem': '连接大脑、小脑和脊髓的生命中枢，调控呼吸、心跳等基本生命活动。',
  'skull': '容纳和保护大脑与感觉器官的骨性结构。',
  'spine': '脊柱，支撑躯干、保护脊髓、参与躯干运动的中轴骨骼。',
  'sternum': '胸骨，参与构成胸廓前壁，保护心脏等重要器官。',
  'ribcage': '胸廓，保护心肺并参与呼吸运动。',
  'clavicle-left': '左侧锁骨，连接上肢与躯干，支撑肩关节活动。',
  'clavicle-right': '右侧锁骨，连接上肢与躯干，支撑肩关节活动。',
  'humerus-left': '左侧肱骨，上臂的骨性支架，参与肩关节与肘关节运动。',
  'humerus-right': '右侧肱骨，上臂的骨性支架，参与肩关节与肘关节运动。',
  'pelvis': '骨盆，支撑躯干、保护盆腔脏器、传递下肢力量。',
  'femur-left': '左侧股骨，人体最长最粗壮的骨，支撑体重并参与髋膝关节运动。',
  'femur-right': '右侧股骨，人体最长最粗壮的骨，支撑体重并参与髋膝关节运动。',
  'tibia-left': '左侧胫骨，小腿主要承重骨，参与膝关节与踝关节运动。',
  'tibia-right': '右侧胫骨，小腿主要承重骨，参与膝关节与踝关节运动。'
};

export const getShortFunctionByStructureId = (structureId: string): string => {
  return shortFunctionMap[structureId] || '解剖结构';
};
