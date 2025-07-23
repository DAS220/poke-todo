// js/ui.js 
import { dom } from './dom.js';
import * as state from './state.js';
import * as constants from './constants.js';

export function renderTodos() {
    dom.todoList.innerHTML = "";
    const todos = Object.entries(state.data.todos);
    if (todos.length === 0) {
        dom.todoList.innerHTML = '<li class="text-gray-500 text-center py-4">할 일이 없습니다.</li>';
        return;
    }
    todos.sort(([, a], [, b]) => a.completed - b.completed).forEach(([id, todo]) => {
        const li = document.createElement("li");
        li.dataset.id = id;
        li.className = `task-item flex items-center p-3 rounded-lg transition-colors ${todo.completed ? "bg-gray-700 text-gray-500 line-through" : "bg-gray-800"}`;
        let buttons = !todo.completed ? '<button class="complete-btn bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded-md mr-2">완료</button>' : '';
        buttons += '<button class="delete-btn bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded-md">삭제</button>';
        li.innerHTML = `<span class="flex-grow">${todo.text}</span> ${buttons}`;
        dom.todoList.appendChild(li);
    });
}

export function renderInventory() {
    let inventoryHTML = `<div class="flex items-center justify-between"><span class="font-bold text-lg">코인</span></div><span class="font-bold text-lg text-yellow-400">${state.data.inventory.coins}</span></div>`;
    for (const eggType in constants.EGG_TYPES) {
        const eggInfo = constants.EGG_TYPES[eggType];
        const count = state.data.inventory[eggType];
        const disabled = count > 0 ? "" : "opacity-50 cursor-not-allowed";
        inventoryHTML += `<div class="flex items-center justify-between"><div class="flex items-center"><img src="${eggInfo.img}" class="h-8 w-8 mr-3"><span class="font-bold text-lg">${eggInfo.name}</span></div><div class="flex items-center gap-2"><span class="font-bold text-lg">${count}</span><button data-egg-type="${eggType}" class="hatch-btn bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded-md ${disabled}" ${!disabled}>부화</button></div></div>`;
    }
    dom.inventoryList.innerHTML = inventoryHTML;
}

export function updatePokedexProgress() {
    const collectedIds = Object.keys(state.data.pokedex).map(key => key.split('_')[0]);
    const uniqueCollectedCount = new Set(collectedIds).size;
    dom.pokedexProgress.textContent = `도감 완성도: ${uniqueCollectedCount} / ${constants.POKEMON_DATA.length}`;
}

