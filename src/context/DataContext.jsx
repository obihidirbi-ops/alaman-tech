import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// Seed initial data for 12 Core Services as requested in prompt
const INITIAL_SERVICES = [
  {
    id: "serv-1",
    slug: "fire-fighting-systems",
    title_ar: "أنظمة إطفاء الحريق",
    title_en: "Fire Fighting Systems",
    short_desc_ar: "توريد وتركيب وصيانة أجهزة وأنظمة إطفاء الحريق بمختلف أنواعها المائية والغازية والفوم.",
    short_desc_en: "Supply, installation, and maintenance of all fire fighting systems (Water, Gas, Foam, Kitchens).",
    icon_name: "Flame",
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "أنظمة إطفاء مائية ومضخات معتمدة متطورة",
      "شبكات رش آلي (Fire Sprinklers) ورشاشات طوارئ",
      "أنظمة الإطفاء الغازي النظيف (FM200, CO2, Novec)",
      "أنظمة إطفاء خطوط المطابخ المطابقة للاشتراطات",
      "صناديق الحريق ومحبس الحريق وشبكات التغذية"
    ],
    features_en: [
      "Advanced certified water fire pumps & piping networks",
      "Automatic Sprinkler Systems",
      "Clean Agent Gas Extinguishing Systems (FM200, CO2, Novec)",
      "Kitchen Hood Suppression Systems compliant with Civil Defense",
      "Fire Hose Cabinets & Hydrants"
    ],
    systems_ar: ["Fire Sprinklers", "FM200 Gas", "CO2 Systems", "Foam Systems", "Kitchen Hood Systems", "Fire Hose Cabinets"],
    systems_en: ["Fire Sprinklers", "FM200 Gas", "CO2 Systems", "Foam Systems", "Kitchen Hood Systems", "Fire Hose Cabinets"],
    is_active: true,
    sort_order: 1
  },
  {
    id: "serv-2",
    slug: "fire-alarm-systems",
    title_ar: "أنظمة إنذار الحريق",
    title_en: "Fire Alarm Systems",
    short_desc_ar: "توريد وتركيب وصيانة أحدث لوحات وأنظمة إنذار الحريق العادية والمعنونة مع كواشف الأدخنة والحرارة.",
    short_desc_en: "Design, installation, and testing of Conventional & Addressable Fire Alarm Control Systems.",
    icon_name: "BellRing",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "لوحات إنذار معنونة (Addressable Fire Alarm Panels)",
      "لوحات إنذار عادية (Conventional Systems)",
      "كواشف أدخنة حرارية وضوئية متطورة High Sensitivity",
      "كاسر زجاجي وأجراس وسارينات إنذار عالية الصوت",
      "ربط مباشر مع لوحات التحكم الرئيسية والربط المبكر"
    ],
    features_en: [
      "Addressable Control Panels",
      "Conventional Control Panels",
      "High Sensitivity Smoke & Heat Detectors",
      "Manual Call Points & Alarm Strobes/Sounders",
      "Central Monitoring Integration"
    ],
    systems_ar: ["Addressable Panels", "Conventional Panels", "Smoke Detectors", "Heat Detectors", "Manual Call Points", "Strobes & Sounders"],
    systems_en: ["Addressable Panels", "Conventional Panels", "Smoke Detectors", "Heat Detectors", "Manual Call Points", "Strobes & Sounders"],
    is_active: true,
    sort_order: 2
  },
  {
    id: "serv-3",
    slug: "occupational-safety",
    title_ar: "السلامة المهنية ومعدات الحماية",
    title_en: "Occupational Safety & PPE",
    short_desc_ar: "توريد وصيانة أجهزة ومعدات السلامة المهنية، معدات الحماية الشخصية PPE واللوحات الإرشادية.",
    short_desc_en: "Provision of Personal Protective Equipment (PPE), safety signages, and emergency safety devices.",
    icon_name: "ShieldCheck",
    image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "معدات الحماية الشخصية PPE للعمالة والمهندسين",
      "لوحات إرشادية وعلامات تحذير مضاءة وعاكسة",
      "أطقم الإسعافات الأولية ومعدات الطوارئ للمواقع",
      "أجهزة قياس وتسريب الغازات والمعدات الوقائية"
    ],
    features_en: [
      "Complete range of Personal Protective Equipment (PPE)",
      "Reflective & Illuminated Safety Signages",
      "Emergency First Aid & Safety Kits",
      "Gas Detection Equipment & Protective Gear"
    ],
    systems_ar: ["Personal Safety Gear", "Emergency Signage", "First Aid Kits", "Gas Detectors"],
    systems_en: ["Personal Safety Gear", "Emergency Signage", "First Aid Kits", "Gas Detectors"],
    is_active: true,
    sort_order: 3
  },
  {
    id: "serv-4",
    slug: "elevators-maintenance",
    title_ar: "صيانة المصاعد الكهربائية",
    title_en: "Elevators Maintenance",
    short_desc_ar: "صيانة المصاعد الكهربائية والهيدروليكية، الفحص الدوري، معالجة الأعطال والدعم الفني السريع.",
    short_desc_en: "Comprehensive periodic maintenance, troubleshooting, and safety inspections for elevators.",
    icon_name: "ArrowUpDown",
    image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "صيانة دورية وقائية لمصاعد الركاب والبضائع",
      "فحص واختبار وسائل الأمان وفرامل الطوارئ",
      "معالجة أعطال الكروت ولوحات التحكم الرئيسية",
      "خدمة طوارئ ودعم فني سريع على مدار الساعة"
    ],
    features_en: [
      "Preventive maintenance for passenger & freight elevators",
      "Safety gear & emergency brake testing",
      "Control board repairs & modernization",
      "24/7 Rapid Emergency Support"
    ],
    systems_ar: ["Passenger Elevators", "Freight Elevators", "Control Boards", "Preventive Maintenance"],
    systems_en: ["Passenger Elevators", "Freight Elevators", "Control Boards", "Preventive Maintenance"],
    is_active: true,
    sort_order: 4
  },
  {
    id: "serv-5",
    slug: "security-cctv-systems",
    title_ar: "الأنظمة الأمنية والمراقبة (CCTV)",
    title_en: "Security & CCTV Systems",
    short_desc_ar: "توريد وتركيب وصيانة كاميرات المراقبة التلفزيونية، أنظمة التحكم بالدخول، وبصمة الحضور والانصراف.",
    short_desc_en: "Turnkey IP/HD CCTV surveillance, Access Control, and Biometric attendance management.",
    icon_name: "Camera",
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "كاميرات مراقبة عالية الدقة IP & 4K رؤية ليلية",
      "أنظمة التحكم بالدخول للمباني والمنشآت Access Control",
      "أنظمة بصمة الحضور والوجه والانصراف للموظفين",
      "خوادم التخزين NVR/DVR والتسجيل الآمن الممتد"
    ],
    features_en: [
      "High Definition IP & 4K CCTV Cameras with Night Vision",
      "Enterprise Access Control Systems",
      "Biometric & Facial Recognition Time Attendance",
      "Enterprise NVR Storage & Video Analytics"
    ],
    systems_ar: ["IP CCTV Cameras", "Access Control", "Biometric Attendance", "NVR & Video Storage"],
    systems_en: ["IP CCTV Cameras", "Access Control", "Biometric Attendance", "NVR & Video Storage"],
    is_active: true,
    sort_order: 5
  },
  {
    id: "serv-6",
    slug: "intrusion-alarm-systems",
    title_ar: "أنظمة الإنذار ضد السرقة",
    title_en: "Intrusion Alarm Systems",
    short_desc_ar: "توريد وتركيب أنظمة حماية المباني ضد التسلل والسرقة مع كواشف الحركة وحساسات الأبواب والنوافذ.",
    short_desc_en: "Advanced intrusion alarms, motion detectors, door sensors, and perimeter protection.",
    icon_name: "ShieldAlert",
    image_url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "حساسات الحركة بالأشعة تحت الحمراء PIR Motion Sensors",
      "حساسات فتح الأبواب والكسر الزجاجي Glass Break Detectors",
      "لوحات تحكم ذكية ترسل تنبيهات فورية للجوال والمركز",
      "سارينات وصافرات إنذار عالية الشدة خارجية وداخلية"
    ],
    features_en: [
      "PIR Infrared Motion Detectors",
      "Door Contacts & Glass Break Sensors",
      "Smart alarm panels with GSM/Mobile instant alerts",
      "High-decibel indoor & outdoor sirens"
    ],
    systems_ar: ["PIR Motion Sensors", "Glass Break Sensors", "Smart Alarm Panels", "GSM Alert Modules"],
    systems_en: ["PIR Motion Sensors", "Glass Break Sensors", "Smart Alarm Panels", "GSM Alert Modules"],
    is_active: true,
    sort_order: 6
  },
  {
    id: "serv-7",
    slug: "it-networking-infrastructure",
    title_ar: "تقنية المعلومات والشبكات",
    title_en: "IT & Networking Infrastructure",
    short_desc_ar: "تأسيس البنية التحتية للشبكات، الكوابل المهيكلة، السيرفرات، وأجهزة اللاسلكي Wi-Fi للمنشآت.",
    short_desc_en: "Network infrastructure, structured cabling, Wi-Fi deployment, switches, and server racks.",
    icon_name: "Network",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "تأسيس تمديدات الكوابل المهيكلة Structured Cabling (Cat6, Fiber)",
      "تركيب السويتشات والموجهات وزوايا السيرفرات Rack Cabinets",
      "تجهيز شبكات Wi-Fi الموحدة للمباني والشركات",
      "حلول جدران الحماية والأمان الشبكي Enterprise Routers"
    ],
    features_en: [
      "Structured Fiber & Copper Cabling (Cat6/Cat6A/Fiber)",
      "Server Racks, Switches & Routers installation",
      "Enterprise Unified Wi-Fi Infrastructure",
      "Network Firewalls & Cybersecurity Routers"
    ],
    systems_ar: ["Structured Cabling", "Enterprise Wi-Fi", "Core Switches & Racks", "Fiber Optics"],
    systems_en: ["Structured Cabling", "Enterprise Wi-Fi", "Core Switches & Racks", "Fiber Optics"],
    is_active: true,
    sort_order: 7
  },
  {
    id: "serv-8",
    slug: "audio-public-address-systems",
    title_ar: "الأنظمة الصوتية ومخاطبة الجمهور",
    title_en: "Audio & Public Address Systems",
    short_desc_ar: "توريد وتركيب الأنظمة الصوتية للمباني والمجالس وغرف المؤتمرات وأنظمة مخاطبة الجمهور في الطوارئ.",
    short_desc_en: "Public Address (PA) systems, background music, conference room audio, and evacuation audio.",
    icon_name: "Volume2",
    image_url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "أنظمة النداء الصوتي ومخاطبة الجمهور Public Address",
      "أنظمة الصوت في قاعات المؤتمرات والاجتماعات",
      "سماعات السقف والمباني المضادة للعوامل الجوية",
      "الربط مع نظام الإخلاء الصوتي عند الطوارئ الصوتية"
    ],
    features_en: [
      "Public Address (PA) & Voice Evacuation Systems",
      "Conference & Boardroom Audio setups",
      "Ceiling, Wall & Weatherproof speakers",
      "Emergency Evacuation Audio Integration"
    ],
    systems_ar: ["PA Systems", "Conference Audio", "Ceiling Speakers", "Voice Evacuation"],
    systems_en: ["PA Systems", "Conference Audio", "Ceiling Speakers", "Voice Evacuation"],
    is_active: true,
    sort_order: 8
  },
  {
    id: "serv-9",
    slug: "engineering-drawings-reports",
    title_ar: "المخططات والتقارير الهندسية",
    title_en: "Engineering Drawings & Reports",
    short_desc_ar: "إعداد واعتماد مخططات السلامة ومكافحة الحريق والتقارير الفنية للمباني والمنشآت لدى الدفاع المدني.",
    short_desc_en: "Preparation and Civil Defense approval of Safety Drawings, Fire Protection Plans, and Technical Reports.",
    icon_name: "FileCheck",
    image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "تصميم المخططات الهندسية لأنظمة السلامة والحريق AutoCad",
      "إعداد التقارير الفنية للمباني السكنية والتجارية والصناعية",
      "اعتماد المخططات رسمياً من الجهات المختصة والدفاع المدني",
      "دراسة وحسابات الأحمال ومضخات الحريق والهيدروليك"
    ],
    features_en: [
      "AutoCAD Safety & Fire Fighting Drawings design",
      "Technical Engineering Reports for all facility types",
      "Official Civil Defense accreditation & approvals",
      "Hydraulic calculations for fire pump systems"
    ],
    systems_ar: ["Fire Fighting AutoCAD Drawings", "Civil Defense Approval", "Technical Reports", "Hydraulic Calculations"],
    systems_en: ["Fire Fighting AutoCAD Drawings", "Civil Defense Approval", "Technical Reports", "Hydraulic Calculations"],
    is_active: true,
    sort_order: 9
  },
  {
    id: "serv-10",
    slug: "evacuation-plans",
    title_ar: "خطط الإخلاء ومسارات الطوارئ",
    title_en: "Evacuation Plans & Routes",
    short_desc_ar: "تصميم واعتماد مخططات الإخلاء ومسارات الهروب ونقاط التجمع للمصانع والمباني السكنية والتجارية.",
    short_desc_en: "Design & certification of Emergency Evacuation Plans, Escape Routes, and Assembly Points.",
    icon_name: "Signpost",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "رسم وتصميم مخططات الإخلاء المضيئة ومخارج الطوارئ",
      "تحديد نقاط التجمع ومسارات الهروب الآمنة بدقة",
      "خطط الإخلاء الافتراضية والتدريبية للعمالة والموظفين",
      "لوحات الاكريليك المضاءة المعلقة للطباعة والجداريات"
    ],
    features_en: [
      "Design of Photoluminescent Emergency Evacuation maps",
      "Clear marking of Emergency Exits & Assembly Points",
      "Evacuation procedures documentation & protocols",
      "High quality acrylic wall signage printing"
    ],
    systems_ar: ["Emergency Evacuation Maps", "Assembly Point Markings", "Exit Signage", "Safety Signage Boards"],
    systems_en: ["Emergency Evacuation Maps", "Assembly Point Markings", "Exit Signage", "Safety Signage Boards"],
    is_active: true,
    sort_order: 10
  },
  {
    id: "serv-11",
    slug: "licenses-maintenance-contracts",
    title_ar: "التراخيص وعقود الصيانة الدوريّة",
    title_en: "Licenses & Maintenance Contracts",
    short_desc_ar: "إصدار شهادات السلامة المعتمدة، إبرام عقود الصيانة السنوية ومتابعة تراخيص الدفاع المدني.",
    short_desc_en: "Issuance of certified safety compliance documents, annual maintenance contracts, and Civil Defense licenses.",
    icon_name: "FileText",
    image_url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "عقود صيانة أنظمة سلامة سنوية معتمدة للدفاع المدني",
      "إصدار شهادات إنجاز وكفاءة سلامة فورية",
      "متابعة وإنهاء إجراءات إصدار وتجديد رخصة سلامة المنشأة",
      "زيارات تفقدية وصيانة دورية شهرياً أو ربع سنوياً"
    ],
    features_en: [
      "Annual Civil Defense approved Maintenance Contracts",
      "Issuance of Safety Compliance Certificates",
      "Civil Defense license issuance & renewal assistance",
      "Scheduled monthly/quarterly maintenance inspections"
    ],
    systems_ar: ["Annual Safety Contracts", "Civil Defense Certificates", "Periodic Inspections", "License Renewal"],
    systems_en: ["Annual Safety Contracts", "Civil Defense Certificates", "Periodic Inspections", "License Renewal"],
    is_active: true,
    sort_order: 11
  },
  {
    id: "serv-12",
    slug: "engineering-consulting",
    title_ar: "الاستشارات الهندسية والفنية",
    title_en: "Engineering & Safety Consulting",
    short_desc_ar: "تقديم الاستشارات الفنية والهندسية في مجال مكافحة الحريق، السلامة، والأنظمة الأمنية للمشاريع.",
    short_desc_en: "Expert engineering consultation, code compliance reviews, and project supervision.",
    icon_name: "Compass",
    image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    features_ar: [
      "استشارات مراجعة كود البناء السعودي والكود العالمي NFPA",
      "تقييم وتحليل مخاطر الحريق والسلامة في المنشآت",
      "الإشراف الهندسي على أعمال التأسيس والتنفيذ بالمواقع",
      "تقديم حلول هندسية واقتصادية متكاملة لتقليل التكاليف"
    ],
    features_en: [
      "SBC & NFPA code compliance consulting",
      "Risk assessment & fire hazard analysis",
      "On-site engineering supervision & inspection",
      "Cost-effective technical recommendations"
    ],
    systems_ar: ["NFPA Code Review", "Risk Assessment", "Engineering Supervision", "Technical Advisory"],
    systems_en: ["NFPA Code Review", "Risk Assessment", "Engineering Supervision", "Technical Advisory"],
    is_active: true,
    sort_order: 12
  }
];

