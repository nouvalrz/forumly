/**
 * - Login spec
 *  - should display login page correctly
 *  - should display error message when email is empty
 *  - should display error message when email format is not valid
 *  - should display error message when password is empty
 *  - should display error message when password length is less than 6
 *  - should display error popup when email and password are incorrect
 *  - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('input').contains(/^Login$/).should('be.visible');
  });

  it('should display error message when email is empty', () => {
    cy.get('input').contains(/^Login$/).click({ force: true });

    cy.get('p').contains(/^Email is required$/).should('be.visible');
  });

  it('should display error message when email format is not valid', () => {
    cy.get('input[placeholder="Email"]').type('not valid mail', { force: true });
    cy.get('input').contains(/^Login$/).click({ force: true });

    cy.get('p').contains(/^Email format is invalid$/).should('be.visible');
  });

  it('should display error message when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('mail@mail.com', { force: true });
    cy.get('input').contains(/^Login$/).click({ force: true });

    cy.get('p').contains(/^Password is required$/).should('be.visible');
  });

  it('should display error message when password length is less than 6', () => {
    cy.get('input[placeholder="Email"]').type('mail@mail.com', { force: true });
    cy.get('input[placeholder="Password"]').type('abc', { force: true });
    cy.get('input').contains(/^Login$/).click({ force: true });

    cy.get('p').contains(/^Password must be at least 6 characters$/).should('be.visible');
  });

  it('should display error popup when email and password are incorrect', () => {
    cy.get('input[placeholder="Email"]').type('1818181818@jdjdjdjdjd.com', { force: true });
    cy.get('input[placeholder="Password"]').type('1818181818', { force: true });
    cy.get('input').contains(/^Login$/).click({ force: true });

    cy.get('p').contains(/email or password is wrong/i).should('be.visible');
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('cypresstest@mail.com', { force: true });
    cy.get('input[placeholder="Password"]').type('12345678', { force: true });
    cy.get('input').contains(/^Login$/).click({ force: true });

    cy.get('p').contains(/welcome to forumly/i).should('be.visible');
  });
});