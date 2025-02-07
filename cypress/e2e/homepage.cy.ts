describe('Tests fonctionnels pour le formulaire Eye Measure', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/accueil');
  });

  it('devrait afficher correctement les champs du formulaire', () => {
    // Vérification de la présence de tous les champs et labels
    cy.get('form.container-form').should('exist');

    // Vérifie que le titre est bien présent
    cy.get('h2').should('contain', 'Formulaire Oeil Droit'); // Remplace avec le nom dynamique du formulaire, si nécessaire

    // Vérifie la présence de tous les champs (Sphere, Cylindre, etc.)
    cy.get('input[name="sphere"]').should('exist');
    cy.get('input[name="cylindre"]').should('exist');
    cy.get('input[name="axe"]').should('exist');
    cy.get('input[name="dvo"]').should('exist');
    cy.get('input[name="dhiv"]').should('exist');
    cy.get('input[name="k1"]').should('exist');
    cy.get('input[name="x"]').should('exist');
    cy.get('input[name="k2"]').should('exist');
    cy.get('input[name="y"]').should('exist');
    cy.get('input[name="excentricite"]').should('exist');
  });

  it('devrait pouvoir remplir le formulaire et soumettre les données', () => {
    // Entrez des données valides dans les champs
    cy.get('input[name="sphere"]').type('5');
    cy.get('input[name="cylindre"]').type('10');
    cy.get('input[name="axe"]').type('20');
    cy.get('input[name="dvo"]').type('30');
    cy.get('input[name="dhiv"]').type('40');
    cy.get('input[name="k1"]').type('50');
    cy.get('input[name="x"]').type('60');
    cy.get('input[name="k2"]').type('70');
    cy.get('input[name="y"]').type('80');
    cy.get('input[name="excentricite"]').type('90');

    // Soumettre le formulaire
    cy.get('form').submit();
  });
});
