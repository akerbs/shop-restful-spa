'use strict';

{
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  fetch('/products')
    .then( (res) => res.json() )
    .then( (products) => showProductList(products) );


  // $.getJSON('/produts', (products) => {
  //   showProductList(products)
  // });


  // fetch('/product/')
  //   .then( (res) => res.json())
  //   .then( (codes) => Promise.all( codes.map( (code) => fetch(`/product/${code}`))))
  //   .then( (res) => Promise.all( res.map( (r) => r.json())))
  //   .then( (products) => showProductList(products) );


  const showProductList = (products) => {
    console.log('Products: ', products);
  
    $('.products .list').innerHTML = ejs.render(
      `
      <% products.forEach(product => { %>
        <li><a id="<%= product.code %>" href="#"><%= product.shortDescription %></a></li>
      <% }); %>
      `, { products});

    
    products.forEach ( (product) => {
      
      $(`#${product.code}`).addEventListener("click", (event) => {
        event.preventDefault();
        $('#product_detail').innerHTML = ejs.render(`
          <h1><%= product.shortDescription %></h1>
          <p><i><%= product.tagline %></i></p>
          <p>Price: EUR <%= product.price %></p>

          <% if (product.stockwarn) { %>
              <p>Last items in stock!</p>
          <% } %>
        `, { product });

        highlightProduct(product.code);

      });
    });
  }

  const highlightProduct = (code) => {
    $$('a').forEach( (linkEl) => linkEl.classList.remove('hi'));
    $(`#${code}`).classList.add('hi');
  }


}

