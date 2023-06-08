const loadNews = async (category) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}
const displayNews = (newsList) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerText = ``;
    let newsCount = 0;


    newsList.forEach(news => {
        console.log(news);
        newsCount++;

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${news.thumbnail_url}" class="img-fluid w-100 h-100 rounded-4 p-2" style="object-fit: cover;"
                            alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body d-flex flex-column h-100 w-100 justify-content-evenly">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.slice(0, 250)}...</p> 

                            <div class="d-flex d-none d-xl-flex align-items-center justify-content-between" id="news-info">
                                <div class="user d-flex justify-content-center align-items-center">
                                    <img class="img-fluid rounded-circle m-1  bg-primary" src="${news.author.img}" style="width: 48px; height:48px;" alt="">
                                    <div class="info">
                                        <span>${news.author.name}</span> <br>
                                        <span class="text-body-secondary"> ${news.author.published_date.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <p class="badge bg-warning text-dark"> Views: ${news.total_view}</p>
                                <p class="badge bg-dark">${news.rating.number}</p>
                                <button id="news-more" class="btn btn-primary">More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ` ;

        newsContainer.appendChild(newsDiv);
    });

    document.getElementById('news-count').innerHTML = `
        <div class="card text-center">
            <div class="card-header">
                ${newsCount} Items Found
            </div>
        </div>
        ` ;

    newsCount = 0;

    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}


(async () => {
    toggleSpinner(true);
    await loadNews('01');
    toggleSpinner(false);
    toggleSpinner(true);
    await loadNews(category);
    toggleSpinner(false);
})();