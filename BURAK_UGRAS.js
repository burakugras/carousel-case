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
              <p>Sizin İçin Seçtiklerimiz</p>
              <div class="carousel">
                  <!-- ürünlr buraya -->
              </div>
              <button class="previous-button"><span>❮</span></button>
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
        //
    };

    const renderProducts = () => {
        //
    };

    const toggleFavorites = () => {
        //
    };

    const slideCarousel = () => {
        //
    };

    const setEvents = () => {
        //
    };

    init();
})();
