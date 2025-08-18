// Participant Teams Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize participant teams page
    initParticipantTeamsPage();
    
    // Set up event listeners
    setupParticipantTeamEventListeners();
    
    // Start real-time updates
    startParticipantTeamUpdates();
});

function initParticipantTeamsPage() {
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

function setupParticipantTeamEventListeners() {
    // Create team button
    const createTeamBtn = document.getElementById('create-team-btn');
    if (createTeamBtn) {
        createTeamBtn.addEventListener('click', () => {
            showCreateTeamModal();
        });
    }
    
    // Join team button
    const joinTeamBtn = document.getElementById('join-team-btn');
    if (joinTeamBtn) {
        joinTeamBtn.addEventListener('click', () => {
            showJoinTeamModal();
        });
    }
    
    // Create my team button
    const createMyTeamBtn = document.getElementById('create-my-team-btn');
    if (createMyTeamBtn) {
        createMyTeamBtn.addEventListener('click', () => {
            showCreateTeamModal();
        });
    }
    
    // Leave team button
    const leaveTeamBtn = document.getElementById('leave-team-btn');
    if (leaveTeamBtn) {
        leaveTeamBtn.addEventListener('click', () => {
            showLeaveTeamModal();
        });
    }
    
    // Team action buttons
    const teamActionBtns = document.querySelectorAll('button');
    teamActionBtns.forEach(btn => {
        if (btn.textContent.includes('پیوستن به تیم')) {
            btn.addEventListener('click', handleJoinTeam);
        } else if (btn.textContent.includes('مشاهده جزئیات')) {
            btn.addEventListener('click', handleTeamDetails);
        } else if (btn.textContent.includes('چت تیم')) {
            btn.addEventListener('click', handleTeamChat);
        }
    });
}

function handleTeamSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const teamCards = document.querySelectorAll('.border.rounded-xl');
    
    teamCards.forEach(card => {
        const teamName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const teamDescription = card.querySelector('p')?.textContent.toLowerCase() || '';
        
        if (teamName.includes(searchTerm) || teamDescription.includes(searchTerm)) {
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
        
        if (selectedStatus === 'همه تیم‌ها' || status.includes(selectedStatus)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleJoinTeam(event) {
    const teamCard = event.target.closest('.border.rounded-xl');
    const teamName = teamCard.querySelector('h3')?.textContent || 'تیم';
    
    showJoinTeamConfirmation(teamName);
}

function handleTeamDetails(event) {
    const teamCard = event.target.closest('.border.rounded-xl');
    const teamName = teamCard.querySelector('h3')?.textContent || 'تیم';
    
    showTeamDetailsModal(teamName);
}

function handleTeamChat(event) {
    const teamName = 'تیم شما'; // This would be the user's team name
    showTeamChatModal(teamName);
}

function showCreateTeamModal() {
    const teamName = prompt('نام تیم جدید را وارد کنید:');
    if (teamName) {
        const teamDescription = prompt('توضیحات تیم (اختیاری):');
        const maxMembers = prompt('حداکثر تعداد اعضا (پیش‌فرض: ۴):') || '4';
        
        // Simulate creating team
        createTeam(teamName, teamDescription, maxMembers);
        alert(`تیم "${teamName}" با موفقیت ایجاد شد!`);
        
        // Update UI to show user is now in a team
        updateUserTeamStatus(teamName);
    }
}

function showJoinTeamModal() {
    const availableTeams = getAvailableTeams();
    if (availableTeams.length === 0) {
        alert('هیچ تیم بازی برای پیوستن وجود ندارد.');
        return;
    }
    
    const teamList = availableTeams.map(team => `${team.name} (${team.currentMembers}/${team.maxMembers} عضو)`).join('\n');
    const selectedTeam = prompt(`تیم مورد نظر خود را انتخاب کنید:\n\n${teamList}\n\nنام تیم را وارد کنید:`);
    
    if (selectedTeam) {
        const team = availableTeams.find(t => t.name.includes(selectedTeam));
        if (team) {
            showJoinTeamConfirmation(team.name);
        } else {
            alert('تیم مورد نظر یافت نشد.');
        }
    }
}

function showJoinTeamConfirmation(teamName) {
    const confirmed = confirm(`آیا می‌خواهید به تیم "${teamName}" بپیوندید؟`);
    if (confirmed) {
        joinTeam(teamName);
        alert(`با موفقیت به تیم "${teamName}" پیوستید!`);
        
        // Update UI to show user is now in a team
        updateUserTeamStatus(teamName);
    }
}

function showLeaveTeamModal() {
    const confirmed = confirm('آیا مطمئن هستید که می‌خواهید از تیم خود خارج شوید؟');
    if (confirmed) {
        leaveTeam();
        alert('با موفقیت از تیم خارج شدید.');
        
        // Update UI to show user is no longer in a team
        updateUserTeamStatus(null);
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

function showTeamChatModal(teamName) {
    alert(`چت تیم ${teamName} - این قابلیت در حال توسعه است`);
}

function createTeam(name, description, maxMembers) {
    // Simulate creating team
    console.log(`Creating team: ${name}, Description: ${description}, Max Members: ${maxMembers}`);
    return true;
}

function joinTeam(teamName) {
    // Simulate joining team
    console.log(`Joining team: ${teamName}`);
    return true;
}

function leaveTeam() {
    // Simulate leaving team
    console.log('Leaving current team');
    return true;
}

function getAvailableTeams() {
    // Simulate getting available teams
    return [
        { name: 'تیم ML Masters', currentMembers: 2, maxMembers: 4 },
        { name: 'تیم Security Squad', currentMembers: 1, maxMembers: 4 },
        { name: 'تیم Data Wizards', currentMembers: 3, maxMembers: 4 }
    ];
}

function updateUserTeamStatus(teamName) {
    const noTeamSection = document.getElementById('no-team-section');
    const myTeamSection = document.getElementById('my-team-section');
    
    if (teamName) {
        // User is now in a team
        if (noTeamSection) noTeamSection.classList.add('hidden');
        if (myTeamSection) {
            myTeamSection.classList.remove('hidden');
            // Update team name in the section
            const teamNameElement = myTeamSection.querySelector('h3');
            if (teamNameElement) {
                teamNameElement.textContent = teamName;
            }
        }
    } else {
        // User is no longer in a team
        if (noTeamSection) noTeamSection.classList.remove('hidden');
        if (myTeamSection) myTeamSection.classList.add('hidden');
    }
}

function startParticipantTeamUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateTeamAvailability();
    }, 30000);
}

function updateTeamAvailability() {
    // Simulate updating team availability
    console.log('Updating team availability...');
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
function getCurrentUserTeam() {
    // Simulate getting current user's team
    return null; // or team object if user is in a team
}

function canJoinTeam(teamName) {
    // Simulate checking if user can join team
    return true;
}

// Export functions for global access
window.participantTeamsManagement = {
    showCreateTeamModal,
    showJoinTeamModal,
    showTeamDetailsModal,
    showTeamChatModal,
    joinTeam,
    leaveTeam,
    createTeam,
    updateUserTeamStatus
};
