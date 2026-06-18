// --- MANEJO DEL DOM ---
const grid = document.getElementById('grid');
const searchInput = document.getElementById('search-input');
const categoriesTabs = document.getElementById('categories-tabs');
const sortSelect = document.getElementById('sort-select');
const dynamicLogo = document.getElementById('dynamic-logo');

// --- DATOS DE AGENCIA Y GLOBALES ---
const numeroMalacatan = "50231721906";
let currentSelectedMoto = null;
let paymentType = "";
let selectedBank = "";
let selectedInstallments = "";
let exactCalc = 0;
let roundedCalc = 0;
let creditDownPayment = 0;

const q = n => "Q" + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const roundUp = (n, step = 100) => Math.ceil(Number(n || 0) / step) * step;

// --- SISTEMA DE LOGOS DINÁMICOS ---
const logosAgencias = [
    { src: 'assets/img/logo-freedom.png', title: 'CATÁLOGO FREEDOM' },
    { src: 'assets/img/logo-freedom.png', title: 'FREEDOM - MALACATÁN' }
];
let logoIndex = 0;
setInterval(() => {
    logoIndex = (logoIndex + 1) % logosAgencias.length;
    dynamicLogo.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('hero-title').innerText = logosAgencias[logoIndex].title;
        dynamicLogo.style.opacity = '1';
    }, 400);
}, 5000);

// --- RENDERIZADO DEL CATÁLOGO (CON SEPARACIÓN DE CATEGORÍAS) ---
function renderCatalog(filterCategory = 'all', searchTerm = '', sortBy = 'default') {
    grid.innerHTML = '';
    let filteredMotos = [...motos];

    if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        filteredMotos = filteredMotos.filter(m => 
            m.modelo.toLowerCase().includes(term) || 
            m.categoria.toLowerCase().includes(term) ||
            m.nombre.toLowerCase().includes(term)
        );
    }

    if (filterCategory !== 'all') {
        filteredMotos = filteredMotos.filter(m => m.categoria === filterCategory);
    }

    if (sortBy === 'low') filteredMotos.sort((a, b) => a.precio - b.precio);
    else if (sortBy === 'high') filteredMotos.sort((a, b) => b.precio - a.precio);
    else if (sortBy === 'az') filteredMotos.sort((a, b) => a.modelo.localeCompare(b.modelo));

    // Si no hay filtros activos, agrupar visualmente por categoría
    if (filterCategory === 'all' && searchTerm.trim() === '' && sortBy === 'default') {
        const uniqueCategories = [...new Set(filteredMotos.map(m => m.categoria))];
        uniqueCategories.forEach(cat => {
            const motosInCat = filteredMotos.filter(m => m.categoria === cat);
            if (motosInCat.length > 0) {
                const header = document.createElement('h2');
                header.className = 'category-header';
                header.innerText = cat;
                grid.appendChild(header);
                
                const catGrid = document.createElement('div');
                catGrid.className = 'cat-grid';
                motosInCat.forEach(m => catGrid.appendChild(createCardHTML(m)));
                grid.appendChild(catGrid);
            }
        });
    } else {
        // Renderizado normal cuando hay búsquedas o filtros
        const catGrid = document.createElement('div');
        catGrid.className = 'cat-grid';
        filteredMotos.forEach(m => catGrid.appendChild(createCardHTML(m)));
        grid.appendChild(catGrid);
    }
}

function createCardHTML(m) {
    const oldPrice = m.precio + 3000;
    const card = document.createElement('div');
    card.className = 'card';
    let badgeHtml = m.modelo.toLowerCase().includes('nuevo') ? `<span class="card-tag">🔥 Nuevo</span>` : '';

    card.innerHTML = `
        ${badgeHtml}
        <img id="img-${m.nombre}" src="assets/img/motos/${m.nombre}.png" alt="${m.modelo}">
        <div>
            <h2>${m.modelo}</h2>
            <div class="card-cat">${m.categoria}</div>
        </div>
        <div class="price-box">
            <div class="old">Q${oldPrice.toLocaleString('es-GT')}</div>
            <div class="price">Q${m.precio.toLocaleString('es-GT')}</div>
            <button class="btn btn-open-modal" data-id="${m.nombre}">Me interesa</button>
        </div>
    `;
    setTimeout(() => setupImageFallback(document.getElementById(`img-${m.nombre}`), m.nombre), 0);
    return card;
}

function setupImageFallback(imgElement, name) {
    if(!imgElement) return;
    let attempts = 0;
    imgElement.onerror = function() {
        attempts++;
        if (attempts === 1) this.src = `assets/img/motos/${name}.jpg`;
        else if (attempts === 2) this.src = `assets/img/motos/${name}.jpeg`;
        else if (attempts === 3) this.src = `assets/img/motos/${name}.webp`;
        else { this.src = 'assets/img/placeholder.png'; this.onerror = null; }
    };
}

searchInput.addEventListener('input', () => {
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-category');
    renderCatalog(activeTab, searchInput.value, sortSelect.value);
});

categoriesTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderCatalog(e.target.getAttribute('data-category'), searchInput.value, sortSelect.value);
    }
});

sortSelect.addEventListener('change', () => {
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-category');
    renderCatalog(activeTab, searchInput.value, sortSelect.value);
});

// --- LÓGICA DE MODALES Y EMBUDO DIRECTO A WHATSAPP ---
const paymentDialog = document.getElementById("paymentDialog");
const calcDialog = document.getElementById("calcDialog");
const loadingDialog = document.getElementById("loadingDialog");

grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-open-modal')) {
        currentSelectedMoto = motos.find(m => m.nombre === e.target.getAttribute('data-id'));
        if (currentSelectedMoto) openMotoModal();
    }
});

function openMotoModal() {
    document.getElementById('modal-title').innerText = currentSelectedMoto.modelo;
    document.getElementById('modal-category').innerText = currentSelectedMoto.categoria;
    document.getElementById('modal-price').innerText = q(currentSelectedMoto.precio);
    document.getElementById('modal-old-price').innerText = q(currentSelectedMoto.precio + 3000);
    const modalImg = document.getElementById('modal-img');
    modalImg.src = `assets/img/motos/${currentSelectedMoto.nombre}.png`;
    setupImageFallback(modalImg, currentSelectedMoto.nombre);
    
    paymentType = ""; selectedBank = ""; selectedInstallments = "";
    document.getElementById("paymentOptions").classList.remove("hidden");
    document.getElementById("creditStep").classList.add("hidden");
    document.getElementById("visaBankStep").classList.add("hidden");
    document.getElementById("visaInstallmentStep").classList.add("hidden");
    paymentDialog.showModal();
}

function paymentLabel() {
    return paymentType === "credito" ? "Crédito" : paymentType === "visa" ? "Visa cuotas" : paymentType === "contado" ? "Contado" : "Información";
}

function buildClientMessage(custom) {
    if (custom) return custom;
    if (!currentSelectedMoto) return `Hola, quiero información del catálogo.\nAgencia seleccionada: Malacatán`;
    
    let lines = [
        `Hola, me interesa esta moto:`,
        ``,
        `Moto: ${currentSelectedMoto.modelo}`,
        `Precio de lista: ${q(currentSelectedMoto.precio)}`,
        `Tipo de pago: ${paymentLabel()}`
    ];
    if (paymentType === "credito") lines.push(`Mínimo de enganche: ${q(creditDownPayment)}`);
    if (paymentType === "visa") { lines.push(`Banco: ${selectedBank}`); lines.push(`Plazo: ${selectedInstallments}`); }
    if (paymentType === "contado") lines.push(`Deseo información para compra de contado.`);
    lines.push(`Agencia: Malacatán`);
    return lines.join("\n");
}

function wa(custom) {
    let msg = buildClientMessage(custom);
    try { calcDialog.close(); } catch(e){}
    try { paymentDialog.close(); } catch(e){}
    
    loadingDialog.showModal();
    setTimeout(() => {
        loadingDialog.close();
        window.location.href = `https://wa.me/${numeroMalacatan}?text=${encodeURIComponent(msg)}`;
    }, 1600);
}

document.querySelectorAll("[data-close-payment]").forEach(b => b.onclick = () => paymentDialog.close());
document.querySelectorAll("[data-close-calc]").forEach(b => b.onclick = () => calcDialog.close());
document.getElementById("contactBtn").onclick = () => { currentSelectedMoto = null; wa("Hola, deseo comunicarme con un asesor de ventas de Freedom Malacatán."); };
document.getElementById("calcBtn").onclick = () => calcDialog.showModal();

// Lógica de Calculadora Universal
document.getElementById("calcValue").addEventListener('input', () => {
    let v = Number(document.getElementById("calcValue").value || 0);
    exactCalc = v * 0.15;
    roundedCalc = roundUp(exactCalc, 100);
    document.getElementById("calcExact").textContent = q(exactCalc);
    document.getElementById("calcResult").textContent = q(roundedCalc);
});

document.getElementById("sendCalcBtn").onclick = () => {
    let val = Number(document.getElementById("calcValue").value || 0);
    wa(`Hola, calculé un enganche.\nValor de moto: ${q(val)}\n15% calculado: ${q(exactCalc)}\nEnganche redondeado: ${q(roundedCalc)}\nAgencia: Malacatán`);
};

// Eventos del Embudo de Pagos
document.querySelectorAll("[data-pay]").forEach(b => b.onclick = () => {
    paymentType = b.dataset.pay;
    if (paymentType === "contado") { wa(); }
    if (paymentType === "credito") {
        creditDownPayment = roundUp(currentSelectedMoto.precio * 0.15, 100);
        document.getElementById("creditDownPayment").textContent = q(creditDownPayment);
        document.getElementById("paymentOptions").classList.add("hidden");
        document.getElementById("creditStep").classList.remove("hidden");
    }
    if (paymentType === "visa") {
        document.getElementById("paymentOptions").classList.add("hidden");
        document.getElementById("visaBankStep").classList.remove("hidden");
    }
});

document.getElementById("creditNext").onclick = () => { wa(); };

const banks = ["BI", "Proamérica", "G&T", "BAM", "Bantrab", "Occidente", "Banrural", "Ficohsa", "Micoope", "Otros"];
document.getElementById("bankGrid").innerHTML = banks.map(b => `<button class="bankBtn" data-bank="${b}">${b}</button>`).join("");
document.querySelectorAll("[data-bank]").forEach(b => b.onclick = () => {
    selectedBank = b.dataset.bank;
    document.getElementById("visaBankStep").classList.add("hidden");
    document.getElementById("visaInstallmentStep").classList.remove("hidden");
});

const months = [6, 10, 12, 15, 18];
document.getElementById("installmentGrid").innerHTML = months.map(m => `<button class="bankBtn" data-months="${m} cuotas">${m} cuotas</button>`).join("");
document.querySelectorAll("[data-months]").forEach(b => b.onclick = () => {
    selectedInstallments = b.dataset.months;
    wa();
});

renderCatalog();