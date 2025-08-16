// Hackathon Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize dashboard
    initDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start real-time updates
    startRealTimeUpdates();
});

function initTheme() {
    const root = document.documentElement;
    
    // Theme init: respect saved preference or system
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}

function initDashboard() {
    // Initialize theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialize mobile menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu');
    
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            mobileMenuOverlay.classList.add('open');
            document.body.classList.add('menu-open');
        });
    }
    
    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Initialize participant search
    const searchInput = document.querySelector('input[placeholder*="جستجو"]');
    if (searchInput) {
        searchInput.addEventListener('input', handleParticipantSearch);
    }
    
    // Initialize status filter
    const statusFilter = document.querySelector('select');
    if (statusFilter) {
        statusFilter.addEventListener('change', handleStatusFilter);
    }
}

function setupEventListeners() {
    // Create event button
    const createEventBtn = document.getElementById('create-event-btn');
    if (createEventBtn) {
        createEventBtn.addEventListener('click', () => {
            alert('ایجاد هکاتون جدید - این قابلیت در حال توسعه است');
        });
    }
    
    // Export button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportHackathonData();
        });
    }
    
    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.btn-primary, .btn-ghost');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', handleQuickAction);
    });
    
    // Participant management buttons
    const participantBtns = document.querySelectorAll('button[class*="btn-"]');
    participantBtns.forEach(btn => {
        if (btn.textContent.includes('مشاهده') || btn.textContent.includes('پیام')) {
            btn.addEventListener('click', handleParticipantAction);
        }
    });
}

function handleParticipantSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        const name = row.querySelector('h4')?.textContent.toLowerCase() || '';
        const email = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
        
        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function handleStatusFilter(event) {
    const selectedStatus = event.target.value;
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        const statusElement = row.querySelector('span[class*="bg-"]');
        const status = statusElement?.textContent.trim() || '';
        
        if (selectedStatus === 'همه وضعیت‌ها' || status.includes(selectedStatus)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function handleQuickAction(event) {
    const buttonText = event.target.textContent.trim();
    
    switch (buttonText) {
        case 'ارسال پیام عمومی':
            showMessageModal();
            break;
        case 'مشاهده آمار کامل':
            showStatisticsModal();
            break;
        case 'مشاهده پروژه‌ها':
            showProjectsModal();
            break;
        case 'ویرایش هکاتون':
            showEditHackathonModal();
            break;
        default:
            console.log('Action not implemented:', buttonText);
    }
}

function handleParticipantAction(event) {
    const buttonText = event.target.textContent.trim();
    const row = event.target.closest('tr');
    const participantName = row.querySelector('h4')?.textContent || 'شرکت‌کننده';
    
    if (buttonText === 'مشاهده') {
        showParticipantDetails(participantName);
    } else if (buttonText === 'پیام') {
        showMessageToParticipant(participantName);
    }
}

function showMessageModal() {
    const message = prompt('پیام عمومی خود را وارد کنید:');
    if (message) {
        // Simulate sending message
        addActivityLog('پیام عمومی ارسال شد', 'message');
        alert('پیام با موفقیت ارسال شد!');
    }
}

function showStatisticsModal() {
    alert('آمار کامل هکاتون:\n\n' +
          '• کل شرکت‌کنندگان: ۱۲۴ نفر\n' +
          '• تیم‌های تشکیل شده: ۲۸ تیم\n' +
          '• پروژه‌های ارسال شده: ۱۸ پروژه\n' +
          '• زمان باقی‌مانده: ۱۸ ساعت و ۴۵ دقیقه');
}

function showProjectsModal() {
    alert('پروژه‌های ارسال شده:\n\n' +
          '۱. سیستم تشخیص چهره هوشمند - تیم AI Pioneers\n' +
          '۲. پلتفرم تحلیل داده‌های پزشکی - تیم Data Wizards\n' +
          '۳. ربات چت هوشمند - تیم ML Masters');
}

function showEditHackathonModal() {
    alert('ویرایش هکاتون - این قابلیت در حال توسعه است');
}

function showParticipantDetails(name) {
    alert(`جزئیات شرکت‌کننده: ${name}\n\n` +
          '• وضعیت: فعال\n' +
          '• تیم: AI Pioneers\n' +
          '• مهارت‌ها: Python, Machine Learning, AI\n' +
          '• تجربه: ۳ سال');
}

function showMessageToParticipant(name) {
    const message = prompt(`پیام به ${name}:`);
    if (message) {
        addActivityLog(`پیام به ${name} ارسال شد`, 'message');
        alert('پیام با موفقیت ارسال شد!');
    }
}

function addActivityLog(message, type) {
    const activityContainer = document.querySelector('.space-y-4');
    if (activityContainer) {
        const activityItem = document.createElement('div');
        activityItem.className = 'flex items-start gap-3';
        
        const colors = {
            message: 'bg-blue-500',
            participant: 'bg-emerald-500',
            team: 'bg-purple-500',
            project: 'bg-yellow-500'
        };
        
        activityItem.innerHTML = `
            <div class="w-2 h-2 ${colors[type] || 'bg-gray-500'} rounded-full mt-2"></div>
            <div>
                <p class="text-sm text-slate-900 dark:text-slate-100">${message}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">همین الان</p>
            </div>
        `;
        
        activityContainer.insertBefore(activityItem, activityContainer.firstChild);
    }
}

function exportHackathonData() {
    const data = {
        hackathon: 'هکاتون هوش مصنوعی تهران',
        participants: 124,
        teams: 28,
        projects: 18,
        exportDate: new Date().toLocaleDateString('fa-IR')
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hackathon-data.json';
    link.click();
    
    URL.revokeObjectURL(url);
    alert('داده‌ها با موفقیت دانلود شدند!');
}

function startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateCounters();
        updateTimeline();
    }, 30000);
}

function updateCounters() {
    // Simulate counter updates
    const counters = document.querySelectorAll('.text-3xl');
    counters.forEach(counter => {
        const currentValue = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = Math.floor(Math.random() * 3) + 1;
        counter.textContent = (currentValue + increment).toLocaleString('fa-IR');
    });
}

function updateTimeline() {
    // Update remaining time
    const timeElement = document.querySelector('.text-3xl:last-of-type');
    if (timeElement && timeElement.textContent.includes(':')) {
        const [hours, minutes] = timeElement.textContent.split(':').map(Number);
        let newMinutes = minutes - 1;
        let newHours = hours;
        
        if (newMinutes < 0) {
            newMinutes = 59;
            newHours--;
        }
        
        if (newHours >= 0) {
            timeElement.textContent = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
        }
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
}

// Utility functions
function formatNumber(num) {
    return num.toLocaleString('fa-IR');
}

function formatTime(hours, minutes) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Export functions for global access
window.hackathonDashboard = {
    showMessageModal,
    showStatisticsModal,
    showProjectsModal,
    exportHackathonData,
    addActivityLog
};
