// SIERA Healthcare Platform - Chart Management

// Chart configurations and instances
let chartInstances = {};

// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the main benchmark chart
    setTimeout(() => {
        initializeBenchmarkChart();
    }, 500);
});

// Main Benchmark Chart (Hero Section)
function initializeBenchmarkChart() {
    const ctx = document.getElementById('benchmarkChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    
    // Generate benchmark data
    const benchmarkData = generateBenchmarkData();
    
    const config = {
        type: 'line',
        data: {
            labels: benchmarkData.labels,
            datasets: [{
                label: 'Sector Average',
                data: benchmarkData.sectorAverage,
                borderColor: '#e5e7eb',
                backgroundColor: 'rgba(229, 231, 235, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }, {
                label: 'Top 10%',
                data: benchmarkData.top10,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }, {
                label: 'Your Performance',
                data: benchmarkData.yourPerformance,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Time Period'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    title: {
                        display: true,
                        text: 'Performance Score'
                    },
                    min: 0,
                    max: 100
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    };
    
    chartInstances.benchmarkChart = new Chart(chartCtx, config);
}

// Generate sample benchmark data
function generateBenchmarkData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const sectorAverage = [45, 47, 46, 48, 49, 48, 50, 51, 50, 52, 51, 50];
    const top10 = [85, 87, 86, 88, 90, 89, 91, 92, 90, 93, 92, 91];
    const yourPerformance = [42, 45, 48, 50, 52, 54, 56, 58, 55, 57, 59, 52]; // Current: 52nd percentile
    
    return {
        labels: months,
        sectorAverage,
        top10,
        yourPerformance
    };
}

// Demo Chart Initialization
function initializeDemoCharts(demoType) {
    const canvasId = `demo-${getDemoChartType(demoType)}`;
    const ctx = document.getElementById(canvasId);
    
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    switch (demoType) {
        case 'patient-context':
            initializePatientContextChart(ctx);
            break;
        case 'insurance-outcome':
            initializeInsuranceOutcomeChart(ctx);
            break;
        case 'ssraa-integration':
            initializeIntegrationMetricsChart(ctx);
            break;
        case 'surgeon-value':
            initializeSurgeonPerformanceChart(ctx);
            break;
        case 'surgeon-context':
            initializeSurgeonComparisonChart(ctx);
            break;
    }
}

function getDemoChartType(demoType) {
    const chartTypes = {
        'patient-context': 'percentileComparison',
        'insurance-outcome': 'outcomeAnalytics',
        'ssraa-integration': 'integrationMetrics',
        'surgeon-value': 'surgeonPerformance',
        'surgeon-context': 'surgeonComparison'
    };
    return chartTypes[demoType] || 'default';
}

// Patient Context Chart
function initializePatientContextChart(ctx) {
    const data = {
        labels: ['0-10th', '10-25th', '25-50th', '50-75th', '75-90th', '90-100th'],
        datasets: [{
            label: 'Patient Distribution',
            data: [156, 425, 687, 892, 456, 172],
            backgroundColor: [
                '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626'
            ],
            borderColor: '#dc2626',
            borderWidth: 1
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Patients: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Performance Percentile'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Patients'
                    }
                }
            }
        }
    };
    
    chartInstances[ctx.id] = new Chart(ctx, config);
}

