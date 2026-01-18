// Application State
const state = {
    currentUser: null,
    incidents: [],
    drinks: [],
    goals: [],
    reminders: [],
    customQuestions: [],
    currentMonth: new Date(),
    dailyTips: [
        "Limit fluids 2-3 hours before bedtime to reduce nighttime accidents.",
        "Empty your bladder right before going to sleep.",
        "Keep a consistent bedtime routine to regulate your body's schedule.",
        "Celebrate dry nights - positive reinforcement helps!",
        "Track your patterns - knowledge is power in managing bedwetting.",
        "Avoid caffeinated drinks in the evening as they stimulate the bladder.",
        "Practice bladder exercises during the day to increase capacity.",
        "Ensure the path to the bathroom is well-lit and clear.",
        "Consider using a bedwetting alarm if recommended by your doctor.",
        "Stay hydrated throughout the day, just reduce intake before bed."
    ]
};

// Local Storage Management
const storage = {
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    load(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadCurrentUser();
});

function initializeApp() {
    // Load data from localStorage
    state.incidents = storage.load('incidents') || [];
    state.drinks = storage.load('drinks') || [];
    state.goals = storage.load('goals') || [];
    state.reminders = storage.load('reminders') || [];
    state.customQuestions = storage.load('customQuestions') || [];
    
    // Set today's date as default for forms
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('incident-date');
    if (dateInput) dateInput.value = today;
}

function loadCurrentUser() {
    state.currentUser = storage.load('currentUser');
    if (state.currentUser) {
        showPage('dashboard-page');
        updateDashboard();
    }
}

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
}

// Event Listeners
function setupEventListeners() {
    // Landing page
    document.getElementById('show-login')?.addEventListener('click', () => showPage('login-page'));
    document.getElementById('show-register')?.addEventListener('click', () => showPage('register-page'));
    document.getElementById('back-to-landing-login')?.addEventListener('click', () => showPage('landing-page'));
    document.getElementById('back-to-landing-register')?.addEventListener('click', () => showPage('landing-page'));
    
    // Auth switching
    document.getElementById('switch-to-register')?.addEventListener('click', () => showPage('register-page'));
    document.getElementById('switch-to-login')?.addEventListener('click', () => showPage('login-page'));
    
    // Forms
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('register-form')?.addEventListener('submit', handleRegister);
    document.getElementById('incident-form')?.addEventListener('submit', handleIncidentSubmit);
    document.getElementById('drink-form')?.addEventListener('submit', handleDrinkSubmit);
    document.getElementById('profile-form')?.addEventListener('submit', handleProfileUpdate);
    document.getElementById('reminder-form')?.addEventListener('submit', handleReminderSubmit);
    document.getElementById('goal-form')?.addEventListener('submit', handleGoalSubmit);
    document.getElementById('question-form')?.addEventListener('submit', handleQuestionSubmit);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const page = e.currentTarget.getAttribute('data-page');
            if (page) {
                showSection(page + '-section');
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Load specific page data
                if (page === 'calendar') renderCalendar();
                if (page === 'drinks') loadTodayDrinks();
                if (page === 'goals') renderGoals();
                if (page === 'profile') loadProfile();
            }
        });
    });
    
    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
    
    // Emoji selection
    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            document.getElementById('mood-value').value = e.currentTarget.getAttribute('data-mood');
        });
    });
    
    // Calendar controls
    document.getElementById('prev-month')?.addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month')?.addEventListener('click', () => changeMonth(1));
    
    // Modals
    document.getElementById('add-reminder-btn')?.addEventListener('click', () => openModal('reminder-modal'));
    document.getElementById('add-goal-btn')?.addEventListener('click', () => openModal('goal-modal'));
    document.getElementById('add-question-btn')?.addEventListener('click', () => openModal('question-modal'));
    
    document.querySelectorAll('.modal .close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });
    
    // Export buttons
    document.getElementById('export-csv')?.addEventListener('click', exportToCSV);
    document.getElementById('export-pdf')?.addEventListener('click', exportToPDF);
    
    // Delete account
    document.getElementById('delete-account-btn')?.addEventListener('click', handleDeleteAccount);
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const users = storage.load('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        state.currentUser = user;
        storage.save('currentUser', user);
        showPage('dashboard-page');
        updateDashboard();
        showNotification('Welcome back!', 'success');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const age = document.getElementById('register-age').value;
    
    const users = storage.load('users') || [];
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        age,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    storage.save('users', users);
    
    state.currentUser = newUser;
    storage.save('currentUser', newUser);
    
    showPage('dashboard-page');
    updateDashboard();
    showNotification('Account created successfully!', 'success');
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        state.currentUser = null;
        storage.remove('currentUser');
        showPage('landing-page');
        showNotification('Logged out successfully', 'success');
    }
}

