// Get all products from API
// =============================
//           Veriablen
// =============================
const outputProductCards = document.body.querySelector(".productWrapper");
let dataArray = [];

// =============================
//            fetch
// =============================

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    dataArray = [...data];
    console.log(dataArray);
    renderProductCards(data);
    // .catch((error) => console.log(error));
  });

// =============================
//  funktion: create product cards
// =============================
const renderProductCards = (singleProduct) => {
  outputProductCards.innerHTML = "";

  for (const product of singleProduct) {
    // Erstellung neuer Elemente für die Product Cards
    const createArticle = document.createElement("article");
    const createImage = document.createElement("img");
    const createImageDiv = document.createElement("div");
    const createH3 = document.createElement("h3");
    const createDiv = document.createElement("div");
    const createSpan = document.createElement("span");
    const createButton = document.createElement("button");

    // Vergabe aller Attribute für das image
    // createImage.setAttribute("src", dataFetchArr.image);
    // createImage.setAttribute("alt", `ìmage of ${dataFetchArr.title}`);

    // Vergabe aller Attribute für das background image
    createImageDiv.setAttribute("class", "backgroundImage");
    createImageDiv.style.backgroundImage = `url(${product.image})`;

    // Vergabe des Inhalts der h3
    createH3.textContent = product.title;

    // Vergabe Info-Div Class
    createDiv.setAttribute("class", "priceAdd");
    // Vergabe des Inhalts des Spans
    createSpan.textContent = "$ " + product.price;

    // Vergabe Content Button
    createButton.textContent = "Add to card";

    // Span und Button ins div einfügen:
    createDiv.append(createSpan, createButton);

    // Image, h3 und fiv in den article einfügen
    createArticle.append(createImageDiv, createH3, createDiv);

    // Article in das HTML eingefügt
    outputProductCards.appendChild(createArticle);
  }
};

// =============================
//  funktion: searchbar
// =============================

const inputSearch = document.body.querySelector(".searchbar");
let filteredProductsArr = [];

inputSearch.addEventListener("input", () => {
  filteredProductsArr = [];

  // soll den inhalt aus dem inputfeld nehmen und über das dataArray case-sensitivefiltern
  const filteredBySearch = dataArray.filter((product) => {
    if (product.title.toLowerCase().includes(inputSearch.value.toLowerCase())) {
      return product;
    }
  });

  // Die gefilterten objekte sollen dann in das neue array filteredProductsArr kommen
  filteredProductsArr = [...filteredBySearch];

  // Die anzeigesection wird geleert
  outputProductCards.innerHTML = "";

  // Wenn nichts in der Suche eingegeben ist werden alle produkte angezeigt
  if (inputSearch.value.length === 0) {
    outputProductCards.innerHTML = "";
    console.log("Nichts gefunden");
    renderProductCards(dataArray);
  } else {
    renderProductCards(filteredProductsArr); // sobald etwas eingegeben wird, werden gefilterte Ergebnisse gezeigt
  }
});

// =============================
//  funktion: price-low to high
// =============================

const selectSortPrice = document.body.querySelector("#sortingByPrice");

const sortByPrice = () => {
  const selectedIndexValue = selectSortPrice.value;
  outputProductCards.innerHTML = "";

  if (selectedIndexValue === "lowToHigh") {
    dataArray.sort((prodA, prodB) => prodA.price - prodB.price);
  } else {
    dataArray.sort((prodA, prodB) => prodB.price - prodA.price);
  }

  renderProductCards(dataArray);
};

// Add event listener to the select element
selectSortPrice.addEventListener("change", sortByPrice);

// ===============================
//  funktion: filter by categories
// ===============================

const btnFilterElectronics = document.body.querySelector("#electronics");
const btnFilterJewelery = document.body.querySelector("#jewelery");
const btnFilterMen = document.body.querySelector("#mensClothing");
const btnFilterWomen = document.body.querySelector("#womensClothing");

btnFilterElectronics.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("electronics");
  const electronicProducts = dataArray.filter(
    (product) => product.category === "electronics"
  );
  outputProductCards.innerHTML = "";
  renderProductCards(electronicProducts);
});

btnFilterJewelery.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("jewelery");
  const jewelryProducts = dataArray.filter(
    (product) => product.category === "jewelery"
  );
  outputProductCards.innerHTML = "";
  renderProductCards(jewelryProducts);
});

btnFilterMen.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("men's clothing");
  const mensProducts = dataArray.filter(
    (product) => product.category === "men's clothing"
  );
  outputProductCards.innerHTML = "";
  renderProductCards(mensProducts);
});

btnFilterWomen.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("women's clothing");
  const womensProducts = dataArray.filter(
    (product) => product.category === "women's clothing"
  );
  outputProductCards.innerHTML = "";
  renderProductCards(womensProducts);
});
