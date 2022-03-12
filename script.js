

(function () {

    const quotesEl = document.querySelector('#container');
    const loaderEl = document.querySelector('.loader');

    const showQuotes = async (page,limit) => {

       
        var res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        var data = await res.json()
        
        
        console.log(data)
        
        data.forEach(el => {
            const quoteEl = document.createElement('blockquote');
            quoteEl.classList.add('quote');
            
            quoteEl.innerHTML = ` <div class="image-container" id="image">
            <div class="image">
            <img src=${el.download_url} alt="" />
            </div>
            <div class="content">
            <h1>${el.author}</h1>
            <p>${el.height}</p>
            <p>${el.width}</p>
            </div>
            </div>`;
            
            quotesEl.appendChild(quoteEl);
        });
    
    };

    const hideLoader = () => {
        loaderEl.classList.remove('show');
    };

    const showLoader = () => {
        loaderEl.classList.add('show');
    };

    const hasMoreQuotes = (page, limit, total) => {
        const startIndex = (page - 1) * limit + 1;
        return total === 0 || startIndex < total;
    };

    // load quotes
    const loadQuotes = async (page, limit) => {

        // show the loader
        showLoader();

        // 0.5 second later
        setTimeout(async () => {
            try {
                // if having more quotes to fetch
                if (hasMoreQuotes(page, limit, total)) {
                    // call the API to get quotes
                    const response = await showQuotes(page, limit);
                    // show quotes
                    showQuotes(response.data);
                    // update the total
                    total = response.total;
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                hideLoader();
            }
        }, 500);

    };

    // control variables
    let currentPage = 1;
    const limit = 10;
    let total = 0;


    window.addEventListener('scroll', () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5 &&
            hasMoreQuotes(currentPage, limit, total)) {
            currentPage++;
            loadQuotes(currentPage, limit);
        }
    }, {
        passive: true
    });

    // initialize
    loadQuotes(currentPage, limit);

})();