// Dashboard
function updateDashboard() {
    if (!state.currentUser) return;
    
    document.getElementById('user-name').textContent = state.currentUser.name;
    
    // Display random daily tip
    const randomTip = state.dailyTips[Math.floor(Math.random() * state.dailyTips.length)];
    document.getElementById('daily-tip-text').textContent = randomTip;
    
    // Calculate statistics
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const userIncidents = state.incidents.filter(i => i.userId === state.currentUser.id);
    const weekIncidents = userIncidents.filter(i => new Date(i.date) >= weekAgo);
    const monthIncidents = userIncidents.filter(i => new Date(i.date) >= monthStart);
    
    document.getElementById('stat-week').textContent = weekIncidents.length;
    document.getElementById('stat-month').textContent = monthIncidents.length;
    document.getElementById('stat-dry').textContent = 7 - weekIncidents.length;
    
    // Calculate goal progress
    const goalProgress = calculateGoalProgress();
    document.getElementById('stat-progress').textContent = goalProgress + '%';
    
    // Load reminders
    loadReminders();
}

function calculateGoalProgress() {
    if (state.goals.length === 0) return 0;
    
    const now = new Date();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekIncidents = state.incidents.filter(i => 
        i.userId === state.currentUser.id && new Date(i.date) >= weekStart
    );
    
    const dryNights = 7 - weekIncidents.length;
    const activeGoal = state.goals.find(g => !g.completed);
    
    if (activeGoal) {
        return Math.round((dryNights / activeGoal.target) * 100);
    }
    
    return 0;
}

// Incidents
function handleIncidentSubmit(e) {
    e.preventDefault();
    
    const incident = {
        id: Date.now(),
        userId: state.currentUser.id,
        date: document.getElementById('incident-date').value,
        time: document.getElementById('incident-time').value,
        sleepTime: document.getElementById('sleep-time').value,
        wakeTime: document.getElementById('wake-time').value,
        quantity: document.querySelector('input[name="quantity"]:checked').value,
        smell: document.querySelector('input[name="smell"]:checked').value,
        mood: document.getElementById('mood-value').value,
        notes: document.getElementById('incident-notes').value,
        customAnswers: {},
        createdAt: new Date().toISOString()
    };
    
    // Collect custom question answers
    state.customQuestions.forEach(q => {
        const input = document.getElementById('custom-' + q.id);
        if (input) {
            incident.customAnswers[q.id] = input.value;
        }
    });
    
    state.incidents.push(incident);
    storage.save('incidents', state.incidents);
    
    // Reset form
    document.getElementById('incident-form').reset();
    document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
    
    showNotification('Incident logged successfully', 'success');
    updateDashboard();
}

// Calendar
function renderCalendar() {
    const year = state.currentMonth.getFullYear();
    const month = state.currentMonth.getMonth();
    
    document.getElementById('current-month').textContent = 
        state.currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        header.style.fontWeight = 'bold';
        header.style.textAlign = 'center';
        grid.appendChild(header);
    });
    
    // Previous month days
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = prevLastDay.getDate() - i;
        const dayElement = createCalendarDay(day, true);
        grid.appendChild(dayElement);
    }
    
    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dayElement = createCalendarDay(day, false, date);
        grid.appendChild(dayElement);
    }
    
    // Next month days
    const remainingDays = 42 - (firstDayOfWeek + lastDay.getDate());
    for (let day = 1; day <= remainingDays; day++) {
        const dayElement = createCalendarDay(day, true);
        grid.appendChild(dayElement);
    }
}

