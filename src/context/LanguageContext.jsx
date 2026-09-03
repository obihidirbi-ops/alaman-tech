import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  ar: {
    // Navigation
    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    projects: "مشاريعنا",
    clients: "عملاؤنا",
    contact: "تواصل معنا",
    requestQuote: "اطلب عرض سعر",
    adminDashboard: "لوحة التحكم",

    // Hero Section
    heroBadge: "شركة تقنية الأمان الأولى المحدودة — المملكة العربية السعودية",
    heroTitle: "حلول متكاملة للسلامة والأمن والتقنية والهندسة",
    heroSubtitle: "نقدم حلولاً استثنائية في أنظمة مكافحة الحريق والإنذار المبكر والسلامة المهنية والأنظمة الأمنية والمراقبة وتقنية المعلومات والمخططات الهندسية من التصميم والتوريد إلى التركيب والصيانة.",
    heroCtaQuote: "اطلب عرض سعر الآن",
    heroCtaConsultation: "اطلب استشارة هندسية",
    heroCtaWhatsapp: "تواصل عبر واتساب",
    heroBadgeSafety: "معتمدون لدى الدفاع المدني",
    heroBadgeTech: "أحدث التقنيات الذكية",
    heroBadgeQuality: "جودة معيارية ISO",

    // About Teaser & Page
    aboutBadge: "عن شركة الأمان الأولى",
    aboutTitle: "شريككم الموثوق في حماية المنشآت وتأمين البنيات التحتية",
    aboutShortText: "شركة تقنية الأمان الأولى المحدودة هي شركة سعودية رائدة متخصصة في تقديم أحدث الحلول والأنظمة المتكاملة لمكافحة وإطفاء الحريق، الإنذار المبكر، أجهزة السلامة، الأنظمة الأمنية والمراقبة CCTV، شبكات وتقنية المعلومات، الأنظمة الصوتية، المصاعد، واعتماد المخططات والتقارير الهندسية.",
    aboutVisionTitle: "رؤيتنا",
    aboutVisionDesc: "أن نكون الخيار الأول والقيادي في المملكة العربية السعودية في تقديم حلول السلامة والتقنية والهندسة بأعلى مستويات الابتكار والموثوقية.",
    aboutMissionTitle: "رسالتنا",
    aboutMissionDesc: "توفير بيئة آمنة ومحمية للمنشآت والمشاريع من خلال توريد وتركيب وصيانة أحدث أنظمة الحماية والسلامة وفق المعايير الدولية والاشتراطات المحلية.",
    aboutValuesTitle: "قيمنا المؤسسية",
    aboutValue1: "الجودة والامتثال لأعلى المعايير",
    aboutValue2: "السرعة والدقة في الاستجابة والتنفيذ",
    aboutValue3: "الابتكار التقني والتطوير المستمر",
    aboutValue4: "الالتزام التام بالسلامة والاستدامة",
    whyChooseUsTitle: "لماذا تختار شركة تقنية الأمان الأولى؟",

    // Stats Counter Titles
    statYears: "سنوات الخبرة",
    statProjects: "مشروعاً منجزا",
    statClients: "عميلاً وشركة",
    statServices: "قطاع خدمة متكامل",

    // Services Page & Grid
    servicesBadge: "خدماتنا المتميزة",
    servicesTitle: "حلول شاملة ومتكاملة وفق أعلى المعايير",
    servicesSubtitle: "نلبي متطلبات المنشآت التجارية، الصناعية، السكنية، والمجمعات والمؤسسات الحكومية عبر 12 مجالا تخصصياً.",
    viewDetails: "عرض التفاصيل",
    serviceIncludedSystems: "الأنظمة التي تشملها الخدمة:",
    serviceFeatures: "أبرز مميزات الخدمة:",
    serviceScope: "نطاق العمل والتنفيذ:",
    requestThisService: "اطلب عرض سعر لهذه الخدمة",
    relatedServices: "خدمات ذات صلة",

    // Projects Page & Grid
    projectsBadge: "سابقة الأعمال",
    projectsTitle: "مشاريع تفخر بها شركتنا",
    projectsSubtitle: "استعرض أبرز المشاريع التي قمنا بتنفيذ وتجهيز أنظمتها بنجاح عبر المملكة.",
    allCategories: "جميع التصنيفات",
    projectClient: "العميل:",
    projectLocation: "الموقع:",
    projectYear: "سنة التنفيذ:",
    projectStatus: "حالة المشروع:",
    projectServices: "الخدمات المنفذة:",
    viewProject: "تفاصيل المشروع",

    // Clients Page
    clientsBadge: "شركاء النجاح",
    clientsTitle: "عملاؤنا والشركات التي تثق بنا",
    clientsSubtitle: "نفخر بالتعاون مع كبرى الشركات والمؤسسات والمطورين والمقاولين في المملكة.",

    // Forms (Contact & Quote)
    contactTitle: "تواصل معنا اليوم",
    contactSubtitle: "فريقنا الهندسي والفني مستعد للإجابة على جميع استفساراتكم وتقديم الدعم الفني فوراً.",
    quoteTitle: "طلب عرض سعر محدد",
    quoteSubtitle: "قم بتعبئة البيانات أدناه للحصول على عرض سعر دراسة وتوريد وتركيب مخصص لمشروعك.",
    fullName: "الاسم الكامل",
    companyName: "اسم الشركة / المنشأة",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال / الهاتف",
    selectService: "اختر الخدمة المطلوب لها عرض السعر",
    projectType: "نوع المشروع (تجاري، صناعي، سكني، حكومي...)",
    projectLocationLabel: "موقع المشروع (المدينة / المنطقة)",
    messageLabel: "تفاصيل الطلب أو الرسالة",
    fileUploadLabel: "إرفاق كراسة شروط أو مخططات (اختياري)",
    submitRequest: "إرسال الطلب الآن",
    submitting: "جاري الإرسال...",
    formSuccessMsg: "تم استلام طلبك بنجاح، وسيقوم فريقنا الهندسي بالتواصل معك في أقرب وقت.",

    // Contact Details & Footer
    workingHours: "أوقات العمل الرسمي",
    addressTitle: "مقر الشركة والرئيسي",
    phoneTitle: "رقم الهاتف / الجوال",
    emailTitle: "البريد الإلكتروني الرسمي",
    whatsappTitle: "المحادثة الفورية عبر واتساب",
    quickLinks: "روابط سريعة",
    ourServices: "خدمات الشركة",
    copyright: "جميع الحقوق محفوظة © 2026 شركة تقنية الأمان الأولى المحدودة.",

    // Admin Dashboard
    adminTitle: "لوحة تحكم CMS — شركة الأمان الأولى",
    adminLoginTitle: "تسجيل دخول الإدارة",
    adminLoginSubtitle: "يرجى أدخل بيانات الاعتماد للوصول إلى لوحة إدارة المحتوى والرسائل",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    loginBtn: "تسجيل الدخول",
    logoutBtn: "تسجيل الخروج",
    dashboardOverview: "نظرة عامة والإحصائيات",
    manageServices: "إدارة الخدمات",
    manageProjects: "إدارة المشاريع",
    manageClients: "إدارة العملاء",
    manageInbox: "صندوق الوارد والرسائل",
    manageSettings: "إعدادات الموقع المباشرة",
    addNew: "إضافة جديد",
    edit: "تعديل",
    delete: "حذف",
    saveChanges: "حفظ التغييرات",
    cancel: "إلغاء",
    statusNew: "جديد",
    statusContacted: "تم التواصل",
    statusInProgress: "قيد التنفيذ",
    statusCompleted: "مكتمل",
    statusArchived: "مؤرشف",
    noDataFound: "لا توجد بيانات للعرض حالياً",
    actionSuccess: "تمت العملية بنجاح!"
  },
  en: {
    // Navigation
    home: "Home",
    about: "About Us",
    services: "Services",
    projects: "Projects",
    clients: "Clients",
    contact: "Contact Us",
    requestQuote: "Request a Quote",
    adminDashboard: "Admin Dashboard",

    // Hero Section
    heroBadge: "Al-Aman Al-Awal Technology Co. Ltd. — Saudi Arabia",
    heroTitle: "Integrated Solutions for Safety, Security, IT & Engineering",
    heroSubtitle: "We deliver exceptional turnkey solutions in Fire Protection, Early Warning Alarms, Occupational Safety, CCTV & Security Systems, IT Infrastructure, Audio Systems, and Certified Engineering Drawings.",
    heroCtaQuote: "Request a Quote Now",
    heroCtaWhatsapp: "Chat on WhatsApp",
    heroBadgeSafety: "Civil Defense Approved",
    heroBadgeTech: "Smart Next-Gen Tech",
    heroBadgeQuality: "ISO Standardized Quality",

    // About Teaser & Page
    aboutBadge: "About Al-Aman Al-Awal",
    aboutTitle: "Your Trusted Partner in Facility Protection & Infrastructure",
    aboutShortText: "Al-Aman Al-Awal Technology Co. Ltd. is a premier Saudi enterprise specialized in providing complete systems for Fire Fighting, Fire Alarm, Occupational Safety, Security & CCTV, IT Cabling & Networks, Audio Systems, Elevator Maintenance, and Civil Defense accredited engineering drawings.",
    aboutVisionTitle: "Our Vision",
    aboutVisionDesc: "To be the benchmark leader in the Kingdom of Saudi Arabia for delivering safety, security, engineering, and technology solutions with unmatched reliability.",
    aboutMissionTitle: "Our Mission",
    aboutMissionDesc: "To safeguard assets and lives by engineering, supplying, installing, and maintaining state-of-the-art protection systems adhering to local and global standards.",
    aboutValuesTitle: "Core Values",
    aboutValue1: "Quality & Strict Compliance",
    aboutValue2: "Rapid Response & Precision Execution",
    aboutValue3: "Cutting-edge Technical Innovation",
    aboutValue4: "Uncompromising Safety & Sustainability",
    whyChooseUsTitle: "Why Choose Al-Aman Al-Awal Technology?",

    // Stats Counter Titles
    statYears: "Years Experience",
    statProjects: "Projects Delivered",
    statClients: "Trusted Corporate Clients",
    statServices: "Specialized Service Sectors",

    // Services Page & Grid
    servicesBadge: "Our Specialized Services",
    servicesTitle: "Turnkey Engineering & Technical Solutions",
    servicesSubtitle: "Empowering commercial, industrial, residential, and government facilities across 12 core disciplines.",
    viewDetails: "View Details",
    serviceIncludedSystems: "Included Systems & Modules:",
    serviceFeatures: "Key Service Advantages:",
    serviceScope: "Execution & Work Scope:",
    requestThisService: "Request a Quote for this Service",
    relatedServices: "Related Services",

    // Projects Page & Grid
    projectsBadge: "Featured Portfolio",
    projectsTitle: "Engineering Projects We Proudly Executed",
    projectsSubtitle: "Explore our successful implementations across prestigious facilities in Saudi Arabia.",
    allCategories: "All Categories",
    projectClient: "Client:",
    projectLocation: "Location:",
    projectYear: "Execution Year:",
    projectStatus: "Project Status:",
    projectServices: "Implemented Services:",
    viewProject: "View Project",

    // Clients Page
    clientsBadge: "Our Partners & Clients",
    clientsTitle: "Organizations That Rely on Our Expertise",
    clientsSubtitle: "Proudly collaborating with leading developers, contractors, and corporate enterprises.",

    // Forms (Contact & Quote)
    contactTitle: "Get in Touch with Our Engineers",
    contactSubtitle: "Our technical teams are available to address your inquiries and schedule site surveys.",
    quoteTitle: "Request a Tailored Quote",
    quoteSubtitle: "Fill out the project details below to receive a comprehensive technical proposal.",
    fullName: "Full Name",
    companyName: "Company / Enterprise Name",
    email: "Email Address",
    phone: "Mobile / Phone Number",
    selectService: "Select Required Service",
    projectType: "Facility Type (Commercial, Industrial, Residential, Govt...)",
    projectLocationLabel: "Project Location (City / Region)",
    messageLabel: "Project Details & Message",
    fileUploadLabel: "Attach Specifications or Drawings (Optional)",
    submitRequest: "Submit Request Now",
    submitting: "Submitting...",
    formSuccessMsg: "Your request has been received. Our engineering team will get back to you shortly.",

    // Contact Details & Footer
    workingHours: "Working Hours",
    addressTitle: "Headquarters Address",
    phoneTitle: "Direct Phone Number",
    emailTitle: "Official Email Address",
    whatsappTitle: "Instant WhatsApp Chat",
    quickLinks: "Quick Links",
    ourServices: "Our Services",
    copyright: "All Rights Reserved © 2026 Al-Aman Al-Awal Technology Co. Ltd.",

    // Admin Dashboard
    adminTitle: "CMS Admin Dashboard — Al-Aman Al-Awal",
    adminLoginTitle: "Admin Login Portal",
    adminLoginSubtitle: "Enter authorized credentials to manage site content, projects, and inbox inquiries",
    username: "Username",
    password: "Password",
    loginBtn: "Sign In",
    logoutBtn: "Log Out",
    dashboardOverview: "Dashboard Overview",
    manageServices: "Manage Services",
    manageProjects: "Manage Projects",
    manageClients: "Manage Clients",
    manageInbox: "Inbox & Quote Requests",
    manageSettings: "Live Site Settings",
    addNew: "Add New",
    edit: "Edit",
    delete: "Delete",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    statusNew: "New",
    statusContacted: "Contacted",
    statusInProgress: "In Progress",
    statusCompleted: "Completed",
    statusArchived: "Archived",
    noDataFound: "No data available at the moment",
    actionSuccess: "Operation completed successfully!"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('alaman_lang') || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('alaman_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['ar']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
