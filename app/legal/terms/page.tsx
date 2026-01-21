'use client';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 py-20 border-b">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tighter">Conditions d'Utilisation</h1>
                    <p className="text-gray-500 font-medium">Dernière mise à jour : 19 Janvier 2026</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20 prose prose-lg prose-gray">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">1. Présentation de la Plateforme</h2>
                    <p>Dreadmo MTL est une plateforme de mise en relation entre des particuliers ("Utilisateurs") et des professionnels de la coiffure ("Prestataires" : salons ou indépendants) basés à Montréal.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">2. Utilisation du Service</h2>
                    <p>L'accès au site est gratuit. L'Utilisateur s'engage à fournir des informations exactes lors de sa réservation. Tout abus ou comportement inapproprié envers un Prestataire pourra entraîner la suspension du compte.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">3. Réservations et Paiements</h2>
                    <p>Dreadmo facilite la prise de rendez-vous. Les conditions financières (prix, acomptes) sont définies par chaque Prestataire. Dreadmo n'est pas responsable des litiges commerciaux entre l'Utilisateur et le Prestataire.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">4. Propriété Intellectuelle</h2>
                    <p>Tous les contenus présents sur Dreadmo (textes, logos, images, code) sont la propriété de Dreadmo MTL. Les photos publiées par les Prestataires dans leur galerie restent leur propriété respective.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">5. Limitation de Responsabilité</h2>
                    <p>Dreadmo s'efforce de vérifier l'identité des Prestataires, mais ne peut garantir la qualité finale des prestations techniques réalisées en salon ou à domicile.</p>
                </section>

                <div className="p-8 bg-gray-50 rounded-2xl mt-20">
                    <p className="text-sm text-gray-600 mb-0">Pour toute question concernant nos conditions d'utilisation, veuillez nous contacter à <a href="mailto:legal@dreadmo.ca" className="text-black font-bold underline">legal@dreadmo.ca</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
