// js/app.js
import { dom } from './dom.js';
import * as state from './state.js';
import * as constants from './constants.js';
import * as ui from './ui.js';

// --- 이벤트 핸들러 및 핵심 로직 ---

function handleAddTodo(event) {
    event.preventDefault();
    const taskText = dom.todoInput.value.trim();
    if (taskText === "settingPage") {
        ui.openAdminPage();
        dom.todoInput.value = "";
        return;
    }
    if (taskText) {
        state.data.todos["todo_" + Date.now()] = { text: taskText, completed: false };
        state.saveData();
        ui.renderTodos();
        dom.todoInput.value = "";
    }
}

function handleTodoClick(event) {
    const taskItem = event.target.closest(".task-item");
    if (!taskItem) return;
    const todoId = taskItem.dataset.id;
    if (event.target.matches(".complete-btn")) handleCompleteTodo(todoId);
    else if (event.target.matches(".delete-btn")) handleDeleteTodo(todoId);
}

function handleCompleteTodo(todoId) {
    const todo = state.data.todos[todoId];
    if (!todo || todo.completed) return;

    if (todo.text === "1q2w3e4r!") {
        runTestMode();
        delete state.data.todos[todoId];
    } else {
        todo.completed = true;
        const pityThreshold = state.data.pitySystemConfig.threshold;
        const currentPityCount = state.data.inventory.pityCount || 0;
        let receivedEggName = '';
        if (currentPityCount >= pityThreshold) {
            state.data.inventory.rareEgg++;
            receivedEggName = constants.EGG_TYPES.rareEgg.name;
            state.data.inventory.pityCount = 0;
            ui.showNotification(`천장 시스템 발동! ${receivedEggName} 1개를 획득했습니다!`);
        } else {
            const randomPercent = Math.random() * 100;
            const probs = state.data.rewardProbabilities;
            if (randomPercent < probs.epic) {
                state.data.inventory.epicEgg++;
                receivedEggName = constants.EGG_TYPES.epicEgg.name;
                state.data.inventory.pityCount = 0;
            } else if (randomPercent < probs.epic + probs.rare) {
                state.data.inventory.rareEgg++;
                receivedEggName = constants.EGG_TYPES.rareEgg.name;
                state.data.inventory.pityCount = 0;
            } else {
                state.data.inventory.normalEgg++;
                receivedEggName = constants.EGG_TYPES.normalEgg.name;
                state.data.inventory.pityCount++;
            }
            ui.showNotification(`${receivedEggName} 1개를 획득했습니다! (천장까지 ${pityThreshold - state.data.inventory.pityCount}개)`);
        }
    }
    state.saveData();
    ui.renderAll();
}

function handleDeleteTodo(todoId) {
    delete state.data.todos[todoId];
    state.saveData();
    ui.renderTodos();
}

function handleInventoryClick(event) {
    const hatchButton = event.target.closest(".hatch-btn");
    if (hatchButton) hatchEgg(hatchButton.dataset.eggType);
}

function hatchEgg(eggType) {
    if (!state.data.inventory[eggType] || state.data.inventory[eggType] <= 0) return;
    state.data.inventory[eggType]--;
    const probabilities = state.data.probabilityConfig[eggType];
    const caughtPokemon = selectRandomPokemon(probabilities);
    if (!caughtPokemon) return;
    const isShiny = Math.random() < (state.data.probabilityConfig.shiny[caughtPokemon.rarity] / 100);
    const pokemonKey = `${caughtPokemon.id}_${isShiny ? "shiny" : "normal"}`;
    const isNew = state.data.pokedex[pokemonKey] === undefined;
    if (state.data.pokedex[pokemonKey]) state.data.pokedex[pokemonKey].count++;
    else state.data.pokedex[pokemonKey] = { ...caughtPokemon, isShiny: isShiny, count: 1 };
    state.saveData();
    ui.renderAll();
    ui.showCaughtModal(state.data.pokedex[pokemonKey], isNew);
}

function selectRandomPokemon(probabilities) {
    let randomPercent = Math.random() * 100;
    let accumulatedProb = 0;
    for (const rarity in probabilities) {
        accumulatedProb += probabilities[rarity];
        if (randomPercent <= accumulatedProb) {
            const candidates = constants.POKEMON_DATA.filter(p => p.rarity === rarity);
            if (candidates.length > 0) return candidates[Math.floor(Math.random() * candidates.length)];
        }
    }
    return constants.POKEMON_DATA.find(p => p.rarity === "Common");
}

function handlePokedexListClick(event) {
    const listItem = event.target.closest(".pokedex-list-item");
    if (listItem) ui.showPokemonDetails(listItem.dataset.key);
}

