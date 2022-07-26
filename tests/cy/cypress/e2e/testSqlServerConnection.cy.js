describe('SQL Server connection', () => {
  it('can run sql query', () => {
    cy.sqlServerQuery('model', 'SELECT DB_NAME()').then((res) => expect(res).to.eq('model'));
    cy.sqlServerQuery('master', 'SELECT DB_NAME()').then((res) => expect(res).to.eq('master'));
  });
});