export function renderPokedex() {
    dom.pokedexListContainer.innerHTML = "";
    let filteredList;
    if (state.pokedexTab === 'uncollected') {
        const collectedIds = new Set(Object.keys(state.data.pokedex).map(key => key.split('_')[0]));
        filteredList = constants.POKEMON_DATA.filter(p => !collectedIds.has(String(p.id)));
    } else {
        let allCollected = Object.values(state.data.pokedex);
        if (state.pokedexTab === 'duplicates') {
            const countsById = allCollected.reduce((acc, p) => ({ ...acc, [p.id]: (acc[p.id] || 0) + p.count }), {});
            filteredList = allCollected.filter(p => countsById[p.id] > 1);
        } else {
            filteredList = allCollected;
        }
    }
    if (dom.genFilter.value !== 'all') filteredList = filteredList.filter(p => p.gen == dom.genFilter.value);
    if (dom.rarityFilter.value !== 'all') filteredList = filteredList.filter(p => p.rarity === dom.rarityFilter.value);
    filteredList.sort((a, b) => a.id - b.id || (a.isShiny ? 1 : 0) - (b.isShiny ? 1 : 0));

    if (filteredList.length === 0) {
        dom.pokedexListContainer.innerHTML = '<div class="text-center text-gray-500 py-8">해당하는 포켓몬이 없습니다.</div>';
        showPokemonDetails(null);
        return;
    }
    filteredList.forEach(pokemon => {
        const pokemonKey = `${pokemon.id}_${pokemon.isShiny ? "shiny" : "normal"}`;
        const isSelectedForSynthesis = state.synthesisSelection.includes(pokemonKey);
        const li = document.createElement("div");
        li.className = `pokedex-list-item p-2 rounded-md hover:bg-gray-700 cursor-pointer flex justify-between items-center ${state.selectedPokemonKey === pokemonKey ? "selected" : ""}`;
        li.dataset.key = pokemonKey;
        const nameClass = state.pokedexTab === 'uncollected' ? "text-gray-500" : "font-semibold";
        const shinyMark = pokemon.isShiny ? "✨" : "";
        let countDisplay = '';
        if (state.pokedexTab !== 'uncollected') {
            const synthesisMark = isSelectedForSynthesis ? '<span class="text-xs text-purple-400 mr-2">선택됨</span>' : '';
            countDisplay = `<div>${synthesisMark}<span class="text-sm font-bold text-gray-300">x${pokemon.count}</span></div>`;
        }
        li.innerHTML = `<div><span class="text-gray-400">#${String(pokemon.id).padStart(3, "0")}</span><span class="ml-3 ${nameClass}">${pokemon.name} ${shinyMark}</span></div>${countDisplay}`;
        dom.pokedexListContainer.appendChild(li);
    });
    const currentSelectionExists = state.selectedPokemonKey && (state.data.pokedex[state.selectedPokemonKey] || state.pokedexTab === 'uncollected');
    if (currentSelectionExists) showPokemonDetails(state.selectedPokemonKey);
    else if (filteredList.length > 0) {
        const firstPokemon = filteredList[0];
        showPokemonDetails(`${firstPokemon.id}_${firstPokemon.isShiny ? "shiny" : "normal"}`);
    }
}

export function showPokemonDetails(pokemonKey) {
    state.setSelectedPokemonKey(pokemonKey);
    let pokemon;
    if (pokemonKey && state.data.pokedex[pokemonKey]) pokemon = state.data.pokedex[pokemonKey];
    else if (pokemonKey) {
        const [id] = pokemonKey.split('_');
        const basePokemon = constants.POKEMON_DATA.find(p => p.id == id);
        if (basePokemon) pokemon = { ...basePokemon, isShiny: pokemonKey.endsWith('shiny'), count: 0 };
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
        const isSelectedForSynthesis = state.synthesisSelection.includes(state.selectedPokemonKey);
        let synthesisButton = '';
        if (state.pokedexTab === 'duplicates' && pokemon.count > 0) {
            const disabled = state.synthesisSelection.length >= 3 && !isSelectedForSynthesis;
            synthesisButton = isSelectedForSynthesis ? `<button data-action="deselect-synthesis" class="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">합성 선택 해제</button>` : `<button data-action="select-synthesis" class="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}" ${disabled ? 'disabled' : ''}>합성용으로 선택</button>`;
        }
        dom.pokemonDetailView.innerHTML = `<div class="w-full text-center"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" class="mx-auto h-48 w-48 object-contain mb-4 ${shinyClass}"><h3 class="text-3xl font-bold ${shinyText}">${pokemon.name} ${shinyMark}</h3><p class="text-gray-400 mb-2">#${String(pokemon.id).padStart(3, "0")}</p><div class="flex justify-center items-center gap-2 mb-4"><span class="px-3 py-1 text-sm font-semibold text-white rounded-full ${constants.RARITY_STYLES[pokemon.rarity]}">${pokemon.rarity}</span><span class="text-lg font-bold">x${pokemon.count}</span></div>${synthesisButton}</div>`;
    } else {
        dom.pokemonDetailView.innerHTML = `<div class="w-full text-center"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}" class="mx-auto h-48 w-48 object-contain mb-4 pokemon-silhouette"><h3 class="text-3xl font-bold text-gray-500">???</h3><p class="text-gray-400 mb-2">#${String(pokemon.id).padStart(3, "0")}</p><div class="flex justify-center items-center gap-2 mb-4"><span class="px-3 py-1 text-sm font-semibold text-gray-200 bg-gray-600 rounded-full">${pokemon.rarity}</span></div><p class="text-gray-500">아직 발견하지 못한 포켓몬입니다.</p></div>`;
    }
    document.querySelectorAll(".pokedex-list-item").forEach(el => el.classList.remove("selected"));
    const selectedElement = document.querySelector(`.pokedex-list-item[data-key='${pokemonKey}']`);
    if (selectedElement) selectedElement.classList.add("selected");
}

