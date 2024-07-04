const { AddBookHandler, GetAllBooksHandler, GetBookByIdHandler, EditBookHandler, DeleteBookHandler} = require("./handler")
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: AddBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: GetAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: GetBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: EditBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: DeleteBookHandler,
    },
];

module.exports = routes;