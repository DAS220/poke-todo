// js/ui.js
import { dom } from './dom.js';
import { data, pokedexTab, selectedPokemonKey, synthesisSelection, setPokedexTab, setSelectedPokemonKey, clearSynthesisSelection, addToSynthesisSelection, removeFromSynthesisSelection } from './state.js';
import { POKEMON_DATA, RARITY_STYLES, EGG_TYPES } from './constants.js';

// --- 렌더링 함수 ---
export function renderAll() {
    renderTodos();
    renderInventory();
    renderPokedex();
    renderShop();
    updatePokedexProgress();
};

// 할 일 목록 렌더링
export function renderTodos() {
    dom.todoList.innerHTML = "";
    const todos = Object.entries(data.todos);

    if (todos.length === 0) {
        dom.todoList.innerHTML = '<li class="text-gray-500 text-center py-4">할 일이 없습니다.</li>';
        return;
    }
    
    todos.sort(([, a], [, b]) => a.completed - b.completed)
         .forEach(([id, todo]) => {
            const li = document.createElement("li");
            li.dataset.id = id;
            li.className = `task-item flex items-center p-3 rounded-lg transition-colors ${todo.completed ? "bg-gray-700 text-gray-500 line-through" : "bg-gray-800"}`;
            
            let buttons = !todo.completed ? '<button class="complete-btn bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded-md mr-2">완료</button>' : '';
            buttons += '<button class="delete-btn bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded-md">삭제</button>';

            li.innerHTML = `<span class="flex-grow">${todo.text}</span> ${buttons}`;
            dom.todoList.appendChild(li);
        });
}

// 인벤토리 렌더링
export function renderInventory() {
    dom.inventoryList.innerHTML = "";
    let inventoryHTML = `
        <div class="flex items-center justify-between">
            <span class="font-bold text-lg">코인</span></div>
            <span class="font-bold text-lg text-yellow-400">${data.inventory.coins}</span>
        </div>`;
    
    for (const eggType in EGG_TYPES) {
        const eggInfo = EGG_TYPES[eggType];
        const count = data.inventory[eggType];
        const disabled = count > 0 ? "" : "opacity-50 cursor-not-allowed";
        inventoryHTML += `
            <div class="flex items-center justify-between">
                <div class="flex items-center"><img src="${eggInfo.img}" class="h-8 w-8 mr-3"><span class="font-bold text-lg">${eggInfo.name}</span></div>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-lg">${count}</span>
                    <button data-egg-type="${eggType}" class="hatch-btn bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded-md ${disabled}" ${!disabled}>부화</button>
                </div>
            </div>`;
    }
    dom.inventoryList.innerHTML = inventoryHTML;
}


// 도감 진행도 업데이트
export function updatePokedexProgress() {
    const collectedIds = Object.keys(data.pokedex).map(key => key.split('_')[0]);
    const uniqueCollectedCount = new Set(collectedIds).size;
    const totalPokemonCount = POKEMON_DATA.length;
    dom.pokedexProgress.textContent = `도감 완성도: ${uniqueCollectedCount} / ${totalPokemonCount}`;
}

