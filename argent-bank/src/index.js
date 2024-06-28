import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

// Création de la racine de l'application et rendu du composant principal avec le store Redux
// Crée la racine React sur l'élément avec l'ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //Encapsule l'application dans React.StrictMode pour activer des vérifications supplémentaires et des avertissements en développement
  <React.StrictMode>
    {/* Fournit le store Redux à l'application */}
    <Provider store={store}>
      {/* Utilise le routeur pour gérer les routes */}
      <Router>
        {/* Rendu du composant principal de l'application */}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

/*
Le store Redux est un objet qui contient l'état de toute l'application. 
Il est le seul endroit où l'état doit résider dans une application Redux. 
Le store Redux est configuré avec des réducteurs (reducers), des actions, et des middlewares pour gérer la logique de l'application.

Structure et Fonctionnement du Store Redux

Création du Store :
Le store est créé en utilisant la fonction configureStore de Redux Toolkit.
Cette fonction configure le store avec les réducteurs (reducers) et les middlewares nécessaires.

Réducteurs (Reducers) :
Les réducteurs sont des fonctions pures qui spécifient comment l'état de l'application change en réponse à une action.
Ils prennent l'état actuel et une action comme arguments et retournent un nouvel état.

Actions :
Les actions sont des objets qui décrivent ce qui se passe dans l'application.
Elles ont généralement un type et une charge utile (payload) contenant les données nécessaires.

Middlewares :
Les middlewares sont des extensions qui interceptent les actions envoyées au store et permettent d'ajouter 
des fonctionnalités supplémentaires comme la gestion des actions asynchrones.


Points Clés
Store : L'unique source de vérité pour l'état de l'application.
Reducers : Fonctions pures qui gèrent les changements d'état en réponse aux actions.
Actions : Objets décrivant ce qui se passe dans l'application.
Middlewares : Extensions pour gérer des fonctionnalités supplémentaires comme les actions asynchrones.
Provider : Composant qui permet de rendre le store accessible à tous les composants de l'application.

En résumé, le store Redux centralise et gère l'état de l'application, facilitant ainsi la prévisibilité et la maintenance de l'état dans des applications complexes.
*/