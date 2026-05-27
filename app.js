const grid = document.getElementById('grid');

motos.forEach(m => {
 const old = m.precio + 3000;
 
 // 1. Creamos la tarjeta en el HTML
 const card = document.createElement('div');
 card.className = 'card';
 
 // 2. Estructura interna de la tarjeta
 card.innerHTML = `
   <img id="img-${m.nombre}" src="assets/img/motos/${m.nombre}.png">
   <h2>${m.modelo}</h2>
   <p>${m.categoria}</p>
   <div class="old">Q${old.toLocaleString()}</div>
   <div class="price">Q${m.precio.toLocaleString()}</div>
   <a class="btn" target="_blank"
   href="https://wa.me/50231721906?text=Hola%20me%20interesa%20${encodeURIComponent(m.modelo)}">
   Me interesa
   </a>
 `;
 
 grid.appendChild(card);

 // 3. Lógica inteligente para probar formatos si falla el .png inicial
 const imgElement = document.getElementById(`img-${m.nombre}`);
 
 imgElement.onerror = function() {
   // Si no era .png, prueba con .jpg
   if (this.src.endsWith('.png')) {
     this.src = `assets/img/motos/${m.nombre}.jpg`;
   } 
   // Si tampoco era .jpg, prueba con .jpeg
   else if (this.src.endsWith('.jpg')) {
     this.src = `assets/img/motos/${m.nombre}.jpeg`;
   } 
   // Si tampoco, prueba con .webp
   else if (this.src.endsWith('.jpeg')) {
     this.src = `assets/img/motos/${m.nombre}.webp`;
   } 
   // Si no es ninguno, pone la imagen por defecto para que no quede vacío
   else {
     this.src = 'assets/img/placeholder.png';
     this.onerror = null; // Evita bucles infinitos
   }
 };
});