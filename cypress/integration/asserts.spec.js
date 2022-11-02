describe('asserts, hooks and cooks', () => {
    beforeEach('login and reset database', () => {
        cy.request('DELETE', '/api/boards');
        cy.intercept('/login').as('login');
        cy.visit('/');

        cy.get("[data-cy='login-menu']").click();
        cy.get("[data-cy='login-email']").type(Cypress.env('username'));
        cy.get("[data-cy='login-password']").type(Cypress.env('password'));
        cy.get("[data-cy='login']").click();
        cy.wait("@login");
        cy.get('[data-cy=logged-user]', {force:true}).should(($loggedInUser) => {
            expect($loggedInUser).to.contain('tamara');
        })
        
    });

    afterEach('logout',() => {
        cy.get('[data-cy=logged-user]').click();
        cy.contains('Log out').click();
        cy.get('[data-cy=login-menu] > svg').should('exist');
    });

    it.skip('Create board and assert its ID and favourite', () => {
        cy.get('[data-cy="create-board"]').click();
        cy.get('[data-cy="new-board-input"]')
        .type('Board{enter}');

        cy
            .url()
            .then((url) => {
                const id = url.match(/\/(\d+?)$/)

                cy
                    .url()
                    .should(
                        'eq',
                        `${Cypress.config('baseUrl')}/board/${id[1]}`
                    )
            });

        cy.go('back');
        cy.get('[data-cy=board-item]').trigger('mouseover');

        cy.get('[data-cy=star]').should('be.visible')
        .click();

        cy.get('[data-cy=favourite-boards]')
        .children()
        .should('have.length', 1)
    });

    it('Create new boards with tasks', () => {
        cy.get('[data-cy="create-board"]').click();
        cy.get('[data-cy="new-board-input"]')
        .type('Board{enter}');
        cy.visit('/');
        cy.get('[data-cy="board-item"] > [data-cy="Board"]');
        cy.get('[data-cy="add-list"]').click();
        cy.get('[data-cy="add-list-input"]').type('List{enter}');

        //dodavanje taskova na listu
        for(let i=0; i<=2; i++) {
            cy.get('[data-cy="new-task]').click()
            cy.get('[data-cy="task-input"]')
            .type(`Task ${i+1}{enter}`)
        }

        //assertuj broj taskova (children way)
        // cy.get('[data-cy="task-list"]').children()
        // .should('have.length',3)
        // .then(($child) => ({
        //     expect($child)
        // })

    })
})