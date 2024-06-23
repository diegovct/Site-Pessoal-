
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.github.com/users/diegovct';
    const accessToken = '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';

    fetch(apiUrl, {
        headers: {
            'Authorization': `token ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do GitHub');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('username').textContent = data.name || data.login;
        document.getElementById('bio').textContent = data.bio || 'Sem descrição';
        document.getElementById('location').textContent = data.location || 'Não especificado';
        document.getElementById('followers').textContent = data.followers;
        document.getElementById('website').innerHTML = `<a href="${data.blog}" target="_blank">${data.blog}</a>`;

        const socialLinks = document.getElementById('social-links');
        socialLinks.innerHTML = `
            <a href="${data.html_url}" target="_blank">
                <i class="bi bi-github" style="font-size: 34px; margin-right: 20px;"></i>
            </a>
            <a href="https://www.linkedin.com/in/iuri-diego-5aa658222/" target="_blank">
                <i class="bi bi-linkedin" style="font-size: 34px; margin-right: 20px;"></i>
            </a>
            <a href="https://www.instagram.com/diego_vct/" target="_blank">
                <i class="bi bi-instagram" style="font-size: 34px; margin-right: 20px;"></i>
            </a>
        `;
    })
    .catch(error => console.error('Erro ao buscar dados do GitHub:', error));
});



document.addEventListener('DOMContentLoaded', function () {
    const repositoriesContainer = document.getElementById('repositories-list');
    const accessToken = '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';
    const addedRepositories = new Set(); 

    function createRepositoryCard(repo) {
        const colElement = document.createElement('div');
        colElement.classList.add('col-12', 'col-md-6', 'col-lg-4', 'card-custom', 'mb-3');
        colElement.style.padding = '10px';

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.style.width = '100%';
        cardElement.style.height = '100%';

        const cardBodyElement = document.createElement('div');
        cardBodyElement.classList.add('card-body');

        const titleElement = document.createElement('h3');
        titleElement.classList.add('card-title');
        titleElement.style.fontSize = '1.2rem';
        titleElement.textContent = repo.name;

        const subtitleElement = document.createElement('h5');
        subtitleElement.classList.add('card-subtitle', 'mb-2', 'text-muted');
        subtitleElement.style.fontSize = '1rem';
        subtitleElement.textContent = repo.description || 'Descrição não disponível';

        const textElement = document.createElement('p');
        textElement.classList.add('card-text');
        textElement.style.fontSize = '1rem';
        textElement.textContent = repo.language ? `Feito com ${repo.language}` : '';

        const linkElement = document.createElement('a');
        linkElement.classList.add('card-link');
        linkElement.style.fontSize = '1rem';
        linkElement.style.display = 'block';
        linkElement.style.textAlign = 'center';
        linkElement.style.marginTop = '10px';
        linkElement.textContent = 'Ver mais';
        linkElement.href = `reppo.html?repo=${repo.name}`;
        linkElement.target = '_self'; 

        const followersElement = document.createElement('div');
        followersElement.classList.add('d-flex', 'align-items-center');
        const followersIcon = document.createElement('img');
        followersIcon.src = 'assets/img/pessoa.png';
        followersIcon.alt = 'Pessoas';
        followersIcon.height = '25';
        followersIcon.width = '25';
        const followersCount = document.createElement('div');
        followersCount.classList.add('followers-count');
        followersCount.innerHTML = `<span>${repo.watchers_count}</span>`;
        followersElement.appendChild(followersIcon);
        followersElement.appendChild(followersCount);

        const starsElement = document.createElement('div');
        starsElement.classList.add('d-flex', 'align-items-center');
        const starsIcon = document.createElement('img');
        starsIcon.src = 'assets/img/estrela.png';
        starsIcon.alt = 'Estrela';
        starsIcon.height = '25';
        starsIcon.width = '25';
        const starsCount = document.createElement('div');
        starsCount.classList.add('starred-count');
        starsCount.innerHTML = `<span>${repo.stargazers_count}</span>`;
        starsElement.appendChild(starsIcon);
        starsElement.appendChild(starsCount);

        cardBodyElement.appendChild(titleElement);
        cardBodyElement.appendChild(subtitleElement);
        cardBodyElement.appendChild(textElement);
        cardBodyElement.appendChild(linkElement);
        cardBodyElement.appendChild(document.createElement('hr'));
        cardBodyElement.appendChild(followersElement);
        cardBodyElement.appendChild(starsElement);

        cardElement.appendChild(cardBodyElement);

        colElement.appendChild(cardElement);

        return colElement;
    }

    function displayRepositories(repositories) {
        
        repositoriesContainer.innerHTML = '';

        repositories.forEach(repo => {
            if (repo.owner.login === 'diegovct' && !addedRepositories.has(repo.name)) {
                const repoCard = createRepositoryCard(repo);
                repositoriesContainer.appendChild(repoCard);
                addedRepositories.add(repo.name); 
            }
        });
    }

    function getGitHubRepositories() {
        const apiUrl = 'https://api.github.com/users/diegovct/repos';

        fetch(apiUrl, {
            headers: {
                'Authorization': `token ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar repositórios: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayRepositories(data);
        })
        .catch(error => {
            console.error('Erro ao buscar repositórios do GitHub:', error);
        });
    }

    getGitHubRepositories();
});