// 도감 목록 렌더링
export function renderPokedex() {
    dom.pokedexListContainer.innerHTML = "";
    let filteredList;

    if (pokedexTab === 'uncollected') {
        const collectedIds = new Set(Object.keys(data.pokedex).map(key => key.split('_')[0]));
        filteredList = POKEMON_DATA.filter(p => !collectedIds.has(String(p.id)));
    } else {
        let allCollected = Object.values(data.pokedex);
        if (pokedexTab === 'duplicates') {
            const countsById = {};
            allCollected.forEach(p => { countsById[p.id] = (countsById[p.id] || 0) + p.count; });
            filteredList = allCollected.filter(p => countsById[p.id] > 1);
        } else {
            filteredList = allCollected;
        }
    }
    
    const genFilterValue = dom.genFilter.value;
    const rarityFilterValue = dom.rarityFilter.value;
    if (genFilterValue !== 'all') filteredList = filteredList.filter(p => p.gen == genFilterValue);
    if (rarityFilterValue !== 'all') filteredList = filteredList.filter(p => p.rarity === rarityFilterValue);

    filteredList.sort((a, b) => a.id - b.id || (a.isShiny ? 1 : 0) - (b.isShiny ? 1 : 0));

    if (filteredList.length === 0) {
        dom.pokedexListContainer.innerHTML = '<div class="text-center text-gray-500 py-8">해당하는 포켓몬이 없습니다.</div>';
        showPokemonDetails(null);
        return;
    }

    filteredList.forEach(pokemon => {
        const pokemonKey = `${pokemon.id}_${pokemon.isShiny ? "shiny" : "normal"}`;
        const isSelectedForSynthesis = synthesisSelection.includes(pokemonKey);
        const li = document.createElement("div");
        li.className = `pokedex-list-item p-2 rounded-md hover:bg-gray-700 cursor-pointer flex justify-between items-center ${selectedPokemonKey === pokemonKey ? "selected" : ""}`;
        li.dataset.key = pokemonKey;
        
        const nameClass = pokedexTab === 'uncollected' ? "text-gray-500" : "font-semibold";
        const shinyMark = pokemon.isShiny ? "✨" : "";
        
        let countDisplay = '';
        if (pokedexTab !== 'uncollected') {
            const synthesisMark = isSelectedForSynthesis ? '<span class="text-xs text-purple-400 mr-2">선택됨</span>' : '';
            countDisplay = `<div>${synthesisMark}<span class="text-sm font-bold text-gray-300">x${pokemon.count}</span></div>`;
        }

        li.innerHTML = `<div><span class="text-gray-400">#${String(pokemon.id).padStart(3, "0")}</span><span class="ml-3 ${nameClass}">${pokemon.name} ${shinyMark}</span></div>${countDisplay}`;
        dom.pokedexListContainer.appendChild(li);
    });
    
    const currentSelectionExists = selectedPokemonKey && (data.pokedex[selectedPokemonKey] || pokedexTab === 'uncollected');
    if (currentSelectionExists) {
        showPokemonDetails(selectedPokemonKey);
    } else if (filteredList.length > 0) {
        const firstPokemon = filteredList[0];
        showPokemonDetails(`${firstPokemon.id}_${firstPokemon.isShiny ? "shiny" : "normal"}`);
    }
}

// 포켓몬 상세 정보 표시
export function showPokemonDetails(pokemonKey) {
    setSelectedPokemonKey(pokemonKey);
    let pokemon;
    
    if (pokemonKey && data.pokedex[pokemonKey]) {
        pokemon = data.pokedex[pokemonKey];
    } else if (pokemonKey) {
        const [id] = pokemonKey.split('_');
        const basePokemon = POKEMON_DATA.find(p => p.id == id);
        if (basePokemon) {
            pokemon = { ...basePokemon, isShiny: pokemonKey.endsWith('shiny'), count: 0 };
        }
    }
    
    if (!pokemon) {
        dom.pokemonDetailView.innerHTML = '<p class="text-gray-500">리스트에서 포켓몬을 선택하세요.</p>';
        return;
    }

    const hasPokemon = pokemon.count > 0;
    const shinyClass = pokemon.isShiny ? "shiny-pokemon-image" : "";
    const shinyText = pokemon.isShiny ? "shiny-text" : "text-white";
    const shinyMark = pokemon.isShiny ? "✨" : "";
    
    if (hasPokemon) {
        const isSelectedForSynthesis = synthesisSelection.includes(selectedPokemonKey);
        let synthesisButton = '';
        if (pokedexTab === 'duplicates' && pokemon.count > 0) {
            const disabled = synthesisSelection.length >= 3 && !isSelectedForSynthesis;
            synthesisButton = isSelectedForSynthesis
                ? `<button data-action="deselect-synthesis" class="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">합성 선택 해제</button>`
                : `<button data-action="select-synthesis" class="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}" ${disabled ? 'disabled' : ''}>합성용으로 선택</button>`;
        }

        dom.pokemonDetailView.innerHTML = `
            <div class="w-full text-center">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" class="mx-auto h-48 w-48 object-contain mb-4 ${shinyClass}">
                <h3 class="text-3xl font-bold ${shinyText}">${pokemon.name} ${shinyMark}</h3>
                <p class="text-gray-400 mb-2">#${String(pokemon.id).padStart(3, "0")}</p>
                <div class="flex justify-center items-center gap-2 mb-4">
                    <span class="px-3 py-1 text-sm font-semibold text-white rounded-full ${RARITY_STYLES[pokemon.rarity]}">${pokemon.rarity}</span>
                    <span class="text-lg font-bold">x${pokemon.count}</span>
                </div>
                ${synthesisButton}
            </div>`;
    } else {
        dom.pokemonDetailView.innerHTML = `
            <div class="w-full text-center">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" class="mx-auto h-48 w-48 object-contain mb-4 pokemon-silhouette">
                <h3 class="text-3xl font-bold text-gray-500">???</h3>
                <p class="text-gray-400 mb-2">#${String(pokemon.id).padStart(3, "0")}</p>
                <div class="flex justify-center items-center gap-2 mb-4"><span class="px-3 py-1 text-sm font-semibold text-gray-200 bg-gray-600 rounded-full">${pokemon.rarity}</span></div>
                <p class="text-gray-500">아직 발견하지 못한 포켓몬입니다.</p>
            </div>`;
    }

    document.querySelectorAll(".pokedex-list-item").forEach(el => el.classList.remove("selected"));
    const selectedElement = document.querySelector(`.pokedex-list-item[data-key='${pokemonKey}']`);
    if (selectedElement) selectedElement.classList.add("selected");
}

