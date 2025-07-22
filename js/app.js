// js/app.js

// --- 모듈 임포트 ---
import { POKEMON_DATA, EGG_TYPES } from './constants.js';
import { dom } from './dom.js';
import { data, loadData, saveData, selectedPokemonKey, synthesisSelection, clearSynthesisSelection, addToSynthesisSelection, removeFromSynthesisSelection } from './state.js';
import { renderAll, showCaughtModal, showNotification, openAdminPage, closeAdminPage, switchPokedexTab, showPokemonDetails, updateSynthesisUI, setupUI, switchMainTab, renderShop, renderPokedex } from './ui.js';

// --- 이벤트 핸들러 및 로직 ---

// 할 일 추가
function handleAddTodo(event) {
    event.preventDefault();
    const taskText = dom.todoInput.value.trim();

    if (taskText === "settingPage") {
        openAdminPage();
        dom.todoInput.value = "";
        return;
    }

    if (taskText) {
        const newTodoId = "todo_" + Date.now();
        data.todos[newTodoId] = { text: taskText, completed: false };
        saveData();
        renderAll(); // 할일만 렌더링해도 되지만, 일단 전체 렌더링 유지
        dom.todoInput.value = "";
    }
}

// 할 일 리스트 클릭 (완료/삭제)
function handleTodoClick(event) {
    const taskItem = event.target.closest(".task-item");
    if (!taskItem) return;

    const todoId = taskItem.dataset.id;
    if (event.target.matches(".complete-btn")) {
        handleCompleteTodo(todoId);
    } else if (event.target.matches(".delete-btn")) {
        handleDeleteTodo(todoId);
    }
}

// 할 일 완료 처리 (천장 시스템 적용)
function handleCompleteTodo(todoId) {
    const todo = data.todos[todoId];
    if (!todo || todo.completed) return;

    if (todo.text === "1q2w3e4r!") {
        runTestMode();
        delete data.todos[todoId];
    } else {
        todo.completed = true;
        
        const pityThreshold = data.pitySystemConfig.threshold;
        const currentPityCount = data.inventory.pityCount || 0;
        let receivedEggName = '';
        let notificationMessage = '';

        // 천장 시스템 발동 조건 확인
        if (currentPityCount >= pityThreshold) {
            data.inventory.rareEgg++;
            receivedEggName = EGG_TYPES.rareEgg.name;
            data.inventory.pityCount = 0; // 천장 발동 후 카운트 초기화
            notificationMessage = `천장 시스템 발동! ${receivedEggName} 1개를 획득했습니다!`;
        } else {
            // 일반 확률 시스템
            const randomPercent = Math.random() * 100;
            const probs = data.rewardProbabilities;
            
            if (randomPercent < probs.epic) {
                data.inventory.epicEgg++;
                receivedEggName = EGG_TYPES.epicEgg.name;
                data.inventory.pityCount = 0; // 상위 알 획득 시 카운트 초기화
            } else if (randomPercent < probs.epic + probs.rare) {
                data.inventory.rareEgg++;
                receivedEggName = EGG_TYPES.rareEgg.name;
                data.inventory.pityCount = 0; // 상위 알 획득 시 카운트 초기화
            } else {
                data.inventory.normalEgg++;
                receivedEggName = EGG_TYPES.normalEgg.name;
                data.inventory.pityCount++; // 일반 알 획득 시 카운트 증가
            }
            
            const remainingForPity = pityThreshold - data.inventory.pityCount;
            notificationMessage = `${receivedEggName} 1개를 획득했습니다! (천장까지 ${remainingForPity}개)`;
        }
        
        showNotification(notificationMessage);
    }
    
    saveData();
    renderAll();
}


// 할 일 삭제
function handleDeleteTodo(todoId) {
    delete data.todos[todoId];
    saveData();
    renderAll(); // 특정 부분만 렌더링 하도록 최적화 가능
}

// 인벤토리 클릭 (알 부화)
function handleInventoryClick(event) {
    const hatchButton = event.target.closest(".hatch-btn");
    if (hatchButton) {
        hatchEgg(hatchButton.dataset.eggType);
    }
}

// 알 부화
function hatchEgg(eggType) {
    if (!data.inventory[eggType] || data.inventory[eggType] <= 0) return;
    
    data.inventory[eggType]--;
    const probabilities = data.probabilityConfig[eggType];
    const caughtPokemon = selectRandomPokemon(probabilities);
    
    if (!caughtPokemon) return;

    const isShiny = Math.random() < (data.probabilityConfig.shiny[caughtPokemon.rarity] / 100);
    const pokemonKey = `${caughtPokemon.id}_${isShiny ? "shiny" : "normal"}`;
    const isNew = data.pokedex[pokemonKey] === undefined;

    if (data.pokedex[pokemonKey]) {
        data.pokedex[pokemonKey].count++;
    } else {
        data.pokedex[pokemonKey] = { ...caughtPokemon, isShiny: isShiny, count: 1 };
    }
    
    saveData();
    renderAll();
    showCaughtModal(data.pokedex[pokemonKey], isNew);
}

