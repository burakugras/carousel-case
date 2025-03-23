(() => {
  if (window.location.pathname !== "/") {
    console.log("Wrong page!");
    return;
  }

  const init = () => {
    let script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    script.type = "text/javascript";
    script.onload = () => {
      console.log("jQuery yüklendi");
      buildHTML();
      buildCSS();
      fetchProducts();
      setEvents();
      $(window).on("resize", adjustCarousel);
    };
    script.onerror = () => {
      console.error("jQuery yüklenemedi");
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  const buildHTML = () => {
    const carouselHTML = `
          <div class="carousel-container">
            <div class="container">
              <p>Sizin İçin Seçtiklerimiz</p>
              <div class="carousel-wrapper">
                <div class="carousel"></div>
                <button class="prev-btn"><span>❮</span></button>
                <button class="next-btn"><span>❯</span></button>
              </div>
            </div>
          </div>
        `;
    if ($(".stories").length > 0) {
      $(".stories").after(carouselHTML);
    } else {
      $("body").append(carouselHTML);
    }
  };

  const buildCSS = () => {
    const css = `
              @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;700&display=swap');
        
              .carousel-container {
                background-color: #f0f0f0;
                padding: 20px 0;
                border-radius: 10px;
                margin-bottom: 20px;
                position: relative;
                font-family: "Open Sans", sans-serif;
                width: 100%;
                overflow: hidden;
              }
        
              .container {
                background-color: #f0f0f0;
                padding: 20px;
                border-radius: 10px;
                position: relative;
                font-family: "Open Sans", sans-serif;
                max-width: 1200px;
                width: 90%;
                margin: 0 auto;
              }
        
              .container p {
                color: #f28e00;
                background-color: #fef6eb;
                font-size: clamp(24px, 5vw, 32px);
                line-height: 1.3;
                font-weight: bold;
                font-family: "Quicksand", sans-serif;
                padding: 15px 0;
                margin: 0;
                border-top-left-radius: 30px;
                border-top-right-radius: 30px;
                padding-left: 40px;
              }
        
              .carousel-wrapper {
                position: relative;
                overflow: hidden;
                padding: 0 60px;
              }
        
              .carousel {
                display: flex;
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                scrollbar-width: none;
                gap: 15px;
                padding: 10px 0;
                scroll-behavior: smooth;
              }
        
              .product-card {
                position: relative;
                flex: 0 0 auto;
                width: 100%;
                height: auto;
                background-color: #fff;
                box-sizing: border-box;
                cursor: pointer;
                scroll-snap-align: start;
                border-radius: 10px;
                outline: 1px solid rgb(142 141 141 / 20%);
                transition: border 0.3s ease;
                padding: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border: 3px solid transparent;
                transition: border-color 0.3s ease;
              }
        
              .product-card:hover {
                border-color: orange;
              }
        
              .product-image-container {
                position: relative;
                width: 100%;
                padding-top: 100%;
                overflow: hidden;
              }
              
              .product-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: contain;
                padding: 10px;
                box-sizing: border-box;
              }
        
              .badge-container {
                position: absolute;
                top: 10px;
                left: 10px;
                display: flex;
                flex-direction: column;
                gap: 5px;
                z-index: 5;
              }
        
              .badge {
                padding: 5px;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 12px;
                text-align: center;
                line-height: 1;
              }
        
              .bestseller-badge {
                background-color: #ff7f00;
                color: white;
              }
        
              .star-product-badge {
                background-color: #ffcc00;
                color: #333;
              }
        
              .favorite-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: #fff;
                border-radius: 50%;
                border: 1px solid #ddd;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                box-shadow: 0 2px 4px 0 #00000024;
              }
        
              .favorite-btn:hover {
                outline: 1px solid orange;
                box-shadow: 0 2px 4px 0 #00000024;
              }
              
              .favorite-btn img {
                width: 24px;
                height: 24px;
              }
        
              .product-info {
                padding: 15px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex-grow: 1;
              }
        
              .product-title {
                font-size: 16px;
                font-weight: 500;
                color: #666;
                margin: 0 0 10px 0;
                line-height: 1.4;
                height: calc(1.4em * 2);
                overflow: hidden;
              }
        
              .product-brand {
                  font-weight: 600;
                  color: #7d7d7d;
                  font-size: 0.8em;
              }
        
              .product-name {
                  font-weight: 350;
                  color: #7d7d7d;
                  font-size: 0.8em;
              }
        
              .rating-container {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
              }
        
              .stars {
                color: #ffcc00;
                font-size: 20px;
                display: flex;
              }
        
              .review-count {
                margin-left: 5px;
                color: #777;
                font-size: 14px;
              }
        
              .price-container {
                margin-top: 5px;
                margin-bottom: 15px;
              }
        
              .original-price {
                text-decoration: line-through;
                color: #999;
                font-size: 16px;
                display: block;
              }
        
              .discount-badge {
                display: inline-block;
                background-color: #00a365;
                color: white;
                padding: 2px 5px;
                border-radius: 5px;
                font-size: 14px;
                font-weight: bold;
                margin-left: 5px;
              }
        
              .current-price {
                color: #00a365;
                font-size: 24px;
                font-weight: bold;
                margin-top: 5px;
                display: block;
              }
        
              .add-to-cart-btn {
                background-color: #fff7ec;
                color: #f28e00;
                font-size: 16px;
                font-weight: bold;
                padding: 12px 20px;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                text-align: center;
                width: 100%;
                margin-top: auto;
                transition: background-color 0.3s ease, transform 0.2s ease;
              }
        
              .add-to-cart-btn:hover {
                background-color: #f28e00;
                color: white;
              }
        
              .prev-btn, .next-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: #fef6eb;
                color: #f28e00;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                transition: background-color 0.3s ease;
              }
        
              .prev-btn:hover, .next-btn:hover {
                background-color: white;
                outline: 1px solid orange;
              }
        
              .prev-btn {
                left: 5px;
              }
        
              .next-btn {
                right: 5px;
              }
        
              @media (min-width: 1200px) {
                .product-card {
                  width: calc(25% - 15px);
                }
              }
        
              @media (min-width: 992px) and (max-width: 1199px) {
                .product-card {
                  width: calc(33.333% - 15px);
                }
              }
        
              @media (min-width: 576px) and (max-width: 991px) {
                .product-card {
                  width: calc(50% - 15px);
                }
              }
        
              @media (max-width: 575px) {
                .product-card {
                  width: calc(100% - 15px);
                }
                
                .container {
                  width: 95%;
                  padding: 15px 10px;
                }
                
                .carousel-wrapper {
                  padding: 0 30px;
                }
                
                .badge {
                  width: 40px;
                  height: 40px;
                  font-size: 10px;
                }
              }
            `;
    $("<style>").addClass("carousel-style").html(css).appendTo("head");
  };

  const fetchProducts = () => {
    const apiUrl =
      "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";

    const handleProducts = (products) => {
      const enhancedProducts = products.map((product) => ({
        ...product,
        rating: product.rating || 5,
        reviewCount:
          product.reviewCount || Math.floor(Math.random() * 100) + 10,
        originalPrice:
          product.originalPrice ||
          (parseFloat(product.price) * 1.25).toFixed(2),
        discount: product.discount || 20,
        isBestseller:
          product.isBestseller !== undefined
            ? product.isBestseller
            : Math.random() > 0.7,
        isStarProduct:
          product.isStarProduct !== undefined
            ? product.isStarProduct
            : Math.random() > 0.7,
      }));
      renderProducts(enhancedProducts);
      adjustCarousel();
    };

    if (localStorage.getItem("products")) {
      const storedProducts = JSON.parse(localStorage.getItem("products"));
      handleProducts(storedProducts);
    } else {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP hatası! status kodu: ${response.status}`);
          }
          return response.json();
        })
        .then((products) => {
          localStorage.setItem("products", JSON.stringify(products));
          handleProducts(products);
        })
        .catch((error) => {
          console.error("Verileri çekerken hata oluştu : ", error);
        });
    }
  };

  const renderProducts = (products) => {
    const carousel = $(".carousel");
    carousel.empty();
    products.forEach((product) => {
      const favoriteIds = loadFavorites();
      const isFavorited = favoriteIds.includes(product.id) ? "favorited" : "";
      let starsHtml = "";
      for (let i = 0; i < 5; i++) {
        starsHtml += '<span class="star">★</span>';
      }
      const productCard = $("<div>")
        .addClass("product-card")
        .attr("data-product-id", product.id);
      const imageContainer = $("<div>")
        .addClass("product-image-container")
        .append(
          $("<img>")
            .addClass("product-image")
            .attr("src", product.img)
            .attr("alt", product.name)
        );
      const badgeContainer = $("<div>").addClass("badge-container");
      if (product.isBestseller) {
        badgeContainer.append(
          $("<div>").addClass("badge bestseller-badge").html("ÇOK<br>SATAN")
        );
      }
      if (product.isStarProduct) {
        badgeContainer.append(
          $("<div>").addClass("badge star-product-badge").html("YILDIZ<br>ÜRÜN")
        );
      }
      imageContainer.append(badgeContainer);
      const heartIconSrc = isFavorited
        ? "https://img.icons8.com/?size=100&id=aId5rVASLwDE&format=png&color=FD7E14"
        : "https://www.e-bebek.com/assets/svg/default-favorite.svg";
      imageContainer.append(
        $("<button>")
          .addClass("favorite-btn")
          .addClass(isFavorited)
          .append(
            $("<img>")
              .attr("src", heartIconSrc)
              .attr("alt", "Favorite")
              .addClass("favorite-icon")
          )
      );
      productCard.append(imageContainer);
      const productInfo = $("<div>").addClass("product-info");
      const title = $("<h3>").addClass("product-title");
      title.append($("<span>").addClass("product-brand").text(product.brand));
      title.append(" - ");
      title.append($("<span>").addClass("product-name").text(product.name));
      productInfo.append(title);
      const ratingContainer = $("<div>").addClass("rating-container");
      ratingContainer.append($("<div>").addClass("stars").html(starsHtml));
      ratingContainer.append(
        $("<span>").addClass("review-count").text(`(${product.reviewCount})`)
      );
      productInfo.append(ratingContainer);
      const priceContainer = $("<div>").addClass("price-container");
      const priceRow = $("<div>");
      priceRow.append(
        $("<span>")
          .addClass("original-price")
          .text(`${product.originalPrice} TL`)
      );
      priceRow.append(
        $("<span>").addClass("discount-badge").text(`%${product.discount}`)
      );
      priceContainer.append(priceRow);
      priceContainer.append(
        $("<span>").addClass("current-price").text(`${product.price} TL`)
      );
      productInfo.append(priceContainer);
      productInfo.append(
        $("<button>").addClass("add-to-cart-btn").text("Sepete Ekle")
      );
      productCard.append(productInfo);
      carousel.append(productCard);
    });
  };

  const loadFavorites = () => {
    return JSON.parse(localStorage.getItem("favoriteIds")) || [];
  };

  const saveFavorites = (favoriteIds) => {
    localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
  };

  const getScrollAmount = () => {
    const carousel = $(".carousel");
    const cards = carousel.find(".product-card");
    if (!cards.length) {
      return 0;
    }
    return cards.first().outerWidth(true);
  };

  const slideCarousel = (direction) => {
    const carousel = $(".carousel");
    const scrollAmount = getScrollAmount();
    const currentScrollLeft = carousel.scrollLeft();
    const newScrollPosition =
      direction === "left"
        ? currentScrollLeft - scrollAmount
        : currentScrollLeft + scrollAmount;
    carousel.animate({ scrollLeft: newScrollPosition }, 300);
  };

  const adjustCarousel = () => {
    updateNavigationButtons();
  };

  const updateNavigationButtons = () => {
    const carousel = $(".carousel");
    const maxScroll = carousel[0].scrollWidth - carousel[0].clientWidth;
    const currentScroll = carousel.scrollLeft();
    if (currentScroll <= 0) {
      $(".prev-btn").css("opacity", "0.5");
    } else {
      $(".prev-btn").css("opacity", "1");
    }
    if (currentScroll >= maxScroll - 5) {
      $(".next-btn").css("opacity", "0.5");
    } else {
      $(".next-btn").css("opacity", "1");
    }
  };

  const getProductById = (productId) => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    return storedProducts.find((p) => p.id === productId);
  };

  const setEvents = () => {
    $(document).on("click", ".favorite-btn", function (event) {
      event.stopPropagation();
      const button = $(this);
      const productId = button.closest(".product-card").data("product-id");
      let favoriteIds = loadFavorites();
      if (favoriteIds.includes(productId)) {
        favoriteIds = favoriteIds.filter((id) => id !== productId);
        button.removeClass("favorited");
        button
          .find("img")
          .attr(
            "src",
            "https://www.e-bebek.com/assets/svg/default-favorite.svg"
          );
      } else {
        favoriteIds.push(productId);
        button.addClass("favorited");
        button
          .find("img")
          .attr(
            "src",
            "https://img.icons8.com/?size=100&id=aId5rVASLwDE&format=png&color=FD7E14"
          );
      }
      saveFavorites(favoriteIds);
    });

    $(document).on("click", ".add-to-cart-btn", function (event) {
      event.stopPropagation();
      const productId = $(this).closest(".product-card").data("product-id");
      console.log(`${productId} ürünü eklendi!`);
    });

    $(document).on("click", ".prev-btn", () => {
      slideCarousel("left");
    });

    $(document).on("click", ".next-btn", () => {
      slideCarousel("right");
    });

    $(".carousel").on("scroll", updateNavigationButtons);

    $(document).on("click", ".product-card", function (event) {
      if (
        $(event.target).is(".favorite-btn, .favorite-btn *, .add-to-cart-btn")
      ) {
        return;
      }
      const productId = $(this).data("product-id");
      const product = getProductById(productId);
      if (product?.url) {
        window.open(product.url, "_blank");
      }
    });
  };

  init();
})();
