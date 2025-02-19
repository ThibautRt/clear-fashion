// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// `https://serverapi-three.vercel.app`
// `https://client-five-liart.vercel.app`

// current products on the page
let currentProducts = [];
let currentProductsToDisplay = [];
let currentPagination = {};
let favorites = []

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbDisplayedProducts = document.querySelector('#nbDisplayedProducts');
const spanNbNewDisplayedProducts = document.querySelector('#nbNewDisplayedProducts');
const P50 = document.querySelector('#p50');
const P90 = document.querySelector('#p90');
const P95 = document.querySelector('#p95');
const spanLastDate = document.querySelector('#lastDate');
const selectBrand = document.querySelector('#brand-select');
const buttonPrice = document.querySelector('#price-button');
const buttonRecently = document.querySelector('#recent-button');
const selectSortOption = document.querySelector('#sort-select');
/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({ result, meta }) => {
    currentProducts = result;
    currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
    try {
        const response = await fetch(
            `https://serverapi-three.vercel.app/all?size=${size}&page=${page}}`,
            {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Resource-Policy": "cross-origin"
            }
        );
        const body = await response.json();

        if (body.success !== true) {
            console.error(body);
            return { currentProducts, currentPagination };
        }

        return body.data;
    } catch (error) {
        console.error(error);
        return { currentProducts, currentPagination };
    }
};


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const template = products
        .map(product => {
            return `
      <div class="product" id=${product._id}>
        <span>${product.brand}</span>
        <a href="${product.url}" target="_blank">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
        })
        .join('');

    div.innerHTML = template;
    fragment.appendChild(div);
    sectionProducts.innerHTML = '<h2>Products</h2>';
    sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
    const { currentPage, pageCount } = pagination;
    const options = Array.from(
        { 'length': pageCount },
        (value, index) => `<option value="${index + 1}">${index + 1}</option>`
    ).join('');

    selectPage.innerHTML = options;
    selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
    const { count } = pagination;

    spanNbProducts.innerHTML = count;
    spanNbDisplayedProducts.innerHTML = currentProductsToDisplay.length;
    let newProductsCount = 0;
    currentProductsToDisplay.forEach(product => {
        if ((new Date().setHours(0, 0, 0, 0) - new Date(product.insert_date.split('-')).getTime()) > 1209600000) {
            newProductsCount++;
        }
    });
    spanNbNewDisplayedProducts.innerHTML = newProductsCount;
    if (currentProductsToDisplay.length >= 1) {
        let temp = [...currentProductsToDisplay];
        temp.sort((a, b) => a.price - b.price);
        P50.innerHTML = temp[Math.floor(temp.length * (0.5))].price;
        P90.innerHTML = temp[Math.floor(temp.length * (0.1))].price;
        P95.innerHTML = temp[Math.floor(temp.length * (0.05))].price;
        temp.sort((a, b) => new Date(a.insert_date.split('-')) - new Date(b.insert_date.split('-')));
        spanLastDate.innerHTML = temp[temp.length - 1].insert_date;
    } else {
        P50.innerHTML = "undefined";
        P90.innerHTML = "undefined";
        P95.innerHTML = "undefined";
        spanLastDate.innerHTML = "undefined";
    }
};

const filterProducts = products => {
    currentProductsToDisplay = [...products];
    currentProductsToDisplay = filterByBrands(products);

    if (buttonRecently.checked) {
        currentProductsToDisplay = filterByRecent(currentProductsToDisplay);
    }

    if (buttonPrice.checked) {
        currentProductsToDisplay = filterByPrice(currentProductsToDisplay);
    }
}

const filterByBrands = products => products.filter(product => selectBrand.value != "all" ? product.brand == selectBrand.value : true);

const filterByRecent = products => products.filter(product => (new Date().setHours(0, 0, 0, 0) - new Date(product.insert_date.split('-')).getTime()) > 1209600000);

const filterByPrice = products => products.filter(product => product.price < 50);

const setFilterOptions = () => {
    selectBrand.length = 0;
    selectBrand[0] = new Option("all");
    [...new Set(currentProducts.map(product => product.brand))].forEach(brand => selectBrand[selectBrand.length] = new Option(brand));
    buttonPrice.checked = false;
    buttonRecently.checked = false;
}

const sortProducts = products => {
    switch (selectSortOption.value) {
        case "price-asc":
            products.sort((a, b) => a.price - b.price);
            break;

        case "price-desc":
            products.sort((a, b) => b.price - a.price);
            break;

        case "date-asc":
            products.sort((a, b) => new Date(a.insert_date.split('-')) - new Date(b.insert_date.split('-')));
            break;

        case "date-desc":
            products.sort((a, b) => new Date(b.insert_date.split('-')) - new Date(a.insert_date.split('-')));
            break;
    }
}

const render = (products, pagination) => {
    filterProducts(products);
    sortProducts(currentProductsToDisplay)
    renderProducts(currentProductsToDisplay);
    renderPagination(pagination);
    renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', event => {
    fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
        .then(setCurrentProducts)
        .then(setFilterOptions())
        .then(() => render(currentProducts, currentPagination));
})

selectPage.addEventListener('change', event => {
    fetchProducts(parseInt(event.target.value), currentPagination.pageSize)
        .then(setCurrentProducts)
        .then(setFilterOptions())
        .then(() => render(currentProducts, currentPagination));
});

selectBrand.addEventListener('change', () => {
    render(currentProducts, currentPagination)
});

buttonRecently.addEventListener('change', () => {
    render(currentProducts, currentPagination)
});

buttonPrice.addEventListener('change', () => {
    render(currentProducts, currentPagination)
});

selectSortOption.addEventListener('change', () => {
    render(currentProducts, currentPagination)
});

document.addEventListener('DOMContentLoaded', () =>
    fetchProducts()
        .then(setCurrentProducts)
        .then(setFilterOptions)
        .then(() => render(currentProducts, currentPagination))
);

selectShow.addEventListener('change', async (event) => {
    const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

    setCurrentProducts(products);
    render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();

    setCurrentProducts(products);
    render(currentProducts, currentPagination);
});