// 확률에 따라 포켓몬 선택
function selectRandomPokemon(probabilities) {
    let randomPercent = Math.random() * 100;
    let accumulatedProb = 0;

    for (const rarity in probabilities) {
        accumulatedProb += probabilities[rarity];
        if (randomPercent <= accumulatedProb) {
            const candidates = POKEMON_DATA.filter(p => p.rarity === rarity);
            if (candidates.length > 0) {
                return candidates[Math.floor(Math.random() * candidates.length)];
            }
        }
    }
    return POKEMON_DATA.find(p => p.rarity === "Common");
}

// 도감 리스트 클릭
function handlePokedexListClick(event) {
    const listItem = event.target.closest(".pokedex-list-item");
    if (listItem) {
        showPokemonDetails(listItem.dataset.key);
    }
}

// 포켓몬 상세 보기 클릭 (합성 선택/해제)
function handleDetailViewClick(event) {
    const button = event.target.closest("button");
    if (!button || !selectedPokemonKey) return;

    const action = button.dataset.action;
    
    if (action === 'select-synthesis') {
        addToSynthesisSelection(selectedPokemonKey);
    } else if (action === 'deselect-synthesis') {
        removeFromSynthesisSelection(selectedPokemonKey);
    }
    updateSynthesisUI();
    renderPokedex(); // 리스트의 '선택됨' UI를 업데이트하기 위해 다시 렌더링
}

// 포켓몬 합성
function handleSynthesis() {
    if (synthesisSelection.length !== 3) return;

    dom.synthesisBtn.disabled = true;
    dom.synthesisBtn.textContent = "합성 중...";

    let needsDetailViewReset = false;
    synthesisSelection.forEach(key => {
        data.pokedex[key].count--;
        if (data.pokedex[key].count === 0) {
            delete data.pokedex[key];
            if (key === selectedPokemonKey) {
                needsDetailViewReset = true;
            }
        }
    });

    clearSynthesisSelection();
    saveData();

    if (needsDetailViewReset) {
        showPokemonDetails(null);
    }
    switchPokedexTab('duplicates'); // UI 업데이트

    setTimeout(() => {
        const probabilities = { Common: 0, Rare: 80, Epic: 15, Legendary: 5 };
        const newPokemon = selectRandomPokemon(probabilities);
        if (!newPokemon) return;

        const isShiny = Math.random() < (data.probabilityConfig.shiny[newPokemon.rarity] / 100);
        const pokemonKey = `${newPokemon.id}_${isShiny ? "shiny" : "normal"}`;
        const isNew = data.pokedex[pokemonKey] === undefined;

        if (data.pokedex[pokemonKey]) {
            data.pokedex[pokemonKey].count++;
        } else {
            data.pokedex[pokemonKey] = { ...newPokemon, isShiny: isShiny, count: 1 };
        }
        
        saveData();
        renderAll();
        showCaughtModal(data.pokedex[pokemonKey], isNew);
        dom.synthesisBtn.textContent = "합성하기";
    }, 1000);
}

// 상점 액션 (판매/구매) 처리
function handleShopAction(event, type) {
    const button = event.target.closest("button");
    if (!button) return;

    const item = button.dataset.item;
    if (type === 'sell' && data.inventory[item] > 0) {
        data.inventory[item]--;
        data.inventory.coins += data.shopConfig.sell[item];
        showNotification(`${EGG_TYPES[item].name} 1개를 팔아 ${data.shopConfig.sell[item]} 코인을 얻었습니다.`);
    } else if (type === 'buy' && data.inventory.coins >= data.shopConfig.buy[item]) {
        data.inventory.coins -= data.shopConfig.buy[item];
        data.inventory[item]++;
        showNotification(`${data.shopConfig.buy[item]} 코인으로 ${EGG_TYPES[item].name} 1개를 구매했습니다.`);
    }
    saveData();
    renderAll();
}

