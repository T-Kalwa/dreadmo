'use client';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 py-20 border-b">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tighter">Politique de Confidentialité</h1>
                    <p className="text-gray-500 font-medium">Dernière mise à jour : 19 Janvier 2026</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20 prose prose-lg prose-gray">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">1. Collecte des Données</h2>
                    <p>Nous collectons les informations que vous nous fournissez directement : nom, prénom, adresse e-mail, numéro de téléphone et préférences capillaires lors de la création de votre compte ou d'une réservation.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">2. Utilisation des Données</h2>
                    <p>Vos données sont utilisées exclusivement pour :</p>
                    <ul>
                        <li>Gérer vos réservations et vous envoyer des confirmations.</li>
                        <li>Permettre aux Prestataires de vous contacter si nécessaire.</li>
                        <li>Améliorer l'expérience utilisateur sur notre site.</li>
                        <li>Vous envoyer notre newsletter (si vous y avez consenti).</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">3. Partage des Informations</h2>
                    <p>Vos coordonnées de contact (nom, téléphone, email) sont partagées uniquement avec le Prestataire auprès duquel vous effectuez une réservation. Nous ne vendons jamais vos données à des tiers.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">4. Sécurité</h2>
                    <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé ou toute divulgation.</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">5. Vos Droits</h2>
                    <p>Conformément aux lois en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ces droits depuis votre tableau de bord client.</p>
                </section>

                <div className="p-8 bg-gray-50 rounded-2xl mt-20">
                    <p className="text-sm text-gray-600 mb-0">Pour toute question relative à la protection de vos données, contactez notre délégué à la protection des données : <a href="mailto:privacy@dreadmo.ca" className="text-black font-bold underline">privacy@dreadmo.ca</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
