// SIERA Healthcare Platform - Main JavaScript

// Global Variables
let currentDemo = null;
let currentStakeholder = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeInteractivity();
    setupSmoothScrolling();
});

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-blue-600');
            }
        });
    });
}

// Animation Initialization
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Interactive Elements
function initializeInteractivity() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-element');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Stakeholder Navigation
function showStakeholder(stakeholderType) {
    currentStakeholder = stakeholderType;
    
    // Update UI to show stakeholder-specific content
    const stakeholderInfo = getStakeholderInfo(stakeholderType);
    
    // Could expand this to show specific content per stakeholder
    console.log(`Showing content for: ${stakeholderType}`, stakeholderInfo);
    
    // Animate the stakeholder button
    const buttons = document.querySelectorAll('.stakeholder-btn');
    buttons.forEach(btn => {
        btn.classList.remove('ring-2', 'ring-blue-500', 'ring-green-500', 'ring-purple-500', 'ring-red-500', 'ring-indigo-500');
    });
    
    const activeButton = event.currentTarget;
    const color = getStakeholderColor(stakeholderType);
    activeButton.classList.add('ring-2', `ring-${color}-500`);
}

function getStakeholderInfo(type) {
    const stakeholders = {
        'clinicians': {
            color: 'blue',
            focus: 'Clinical Excellence',
            benefits: ['Peer Benchmarking', 'Outcome Prediction', 'Performance Analytics', 'Research Insights']
        },
        'hospitals': {
            color: 'green',
            focus: 'Operational Excellence',
            benefits: ['Cost Reduction', 'Quality Improvement', 'Risk Management', 'Efficiency Metrics']
        },
        'insurers': {
            color: 'purple',
            focus: 'Risk & ROI',
            benefits: ['Claims Analytics', 'Cost Containment', 'Risk Assessment', 'Fraud Detection']
        },
        'patients': {
            color: 'red',
            focus: 'Personalized Care',
            benefits: ['Treatment Options', 'Recovery Predictions', 'Provider Selection', 'Outcome Clarity']
        },
        'device-companies': {
            color: 'indigo',
            focus: 'Market Intelligence',
            benefits: ['Usage Analytics', 'Outcome Studies', 'Market Research', 'Product Development']
        }
    };
    
    return stakeholders[type] || {};
}

function getStakeholderColor(type) {
    const colors = {
        'clinicians': 'blue',
        'hospitals': 'green', 
        'insurers': 'purple',
        'patients': 'red',
        'device-companies': 'indigo'
    };
    return colors[type] || 'gray';
}

// Demo Management
function showDemo(demoType) {
    currentDemo = demoType;
    const demoDisplay = document.getElementById('demoDisplay');
    
    // Clear existing content
    demoDisplay.innerHTML = '';
    
    // Get demo content
    const demoContent = getDemoContent(demoType);
    
    // Create demo interface
    const demoHTML = createDemoInterface(demoContent);
    demoDisplay.innerHTML = demoHTML;
    
    // Initialize demo-specific charts
    setTimeout(() => {
        initializeDemoCharts(demoType);
    }, 100);
    
    // Update demo card styling
    updateDemoCardStyling(demoType);
}

function getDemoContent(type) {
    const demos = {
        'patient-context': {
            title: 'Patient Results in Context',
            subtitle: 'Individual Benchmarking Dashboard',
            icon: 'fas fa-heart',
            color: 'red',
            metrics: [
                { label: 'Current Percentile', value: '52nd', color: 'blue' },
                { label: 'Patient Cohort', value: '2,788', color: 'green' },
                { label: 'Recovery Rate', value: '94%', color: 'purple' },
                { label: 'Days to Recovery', value: '14.2', color: 'orange' }
            ],
            chartType: 'percentileComparison'
        },
        'insurance-outcome': {
            title: 'Insurance Outcome Analytics',
            subtitle: 'Sector-Wide Performance Analysis',
            icon: 'fas fa-shield-alt',
            color: 'purple',
            metrics: [
                { label: 'Performance Rank', value: '76th', color: 'green' },
                { label: 'Total Claims', value: '4,687', color: 'blue' },
                { label: 'Cost Savings', value: '$2.3M', color: 'green' },
                { label: 'ROI Increase', value: '15%', color: 'purple' }
            ],
            chartType: 'outcomeAnalytics'
        },
        'ssraa-integration': {
            title: 'SSRAA Integration Portal',
            subtitle: 'Research Authority Dashboard',
            icon: 'fas fa-database',
            color: 'blue',
            metrics: [
                { label: 'System Uptime', value: '99.9%', color: 'green' },
                { label: 'API Requests', value: '1,247', color: 'blue' },
                { label: 'Data Points', value: '2.4M', color: 'purple' },
                { label: 'Active Users', value: '89', color: 'orange' }
            ],
            chartType: 'integrationMetrics'
        },
        'surgeon-value': {
            title: 'Surgeon Value Proposition',
            subtitle: 'Performance & Network Analysis',
            icon: 'fas fa-user-md',
            color: 'green',
            metrics: [
                { label: 'Performance Tier', value: 'Top 15%', color: 'green' },
                { label: 'Referral Volume', value: '156', color: 'blue' },
                { label: 'Growth Rate', value: '12%', color: 'purple' },
                { label: 'Patient Satisfaction', value: '4.8/5', color: 'orange' }
            ],
            chartType: 'surgeonPerformance'
        },
        'surgeon-context': {
            title: 'Surgeon Results in Context',
            subtitle: 'Pooled Cohort Comparison',
            icon: 'fas fa-chart-line',
            color: 'indigo',
            metrics: [
                { label: 'Peer Ranking', value: '85th', color: 'green' },
                { label: 'Surgeon Cohort', value: '247', color: 'blue' },
                { label: 'Pooled Cases', value: '3,156', color: 'purple' },
                { label: 'Success Rate', value: '96.2%', color: 'green' }
            ],
            chartType: 'surgeonComparison'
        }
    };
    
    return demos[type] || {};
}

