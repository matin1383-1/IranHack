// Teams Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize teams page
    initTeamsPage();
    
    // Set up event listeners
    setupTeamEventListeners();
    
    // Start real-time updates
    startTeamUpdates();
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

function initTeamsPage() {
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
    
    // Initialize team search
    const searchInput = document.querySelector('input[placeholder*="جستجو"]');
    if (searchInput) {
        searchInput.addEventListener('input', handleTeamSearch);
    }
    
    // Initialize status filter
    const statusFilter = document.querySelector('select');
    if (statusFilter) {
        statusFilter.addEventListener('change', handleStatusFilter);
    }
}

function setupTeamEventListeners() {
    // Create team button
    const createTeamBtn = document.getElementById('create-team-btn');
    if (createTeamBtn) {
        createTeamBtn.addEventListener('click', () => {
            showCreateTeamModal();
        });
    }
    
    // Export teams button
    const exportTeamsBtn = document.getElementById('export-teams-btn');
    if (exportTeamsBtn) {
        exportTeamsBtn.addEventListener('click', () => {
            exportTeamsData();
        });
    }
    
    // Team action buttons
    const teamActionBtns = document.querySelectorAll('button');
    teamActionBtns.forEach(btn => {
        if (btn.textContent.includes('مشاهده جزئیات')) {
            btn.addEventListener('click', handleTeamDetails);
        } else if (btn.textContent.includes('پیام')) {
            btn.addEventListener('click', handleTeamMessage);
        }
    });
}

function handleTeamSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const teamCards = document.querySelectorAll('.border.rounded-xl');
    
    teamCards.forEach(card => {
        const teamName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const teamStatus = card.querySelector('span')?.textContent.toLowerCase() || '';
        
        if (teamName.includes(searchTerm) || teamStatus.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleStatusFilter(event) {
    const selectedStatus = event.target.value;
    const teamCards = document.querySelectorAll('.border.rounded-xl');
    
    teamCards.forEach(card => {
        const statusElement = card.querySelector('span[class*="bg-"]');
        const status = statusElement?.textContent.trim() || '';
        
        if (selectedStatus === 'همه وضعیت‌ها' || status.includes(selectedStatus)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleTeamDetails(event) {
    const teamCard = event.target.closest('.border.rounded-xl');
    const teamName = teamCard.querySelector('h3')?.textContent || 'تیم';
    
    showTeamDetailsModal(teamName);
}

function handleTeamMessage(event) {
    const teamCard = event.target.closest('.border.rounded-xl');
    const teamName = teamCard.querySelector('h3')?.textContent || 'تیم';
    
    showTeamMessageModal(teamName);
}

function showCreateTeamModal() {
    const teamName = prompt('نام تیم جدید را وارد کنید:');
    if (teamName) {
        const teamDescription = prompt('توضیحات تیم (اختیاری):');
        const maxMembers = prompt('حداکثر تعداد اعضا (پیش‌فرض: ۴):') || '4';
        
        // Simulate creating team
        addTeamCard(teamName, teamDescription, maxMembers);
        alert(`تیم "${teamName}" با موفقیت ایجاد شد!`);
    }
}

function showTeamDetailsModal(teamName) {
    const details = `
جزئیات تیم: ${teamName}

• تعداد اعضا: ۴ نفر
• وضعیت: کامل
• تاریخ تشکیل: ۲۱ مهر ۱۴۰۴
• پروژه: سیستم تشخیص چهره هوشمند
• مهارت‌های تیم: Python, Machine Learning, AI, Computer Vision

اعضای تیم:
۱. علی احمدی - دانشجوی کامپیوتر
۲. سارا محمدی - متخصص ML
۳. محمد رضایی - توسعه‌دهنده
۴. فاطمه کریمی - طراح UI/UX
    `;
    
    alert(details);
}

function showTeamMessageModal(teamName) {
    const message = prompt(`پیام به تیم ${teamName}:`);
    if (message) {
        alert(`پیام با موفقیت به تیم ${teamName} ارسال شد!`);
    }
}

function addTeamCard(name, description, maxMembers) {
    const teamsGrid = document.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-3');
    if (teamsGrid) {
        const teamCard = document.createElement('div');
        teamCard.className = 'border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow';
        
        teamCard.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">${name}</h3>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    <span class="w-2 h-2 bg-yellow-500 rounded-full ml-1"></span>
                    در حال تشکیل
                </span>
            </div>
            
            <div class="space-y-3 mb-4">
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span class="text-sm text-slate-600 dark:text-slate-300">۰ عضو</span>
                </div>
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-sm text-slate-600 dark:text-slate-300">منتظر عضو</span>
                </div>
            </div>

            <!-- Team Members -->
            <div class="flex -space-x-2 mb-4">
                <div class="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs">+</div>
                <div class="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs">+</div>
                <div class="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs">+</div>
                <div class="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs">+</div>
            </div>

            <div class="flex gap-2">
                <button class="btn-primary text-xs px-3 py-2 flex-1">مشاهده جزئیات</button>
                <button class="btn-ghost text-xs px-3 py-2">پیام</button>
            </div>
        `;
        
        // Add event listeners to new buttons
        const newButtons = teamCard.querySelectorAll('button');
        newButtons.forEach(btn => {
            if (btn.textContent.includes('مشاهده جزئیات')) {
                btn.addEventListener('click', handleTeamDetails);
            } else if (btn.textContent.includes('پیام')) {
                btn.addEventListener('click', handleTeamMessage);
            }
        });
        
        teamsGrid.appendChild(teamCard);
        
        // Update stats
        updateTeamStats();
    }
}

function updateTeamStats() {
    const totalTeams = document.querySelectorAll('.border.rounded-xl').length;
    const completeTeams = document.querySelectorAll('span:contains("کامل")').length;
    const formingTeams = document.querySelectorAll('span:contains("در حال تشکیل")').length;
    const submittedProjects = document.querySelectorAll('span:contains("پروژه ارسال شده")').length;
    
    // Update counter displays
    const counters = document.querySelectorAll('.text-3xl');
    if (counters.length >= 4) {
        counters[0].textContent = totalTeams.toLocaleString('fa-IR');
        counters[1].textContent = completeTeams.toLocaleString('fa-IR');
        counters[2].textContent = formingTeams.toLocaleString('fa-IR');
        counters[3].textContent = submittedProjects.toLocaleString('fa-IR');
    }
}

function exportTeamsData() {
    const teams = [];
    const teamCards = document.querySelectorAll('.border.rounded-xl');
    
    teamCards.forEach(card => {
        const teamName = card.querySelector('h3')?.textContent || '';
        const status = card.querySelector('span')?.textContent.trim() || '';
        const memberCount = card.querySelector('.text-sm')?.textContent || '';
        
        teams.push({
            name: teamName,
            status: status,
            members: memberCount,
            exportDate: new Date().toLocaleDateString('fa-IR')
        });
    });
    
    const dataStr = JSON.stringify(teams, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'teams-data.json';
    link.click();
    
    URL.revokeObjectURL(url);
    alert('داده‌های تیم‌ها با موفقیت دانلود شدند!');
}

function startTeamUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateTeamStats();
    }, 30000);
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

// Team management functions
function addMemberToTeam(teamName, memberName) {
    // Simulate adding member to team
    console.log(`Adding ${memberName} to team ${teamName}`);
    return true;
}

function removeMemberFromTeam(teamName, memberName) {
    // Simulate removing member from team
    console.log(`Removing ${memberName} from team ${teamName}`);
    return true;
}

function updateTeamStatus(teamName, newStatus) {
    // Simulate updating team status
    console.log(`Updating team ${teamName} status to ${newStatus}`);
    return true;
}

// Export functions for global access
window.teamsManagement = {
    showCreateTeamModal,
    showTeamDetailsModal,
    showTeamMessageModal,
    exportTeamsData,
    addMemberToTeam,
    removeMemberFromTeam,
    updateTeamStatus
};