// Initial Projects Portfolio
const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    slug: "riyadh-towers",
    title_ar: "مشروع إطفاء وإنذار — أبراج الرياض",
    title_en: "Riyadh Towers Fire & Safety Project",
    category_id: "fire-fighting-systems",
    client_name_ar: "شركة التطوير العقاري",
    client_name_en: "Real Estate Development Co.",
    location_ar: "حي العليا، الرياض",
    location_en: "Olaya Dist, Riyadh",
    year: "2025",
    status_ar: "مكتمل وتسليم نهائي",
    status_en: "Completed & Handed Over",
    description_ar: "تنفيذ وتوريد وتركيب كامل أنظمة مكافحة الحريق المائية والمضخات ومباني المراقبة CCTV والإنذار المعنون لبرج تجاري مكون من 28 طابقاً مع اعتماد كافة المخططات لدى الدفاع المدني.",
    description_en: "Turnkey fire protection system, addressable fire alarm, CCTV security, and Civil Defense approvals for a 28-story commercial tower.",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["إطفاء", "كاميرات", "إنذار حريق"],
    is_featured: true,
    is_published: true,
    sort_order: 1
  },
  {
    id: "proj-2",
    slug: "petrochemical-plants",
    title_ar: "أنظمة السلامة والإطفاء — مصانع بتروكيماويات",
    title_en: "Petrochemical Plant Safety Systems",
    category_id: "occupational-safety",
    client_name_ar: "مجموعة الصناعات البتروكيماوية",
    client_name_en: "Petrochemical Industries Group",
    location_ar: "المدينة الصناعية، الجبيل",
    location_en: "Industrial City, Jubail",
    year: "2024",
    status_ar: "مكتمل",
    status_en: "Completed",
    description_ar: "تجهيز مستودعات ومصانع المجمع بنظام الإطفاء الغازي FM200 وأنظمة إنذار السرقة، وتطوير خطط الإخلاء ومعدات السلامة المهنية الشاملة.",
    description_en: "Equipping warehouses with FM200 gas suppression, intrusion detection systems, PPE gear, and emergency evacuation maps.",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["إطفاء", "سلامة", "شبكات"],
    is_featured: true,
    is_published: true,
    sort_order: 2
  },
  {
    id: "proj-3",
    slug: "dammam-medical-center",
    title_ar: "مراقبة وشبكات — المركز الطبي التخصصي",
    title_en: "Dammam Medical CCTV & Network Project",
    category_id: "security-cctv-systems",
    client_name_ar: "مجموعة الرعاية الطبية",
    client_name_en: "Medical Care Group",
    location_ar: "الدمام، المنطقة الشرقية",
    location_en: "Dammam, Eastern Province",
    year: "2025",
    status_ar: "مكتمل",
    status_en: "Completed",
    description_ar: "تأسيس البنية التحتية لشبكة المعلومات للكوابل الضوئية، تركيب 180 كاميرا مراقبة دقيقة، وأنظمة النداء الصوتي ومخاطبة الجمهور للمستشفى.",
    description_en: "Structured fiber networking, installation of 180 high-def CCTV cameras, access control, and Public Address sound systems.",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["كاميرات", "شبكات", "أنظمة صوتية"],
    is_featured: true,
    is_published: true,
    sort_order: 3
  },
  {
    id: "proj-4",
    slug: "khobar-residential-complex",
    title_ar: "مجمع الأبراج السكنية — الخبر",
    title_en: "Khobar Luxury Residential Complex",
    category_id: "elevators-maintenance",
    client_name_ar: "شركة الإعمار الذهبي",
    client_name_en: "Golden Emaar Co.",
    location_ar: "حي الكورنيش، الخبر",
    location_en: "Corniche Dist, Khobar",
    year: "2024",
    status_ar: "عقد صيانة مستمر",
    status_en: "Active Maintenance Contract",
    description_ar: "تحديث وصيانة 12 مصعداً كهربائياً، وتركيب أنظمة إنذار الحريق التلقائي والتأكد من استيفاء متطلبات الدفاع المدني والتراخيص.",
    description_en: "Overhaul & annual maintenance for 12 elevators, coupled with fire alarm installation and safety compliance licensing.",
    image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery_urls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
    ],
    services_used: ["مصاعد", "إطفاء", "عقود صيانة"],
    is_featured: false,
    is_published: true,
    sort_order: 4
  }
];

