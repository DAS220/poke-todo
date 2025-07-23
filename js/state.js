// js/state.js
const defaultData = {
    todos: {},
    pokedex: {},
    inventory: {
        coins: 0,
        normalEgg: 0,
        rareEgg: 0,
        epicEgg: 0,
        pityCount: 0
    },
    rewardProbabilities: { epic: 1, rare: 4, normal: 95 },
    pitySystemConfig: { threshold: 30 },
    probabilityConfig: {
        normalEgg: { Common: 79, Rare: 17, Epic: 3, Legendary: 1 },
        rareEgg: { Common: 0, Rare: 80, Epic: 15, Legendary: 5 },
        epicEgg: { Common: 0, Rare: 0, Epic: 85, Legendary: 15 },
        shiny: { Common: 0.6, Rare: 0.3, Epic: 0.1, Legendary: 0.1 }
    },
    shopConfig: {
        sell: { normalEgg: 1, rareEgg: 3, epicEgg: 10 },
        buy: { rareEgg: 30, epicEgg: 100 }
    }
};

export let data = {};
export let pokedexTab = 'collected';
export let selectedPokemonKey = null;
export let synthesisSelection = [];

export function setPokedexTab(tab) { pokedexTab = tab; }
export function setSelectedPokemonKey(key) { selectedPokemonKey = key; }
export function clearSynthesisSelection() { synthesisSelection = []; }
export function addToSynthesisSelection(key) {
    if (synthesisSelection.length < 3 && !synthesisSelection.includes(key)) {
        synthesisSelection.push(key);
    }
}
export function removeFromSynthesisSelection(key) {
    const index = synthesisSelection.indexOf(key);
    if (index > -1) {
        synthesisSelection.splice(index, 1);
    }
}

export function loadData() {
    const savedData = JSON.parse(localStorage.getItem('pokemon-data-v3'));
    data = { ...defaultData, ...savedData };
    data.inventory = { ...defaultData.inventory, ...(savedData?.inventory || {}) };
    data.rewardProbabilities = { ...defaultData.rewardProbabilities, ...(savedData?.rewardProbabilities || {}) };
    data.pitySystemConfig = { ...defaultData.pitySystemConfig, ...(savedData?.pitySystemConfig || {}) };
    data.probabilityConfig = { ...defaultData.probabilityConfig, ...(savedData?.probabilityConfig || {}) };
    data.shopConfig = { ...defaultData.shopConfig, ...(savedData?.shopConfig || {}) };
    if (savedData?.probabilityConfig) {
        data.probabilityConfig.normalEgg = { ...defaultData.probabilityConfig.normalEgg, ...savedData.probabilityConfig.normalEgg };
        data.probabilityConfig.rareEgg = { ...defaultData.probabilityConfig.rareEgg, ...savedData.probabilityConfig.rareEgg };
        data.probabilityConfig.epicEgg = { ...defaultData.probabilityConfig.epicEgg, ...savedData.probabilityConfig.epicEgg };
        data.probabilityConfig.shiny = { ...defaultData.probabilityConfig.shiny, ...savedData.probabilityConfig.shiny };
    }
    if (savedData?.shopConfig) {
        data.shopConfig.sell = { ...defaultData.shopConfig.sell, ...savedData.shopConfig.sell };
        data.shopConfig.buy = { ...defaultData.shopConfig.buy, ...savedData.shopConfig.buy };
    }
};

export function saveData() {
    localStorage.setItem('pokemon-data-v3', JSON.stringify(data));
};
