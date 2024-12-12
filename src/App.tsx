import React from 'react';
import { Download } from 'lucide-react';
import DownloadForm from './components/DownloadForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Download size={40} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Téléchargeur de Contenu Social
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Téléchargez facilement vos contenus préférés depuis Twitter, Instagram, TikTok et Snapchat
            en quelques clics.
          </p>
        </header>

        <main>
          <div className="bg-white rounded-xl shadow-xl p-6">
            <DownloadForm />
          </div>

          <section className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Simple d'utilisation</h3>
              <p className="text-gray-600">Collez simplement l'URL du contenu que vous souhaitez télécharger et laissez-nous faire le reste.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Haute Qualité</h3>
              <p className="text-gray-600">Téléchargez vos contenus en haute qualité, dans leur format d'origine.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Multi-plateformes</h3>
              <p className="text-gray-600">Compatible avec les principales plateformes de réseaux sociaux.</p>
            </div>
          </section>
        </main>

        <footer className="mt-16 text-center text-gray-600">
          <p>© 2024 Téléchargeur de Contenu Social. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;