//arquivo model é quem faz de fato a requisição ao banco de dados
const knex = require("../knex");

const users = "users";

module.exports = {
    users,
    getAll() {
        return knex
        .select({
            id: "id",
            email: "email",
            full_name: "full_name",
            phone_number: "phone_number",
        }).from(users);
    },
    
    getById(id) {
        return knex.select({
            id: "id",
            email: "email",
            full_name: "full_name",
            phone_number: "phone_number",
        }).from(users)
        .where({id: id})
        .first();
    },


    create(user) {
        return knex(users).insert([user]).then(() => {
            return `User with id ${user.id}, created.`
        });
    },

    update(id, user) {
        return knex(users)
            .where("users.id", id)
            .update(user)
            .then(() => {
                return user
            })
    },

    delete(id) {
        return knex(users)
        .where({id: id})
        .del()
        .then(() => {
            return `User with id: ${id}, deleted.`
        })
    }
}