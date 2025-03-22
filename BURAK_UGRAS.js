(() => {
  const init = () => {
    const script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    script.type = "text/javascript";
    script.onload = () => {
      console.log("jQuery yüklendi.");
      buildHTML();
      buildCSS();
      fetchProducts();
      setEvents();
    };
    script.onerror = () => {
      console.log("jQuery yüklenemedi.");
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  const buildHTML = () => {
    const selectedProducts = document.createElement("div");
    selectedProducts.className = "selected-products";
    document.body.appendChild(selectedProducts);

    const html = `
          <div class="carousel-container">
            <div class="container">
                <h2>Sizin İçin Seçtiklerimiz</h2>
                <button class="previous-button"><span>❮</span></button>
                    <div class="carousel">
                        <!-- ürünlr buraya -->
                    </div>
                <button class="next-button"><span>❯</span></button>
            </div>
          </div>
      `;

    $(".selected-products").append(html);
  };

  const buildCSS = () => {
    //
  };

  const fetchProducts = () => {
    const apiUrl =
      "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then((products) => {
        if (!localStorage.getItem("products")) {
          localStorage.setItem("products", JSON.stringify(products));
        }
        renderProducts(products);
      })
      .catch((error) => {
        console.error("Verileri çekerken hata meydana geldi:", error);
      });
  };

  const renderProducts = (products) => {
    const carousel = $(".carousel");
    carousel.empty();

    products.forEach((product) => {
      const favoriteIds = JSON.parse(localStorage.getItem("favoriteIds")) || [];
      const isFavorited = favoriteIds.includes(product.id) ? "favorited" : "";

      const productCard = $("<div>")
        .addClass("product-card")
        .attr("data-product-id", product.id)
        .append($("<img>").attr("src", product.img).attr("alt", product.name))
        .append(
          $("<button>")
            .addClass("favorite-button")
            .addClass(isFavorited)
            .append($("<span>").addClass("fav-icon").text("❤"))
        )
        .append(
          $("<div>")
            .addClass("product-info")
            .append($("<h3>").text(product.name))
        )
        .append(
          $("<div>")
            .addClass("product-price")
            .append("<span>")
            .text(`${product.price} TL`)
        );

      carousel.append(productCard);
    });
  };

  const toggleFavorites = () => {
    
  };

  const slideCarousel = () => {
    //
  };

  const setEvents = () => {
    //
  };

  init();
})();
