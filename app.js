console.log('Coding by Sylvanius AHIDJE');


const searchBtn = document.getElementById('searchBtn');
const playerInput = document.getElementById('playerInput');
const resultContainer = document.getElementById('result');
const annee = new Date().getFullYear();
// Afficher l'année actuelle dans le footer
document.getElementById('currentYear').textContent = annee;


searchBtn.addEventListener('click', () => {
  const playerName = playerInput.value.trim();
  resultContainer.innerHTML = ''; // Nettoyer l'affichage précédent

  if (playerName === '') {
    resultContainer.innerHTML = '<p class="text-red-400">Veuillez entrer un nom de joueur.</p>';
    return;
  }

  // Afficher un loader temporaire
  resultContainer.innerHTML = `<p class="text-blue-300 animate-pulse">Recherche en cours...</p>`;

  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
    .then(res => res.json())
    .then(data => {
      if (!data.player) {
        resultContainer.innerHTML = '<p class="text-yellow-400">Aucun joueur trouvé.</p>';
        return;
      }

      // Effacer le loader
      resultContainer.innerHTML = '';

      data.player.forEach(player => {
        const fullDate = player.dateBorn; // Format de la date : YYYY-MM-DD
        const birthYear = fullDate.slice(0, 4); // Extraire l'année de naissance
        const card = document.createElement('div');
        card.className = 'bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center';

        card.innerHTML = `
          <img src="${player.strCutout || 'https://via.placeholder.com/150'}"
               alt="${player.strPlayer}"
               class="w-32 h-auto mb-2 rounded-full border-2 border-gray-600" p-2/>
          <h2 class="text-xl font-bold mb-1">${player.strPlayer}</h2>
          <p class="text-sm text-gray-300 mb-1"><strong>Club :</strong> ${player.strTeam || 'Inconnu'}</p>
          <p class="text-sm text-gray-300 mb-1"><strong>Pays :</strong> ${player.strNationality || 'Inconnu'}</p>
          <p class="text-sm text-gray-300 mb-1"><strong>Poste :</strong> ${player.strPosition || 'N/A'}</p>
          <p class="text-sm text-gray-300"><strong>Né le :</strong> ${player.dateBorn || 'Non précisé'}</p>
          <p class="text-sm text-gray-300"><strong>Âge :</strong> ${annee - birthYear} ans</p>
            <p class="text-sm text-gray-300"><strong>Numéro :</strong> ${player.strNumber || 'N/A'}</p>
        `;

        resultContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error(error);
      resultContainer.innerHTML = '<p class="text-red-500">Erreur lors de la récupération des données.</p>';
    });
});
