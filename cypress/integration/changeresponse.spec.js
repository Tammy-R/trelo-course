
describe('network stubbing', () => {
    it('Return boards', () => {
        cy.intercept('/api/board', { fixture: 'board.json' }).as('fakeBoard');
        cy.visit('/');
        cy.wait('@fakeBoard').then(interception => {
            const response = interception.response;
            const qaBoard = response.body[2];
            expect(response.body).to.have.length(4);
            expect(response.body[0].name).to.equal('To do');
            expect(response.body[1].name).to.equal('In progress');
            expect(response.body[2].name).to.equal('QA');
            expect(response.body[3].name).to.equal('Done');
            expect(response.statusCode).to.equal(200);
            expect(qaBoard.id).to.equal(3);
            expect(qaBoard.lists.boardId).to.equal(3);
            expect(qaBoard.lists.title).to.contain('new');
            expect(qaBoard.lists.id).to.eq(1);
            expect(qaBoard.tasks).to.have.length(3);
            expect(qaBoard.tasks[0].id).to.eq(11);
            expect(qaBoard.tasks[0].title).to.contain('Stubb');
            expect(qaBoard.tasks[1].id).to.eq(22);
            expect(qaBoard.tasks[1].title).to.contain('response data');
            expect(qaBoard.tasks[2].id).to.eq(33);
            expect(qaBoard.tasks[2].title).to.contain('Intercepting');
            console.log('INTERCEPTION ', interception);
        })  
    });


    // ZAKOMENTARISANI SU DELOVI SA CASA 

    // it('Dynamically change parts of the response data', () => {

    //     cy.intercept({
    //       method: 'GET',
    //       url: '/api/boards'
    //     }, (req) => {
    //       req.reply((res) => {
    //         res.body[0].starred = true
    //         res.body[0].name = 'Something else'

    //         return res
    //       })
    //     })

    //     cy.visit('/')
    //   });

    //  it('create a new list item', () => {
    //      cy.request({
    //          method: 'POST',
    //          url: '/api/tasks'
    //      }, (request) => {
    //          request.reply((response) => {
    //              console.log(response);
    //              response.body[0] = {
    //                  boardId: 47352803189,
    //                     completed: false,
    //                     description: "",
    //                     listId: 30897562091,
    //                     title: "task"
    //              }

    //              return response;
    //          })

    //      }).as('createItem')
    //     });


    // it('intercept', () => {
    //     cy.request('/api/boards', [
    //         {
    //             statusCode : 201,
    //             name: "Ime"
    //         }
    //     ]).as('fakeBoard');
    //     cy.visit('/');
    // cy.get('@fakeBoard').its('response').then((res) => {
        //     expect(res.body[0].name).to.eq('Old board');
        //     expect(res.statusCode).to.eq(200);
        // });
    // })

    // it('delete board', () => {
    //     cy.request('DELETE', '/api/boards').as('deleteBoard');
    //     cy.visit('/');
    // })

})