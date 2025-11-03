const buttons = document.querySelectorAll('.earn-methods button');

function setActive(button) {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Watch Earn Page
const earnYt = document.getElementById('earn-yt');
const sponsoredAd = document.getElementById('sponsored-ad');
const visitWeb = document.getElementById('visit-web');

if (earnYt && sponsoredAd && visitWeb) {
    earnYt.addEventListener('click', function() {
        setActive(this);
        document.getElementsByClassName('watch-youtube-frame')[0].style.display = 'flex';
        document.getElementsByClassName('watch-ads-frame')[0].style.display = 'none';
        document.getElementsByClassName('visit-websites-frame')[0].style.display = 'none';
    });

    sponsoredAd.addEventListener('click', function() {
        setActive(this);
        document.getElementsByClassName('watch-youtube-frame')[0].style.display = 'none';
        document.getElementsByClassName('watch-ads-frame')[0].style.display = 'flex';
        document.getElementsByClassName('visit-websites-frame')[0].style.display = 'none';
    });

    visitWeb.addEventListener('click', function() {
        setActive(this);
        document.getElementsByClassName('watch-youtube-frame')[0].style.display = 'none';
        document.getElementsByClassName('watch-ads-frame')[0].style.display = 'none';
        document.getElementsByClassName('visit-websites-frame')[0].style.display = 'flex';
    });
}

// Menu functions
const currentPage = window.location.pathname.split("/").pop();
const menuLinks = document.querySelectorAll(".menu-buttons a");

menuLinks.forEach(link => {
if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
}
});

// Left Menu
const menuToggle = document.getElementById('menu-btn');
const leftMenu = document.getElementById('left-menu');

function toggleMenu() {
    leftMenu.classList.toggle('open'); // slide in/out
}

menuToggle.addEventListener('click', toggleMenu);

document.addEventListener('click', function(e) {
    if (leftMenu.classList.contains('open')) {
        if (!leftMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            leftMenu.classList.remove('open');
        }
    }
});

// Wallet and Profile Navigation
document.getElementById("balanceNav").addEventListener("click", function() {
    window.location.href = "wallet.html";
});

document.getElementById("photoTopBar").addEventListener("click", function() {
    window.location.href = "profile.html";
});

function updateBalance(amount) {
    const formatted = `$${amount.toFixed(2)}`;
    const balanceNav = document.getElementById('balanceNav');
    if (balanceNav) balanceNav.textContent = formatted;

    const path = window.location.pathname;

    if (path.includes('wallet.html')) {
        const walletBalance = document.getElementById('wallet-balance');
        if (walletBalance) walletBalance.textContent = formatted;
    }

    if (path.includes('dashboard.html')) {
        const dashboardBalance = document.getElementById('wallet-balance');
        if (dashboardBalance) dashboardBalance.textContent = formatted;
    }
}

updateBalance(10.74); 
function showMessage(message, callback) {
  const overlay = document.getElementById("messageOverlay");
  const messageText = overlay.querySelector("p");
  const okBtn = document.getElementById("okBtn");

  messageText.textContent = message;
  overlay.style.display = "flex";

  okBtn.onclick = () => {
    overlay.style.display = "none";
    if (typeof callback === "function") callback();
  };
}

