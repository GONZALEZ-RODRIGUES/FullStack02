/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: 'hs@hs.com', full_name: "Julio Gonzalez", phone_number: "99990-9999"},
    {id: 2, email: 'hs@hs.com2', full_name: "Julio Gonzalez2", phone_number: "99990-99992"},
    {id: 3, email: 'hs@hs.com3', full_name: "Julio Gonzalez3", phone_number: "99990-99993"}
  ]);
};