function createDemoInterface(demo) {
    if (!demo.title) {
        return `
            <div class="text-center py-20">
                <i class="fas fa-exclamation-triangle text-gray-300 text-4xl mb-4"></i>
                <h3 class="text-xl font-bold text-gray-400 mb-2">Demo Not Available</h3>
                <p class="text-gray-500">This demo is currently being updated</p>
            </div>
        `;
    }

    return `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 flex items-center">
                        <i class="${demo.icon} text-${demo.color}-600 mr-3"></i>
                        ${demo.title}
                    </h3>
                    <p class="text-gray-600 mt-1">${demo.subtitle}</p>
                </div>
                <div class="flex space-x-2">
                    <button class="bg-${demo.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${demo.color}-700 transition-colors text-sm">
                        Export Data
                    </button>
                    <button class="border border-${demo.color}-600 text-${demo.color}-600 px-4 py-2 rounded-lg hover:bg-${demo.color}-50 transition-colors text-sm">
                        Configure
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${demo.metrics.map(metric => `
                    <div class="bg-gray-50 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-${metric.color}-600 mb-1">${metric.value}</div>
                        <div class="text-sm text-gray-600">${metric.label}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-semibold">Performance Visualization</h4>
                    <div class="flex space-x-2 text-sm">
                        <button class="text-${demo.color}-600 border-b-2 border-${demo.color}-600 pb-1">Chart View</button>
                        <button class="text-gray-500 hover:text-gray-700 pb-1">Table View</button>
                    </div>
                </div>
                <div class="relative">
                    <canvas id="demo-${demo.chartType}" style="height: 300px;"></canvas>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-${demo.color}-50 rounded-lg p-4">
                    <h5 class="font-semibold text-${demo.color}-900 mb-2">Key Insights</h5>
                    <ul class="text-sm text-${demo.color}-800 space-y-1">
                        <li>• Performance above sector average</li>
                        <li>• Consistent improvement trajectory</li>
                        <li>• Strong benchmarking position</li>
                        <li>• Optimal resource utilization</li>
                    </ul>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                    <h5 class="font-semibold text-gray-900 mb-2">Recommendations</h5>
                    <ul class="text-sm text-gray-700 space-y-1">
                        <li>• Maintain current protocols</li>
                        <li>• Focus on efficiency gains</li>
                        <li>• Expand successful practices</li>
                        <li>• Monitor emerging trends</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function updateDemoCardStyling(activeDemo) {
    // Remove active styling from all cards
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.classList.remove('ring-2', 'ring-blue-500', 'ring-green-500', 'ring-purple-500', 'ring-red-500', 'ring-indigo-500');
    });
    
    // Add active styling to selected card
    const activeCard = document.querySelector(`[onclick="showDemo('${activeDemo}')"]`);
    if (activeCard) {
        const color = getDemoColor(activeDemo);
        activeCard.classList.add('ring-2', `ring-${color}-500`);
    }
}

function getDemoColor(demoType) {
    const colors = {
        'patient-context': 'red',
        'insurance-outcome': 'purple',
        'ssraa-integration': 'blue',
        'surgeon-value': 'green',
        'surgeon-context': 'indigo'
    };
    return colors[demoType] || 'gray';
}