// 도감 탭 전환
export function switchPokedexTab(tabName) {
    setPokedexTab(tabName);
    clearSynthesisSelection();
    setSelectedPokemonKey(null);

    const tabs = { collected: dom.pokedexTabCollected, duplicates: dom.pokedexTabDuplicates, uncollected: dom.pokedexTabUncollected };
    for (const key in tabs) {
        const isSelected = key === tabName;
        tabs[key].classList.toggle("border-blue-500", isSelected);
        tabs[key].classList.toggle("text-white", isSelected);
        tabs[key].classList.toggle("text-gray-500", !isSelected);
    }

    dom.synthesisControls.classList.toggle("hidden", tabName !== 'duplicates');
    updateSynthesisUI();
    renderPokedex();
}

// 합성 UI 업데이트
export function updateSynthesisUI() {
    dom.synthesisCount.textContent = synthesisSelection.length;
    dom.synthesisBtn.disabled = synthesisSelection.length !== 3;
}

// 포켓몬 포획 모달 표시
export function showCaughtModal(pokemon, isNew) {
    dom.pokeballContainer.classList.remove("hidden");
    dom.caughtPokemonInfo.classList.add("hidden");
    const pokeballImg = dom.pokeballContainer.querySelector("img");
    pokeballImg.classList.remove("pokeball-animation");
    dom.modalCaught.classList.remove("hidden");

    setTimeout(() => { pokeballImg.classList.add("pokeball-animation"); }, 100);

    setTimeout(() => {
        dom.pokeballContainer.classList.add("hidden");
        dom.caughtPokemonInfo.classList.remove("hidden");
        
        dom.pokemonName.innerHTML = `${pokemon.name} ${pokemon.isShiny ? '<span class="shiny-text">✨</span>' : ''}`;
        dom.pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
        dom.pokemonImage.className = `mx-auto h-48 w-48 object-contain mb-4 ${pokemon.isShiny ? "shiny-pokemon-image" : ""}`;
        dom.pokemonId.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
        dom.pokemonRarity.textContent = pokemon.rarity;
        dom.pokemonRarity.className = `px-3 py-1 text-sm font-semibold text-white rounded-full ${RARITY_STYLES[pokemon.rarity]}`;
        dom.pokemonIsNew.textContent = isNew ? (pokemon.isShiny ? "✨ 새로운 이로치 포켓몬! ✨" : "✨ 새로운 포켓몬! ✨") : (pokemon.isShiny ? "이로치 포켓몬을 또 잡았다!" : "이미 잡은 포켓몬입니다.");
        dom.pokemonShine.classList.toggle("hidden", !pokemon.isShiny);
    }, 1500);
}

// 메인 탭 전환 (도감/상점)
export function switchMainTab(tabName) {
    const isPokedex = tabName === 'pokedex';
    dom.pokedexView.classList.toggle('hidden', !isPokedex);
    dom.shopView.classList.toggle('hidden', isPokedex);
    
    dom.mainTabPokedex.classList.toggle('border-blue-500', isPokedex);
    dom.mainTabPokedex.classList.toggle('text-white', isPokedex);
    dom.mainTabPokedex.classList.toggle('text-gray-500', !isPokedex);
    
    dom.mainTabShop.classList.toggle('border-blue-500', !isPokedex);
    dom.mainTabShop.classList.toggle('text-white', !isPokedex);
    dom.mainTabShop.classList.toggle('text-gray-500', isPokedex);
}