// Initial Clients List
const INITIAL_CLIENTS = [
  { id: "c-1", name_ar: "أرامكو السعودية", name_en: "Saudi Aramco", logo_url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80", category: "Energy & Oil", is_active: true, sort_order: 1 },
  { id: "c-2", name_ar: "سابك - SABIC", name_en: "SABIC", logo_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80", category: "Industrial", is_active: true, sort_order: 2 },
  { id: "c-3", name_ar: "وزارة الداخلية - الدفاع المدني", name_en: "Ministry of Interior", logo_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80", category: "Government", is_active: true, sort_order: 3 },
  { id: "c-4", name_ar: "مجموعة المطورين العقاريين", name_en: "Real Estate Developers", logo_url: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=300&q=80", category: "Development", is_active: true, sort_order: 4 },
  { id: "c-5", name_ar: "شركة المقاولات الوطنية", name_en: "National Contracting Co.", logo_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=300&q=80", category: "Contracting", is_active: true, sort_order: 5 }
];

// Initial Site Settings
const INITIAL_SETTINGS = {
  hero_title_ar: "الحلول المتكاملة للأنظمة التقنية وأنظمة السلامة في المملكة",
  hero_title_en: "Integrated Solutions for Technical Systems & Safety in the Kingdom",
  hero_subtitle_ar: "نقدم حلولاً استثنائية في أنظمة مكافحة الحريق والإنذار المبكر والسلامة المهنية والأنظمة الأمنية والمراقبة وتقنية المعلومات والمخططات الهندسية من التصميم والتوريد إلى التركيب والصيانة.",
  hero_subtitle_en: "We deliver exceptional turnkey solutions in Fire Protection, Early Warning Alarms, Occupational Safety, CCTV & Security Systems, IT Infrastructure, Audio Systems, and Certified Engineering Drawings.",
  hero_image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1920&q=80",
  hero_slide_1: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1920&q=80",
  hero_slide_2: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
  hero_slide_3: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
  hero_slide_4: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
  about_text_ar: "شركة تقنية الأمان الأولى المحدودة هي شركة سعودية رائدة متخصصة في تقديم أحدث الحلول والأنظمة المتكاملة لمكافحة وإطفاء الحريق، الإنذار المبكر، أجهزة السلامة، الأنظمة الأمنية والمراقبة CCTV، شبكات وتقنية المعلومات، الأنظمة الصوتية، المصاعد، واعتماد المخططات والتقارير الهندسية.",
  about_text_en: "Al-Aman Al-Awal Technology Co. Ltd. is a premier Saudi enterprise specialized in providing complete systems for Fire Fighting, Fire Alarm, Occupational Safety, Security & CCTV, IT Cabling & Networks, Audio Systems, Elevator Maintenance, and Civil Defense accredited engineering drawings.",
  about_image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
  vision_ar: "أن نكون الخيار الأول والقيادي في المملكة العربية السعودية في تقديم حلول السلامة والتقنية والهندسة بأعلى مستويات الابتكار والموثوقية.",
  vision_en: "To be the benchmark leader in the Kingdom of Saudi Arabia for delivering safety, security, engineering, and technology solutions with unmatched reliability.",
  mission_ar: "توفير بيئة آمنة ومحمية للمنشآت والمشاريع من خلال توريد وتركيب وصيانة أحدث أنظمة الحماية والسلامة وفق المعايير الدولية والاشتراطات المحلية.",
  mission_en: "To safeguard assets and lives by engineering, supplying, installing, and maintaining state-of-the-art protection systems adhering to local and global standards.",
  phone: "+966 55 784 5724",
  phone2: "+966 13 820 7277",
  whatsapp: "+966 53 998 8289",
  email: "Info@alamantec.com",
  email2: "alamansmm@gmail.com",
  address_ar: "الدمام — طريق الجبيل الظهران السريع، مبنى 8434",
  address_en: "Dammam — Jubail Dhahran Highway, Building 8434",
  working_hours_ar: "الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً",
  working_hours_en: "Sun - Thu: 8:00 AM - 5:00 PM",
  custom_logo_url: "",
  stat_years: 12,
  stat_projects: 500,
  stat_clients: 250,
  stat_services: 12,
  tiktok_url: "https://www.tiktok.com/@first.safety.tech",
  facebook_url: "https://www.facebook.com/share/19tFof5122/",
  instagram_url: "https://www.instagram.com/alaman.tech/",
  twitter_url: "https://x.com/alamansmm",
  snapchat_url: "https://www.snapchat.com/add/alaman.tec"
};

// Initial Sample Inbox Submissions
const INITIAL_INBOX = [
  {
    id: "msg-1",
    type: "quote",
    full_name: "م. عبد الله الشمري",
    company_name: "شركة الإنشاءات الكبرى",
    email: "a.shammari@constco.sa",
    phone: "0551234567",
    service_slug: "fire-fighting-systems",
    project_type: "مجمع تجاري ومكاتب",
    project_location: "الرياض - حي العارض",
    message: "نحتاج تقديم عرض سعر لمشروع مجمع تجاري بمساحة 8000 متر مربع يشمل شبكة مضخات حريق ورشاشات مائية وعقد صيانة سنوي.",
    status: "New",
    created_at: "2026-09-02T10:15:00Z"
  },
  {
    id: "msg-2",
    type: "contact",
    full_name: "سارة الفهد",
    company_name: "مستشفى الحياة التخصصي",
    email: "sara@lifehospital.sa",
    phone: "0509876543",
    service_slug: "security-cctv-systems",
    project_type: "منشأة صحية",
    project_location: "جدة",
    message: "أود الاستفسار عن إمكانية تحديث كاميرات المراقبة الحالية وترقية نظام التحكم بالدخول في المستشفى.",
    status: "Contacted",
    created_at: "2026-09-01T14:20:00Z"
  }
];

export const DataProvider = ({ children }) => {
  // Services State
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('alaman_services_v5');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // Projects State
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('alaman_projects_v5');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Clients State
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('alaman_clients_v5');
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  // Site Settings State
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('alaman_settings_v5');
      return saved ? { ...INITIAL_SETTINGS, ...JSON.parse(saved) } : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Inbox Messages State
  const [inbox, setInbox] = useState(() => {
    try {
      const saved = localStorage.getItem('alaman_inbox_v5');
      return saved ? JSON.parse(saved) : INITIAL_INBOX;
    } catch {
      return INITIAL_INBOX;
    }
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('alaman_admin_session'));
  });

  // Save to LocalStorage on change with try-catch fallback
  useEffect(() => {
    try {
      localStorage.setItem('alaman_services_v5', JSON.stringify(services));
    } catch (e) {
      console.warn('Failed to save services to localStorage', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('alaman_projects_v5', JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to save projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('alaman_clients_v5', JSON.stringify(clients));
    } catch (e) {
      console.warn('Failed to save clients to localStorage', e);
    }
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem('alaman_settings_v5', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('alaman_inbox_v5', JSON.stringify(inbox));
    } catch (e) {
      console.warn('Failed to save inbox to localStorage', e);
    }
  }, [inbox]);

  // Admin Auth Handlers
  const adminLogin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('alaman_admin_session', 'active_token_' + Date.now());
      setIsAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
  };

  const adminLogout = () => {
    localStorage.removeItem('alaman_admin_session');
    setIsAdminAuthenticated(false);
  };

  // Service CRUD
  const saveService = (serviceData) => {
    if (serviceData.id) {
      setServices(prev => prev.map(s => s.id === serviceData.id ? { ...s, ...serviceData } : s));
    } else {
      const newService = {
        ...serviceData,
        id: "serv-" + Date.now(),
        slug: serviceData.slug || serviceData.title_en.toLowerCase().replace(/\s+/g, '-')
      };
      setServices(prev => [...prev, newService]);
    }
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Project CRUD
  const saveProject = (projectData) => {
    if (projectData.id) {
      setProjects(prev => prev.map(p => p.id === projectData.id ? { ...p, ...projectData } : p));
    } else {
      const newProj = {
        ...projectData,
        id: "proj-" + Date.now(),
        slug: projectData.slug || projectData.title_en.toLowerCase().replace(/\s+/g, '-')
      };
      setProjects(prev => [...prev, newProj]);
    }
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Client CRUD
  const saveClient = (clientData) => {
    if (clientData.id) {
      setClients(prev => prev.map(c => c.id === clientData.id ? { ...c, ...clientData } : c));
    } else {
      const newClient = { ...clientData, id: "c-" + Date.now() };
      setClients(prev => [...prev, newClient]);
    }
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  // Inbox Submission
  const submitInboxMessage = (msgData) => {
    const newMsg = {
      ...msgData,
      id: "msg-" + Date.now(),
      status: "New",
      created_at: new Date().toISOString()
    };
    setInbox(prev => [newMsg, ...prev]);
    return newMsg;
  };

  const updateInboxStatus = (id, newStatus) => {
    setInbox(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const deleteInboxMessage = (id) => {
    setInbox(prev => prev.filter(m => m.id !== id));
  };

  // Update Settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <DataContext.Provider value={{
      services,
      projects,
      clients,
      settings,
      inbox,
      isAdminAuthenticated,
      adminLogin,
      adminLogout,
      saveService,
      deleteService,
      saveProject,
      deleteProject,
      saveClient,
      deleteClient,
      submitInboxMessage,
      updateInboxStatus,
      deleteInboxMessage,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
