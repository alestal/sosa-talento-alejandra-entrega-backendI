/*const socket = io();


const form = document.getElementById('productForm');
const list = document.getElementById('productList');

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const product = Object.fromEntries(formData.entries());
  product.price = parseFloat(product.price);
  product.stock = parseInt(product.stock);

  socket.emit('addProduct', product);
  form.reset();
});


function deleteProduct(id) {
  socket.emit('deleteProduct', id);
}

socket.on('productList', (products) => {
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.setAttribute('data-id', p.id);
    li.innerHTML = `<strong>${p.title}</strong> - $${p.price} <button onclick="deleteProduct(${p.id})">Eliminar</button>`;
    list.appendChild(li);
  });
});
*/