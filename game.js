// CyberClicker - Juego Clicker Ciberpunk
// Estado del juego
const gameState = {
    credits: 0,
    totalCredits: 0,
    creditsPerSecond: 0,
    clickValue: 1,
    totalClicks: 0,
    stage: 0, // 0: Ciudad, 1: Planeta, 2: Sistema Solar, 3: Galaxia
    lastSaveTime: Date.now(),
    buildings: {},
    upgrades: {
        click: [],
        tech: []
    },
    achievements: []
};

// Definición de etapas
const stages = [
    {
        name: "MEGACIUDAD NEON",
        description: "Un hacker solitario en las calles lluviosas de la metrópolis...",
        requirement: 0,
        nextRequirement: 1000
    },
    {
        name: "PLANETA CYBERIA",
        description: "Controlando la economía de todo el planeta...",
        requirement: 1000,
        nextRequirement: 1000000
    },
    {
        name: "SISTEMA SOLAR NEO",
        description: "Expandiendo tu imperio a través de los planetas...",
        requirement: 1000000,
        nextRequirement: 1000000000
    },
    {
        name: "IMPERIO GALÁCTICO",
        description: "Dominando la galaxia con tu imperio tecnológico...",
        requirement: 1000000000,
        nextRequirement: Infinity
    }
];

// Definición de edificios por etapa
const buildingDefinitions = {
    0: [ // Ciudad
        {
            id: 'bot_mineria',
            name: 'Bot de Minería de Datos',
            baseCost: 10,
            baseProduction: 1,
            description: 'Pequeños programas que extraen datos valiosos de la red.'
        },
        {
            id: 'impresora_3d',
            name: 'Impresora 3D Ilegal',
            baseCost: 100,
            baseProduction: 5,
            description: 'Fabrica gadgets que vendes en el mercado negro.'
        },
        {
            id: 'refugio_tech',
            name: 'Refugio Tecnológico',
            baseCost: 1000,
            baseProduction: 25,
            description: 'Base donde programadores generan software vendible.'
        },
        {
            id: 'centro_datos',
            name: 'Centro de Datos Urbano',
            baseCost: 10000,
            baseProduction: 100,
            description: 'Almacena información para clientes corporativos.'
        }
    ],
    1: [ // Planeta
        {
            id: 'servidor_cuantico',
            name: 'Servidor Cuántico',
            baseCost: 100000,
            baseProduction: 500,
            description: 'Procesamiento cuántico para operaciones complejas.'
        },
        {
            id: 'fabrica_neural',
            name: 'Fábrica de Implantes',
            baseCost: 1000000,
            baseProduction: 2500,
            description: 'Produce implantes neurales de alta demanda.'
        }
    ],
    2: [ // Sistema Solar
        {
            id: 'base_lunar',
            name: 'Base Lunar',
            baseCost: 50000000,
            baseProduction: 12500,
            description: 'Extrae Helio-3 y otros minerales lunares.'
        },
        {
            id: 'colonia_marte',
            name: 'Colonia Marciana',
            baseCost: 500000000,
            baseProduction: 62500,
            description: 'Ciudad marciana productora de bienes off-world.'
        }
    ],
    3: [ // Galaxia
        {
            id: 'flota_estelar',
            name: 'Flota Estelar',
            baseCost: 25000000000,
            baseProduction: 312500,
            description: 'Explora y explota recursos de sistemas completos.'
        }
    ]
};

// Definición de mejoras de click
const clickUpgradeDefinitions = [
    {
        id: 'dedos_bionicos',
        name: 'Dedos Biónicos',
        cost: 50,
        effect: 1,
        description: 'Mejora la velocidad y precisión de tus clics.',
        purchased: false
    },
    {
        id: 'interfaz_neural',
        name: 'Interfaz Neural',
        cost: 500,
        effect: 5,
        description: 'Conecta directamente tu mente al sistema.',
        purchased: false
    },
    {
        id: 'amplificador_sináptico',
        name: 'Amplificador Sináptico',
        cost: 5000,
        effect: 25,
        description: 'Multiplica la potencia de tu procesamiento neural.',
        purchased: false
    },
    {
        id: 'matrix_hack',
        name: 'Matrix Hack Protocol',
        cost: 50000,
        effect: 100,
        description: 'Acceso directo a los protocolos fundamentales.',
        purchased: false
    }
];

// Definición de tecnologías globales
const techUpgradeDefinitions = [
    {
        id: 'optimizacion_algoritmos',
        name: 'Optimización de Algoritmos',
        cost: 1000,
        effect: 0.1, // 10% más producción
        description: 'Mejora la eficiencia de todos los sistemas automáticos.',
        purchased: false
    },
    {
        id: 'ia_general',
        name: 'Inteligencia Artificial General',
        cost: 100000,
        effect: 1.0, // Duplica producción
        description: 'IA que gestiona y optimiza todas las operaciones.',
        purchased: false
    },
    {
        id: 'fusion_cuantica',
        name: 'Fusión Cuántica',
        cost: 10000000,
        effect: 2.0, // Triplica producción
        description: 'Energía casi ilimitada para tus operaciones.',
        purchased: false
    }
];

