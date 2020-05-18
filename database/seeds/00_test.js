
exports.seed = async function(knex) {
  await knex('users').insert([
    { username: 'Charles', password: 'abc123' },
    { username: 'Bo', password: 'abc123' },

  ])
};  

