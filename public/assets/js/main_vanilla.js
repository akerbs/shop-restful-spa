'use strict';
{
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  fetch('/products')
    .then( (res) => res.json() )
    .then( (products) => showProductList(products) );


  // fetch('/product/')
  //   .then( (res) => res.json())
  //   .then( (codes) => Promise.all( codes.map( (code) => fetch(`/product/${code}`))))
  //   .then( (res) => Promise.all( res.map( (r) => r.json())))
  //   .then( (products) => showProductList(products) );


  const showProductList = (products) => {
    console.log('Products: ', products);
 
    products.forEach( (product) => {
      const listItemEl =  document.createElement('li');
      const linkEl = document.createElement('a');

      // linkEl.setAttribute('id', product.code);
      linkEl.id = product.code;
      // linkEl.setAttribute('href', product.code);
      linkEl.href = '#';
      linkEl.textContent = product.shortDescription;
      linkEl.addEventListener('click', (event) => {
        onLinkClick(event, product);
      } );
      listItemEl.appendChild(linkEl);
      $('.products .list').appendChild(listItemEl);
    });

  }

   
  const onLinkClick = (event, product) => {
    console.log(event);
    event.preventDefault();
    
    const headlineEl = document.createElement('h1');
    const pTaglineEl = document.createElement('p');
    const pPriceEl = document.createElement('p');
    const pStockEl = document.createElement('p');
    const currentEl = event.currentTarget;

    headlineEl.textContent = product.shortDescription;
    pTaglineEl.textContent = product.tagline
    pPriceEl.textContent = product.price;
    pStockEl.textContent = 'Last items in stock!';

  
    $$('.products a').forEach( (linkEl) => {
      linkEl.classList.remove('hi');
    })
    currentEl.classList.add('hi');

    $('#product_detail').textContent = '';
    $('#product_detail').appendChild(headlineEl);
    $('#product_detail').appendChild(pTaglineEl);
    $('#product_detail').appendChild(pPriceEl);

    if (product.stockwarn) {
    $('#product_detail').appendChild(pStockEl);
    }
  };

  const highlightProduct = (code) => {
    $$('a').forEach( (linkEl) => linkEl.classList.remove('hi'));
    $(`#${code}`).classList.add('hi');
  }


}

