'use strict';

(($) => {

  // $.ajax('/products').done((data) => {
  //   console.log(data);
  // })

  // $.getJSON('/products', (data) => {
  //   console.log(data);
  // });

  $.ajax({
    url: '/products',
    method: 'GET',
    
  }).done((prodcuts) => {
    console.log(prodcuts);
    showProductList(prodcuts);
  }).fail((error) => {

  })


  const showProductList = (products) => {
    $.each(products, (i, product) => {
      const linkEl = $('<a/>', {
        id: product.code,
        href: `#${product.code}`,
        text: product.shortDescription
      });
      const listEl = $('<li/>');

      linkEl.on('click', (event) => {
        // event.preventDefault();
        onLinkClick(event, product);
      });

      listEl.append(linkEl);
      // linkEl.appendTo(listEl);
      listEl.appendTo('.products .list');
    });
  };

  const onLinkClick = (event, product) => {

    const currentEl = $(event.currentTarget);
    const headlineEl = $('<h1/>', { text: product.shortDescription });
    const tagLineEl = $('<p/>', { text: product.tagline });
    const priceEl = $('<p/>', { text: product.price });
    const stockEl = $('<p/>', { text: 'Last items in stock!'});

    $('.products .list a').removeClass('hi');
    currentEl.addClass('hi')

    $('#product_detail').html('').append(headlineEl, tagLineEl, priceEl, (product.stockwarn) ? stockEl : '');

  }





})(jQuery)