// 상점 렌더링
export function renderShop() {
    dom.shopSellList.innerHTML = "";
    dom.shopBuyList.innerHTML = "";

    for (const item in data.shopConfig.sell) {
        const itemInfo = EGG_TYPES[item];
        const price = data.shopConfig.sell[item];
        const count = data.inventory[item];
        const disabled = count > 0 ? '' : 'opacity-50 cursor-not-allowed';
        dom.shopSellList.innerHTML += `<div class="flex justify-between items-center bg-gray-700 p-2 rounded-lg"><div><img src="${itemInfo.img}" class="inline h-6 w-6 mr-2">${itemInfo.name}</div><div class="flex items-center gap-3"><span class="text-sm text-gray-400">개당 ${price} 코인</span><button data-action="sell" data-item="${item}" class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded-md ${disabled}" ${disabled && 'disabled'}>판매</button></div></div>`;
    }

    for (const item in data.shopConfig.buy) {
        const itemInfo = EGG_TYPES[item];
        const price = data.shopConfig.buy[item];
        const canAfford = data.inventory.coins >= price;
        const disabled = !canAfford ? 'opacity-50 cursor-not-allowed' : '';
        dom.shopBuyList.innerHTML += `<div class="flex justify-between items-center bg-gray-700 p-2 rounded-lg"><div><img src="${itemInfo.img}" class="inline h-6 w-6 mr-2">${itemInfo.name}</div><div class="flex items-center gap-3"><span class="text-sm text-gray-400">개당 ${price} 코인</span><button data-action="buy" data-item="${item}" class="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded-md ${disabled}" ${!canAfford && 'disabled'}>구매</button></div></div>`;
    }
}

// --- 관리자 페이지 ---
export function openAdminPage() {
    dom.appContainer.classList.add('hidden');
    dom.adminPage.classList.remove('hidden');
    renderAdminPage();
}

export function closeAdminPage() {
    dom.adminPage.classList.add('hidden');
    dom.appContainer.classList.remove('hidden');
}

