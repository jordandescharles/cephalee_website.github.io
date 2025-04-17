// Fonction pour créer une page de redirection à la volée
function createRedirectPage(slug) {
    // Charger le JSON
    fetch('redirects.json')
        .then(response => response.json())
        .then(data => {
            // Trouver la redirection correspondante
            const redirect = data.redirects.find(r => r.slug === slug);
            
            if (!redirect) {
                window.location.href = "index.html";
                return;
            }
            
            // Mettre à jour le titre
            document.title = redirect.title;
            
            // Rediriger vers l'app
            window.location.href = redirect.app_url;
            
            // Rediriger vers le site web après un délai
            setTimeout(function() {
                window.location.href = redirect.web_url;
            }, 1500);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des redirections:', error);
            window.location.href = "index.html";
        });
}

// Extraire le slug de l'URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('to');

if (slug) {
    createRedirectPage(slug);
}