export function renderShop() {
    dom.shopSellList.innerHTML = "";
    dom.shopBuyList.innerHTML = "";
    for (const item in state.data.shopConfig.sell) {
        const itemInfo = constants.EGG_TYPES[item];
        const price = state.data.shopConfig.sell[item];
        const count = state.data.inventory[item];
        const disabled = count > 0 ? '' : 'opacity-50 cursor-not-allowed';
        dom.shopSellList.innerHTML += `<div class="flex justify-between items-center bg-gray-700 p-2 rounded-lg"><div><img src="${itemInfo.img}" class="inline h-6 w-6 mr-2">${itemInfo.name}</div><div class="flex items-center gap-3"><span class="text-sm text-gray-400">개당 ${price} 코인</span><button data-action="sell" data-item="${item}" class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded-md ${disabled}" ${disabled && 'disabled'}>판매</button></div></div>`;
    }
    for (const item in state.data.shopConfig.buy) {
        const itemInfo = constants.EGG_TYPES[item];
        const price = state.data.shopConfig.buy[item];
        const canAfford = state.data.inventory.coins >= price;
        const disabled = !canAfford ? 'opacity-50 cursor-not-allowed' : '';
        dom.shopBuyList.innerHTML += `<div class="flex justify-between items-center bg-gray-700 p-2 rounded-lg"><div><img src="${itemInfo.img}" class="inline h-6 w-6 mr-2">${itemInfo.name}</div><div class="flex items-center gap-3"><span class="text-sm text-gray-400">개당 ${price} 코인</span><button data-action="buy" data-item="${item}" class="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded-md ${disabled}" ${!canAfford && 'disabled'}>구매</button></div></div>`;
    }
}

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

export function switchPokedexTab(tabName) {
    state.setPokedexTab(tabName);
    state.clearSynthesisSelection();
    state.setSelectedPokemonKey(null);
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

export function updateSynthesisUI() {
    dom.synthesisCount.textContent = state.synthesisSelection.length;
    dom.synthesisBtn.disabled = state.synthesisSelection.length !== 3;
}

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
        dom.pokemonRarity.className = `px-3 py-1 text-sm font-semibold text-white rounded-full ${constants.RARITY_STYLES[pokemon.rarity]}`;
        dom.pokemonIsNew.textContent = isNew ? (pokemon.isShiny ? "✨ 새로운 이로치 포켓몬! ✨" : "✨ 새로운 포켓몬! ✨") : (pokemon.isShiny ? "이로치 포켓몬을 또 잡았다!" : "이미 잡은 포켓몬입니다.");
        dom.pokemonShine.classList.toggle("hidden", !pokemon.isShiny);
    }, 1500);
}

export function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `fixed bottom-5 right-5 text-white px-4 py-2 rounded-lg shadow-lg z-50 ${type === "error" ? "bg-red-500" : "bg-blue-500"}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => { notification.remove(); }, 3000);
}

export function setupInitialUI() {
    const generations = [...new Set(constants.POKEMON_DATA.map(p => p.gen))];
    generations.sort((a, b) => a - b).forEach(gen => {
        dom.genFilter.innerHTML += `<option value="${gen}">${gen}세대</option>`;
    });
    const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
    rarities.forEach(rarity => {
        dom.rarityFilter.innerHTML += `<option value="${rarity}">${rarity}</option>`;
    });
};

export function openAdminPage() {
    dom.appContainer.classList.add('hidden');
    dom.adminPage.classList.remove('hidden');
    renderAdminPage();
}

export function closeAdminPage() {
    dom.adminPage.classList.add('hidden');
    dom.appContainer.classList.remove('hidden');
}

function renderAdminPage() {
    // This function is complex and depends heavily on state and DOM. 
    // It remains here but is called by the exported openAdminPage.
    // (Admin page rendering logic...)
}
