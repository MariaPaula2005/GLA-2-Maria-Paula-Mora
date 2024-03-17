document.addEventListener("DOMContentLoaded", async () => {
    try {
        const productsContainer = document.getElementById('products');
        const sortSelect = document.getElementById('sort');
        const categorySelect = document.getElementById('selectCategory');
        let originalData = await fetchData(); // original data

        if (!originalData) {
            throw new Error('No data fetched');
        }

        let data = [...originalData]; 

        // sorting by price
        data.sort((a, b) => a.price - b.price);
        renderProducts(data);

        // clicking sort
        sortSelect.addEventListener('change', () => {
            const selectedOption = sortSelect.value;
            const selectedCategory = categorySelect.value;
            let filteredData = selectedCategory === 'all' ? [...data] : data.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
            if (selectedOption === 'asc') {
                filteredData.sort((a, b) => a.price - b.price);
            } else if (selectedOption === 'desc') {
                filteredData.sort((a, b) => b.price - a.price);
            }
            renderProducts(filteredData);
        });

        // Category filter option
        categorySelect.addEventListener('change', () => {
            const selectedCategory = categorySelect.value;
            let filteredData;
            if (selectedCategory === 'all') {
                filteredData = [...originalData]; // Use original data when selecting all categories
            } else if(selectedCategory === 'electronics') {
                filteredData = originalData.filter(product => product.category.toLowerCase() === 'electronics');
            }
            else if(selectedCategory === 'jewelery') {
                filteredData = originalData.filter(product => product.category.toLowerCase() === 'jewelery');
            }
            else if(selectedCategory === 'men\'s clothing') {
                filteredData = originalData.filter(product => product.category.toLowerCase() === 'men\'s clothing');
            }
            else if(selectedCategory === 'women\'s clothing') {
                filteredData = originalData.filter(product => product.category.toLowerCase() === 'women\'s clothing');
            }

            //sort price after category
            const selectedOption = sortSelect.value;
            if (selectedOption === 'asc') {
                filteredData.sort((a, b) => a.price - b.price);
            } else if (selectedOption === 'desc') {
                filteredData.sort((a, b) => b.price - a.price);
            }
            renderProducts(filteredData);
        });
    } catch (error) {
        console.error('Error rendering data.', error);
    }
});

function renderProducts(data) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    data.forEach(product => {
        
        //element creation
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        imageElement.alt = product.title;

        const titleElement = document.createElement('h2');
        titleElement.textContent = product.title;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${product.price}`;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = product.description;

        //append
        productElement.appendChild(imageElement);
        productElement.appendChild(titleElement);
        productElement.appendChild(priceElement);
        productElement.appendChild(descriptionElement);
        productsContainer.appendChild(productElement);
    });
}

async function fetchData() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