function createCalendarDay(day, otherMonth, date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (otherMonth) {
        dayElement.classList.add('other-month');
    }
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayElement.appendChild(dayNumber);
    
    if (date && !otherMonth) {
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        const dateString = date.toISOString().split('T')[0];
        const hasIncident = state.incidents.some(i => 
            i.userId === state.currentUser.id && i.date === dateString
        );
        
        if (hasIncident) {
            dayElement.classList.add('incident');
            const marker = document.createElement('div');
            marker.className = 'incident-marker';
            dayElement.appendChild(marker);
        } else if (date < today) {
            dayElement.classList.add('dry');
        }
        
        dayElement.addEventListener('click', () => showDayDetails(date));
    }
    
    return dayElement;
}

function changeMonth(delta) {
    state.currentMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + delta, 1);
    renderCalendar();
}

function showDayDetails(date) {
    const dateString = date.toISOString().split('T')[0];
    const incident = state.incidents.find(i => 
        i.userId === state.currentUser.id && i.date === dateString
    );
    
    if (incident) {
        alert(`Incident on ${dateString}\n\nQuantity: ${incident.quantity}\nMood: ${incident.mood}\nNotes: ${incident.notes || 'None'}`);
    } else {
        alert(`No incident recorded for ${dateString}`);
    }
}

// Drinks
function handleDrinkSubmit(e) {
    e.preventDefault();
    
    const drink = {
        id: Date.now(),
        userId: state.currentUser.id,
        type: document.getElementById('drink-type').value,
        amount: parseInt(document.getElementById('drink-amount').value),
        time: document.getElementById('drink-time').value,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    };
    
    state.drinks.push(drink);
    storage.save('drinks', state.drinks);
    
    document.getElementById('drink-form').reset();
    loadTodayDrinks();
    showNotification('Drink logged successfully', 'success');
}

function loadTodayDrinks() {
    const today = new Date().toISOString().split('T')[0];
    const todayDrinks = state.drinks.filter(d => 
        d.userId === state.currentUser.id && d.date === today
    );
    
    const container = document.getElementById('drinks-today');
    container.innerHTML = '';
    
    if (todayDrinks.length === 0) {
        container.innerHTML = '<p style="color: #999;">No drinks logged today</p>';
    } else {
        todayDrinks.forEach(drink => {
            const item = document.createElement('div');
            item.className = 'drink-item';
            item.innerHTML = `
                <div class="drink-info">
                    <span class="drink-type">${drink.type}</span>
                    <span>${drink.amount}ml</span>
                    <span>${drink.time}</span>
                </div>
                <button class="btn btn-danger" onclick="deleteDrink(${drink.id})">Delete</button>
            `;
            container.appendChild(item);
        });
    }
    
    const totalIntake = todayDrinks.reduce((sum, d) => sum + d.amount, 0);
    document.getElementById('total-intake').textContent = totalIntake;
}

function deleteDrink(id) {
    if (confirm('Delete this drink?')) {
        state.drinks = state.drinks.filter(d => d.id !== id);
        storage.save('drinks', state.drinks);
        loadTodayDrinks();
        showNotification('Drink deleted', 'success');
    }
}