// Dashbord Functions
if (window.location.pathname.endsWith("dashboard.html")) {
    // Statistics Chart
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
        data: [100, 400, 150, 300, 550, 0, 700],
        borderColor: '#00FF84',
        backgroundColor: 'rgba(0, 255, 132, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 3, // size of the point
        pointHoverRadius: 5 // size when hovered
        }]
    },
    options: {
        maintainAspectRatio: false,
        interaction: {
        mode: 'index',   // 🟢 show tooltip for vertical line
        intersect: false // 🟢 triggers even if not exactly on point
        },
        plugins: {
        legend: { display: false },
        tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#00FF84',
            bodyColor: '#fff',
            borderWidth: 1,
            borderColor: '#00FF84',
            padding: 3,
            callbacks: {
            label: (context) => `Earned: ${context.parsed.y} GNC`
            }
        }
        },
        scales: {
        x: { ticks: { color: '#94a3b8' } },
        y: { ticks: { color: '#94a3b8' }, beginAtZero: true }
        }
    }
    });
    // Recent Activities
    function new_recent_activity(infoText) {
    const container = document.querySelector('.recents-container');

    const item = document.createElement('div');
    item.className = 'recent-item';

    const info = document.createElement('span');
    info.className = 'info';
    info.textContent = infoText;

    const time = document.createElement('span');
    time.className = 'time';
    const now = new Date();
    time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    item.appendChild(info);
    item.appendChild(time);

    container.prepend(item); 
}

    new_recent_activity('5$ withdrawn completed');


}
// Profile Functions
if (window.location.pathname.endsWith("profile.html")) {
  const textarea = document.getElementById("profile-bio");
  const counter = document.getElementById("counter");

  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length} / 150`;
    });
  }
}

// Wallet Functions
if (window.location.pathname.endsWith("wallet.html")) {
    
    const ctx = document.getElementById('myChart');
    const select = document.getElementById('select-time');

    // Create chart
    const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
        data: [100, 400, 150, 300, 550, 0, 700],
        borderColor: '#00FF84',
        backgroundColor: 'rgba(0, 255, 132, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5
        }]
    },
    options: {
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
        legend: { display: false },
        tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#00FF84',
            bodyColor: '#fff',
            borderWidth: 1,
            borderColor: '#00FF84',
            padding: 3,
            callbacks: {
            label: (context) => `Earned: ${context.parsed.y} GNC`
            }
        }
        },
        scales: {
        x: { ticks: { color: '#94a3b8' } },
        y: { ticks: { color: '#94a3b8' }, beginAtZero: true }
        }
    }
    });

    // Change chart data based on select value
    select.addEventListener('change', () => {
    if (select.value === 'this-week') {
        chart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        chart.data.datasets[0].data = [100, 400, 150, 300, 550, 0, 700];
    } else if (select.value === 'this-month') {
        chart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        chart.data.datasets[0].data = [500, 700, 300, 800];
    } else if (select.value === 'this-year') {
        chart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        chart.data.datasets[0].data = [800, 900, 700, 1200, 1100, 950, 1300];
    } else if (select.value === 'all-time') {
        chart.data.labels = ['2021', '2022', '2023', '2024', '2025'];
        chart.data.datasets[0].data = [200, 600, 900, 1500, 2100];
    }

    chart.update();
    });

}
// Chat Functions

if (window.location.pathname.endsWith("chat.html")) {
    const messages = [
        "Welcome to the chat! Please be respectful and kind to everyone here. Avoid using rude or offensive words. Let’s keep this place fun, friendly, and positive for all.",
        "Remember to stay polite while chatting. Everyone deserves respect, no matter where they’re from. Don’t use hate speech or spam messages. Enjoy connecting with others responsibly.",
        "This chat is for friendly conversations and meeting new people. Be respectful, and think before you send a message. Offensive or hurtful comments won’t be tolerated. Let’s make this a space everyone enjoys.",
        "Please respect others in this chat. Keep your messages kind, avoid negativity, and enjoy your time here with friendly conversations."
    ];
    const countryButtons = document.querySelectorAll('.countries button');
    const selectedChatLabel = document.querySelector('.selected-chat');
    const leaveChatBtn = document.getElementById('leaveChatBtn');
    countryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const countryName = button.getAttribute('name');
            selectedChatLabel.style.display = 'flex';
            selectedChatLabel.querySelector('h1').textContent = `${countryName} Chat`;
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            showMessage(randomMessage);
        });
    });
    leaveChatBtn.addEventListener('click', () => {
        selectedChatLabel.style.display = 'none';
    });

}