// Definición de logros
const achievementDefinitions = [
    {
        id: 'first_click',
        name: 'Primer Hack',
        description: 'Realiza tu primer clic.',
        condition: () => gameState.totalClicks >= 1,
        reward: 'Aumenta el valor del clic en +1'
    },
    {
        id: 'hundred_clicks',
        name: 'Hacker Novato',
        description: 'Realiza 100 clics.',
        condition: () => gameState.totalClicks >= 100,
        reward: 'Aumenta el valor del clic en +1'
    },
    {
        id: 'first_building',
        name: 'Primera Automatización',
        description: 'Compra tu primera unidad automática.',
        condition: () => Object.values(gameState.buildings).some(count => count > 0),
        reward: 'Desbloquea nuevas mejoras'
    },
    {
        id: 'millionaire',
        name: 'Millonario Cibernético',
        description: 'Acumula 1,000,000 de créditos.',
        condition: () => gameState.totalCredits >= 1000000,
        reward: 'Multiplica todos los ingresos x1.5'
    }
];

// Elementos del DOM
const elements = {
    credits: document.getElementById('credits'),
    creditsPerSecond: document.getElementById('credits-per-second'),
    totalClicks: document.getElementById('total-clicks'),
    clickValue: document.getElementById('click-value'),
    mainClicker: document.getElementById('main-clicker'),
    currentStage: document.getElementById('current-stage'),
    stageDescription: document.getElementById('stage-description'),
    stageProgress: document.getElementById('stage-progress'),
    progressText: document.getElementById('progress-text'),
    clickUpgrades: document.getElementById('click-upgrades'),
    buildingsList: document.getElementById('buildings-list'),
    techUpgrades: document.getElementById('tech-upgrades'),
    achievements: document.getElementById('achievements'),
    notifications: document.getElementById('notifications'),
    particleContainer: document.getElementById('particle-container')
};

// Funciones de utilidad
function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
    return (num / 1000000000000).toFixed(1) + 'T';
}

function calculateBuildingCost(baseCost, owned) {
    return Math.floor(baseCost * Math.pow(1.15, owned));
}

function calculateTotalProduction() {
    let total = 0;
    
    // Incluir edificios de todas las etapas disponibles
    for (let stage = 0; stage <= gameState.stage; stage++) {
        const availableBuildings = buildingDefinitions[stage] || [];
        for (const building of availableBuildings) {
            const owned = gameState.buildings[building.id] || 0;
            total += building.baseProduction * owned;
        }
    }
    
    // Aplicar multiplicadores de tecnología
    let multiplier = 1;
    for (const upgrade of techUpgradeDefinitions) {
        if (gameState.upgrades.tech.includes(upgrade.id)) {
            multiplier += upgrade.effect;
        }
    }
    
    // Aplicar multiplicador de logro millonario
    if (gameState.achievements.includes('millionaire')) {
        multiplier *= 1.5;
    }
    
    return total * multiplier;
}