// Goals
function handleGoalSubmit(e) {
    e.preventDefault();
    
    const goal = {
        id: Date.now(),
        userId: state.currentUser.id,
        title: document.getElementById('goal-title').value,
        target: parseInt(document.getElementById('goal-target').value),
        deadline: document.getElementById('goal-deadline').value,
        progress: 0,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    state.goals.push(goal);
    storage.save('goals', state.goals);
    
    document.getElementById('goal-form').reset();
    closeModal('goal-modal');
    renderGoals();
    showNotification('Goal added successfully', 'success');
}

function renderGoals() {
    const container = document.getElementById('goals-list');
    container.innerHTML = '';
    
    const userGoals = state.goals.filter(g => g.userId === state.currentUser.id);
    
    if (userGoals.length === 0) {
        container.innerHTML = '<p style="color: #999;">No goals set yet. Click "Add New Goal" to get started!</p>';
        return;
    }
    
    userGoals.forEach(goal => {
        // Calculate progress
        const now = new Date();
        const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weekIncidents = state.incidents.filter(i => 
            i.userId === state.currentUser.id && new Date(i.date) >= weekStart
        );
        const dryNights = 7 - weekIncidents.length;
        const progress = Math.min(Math.round((dryNights / goal.target) * 100), 100);
        
        const item = document.createElement('div');
        item.className = 'goal-item';
        item.innerHTML = `
            <div class="goal-header">
                <div class="goal-title">${goal.title}</div>
                <div class="goal-deadline">${goal.deadline ? 'Due: ' + goal.deadline : ''}</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%">${progress}%</div>
            </div>
            <p>Target: ${goal.target} dry nights per week | Current: ${dryNights} dry nights</p>
            <button class="btn btn-danger" onclick="deleteGoal(${goal.id})">Delete Goal</button>
        `;
        container.appendChild(item);
    });
}

function deleteGoal(id) {
    if (confirm('Delete this goal?')) {
        state.goals = state.goals.filter(g => g.id !== id);
        storage.save('goals', state.goals);
        renderGoals();
        showNotification('Goal deleted', 'success');
    }
}

// Reminders
function handleReminderSubmit(e) {
    e.preventDefault();
    
    const reminder = {
        id: Date.now(),
        userId: state.currentUser.id,
        title: document.getElementById('reminder-title').value,
        time: document.getElementById('reminder-time').value,
        repeat: document.getElementById('reminder-repeat').value,
        active: true,
        createdAt: new Date().toISOString()
    };
    
    state.reminders.push(reminder);
    storage.save('reminders', state.reminders);
    
    document.getElementById('reminder-form').reset();
    closeModal('reminder-modal');
    loadReminders();
    showNotification('Reminder added successfully', 'success');
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function loadReminders() {
    const container = document.getElementById('reminders-list');
    container.innerHTML = '';
    
    const userReminders = state.reminders.filter(r => r.userId === state.currentUser.id && r.active);
    
    if (userReminders.length === 0) {
        container.innerHTML = '<p style="color: #999;">No reminders set</p>';
        return;
    }
    
    userReminders.forEach(reminder => {
        const item = document.createElement('div');
        item.className = 'reminder-item';
        item.innerHTML = `
            <div>
                <strong>${reminder.title}</strong>
                <span class="time">${reminder.time}</span>
                <span style="color: #999; font-size: 0.9rem;">(${reminder.repeat})</span>
            </div>
            <button class="btn btn-danger" onclick="deleteReminder(${reminder.id})">Delete</button>
        `;
        container.appendChild(item);
    });
}

function deleteReminder(id) {
    if (confirm('Delete this reminder?')) {
        state.reminders = state.reminders.filter(r => r.id !== id);
        storage.save('reminders', state.reminders);
        loadReminders();
        showNotification('Reminder deleted', 'success');
    }
}

// Custom Questions
function handleQuestionSubmit(e) {
    e.preventDefault();
    
    const question = {
        id: Date.now(),
        userId: state.currentUser.id,
        text: document.getElementById('question-text').value,
        type: document.getElementById('question-type').value,
        createdAt: new Date().toISOString()
    };
    
    state.customQuestions.push(question);
    storage.save('customQuestions', state.customQuestions);
    
    document.getElementById('question-form').reset();
    closeModal('question-modal');
    loadCustomQuestions();
    updateIncidentFormQuestions();
    showNotification('Custom question added', 'success');
}

function loadCustomQuestions() {
    const container = document.getElementById('custom-questions-list');
    container.innerHTML = '';
    
    const userQuestions = state.customQuestions.filter(q => q.userId === state.currentUser.id);
    
    if (userQuestions.length === 0) {
        container.innerHTML = '<p style="color: #999;">No custom questions added</p>';
        return;
    }
    
    userQuestions.forEach(question => {
        const item = document.createElement('div');
        item.className = 'question-item';
        item.innerHTML = `
            <div>
                <strong>${question.text}</strong>
                <span style="color: #999; font-size: 0.9rem;">(${question.type})</span>
            </div>
            <button class="btn btn-danger" onclick="deleteQuestion(${question.id})">Delete</button>
        `;
        container.appendChild(item);
    });
}

function deleteQuestion(id) {
    if (confirm('Delete this custom question?')) {
        state.customQuestions = state.customQuestions.filter(q => q.id !== id);
        storage.save('customQuestions', state.customQuestions);
        loadCustomQuestions();
        updateIncidentFormQuestions();
        showNotification('Question deleted', 'success');
    }
}

function updateIncidentFormQuestions() {
    const container = document.getElementById('custom-questions');
    container.innerHTML = '';
    
    const userQuestions = state.customQuestions.filter(q => q.userId === state.currentUser.id);
    
    userQuestions.forEach(question => {
        const group = document.createElement('div');
        group.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = question.text;
        group.appendChild(label);
        
        let input;
        if (question.type === 'text') {
            input = document.createElement('input');
            input.type = 'text';
        } else if (question.type === 'number') {
            input = document.createElement('input');
            input.type = 'number';
        } else if (question.type === 'yes-no') {
            input = document.createElement('select');
            input.innerHTML = '<option value="yes">Yes</option><option value="no">No</option>';
        }
        
        input.id = 'custom-' + question.id;
        group.appendChild(input);
        container.appendChild(group);
    });
}

// Profile
function loadProfile() {
    if (!state.currentUser) return;
    
    document.getElementById('profile-name').value = state.currentUser.name;
    document.getElementById('profile-email').value = state.currentUser.email;
    document.getElementById('profile-age').value = state.currentUser.age || '';
    
    loadCustomQuestions();
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    state.currentUser.name = document.getElementById('profile-name').value;
    state.currentUser.email = document.getElementById('profile-email').value;
    state.currentUser.age = document.getElementById('profile-age').value;
    
    // Update in users list
    const users = storage.load('users') || [];
    const userIndex = users.findIndex(u => u.id === state.currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = state.currentUser;
        storage.save('users', users);
    }
    
    storage.save('currentUser', state.currentUser);
    updateDashboard();
    showNotification('Profile updated successfully', 'success');
}

function handleDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('All your data will be permanently deleted. Continue?')) {
            // Remove user data
            const users = storage.load('users') || [];
            const updatedUsers = users.filter(u => u.id !== state.currentUser.id);
            storage.save('users', updatedUsers);
            
            // Remove user-specific data
            state.incidents = state.incidents.filter(i => i.userId !== state.currentUser.id);
            state.drinks = state.drinks.filter(d => d.userId !== state.currentUser.id);
            state.goals = state.goals.filter(g => g.userId !== state.currentUser.id);
            state.reminders = state.reminders.filter(r => r.userId !== state.currentUser.id);
            state.customQuestions = state.customQuestions.filter(q => q.userId !== state.currentUser.id);
            
            storage.save('incidents', state.incidents);
            storage.save('drinks', state.drinks);
            storage.save('goals', state.goals);
            storage.save('reminders', state.reminders);
            storage.save('customQuestions', state.customQuestions);
            
            storage.remove('currentUser');
            state.currentUser = null;
            
            showPage('landing-page');
            showNotification('Account deleted successfully', 'success');
        }
    }
}