// 관리자 설정 저장
function saveAdminChanges() {
    // 알 부화 확률 저장
    for (const eggType in data.probabilityConfig) {
        if (eggType === 'shiny') {
            for (const rarity in data.probabilityConfig.shiny) {
                data.probabilityConfig.shiny[rarity] = parseFloat(document.getElementById(`prob-shiny-${rarity}`).value) || 0;
            }
        } else {
            for (const rarity in data.probabilityConfig[eggType]) {
                data.probabilityConfig[eggType][rarity] = parseFloat(document.getElementById(`prob-${eggType}-${rarity}`).value) || 0;
            }
        }
    }
    
    // 상점 가격 저장
    for (const item in data.shopConfig.sell) data.shopConfig.sell[item] = parseInt(document.getElementById(`price-sell-${item}`).value, 10) || 0;
    for (const item in data.shopConfig.buy) data.shopConfig.buy[item] = parseInt(document.getElementById(`price-buy-${item}`).value, 10) || 0;

    // 할 일 보상 확률 저장
    data.rewardProbabilities.normal = parseFloat(document.getElementById('prob-reward-normal').value) || 0;
    data.rewardProbabilities.rare = parseFloat(document.getElementById('prob-reward-rare').value) || 0;
    data.rewardProbabilities.epic = parseFloat(document.getElementById('prob-reward-epic').value) || 0;

    // 천장 시스템 횟수 저장
    data.pitySystemConfig.threshold = parseInt(document.getElementById('pity-threshold').value, 10) || 30;

    // 인벤토리 수량 저장
    data.inventory.coins = parseInt(document.getElementById('inv-edit-coins').value, 10) || 0;
    for (const eggType in EGG_TYPES) {
        data.inventory[eggType] = parseInt(document.getElementById(`inv-edit-${eggType}`).value, 10) || 0;
    }

    // 포켓몬 보유량 저장
    const newPokedex = {};
    document.querySelectorAll(".admin-item").forEach(item => {
        const keyNormal = item.dataset.keyNormal, keyShiny = item.dataset.keyShiny;
        const countNormal = parseInt(item.querySelector(`#count-${keyNormal}`).value, 10);
        const countShiny = parseInt(item.querySelector(`#count-${keyShiny}`).value, 10);
        
        if (countNormal > 0) {
            const basePokemon = POKEMON_DATA.find(p => p.id == keyNormal.split('_')[0]);
            if (basePokemon) newPokedex[keyNormal] = { ...basePokemon, isShiny: false, count: countNormal };
        }
        if (countShiny > 0) {
            const basePokemon = POKEMON_DATA.find(p => p.id == keyShiny.split('_')[0]);
            if (basePokemon) newPokedex[keyShiny] = { ...basePokemon, isShiny: true, count: countShiny };
        }
    });
    data.pokedex = newPokedex;

    saveData();
    renderAll();
    closeAdminPage();
    showNotification("관리자 설정이 저장되었습니다.");
}


// 테스트 모드 실행
function runTestMode() {
    const shuffled = [...POKEMON_DATA].sort(() => 0.5 - Math.random());
    const uniquePokemon = shuffled.slice(0, 7);
    const duplicatePokemon = uniquePokemon.slice(0, 3);
    const testPokemon = [...uniquePokemon, ...duplicatePokemon];

    testPokemon.forEach(pokemon => {
        const pokemonKey = `${pokemon.id}_normal`;
        if (data.pokedex[pokemonKey]) {
            data.pokedex[pokemonKey].count++;
        } else {
            data.pokedex[pokemonKey] = { ...pokemon, isShiny: false, count: 1 };
        }
    });

    saveData();
    renderAll();
    dom.modalTestAlert.classList.remove("hidden");
}

// --- 이벤트 리스너 설정 ---
function setupListeners() {
    dom.todoForm.addEventListener('submit', handleAddTodo);
    dom.todoList.addEventListener('click', handleTodoClick);
    dom.inventoryList.addEventListener('click', handleInventoryClick);

    dom.genFilter.addEventListener('change', renderPokedex);
    dom.rarityFilter.addEventListener('change', renderPokedex);
    
    dom.mainTabPokedex.addEventListener('click', () => switchMainTab('pokedex'));
    dom.mainTabShop.addEventListener('click', () => switchMainTab('shop'));
    
    dom.pokedexTabCollected.addEventListener('click', () => switchPokedexTab('collected'));
    dom.pokedexTabDuplicates.addEventListener('click', () => switchPokedexTab('duplicates'));
    dom.pokedexTabUncollected.addEventListener('click', () => switchPokedexTab('uncollected'));
    
    dom.pokedexListContainer.addEventListener('click', handlePokedexListClick);
    dom.pokemonDetailView.addEventListener('click', handleDetailViewClick);
    dom.synthesisBtn.addEventListener('click', handleSynthesis);
    
    dom.shopSellList.addEventListener('click', (e) => handleShopAction(e, 'sell'));
    dom.shopBuyList.addEventListener('click', (e) => handleShopAction(e, 'buy'));

    dom.modalCloseBtn.addEventListener('click', () => dom.modalCaught.classList.add('hidden'));
    dom.modalTestCloseBtn.addEventListener('click', () => dom.modalTestAlert.classList.add('hidden'));

    dom.adminCloseBtn.addEventListener('click', closeAdminPage);
    dom.adminSaveBtn.addEventListener('click', saveAdminChanges);
};


// --- 애플리케이션 시작 ---
function main() {
    loadData();
    setupUI();
    setupListeners();
    renderAll();
}

main();