// Insurance Outcome Chart
function initializeInsuranceOutcomeChart(ctx) {
    const data = {
        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
        datasets: [{
            label: 'Claims Cost ($M)',
            data: [2.8, 2.6, 2.4, 2.2, 2.0, 1.9],
            backgroundColor: 'rgba(147, 51, 234, 0.2)',
            borderColor: '#9333ea',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }, {
            label: 'ROI Increase (%)',
            data: [8, 10, 12, 13, 14, 15],
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            borderColor: '#22c55e',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            yAxisID: 'y1'
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Quarter'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Claims Cost ($M)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'ROI Increase (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    };
    
    chartInstances[ctx.id] = new Chart(ctx, config);
}

// Integration Metrics Chart
function initializeIntegrationMetricsChart(ctx) {
    const data = {
        datasets: [{
            label: 'System Performance',
            data: [
                { x: 99.9, y: 1247, r: 15 }, // Uptime vs API Calls
                { x: 98.5, y: 956, r: 12 },
                { x: 99.2, y: 1156, r: 14 },
                { x: 99.7, y: 1389, r: 16 },
                { x: 99.1, y: 1098, r: 13 }
            ],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: '#3b82f6'
        }]
    };
    
    const config = {
        type: 'bubble',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.parsed;
                            return `Uptime: ${point.x}%, API Calls: ${point.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'System Uptime (%)'
                    },
                    min: 98,
                    max: 100
                },
                y: {
                    title: {
                        display: true,
                        text: 'API Requests per Day'
                    }
                }
            }
        }
    };
    
    chartInstances[ctx.id] = new Chart(ctx, config);
}

// Surgeon Performance Chart
function initializeSurgeonPerformanceChart(ctx) {
    const data = {
        labels: ['Technical Skill', 'Patient Outcomes', 'Efficiency', 'Innovation', 'Peer Recognition', 'Patient Satisfaction'],
        datasets: [{
            label: 'Your Performance',
            data: [85, 92, 88, 78, 90, 95],
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            borderColor: '#22c55e',
            borderWidth: 2,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
        }, {
            label: 'Top 25% Average',
            data: [80, 85, 82, 75, 83, 87],
            backgroundColor: 'rgba(156, 163, 175, 0.1)',
            borderColor: '#9ca3af',
            borderWidth: 2,
            pointBackgroundColor: '#9ca3af',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1
        }]
    };
    
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    };
    
    chartInstances[ctx.id] = new Chart(ctx, config);
}

// Surgeon Comparison Chart
function initializeSurgeonComparisonChart(ctx) {
    const data = {
        labels: Array.from({ length: 20 }, (_, i) => `Surgeon ${i + 1}`),
        datasets: [{
            label: 'Success Rate (%)',
            data: [96.2, 95.8, 95.5, 94.9, 94.7, 94.3, 93.8, 93.5, 93.1, 92.8, 92.4, 92.0, 91.6, 91.2, 90.8, 90.4, 90.0, 89.6, 89.2, 88.8],
            backgroundColor: (ctx) => {
                const index = ctx.dataIndex;
                if (index === 0) return '#22c55e'; // Current surgeon (85th percentile)
                if (index < 5) return '#3b82f6'; // Top performers
                if (index < 10) return '#8b5cf6'; // Above average
                return '#e5e7eb'; // Below average
            },
            borderColor: '#ffffff',
            borderWidth: 1
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const index = context[0].dataIndex;
                            if (index === 0) return 'Your Performance';
                            return `${context[0].label}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Surgeon Ranking (247 Total)'
                    },
                    ticks: {
                        callback: function(value, index) {
                            if (index === 0) return 'YOU';
                            return index % 5 === 0 ? `#${index + 1}` : '';
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Success Rate (%)'
                    },
                    min: 85,
                    max: 100
                }
            }
        }
    };
    
    chartInstances[ctx.id] = new Chart(ctx, config);
}

// Chart utility functions
function updateChartData(chartId, newData) {
    if (chartInstances[chartId]) {
        chartInstances[chartId].data = newData;
        chartInstances[chartId].update();
    }
}

function resizeCharts() {
    Object.values(chartInstances).forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
}

// Handle window resize
window.addEventListener('resize', debounce(resizeCharts, 250));

// Chart animation configurations
const commonAnimationConfig = {
    duration: 1500,
    easing: 'easeInOutQuart'
};

// Export chart as image
function exportChart(chartId, filename = 'chart.png') {
    if (chartInstances[chartId]) {
        const url = chartInstances[chartId].toBase64Image();
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
    }
}

// Cleanup function for charts
function destroyAllCharts() {
    Object.values(chartInstances).forEach(chart => {
        if (chart) {
            chart.destroy();
        }
    });
    chartInstances = {};
}

// Performance monitoring for charts
function logChartPerformance(chartId, startTime) {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    console.log(`Chart ${chartId} rendered in ${renderTime.toFixed(2)}ms`);
}

// Initialize charts with error handling
function safeInitializeChart(initFunction, chartId) {
    try {
        const startTime = performance.now();
        initFunction();
        logChartPerformance(chartId, startTime);
    } catch (error) {
        console.error(`Error initializing chart ${chartId}:`, error);
    }
}

// Responsive chart configurations
function getResponsiveConfig(baseConfig) {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        baseConfig.options.plugins.legend.position = 'bottom';
        baseConfig.options.scales.x.title.display = false;
        baseConfig.options.scales.y.title.display = false;
    }
    
    return baseConfig;
}