// Export Functions
function exportToCSV() {
    const userIncidents = state.incidents.filter(i => i.userId === state.currentUser.id);
    
    if (userIncidents.length === 0) {
        alert('No incidents to export');
        return;
    }
    
    let csv = 'Date,Time,Sleep Time,Wake Time,Quantity,Smell,Mood,Notes\n';
    
    userIncidents.forEach(incident => {
        csv += `${incident.date},${incident.time},${incident.sleepTime || ''},${incident.wakeTime || ''},${incident.quantity},${incident.smell},${incident.mood},"${incident.notes || ''}"\n`;
    });
    
    downloadFile(csv, 'bedwetting-data.csv', 'text/csv');
    showNotification('Data exported successfully', 'success');
}

function exportToPDF() {
    const userIncidents = state.incidents.filter(i => i.userId === state.currentUser.id);
    
    if (userIncidents.length === 0) {
        alert('No incidents to export');
        return;
    }
    
    let html = `
        <html>
        <head>
            <title>Bedwetting Report</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #4a90e2; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #4a90e2; color: white; }
            </style>
        </head>
        <body>
            <h1>BeDrop - Bedwetting Report</h1>
            <p>Generated for: ${state.currentUser.name}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Quantity</th>
                    <th>Mood</th>
                    <th>Notes</th>
                </tr>
    `;
    
    userIncidents.forEach(incident => {
        html += `
            <tr>
                <td>${incident.date}</td>
                <td>${incident.time}</td>
                <td>${incident.quantity}</td>
                <td>${incident.mood}</td>
                <td>${incident.notes || '-'}</td>
            </tr>
        `;
    });
    
    html += `
            </table>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
    
    showNotification('Opening print dialog for PDF export', 'success');
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