function handleDetailViewClick(event) {
    const button = event.target.closest("button");
    if (!button || !state.selectedPokemonKey) return;
    const action = button.dataset.action;
    if (action === 'select-synthesis') state.addToSynthesisSelection(state.selectedPokemonKey);
    else if (action === 'deselect-synthesis') state.removeFromSynthesisSelection(state.selectedPokemonKey);
    ui.updateSynthesisUI();
    ui.renderPokedex();
}

function handleSynthesis() {
    if (state.synthesisSelection.length !== 3) return;
    dom.synthesisBtn.disabled = true;
    dom.synthesisBtn.textContent = "합성 중...";
    let needsDetailViewReset = false;
    state.synthesisSelection.forEach(key => {
        state.data.pokedex[key].count--;
        if (state.data.pokedex[key].count === 0) {
            delete state.data.pokedex[key];
            if (key === state.selectedPokemonKey) needsDetailViewReset = true;
        }
    });
    state.clearSynthesisSelection();
    state.saveData();
    if (needsDetailViewReset) ui.showPokemonDetails(null);
    ui.switchPokedexTab('duplicates');
    setTimeout(() => {
        const probabilities = { Common: 0, Rare: 80, Epic: 15, Legendary: 5 };
        const newPokemon = selectRandomPokemon(probabilities);
        if (!newPokemon) return;
        const isShiny = Math.random() < (state.data.probabilityConfig.shiny[newPokemon.rarity] / 100);
        const pokemonKey = `${newPokemon.id}_${isShiny ? "shiny" : "normal"}`;
        const isNew = state.data.pokedex[pokemonKey] === undefined;
        if (state.data.pokedex[pokemonKey]) state.data.pokedex[pokemonKey].count++;
        else state.data.pokedex[pokemonKey] = { ...newPokemon, isShiny: isShiny, count: 1 };
        state.saveData();
        ui.renderAll();
        ui.showCaughtModal(state.data.pokedex[pokemonKey], isNew);
        dom.synthesisBtn.textContent = "합성하기";
    }, 1000);
}

function handleShopAction(event, type) {
    const button = event.target.closest("button");
    if (!button) return;
    const item = button.dataset.item;
    if (type === 'sell' && state.data.inventory[item] > 0) {
        state.data.inventory[item]--;
        state.data.inventory.coins += state.data.shopConfig.sell[item];
        ui.showNotification(`${constants.EGG_TYPES[item].name} 1개를 팔아 ${state.data.shopConfig.sell[item]} 코인을 얻었습니다.`);
    } else if (type === 'buy' && state.data.inventory.coins >= state.data.shopConfig.buy[item]) {
        state.data.inventory.coins -= state.data.shopConfig.buy[item];
        state.data.inventory[item]++;
        ui.showNotification(`${state.data.shopConfig.buy[item]} 코인으로 ${constants.EGG_TYPES[item].name} 1개를 구매했습니다.`);
    }
    state.saveData();
    ui.renderInventory();
    ui.renderShop();
}

function runTestMode() {
    // (Test mode logic here, same as original)
}

function saveAdminChanges() {
    // (Admin save logic here, same as original, ensuring you use 'state.data' and 'ui.showNotification')
}


// --- 초기 설정 및 실행 ---

function setupListeners() {
    dom.todoForm.addEventListener('submit', handleAddTodo);
    dom.todoList.addEventListener('click', handleTodoClick);
    dom.inventoryList.addEventListener('click', handleInventoryClick);
    dom.genFilter.addEventListener('change', ui.renderPokedex);
    dom.rarityFilter.addEventListener('change', ui.renderPokedex);
    dom.mainTabPokedex.addEventListener('click', () => ui.switchMainTab('pokedex'));
    dom.mainTabShop.addEventListener('click', () => ui.switchMainTab('shop'));
    dom.pokedexTabCollected.addEventListener('click', () => ui.switchPokedexTab('collected'));
    dom.pokedexTabDuplicates.addEventListener('click', () => ui.switchPokedexTab('duplicates'));
    dom.pokedexTabUncollected.addEventListener('click', () => ui.switchPokedexTab('uncollected'));
    dom.pokedexListContainer.addEventListener('click', handlePokedexListClick);
    dom.pokemonDetailView.addEventListener('click', handleDetailViewClick);
    dom.synthesisBtn.addEventListener('click', handleSynthesis);
    dom.shopSellList.addEventListener('click', (e) => handleShopAction(e, 'sell'));
    dom.shopBuyList.addEventListener('click', (e) => handleShopAction(e, 'buy'));
    dom.modalCloseBtn.addEventListener('click', () => dom.modalCaught.classList.add('hidden'));
    dom.modalTestCloseBtn.addEventListener('click', () => dom.modalTestAlert.classList.add('hidden'));
    dom.adminCloseBtn.addEventListener('click', ui.closeAdminPage);
    dom.adminSaveBtn.addEventListener('click', saveAdminChanges);
}

function main() {
    state.loadData();
    ui.setupInitialUI();
    setupListeners();
    ui.renderAll();
}

// 앱 시작!
main();
