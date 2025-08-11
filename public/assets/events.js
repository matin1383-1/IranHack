(function () {
  // Shared dataset of events used by tags.html (and can be reused elsewhere)
  // Keep this list in sync with cards on hackathons.html and index.html
  const events = [
    {
      id: 'ai-tehran',
      title: 'هکاتون هوش مصنوعی تهران',
      badge: 'آنلاین',
      dateText: '۲۱ مهر ۱۴۰۴ • ۴۸ ساعت • جایزه ۵۰۰ میلیون ریال',
      tags: ['AI', 'Data', 'Student'],
      link: './event.html'
    },
    {
      id: 'fintech-shiraz',
      title: 'هکاتون فین‌تک شیراز',
      badge: 'حضوری',
      dateText: '۲۸ مهر ۱۴۰۴ • ۷۲ ساعت • جایزه ۳۰۰ میلیون ریال',
      tags: ['FinTech', 'Payments'],
      link: './event.html'
    },
    {
      id: 'web3-isfahan',
      title: 'هکاتون وب۳ اصفهان',
      badge: 'حضوری',
      dateText: '۵ آبان ۱۴۰۴ • ۳۶ ساعت • جایزه ۲۰۰ میلیون ریال',
      tags: ['Web3', 'Solidity'],
      link: './event.html'
    },
    {
      id: 'security-mashhad',
      title: 'هکاتون امنیت سایبری مشهد',
      badge: 'آنلاین',
      dateText: '۱۲ آبان ۱۴۰۴ • ۲۴ ساعت • جایزه ۴۰۰ میلیون ریال',
      tags: ['Security', 'Penetration', 'CTF'],
      link: './event.html'
    },
    {
      id: 'health-tabriz',
      title: 'هکاتون سلامت دیجیتال تبریز',
      badge: 'حضوری',
      dateText: '۱۹ آبان ۱۴۰۴ • ۴۸ ساعت • جایزه ۳۵۰ میلیون ریال',
      tags: ['HealthTech', 'IoT', 'Medical'],
      link: './event.html'
    },
    {
      id: 'edtech-karaj',
      title: 'هکاتون آموزش آنلاین کرج',
      badge: 'آنلاین',
      dateText: '۲۶ آبان ۱۴۰۴ • ۳۶ ساعت • جایزه ۲۵۰ میلیون ریال',
      tags: ['EdTech', 'LMS', 'Student'],
      link: './event.html'
    },
    {
      id: 'tourism-yazd',
      title: 'هکاتون گردشگری هوشمند یزد',
      badge: 'حضوری',
      dateText: '۳ آذر ۱۴۰۴ • ۴۸ ساعت • جایزه ۳۰۰ میلیون ریال',
      tags: ['Tourism', 'AR/VR', 'Mobile'],
      link: './event.html'
    },
    {
      id: 'green-qazvin',
      title: 'هکاتون انرژی سبز قزوین',
      badge: 'آنلاین',
      dateText: '۱۰ آذر ۱۴۰۴ • ۷۲ ساعت • جایزه ۵۰۰ میلیون ریال',
      tags: ['GreenTech', 'IoT', 'Sustainability'],
      link: './event.html'
    },
    {
      id: 'gamedev-ahvaz',
      title: 'هکاتون بازی‌سازی اهواز',
      badge: 'حضوری',
      dateText: '۱۷ آذر ۱۴۰۴ • ۴۸ ساعت • جایزه ۴۰۰ میلیون ریال',
      tags: ['GameDev', 'Unity', 'Student'],
      link: './event.html'
    },
    {
      id: 'iot-urmia',
      title: 'هکاتون اینترنت اشیاء ارومیه',
      badge: 'آنلاین',
      dateText: '۲۴ آذر ۱۴۰۴ • ۳۶ ساعت • جایزه ۲۵۰ میلیون ریال',
      tags: ['IoT', 'Hardware', 'Embedded'],
      link: './event.html'
    },
    {
      id: 'startup-student-tehran',
      title: 'هکاتون استارتاپ‌های دانشجویی تهران',
      badge: 'حضوری',
      dateText: '۱ دی ۱۴۰۴ • ۷۲ ساعت • جایزه ۶۰۰ میلیون ریال',
      tags: ['Startup', 'Student', 'Innovation'],
      link: './event.html'
    },
    {
      id: 'ai-music-shiraz',
      title: 'هکاتون هوش مصنوعی و موسیقی شیراز',
      badge: 'آنلاین',
      dateText: '۸ دی ۱۴۰۴ • ۲۴ ساعت • جایزه ۲۰۰ میلیون ریال',
      tags: ['AI', 'Music', 'Creative'],
      link: './event.html'
    },
    {
      id: 'smartcity-isfahan',
      title: 'هکاتون شهر هوشمند اصفهان',
      badge: 'حضوری',
      dateText: '۱۵ دی ۱۴۰۴ • ۴۸ ساعت • جایزه ۴۵۰ میلیون ریال',
      tags: ['SmartCity', 'IoT', 'Infrastructure'],
      link: './event.html'
    },
    {
      id: 'blockchain-nft-mashhad',
      title: 'هکاتون بلاکچین و NFT مشهد',
      badge: 'آنلاین',
      dateText: '۲۲ دی ۱۴۰۴ • ۳۶ ساعت • جایزه ۳۵۰ میلیون ریال',
      tags: ['Blockchain', 'NFT', 'Web3'],
      link: './event.html'
    }
  ];

  window.IranHackEvents = events;
})();