export function renderAdminPage() {
    let probHTML = "<h4 class='font-bold text-lg mb-2'>알 부화 확률</h4>";
    for (const eggType in data.probabilityConfig) {
        if (eggType === 'shiny') continue;
        probHTML += `<div class="p-2 bg-gray-800 rounded mb-2"><p class="font-semibold text-yellow-300">${EGG_TYPES[eggType].name}</p>`;
        for (const rarity in data.probabilityConfig[eggType]) {
            probHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-${eggType}-${rarity}">${rarity}</label><input type="number" step="0.1" id="prob-${eggType}-${rarity}" value="${data.probabilityConfig[eggType][rarity]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
        }
        probHTML += "</div>";
    }
    probHTML += "<h4 class='font-bold text-lg mt-4 mb-2'>이로치 등장 확률</h4>";
    for (const rarity in data.probabilityConfig.shiny) {
        probHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-shiny-${rarity}">${rarity}</label><input type="number" step="0.01" id="prob-shiny-${rarity}" value="${data.probabilityConfig.shiny[rarity]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    }
    dom.adminProbabilitySettings.innerHTML = probHTML;

    let shopHTML = "<h4 class='font-bold text-lg mb-2'>판매 가격</h4>";
    for (const item in data.shopConfig.sell) {
        shopHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="price-sell-${item}">${EGG_TYPES[item].name}</label><input type="number" id="price-sell-${item}" value="${data.shopConfig.sell[item]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    }
    shopHTML += "<h4 class='font-bold text-lg mt-4 mb-2'>구매 가격</h4>";
    for (const item in data.shopConfig.buy) {
        shopHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="price-buy-${item}">${EGG_TYPES[item].name}</label><input type="number" id="price-buy-${item}" value="${data.shopConfig.buy[item]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    }
    dom.adminShopSettings.innerHTML = shopHTML;
    
    let rewardHTML = `<h4 class='font-bold text-lg mb-2'>알 획득 확률 (%)</h4>`;
    rewardHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-reward-normal">포켓몬 알</label><input type="number" step="0.1" id="prob-reward-normal" value="${data.rewardProbabilities.normal}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    rewardHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-reward-rare">레어 포켓몬 알</label><input type="number" step="0.1" id="prob-reward-rare" value="${data.rewardProbabilities.rare}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    rewardHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="prob-reward-epic">에픽 포켓몬 알</label><input type="number" step="0.1" id="prob-reward-epic" value="${data.rewardProbabilities.epic}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    rewardHTML += `<h4 class='font-bold text-lg mt-4 mb-2'>천장 시스템</h4>`;
    rewardHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="pity-threshold">천장 횟수 (일반 알 연속)</label><input type="number" id="pity-threshold" value="${data.pitySystemConfig.threshold}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    dom.adminRewardSettings.innerHTML = rewardHTML;

    let inventoryHTML = `<h4 class='font-bold text-lg mb-2'>아이템 수량</h4>`;
    inventoryHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="inv-edit-coins">코인</label><input type="number" id="inv-edit-coins" value="${data.inventory.coins}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    for (const eggType in EGG_TYPES) {
        inventoryHTML += `<div class="flex justify-between items-center text-sm my-1"><label for="inv-edit-${eggType}">${EGG_TYPES[eggType].name}</label><input type="number" id="inv-edit-${eggType}" value="${data.inventory[eggType]}" class="w-20 bg-gray-700 rounded p-1 text-center"></div>`;
    }
    dom.adminInventorySettings.innerHTML = inventoryHTML;

    dom.adminPokemonList.innerHTML = "";
    [...POKEMON_DATA].sort((a,b) => a.id - b.id).forEach(pokemon => {
        const keyNormal = `${pokemon.id}_normal`, keyShiny = `${pokemon.id}_shiny`;
        const countNormal = data.pokedex[keyNormal]?.count || 0, countShiny = data.pokedex[keyShiny]?.count || 0;
        const itemDiv = document.createElement("div");
        itemDiv.className = "admin-item grid grid-cols-3 gap-4 items-center p-2 bg-gray-700 rounded-lg mb-2";
        itemDiv.dataset.keyNormal = keyNormal;
        itemDiv.dataset.keyShiny = keyShiny;
        itemDiv.innerHTML = `<div class="flex items-center col-span-1"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" class="h-8 w-8 mr-2 bg-gray-800 rounded-full"><span class="font-semibold text-sm">#${String(pokemon.id).padStart(3, '0')} ${pokemon.name}</span></div><div class="flex items-center gap-2"><label for="count-${keyNormal}" class="text-sm text-gray-400">일반:</label><input type="number" id="count-${keyNormal}" value="${countNormal}" min="0" class="w-16 bg-gray-900 rounded p-1 text-center"></div><div class="flex items-center gap-2"><label for="count-${keyShiny}" class="text-sm text-yellow-300">이로치:</label><input type="number" id="count-${keyShiny}" value="${countShiny}" min="0" class="w-16 bg-gray-900 rounded p-1 text-center"></div>`;
        dom.adminPokemonList.appendChild(itemDiv);
    });
}

// --- 유틸리티 함수 ---
export function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    const bgColor = type === "error" ? "bg-red-500" : "bg-blue-500";
    notification.className = `fixed bottom-5 right-5 text-white px-4 py-2 rounded-lg shadow-lg z-50 ${bgColor}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => { notification.remove(); }, 3000);
}

export function setupUI() {
    const generations = [...new Set(POKEMON_DATA.map(p => p.gen))];
    generations.sort((a, b) => a - b).forEach(gen => {
        dom.genFilter.innerHTML += `<option value="${gen}">${gen}세대</option>`;
    });

    const rarities = new Set();
    Object.values(data.probabilityConfig).forEach(config => {
        if(typeof config === 'object') {
            Object.keys(config).forEach(rarity => rarities.add(rarity));
        }
    });

    // shiny는 등급이 아니므로 제외
    rarities.delete('shiny');

    const sortedRarities = Array.from(rarities).sort((a,b) => {
        const order = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4 };
        return order[a] - order[b];
    });

    sortedRarities.forEach(rarity => {
        dom.rarityFilter.innerHTML += `<option value="${rarity}">${rarity}</option>`;
    });
};