// Efectos visuales
function createParticle(x, y, text, color = '#00ff00') {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = text;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.color = color;
    
    elements.particleContainer.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    elements.notifications.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Mecánicas principales
function performClick(event) {
    gameState.credits += gameState.clickValue;
    gameState.totalCredits += gameState.clickValue;
    gameState.totalClicks++;
    
    // Crear partícula en la posición del click
    const rect = elements.mainClicker.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createParticle(x, y, `+${formatNumber(gameState.clickValue)}`);
    
    updateDisplay();
    checkAchievements();
}

function buyBuilding(buildingId) {
    // Buscar edificio en todas las etapas disponibles
    let building = null;
    for (let stage = 0; stage <= gameState.stage; stage++) {
        if (buildingDefinitions[stage]) {
            building = buildingDefinitions[stage].find(b => b.id === buildingId);
            if (building) break;
        }
    }
    
    if (!building) return;
    
    const owned = gameState.buildings[buildingId] || 0;
    const cost = calculateBuildingCost(building.baseCost, owned);
    
    if (gameState.credits >= cost) {
        gameState.credits -= cost;
        gameState.buildings[buildingId] = owned + 1;
        
        showNotification(`¡${building.name} comprado!`);
        updateDisplay();
        checkAchievements();
    }
}

function buyClickUpgrade(upgradeId) {
    const upgrade = clickUpgradeDefinitions.find(u => u.id === upgradeId);
    
    if (!upgrade || upgrade.purchased || gameState.credits < upgrade.cost) return;
    
    gameState.credits -= upgrade.cost;
    gameState.clickValue += upgrade.effect;
    upgrade.purchased = true;
    gameState.upgrades.click.push(upgradeId);
    
    showNotification(`¡${upgrade.name} adquirido!`);
    updateDisplay();
}

function buyTechUpgrade(upgradeId) {
    const upgrade = techUpgradeDefinitions.find(u => u.id === upgradeId);
    
    if (!upgrade || upgrade.purchased || gameState.credits < upgrade.cost) return;
    
    gameState.credits -= upgrade.cost;
    upgrade.purchased = true;
    gameState.upgrades.tech.push(upgradeId);
    
    showNotification(`¡${upgrade.name} desarrollado!`);
    updateDisplay();
}

function checkStageProgression() {
    const currentStage = stages[gameState.stage];
    const nextStage = stages[gameState.stage + 1];
    
    if (nextStage && gameState.totalCredits >= nextStage.requirement) {
        gameState.stage++;
        showNotification(`¡Nueva etapa desbloqueada: ${nextStage.name}!`, 'stage');
        updateDisplay();
    }
}

function checkAchievements() {
    for (const achievement of achievementDefinitions) {
        if (!gameState.achievements.includes(achievement.id) && achievement.condition()) {
            gameState.achievements.push(achievement.id);
            showNotification(`¡Logro desbloqueado: ${achievement.name}!`, 'achievement');
            
            // Aplicar recompensas
            if (achievement.id === 'first_click' || achievement.id === 'hundred_clicks') {
                gameState.clickValue += 1;
            } else if (achievement.id === 'millionaire') {
                // Este multiplicador se aplicará en calculateTotalProduction
            }
        }
    }
}

// Actualización de la interfaz
function updateDisplay() {
    // Actualizar estadísticas principales
    elements.credits.textContent = formatNumber(gameState.credits);
    elements.creditsPerSecond.textContent = formatNumber(gameState.creditsPerSecond);
    elements.totalClicks.textContent = formatNumber(gameState.totalClicks);
    elements.clickValue.textContent = formatNumber(gameState.clickValue);
    
    // Actualizar información de etapa
    const currentStage = stages[gameState.stage];
    elements.currentStage.textContent = currentStage.name;
    elements.stageDescription.textContent = currentStage.description;
    
    // Actualizar progreso hacia siguiente etapa
    const nextStage = stages[gameState.stage + 1];
    if (nextStage) {
        const progress = (gameState.totalCredits / nextStage.requirement) * 100;
        elements.stageProgress.style.width = Math.min(progress, 100) + '%';
        elements.progressText.textContent = `${formatNumber(gameState.totalCredits)} / ${formatNumber(nextStage.requirement)} créditos`;
    } else {
        elements.stageProgress.style.width = '100%';
        elements.progressText.textContent = 'Imperio Galáctico Completado';
    }
    
    // Actualizar edificios
    updateBuildingsDisplay();
    
    // Actualizar mejoras
    updateUpgradesDisplay();
    
    // Actualizar logros
    updateAchievementsDisplay();
}

function updateBuildingsDisplay() {
    // Mostrar edificios de la etapa actual y anteriores
    const availableBuildings = [];
    for (let stage = 0; stage <= gameState.stage; stage++) {
        if (buildingDefinitions[stage]) {
            availableBuildings.push(...buildingDefinitions[stage]);
        }
    }
    
    elements.buildingsList.innerHTML = '';
    
    for (const building of availableBuildings) {
        const owned = gameState.buildings[building.id] || 0;
        const cost = calculateBuildingCost(building.baseCost, owned);
        const canAfford = gameState.credits >= cost;
        
        const buildingElement = document.createElement('div');
        buildingElement.className = `building-item ${canAfford ? 'affordable' : ''}`;
        buildingElement.onclick = () => buyBuilding(building.id);
        
        buildingElement.innerHTML = `
            <div class="item-header">
                <span class="item-name">${building.name}</span>
                <span class="item-cost">${formatNumber(cost)}€</span>
            </div>
            <div class="item-description">${building.description}</div>
            <div class="item-production">Produce: ${formatNumber(building.baseProduction)} c/seg</div>
            ${owned > 0 ? `<div class="building-count">${owned}</div>` : ''}
        `;
        
        elements.buildingsList.appendChild(buildingElement);
    }
}

function updateUpgradesDisplay() {
    // Mejoras de click
    elements.clickUpgrades.innerHTML = '';
    for (const upgrade of clickUpgradeDefinitions) {
        if (upgrade.purchased) continue;
        
        const canAfford = gameState.credits >= upgrade.cost;
        const upgradeElement = document.createElement('div');
        upgradeElement.className = `upgrade-item ${canAfford ? 'affordable' : ''}`;
        upgradeElement.onclick = () => buyClickUpgrade(upgrade.id);
        
        upgradeElement.innerHTML = `
            <div class="item-header">
                <span class="item-name">${upgrade.name}</span>
                <span class="item-cost">${formatNumber(upgrade.cost)}€</span>
            </div>
            <div class="item-description">${upgrade.description}</div>
            <div class="item-production">+${upgrade.effect} créditos por clic</div>
        `;
        
        elements.clickUpgrades.appendChild(upgradeElement);
    }
    
    // Tecnologías
    elements.techUpgrades.innerHTML = '';
    for (const upgrade of techUpgradeDefinitions) {
        if (upgrade.purchased) continue;
        
        const canAfford = gameState.credits >= upgrade.cost;
        const upgradeElement = document.createElement('div');
        upgradeElement.className = `upgrade-item ${canAfford ? 'affordable' : ''}`;
        upgradeElement.onclick = () => buyTechUpgrade(upgrade.id);
        
        upgradeElement.innerHTML = `
            <div class="item-header">
                <span class="item-name">${upgrade.name}</span>
                <span class="item-cost">${formatNumber(upgrade.cost)}€</span>
            </div>
            <div class="item-description">${upgrade.description}</div>
            <div class="item-production">+${(upgrade.effect * 100).toFixed(0)}% producción global</div>
        `;
        
        elements.techUpgrades.appendChild(upgradeElement);
    }
}

function updateAchievementsDisplay() {
    elements.achievements.innerHTML = '';
    
    for (const achievement of achievementDefinitions) {
        const unlocked = gameState.achievements.includes(achievement.id);
        
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${unlocked ? 'unlocked' : ''}`;
        
        achievementElement.innerHTML = `
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            <div class="achievement-reward">Recompensa: ${achievement.reward}</div>
        `;
        
        elements.achievements.appendChild(achievementElement);
    }
}

// Sistema de guardado
function saveGame() {
    gameState.lastSaveTime = Date.now();
    localStorage.setItem('cyberclicker-save', JSON.stringify(gameState));
}

function loadGame() {
    const saveData = localStorage.getItem('cyberclicker-save');
    if (saveData) {
        const loaded = JSON.parse(saveData);
        Object.assign(gameState, loaded);
        
        // Calcular progreso offline
        const offlineTime = (Date.now() - gameState.lastSaveTime) / 1000; // segundos
        if (offlineTime > 60) { // Más de 1 minuto offline
            const offlineCredits = gameState.creditsPerSecond * offlineTime;
            gameState.credits += offlineCredits;
            gameState.totalCredits += offlineCredits;
            
            showNotification(`¡Bienvenido de vuelta! Ganaste ${formatNumber(offlineCredits)} créditos offline.`);
        }
        
        // Sincronizar estados de mejoras compradas
        for (const upgrade of clickUpgradeDefinitions) {
            upgrade.purchased = gameState.upgrades.click.includes(upgrade.id);
        }
        for (const upgrade of techUpgradeDefinitions) {
            upgrade.purchased = gameState.upgrades.tech.includes(upgrade.id);
        }
    }
}

// Bucle principal del juego
function gameLoop() {
    // Calcular producción por segundo
    gameState.creditsPerSecond = calculateTotalProduction();
    
    // Agregar créditos pasivos (cada segundo)
    const creditsThisTick = gameState.creditsPerSecond / 10; // 10 FPS
    gameState.credits += creditsThisTick;
    gameState.totalCredits += creditsThisTick;
    
    // Verificar progresión de etapa
    checkStageProgression();
    
    // Actualizar interfaz
    updateDisplay();
    
    // Guardar cada 30 segundos
    if (Date.now() - gameState.lastSaveTime > 30000) {
        saveGame();
    }
}

// Inicialización
function initGame() {
    // Cargar juego guardado
    loadGame();
    
    // Configurar eventos
    elements.mainClicker.addEventListener('click', performClick);
    
    // Inicializar edificios en el estado del juego
    for (let stage = 0; stage < buildingDefinitions.length; stage++) {
        for (const building of buildingDefinitions[stage]) {
            if (!(building.id in gameState.buildings)) {
                gameState.buildings[building.id] = 0;
            }
        }
    }
    
    // Actualizar interfaz inicial
    updateDisplay();
    
    // Iniciar bucle del juego (10 FPS)
    setInterval(gameLoop, 100);
    
    // Guardar automáticamente cada 10 segundos
    setInterval(saveGame, 10000);
    
    console.log('CyberClicker iniciado correctamente!');
}

// Iniciar el juego cuando la página esté cargada
document.addEventListener('DOMContentLoaded', initGame);