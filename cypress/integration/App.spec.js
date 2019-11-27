describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with Restaurants List', () => {
    cy.visit ('/');
    cy.get('[data-cy=restaurant]').should('contain', 'Koi');
  });

  it('shows Koco Table when select happy hour in vibe filter ', () => {
    cy.visit ('/');
    cy.get('[data-cy=vibe]').click();
    cy.get('[data-cy=happyhour]').click();
    cy.get('[data-cy=restaurant]').should('contain' ,'Koco Table');
  });
});