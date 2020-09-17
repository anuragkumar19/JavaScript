// Getting Elements
const settingsForm = document.getElementById('settingsForm');


// Listening for form submission
settingsForm.addEventListener('submit', updateApi);

async function render() {
    let api = localStorage.newsApi;
    let cont = localStorage.contCode;
    // validation
    if (!api || !cont) {
        genAlert('Please enter api key (<a href="https://newsapi.org">https://newsapi.org</a>) and country code in setiings', 'danger')
        return false;
    }
    $('#apiInp').val(api);
    $('#contInp').val(cont);

    // Fetching data
    let res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${cont}&apiKey=${api}`);
    //console.log(res);
    if (res.status !== 200) {
        genAlert('Opps! Something went wrong while makig request check your api key and country code!!', 'danger');
        return false;
    }

    let articles = res.data.articles;
    $('#news').html('');
    articles.forEach(article => {
        let html =
        `
        <div class="card mb-3">
        <img src="${article.urlToImage}" class="card-img-top" alt="No image available for this headline">
        <div class="card-body">
        <h4 class="card-title">${article.title} <small class='text-muted small'>${article.author ? `By ${article.author}`: ''}</small></h4>
        <p class="card-text">${article.description}</p>
        <a href="${article.url}" class="btn btn-primary">View full news</a>
        </div>
        </div>
        `;
        $('#news').append(html);
    });

}

render().then(()=> $('#loader').remove()).catch(err => {
    console.error(err);
    genAlert(err, 'danger');
    genAlert('Check your api key and county code and try again!!', 'danger');
    $('#loader').remove();
});

// Update api key
function updateApi(e) {
    e.preventDefault();
    let newApi = $('#apiInp').val();
    newApi = newApi.trim();
    let newCont = $('#contInp').val();
    newCont = newCont.trim();
    if (!newApi) {
        $('#apiInp').addClass('is-invalid');
        return false;
    }
    $('#apiInp').removeClass('is-invalid');
    if (!newCont) {
        $('#contInp').addClass('is-invalid');
        return false;
    }
    $('#contInp').removeClass('is-invalid');

    $('#exampleModal').modal('hide');
    localStorage.newsApi = newApi;
    localStorage.contCode = newCont;
    genAlert('Saved', 'success');
    render().catch(err => {
        console.error(err);
        genAlert(err, 'danger');
        genAlert('Check your api key and county code and try again!!', 'danger');
    });
}

// functions
function genAlert(msg, type) {
    let html = `<div class="my-0 alert alert-${type} alert-dismissible fade show" role="alert">${msg}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
    $('#alerts').append(html);
}