// Module Modal Management
function showModuleDetail(moduleId) {
    const modal = document.getElementById('moduleModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const moduleDetails = getModuleDetails(moduleId);
    
    modalTitle.textContent = moduleDetails.title;
    modalContent.innerHTML = moduleDetails.content;
    
    modal.classList.remove('hidden');
    modal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('moduleModal');
    modal.classList.add('hidden');
    modal.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function getModuleDetails(moduleId) {
    const modules = {
        'SI.X': {
            title: 'SI.X - Surgical Excellence Module',
            content: `
                <div class="space-y-4">
                    <p class="text-lg text-gray-700">Advanced outcome prediction and surgical optimization engine.</p>
                    
                    <h4 class="font-semibold text-lg">Key Capabilities:</h4>
                    <ul class="space-y-2 text-gray-600">
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Pre-operative outcome prediction with 94% accuracy</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Real-time surgical decision support</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Post-operative recovery optimization</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Complication prevention protocols</li>
                    </ul>
                    
                    <h4 class="font-semibold text-lg">Integration Points:</h4>
                    <div class="bg-blue-50 rounded-lg p-3">
                        <p class="text-sm text-blue-800">Seamlessly integrates with EMR systems, surgical planning software, and Qi™ patient interfaces for comprehensive surgical excellence management.</p>
                    </div>
                </div>
            `
        },
        'SI.T': {
            title: 'SI.T - Technique Analysis Module',
            content: `
                <div class="space-y-4">
                    <p class="text-lg text-gray-700">Comprehensive surgical technique analysis and methodology optimization.</p>
                    
                    <h4 class="font-semibold text-lg">Core Features:</h4>
                    <ul class="space-y-2 text-gray-600">
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Procedural methodology comparison</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Technique efficacy analysis</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Best practice recommendations</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Surgical innovation tracking</li>
                    </ul>
                    
                    <h4 class="font-semibold text-lg">Clinical Applications:</h4>
                    <div class="bg-green-50 rounded-lg p-3">
                        <p class="text-sm text-green-800">Enables surgeons to refine techniques based on outcome data, compare methodologies across peer networks, and adopt evidence-based procedural improvements.</p>
                    </div>
                </div>
            `
        },
        'SI.RA': {
            title: 'SI.RA - Risk Assessment Module',
            content: `
                <div class="space-y-4">
                    <p class="text-lg text-gray-700">Predictive risk modeling and complication prevention system.</p>
                    
                    <h4 class="font-semibold text-lg">Risk Analytics:</h4>
                    <ul class="space-y-2 text-gray-600">
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Multi-factor risk scoring algorithms</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Complication probability modeling</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Patient-specific risk stratification</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Intervention timing optimization</li>
                    </ul>
                    
                    <h4 class="font-semibold text-lg">Predictive Capabilities:</h4>
                    <div class="bg-purple-50 rounded-lg p-3">
                        <p class="text-sm text-purple-800">Advanced machine learning models trained on extensive surgical datasets to predict and prevent adverse outcomes before they occur.</p>
                    </div>
                </div>
            `
        },
        'SI.Q': {
            title: 'SI.Q - Quality Metrics Module',
            content: `
                <div class="space-y-4">
                    <p class="text-lg text-gray-700">Comprehensive quality measurement and benchmarking system.</p>
                    
                    <h4 class="font-semibold text-lg">Quality Indicators:</h4>
                    <ul class="space-y-2 text-gray-600">
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Multi-dimensional quality scoring</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Peer performance benchmarking</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Quality improvement tracking</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Outcome variance analysis</li>
                    </ul>
                    
                    <h4 class="font-semibold text-lg">Benchmarking Framework:</h4>
                    <div class="bg-red-50 rounded-lg p-3">
                        <p class="text-sm text-red-800">Establishes quality metrics that matter, providing actionable insights for continuous improvement and excellence in surgical care delivery.</p>
                    </div>
                </div>
            `
        },
        'SI.REC': {
            title: 'SI.REC - Recovery Intelligence Module',
            content: `
                <div class="space-y-4">
                    <p class="text-lg text-gray-700">Patient journey optimization and recovery prediction system.</p>
                    
                    <h4 class="font-semibold text-lg">Recovery Analytics:</h4>
                    <ul class="space-y-2 text-gray-600">
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Personalized recovery timelines</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Milestone achievement tracking</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Rehabilitation optimization</li>
                        <li class="flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i>Long-term outcome prediction</li>
                    </ul>
                    
                    <h4 class="font-semibold text-lg">Patient Engagement:</h4>
                    <div class="bg-indigo-50 rounded-lg p-3">
                        <p class="text-sm text-indigo-800">Empowers patients with clear recovery expectations, milestone tracking, and personalized guidance throughout their healing journey.</p>
                    </div>
                </div>
            `
        }
    };
    
    return modules[moduleId] || {
        title: 'Module Details',
        content: '<p>Module information not available.</p>'
    };
}

// Click outside to close modal
document.addEventListener('click', function(event) {
    const modal = document.getElementById('moduleModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
window.addEventListener('scroll', throttle(() => {
    // Handle scroll-based animations and effects
}, 16)); // ~60fps

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('SIERA Healthcare Platform initialized successfully');
});