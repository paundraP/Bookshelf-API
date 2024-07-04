const { nanoid } = require("nanoid");
const books = require("./books");

const AddBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if(!name) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }else if (readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }
    const id = nanoid(16);
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, finished, reading, id, insertedAt, updatedAt
    };
    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if(isSuccess){
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
}

const GetAllBooksHandler = (request, h) => {
    const {reading, finished, name} = request.query;
    let copyOfBook = books;

    if(!reading && !finished && !name){
        const response = h.response({
            status: "success",
            data: {
                books: copyOfBook.map((book) => ({
                    id: book.id, 
                    name: book.name, 
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
    if(reading){
        copyOfBook = copyOfBook.filter((book) => book.reading == Number(reading));
        const response = h.response({
            status: "success",
            data: {
                books: copyOfBook.map((book) => ({
                    id: book.id, 
                    name: book.name, 
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
    else if(finished){
        copyOfBook = copyOfBook.filter((book) => book.finished == Number(finished));
        const response = h.response({
            status: "success",
            data: {
                books: copyOfBook.map((book) => ({
                    id: book.id, 
                    name: book.name, 
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
    else if(name){
        copyOfBook = copyOfBook.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        const response = h.response({
            status: "success",
            data: {
                books: copyOfBook.map((book) => ({
                    id: book.id, 
                    name: book.name, 
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
}

const GetBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((b) => b.id === bookId)[0];
    if(book){
        const response = h.response({
            status: "success",
            data: {
                book
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
}

const EditBookHandler = (request, h) => {
    const {bookId} = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === bookId);
    const finished = readPage === pageCount;
    const updatedAt = new Date().toISOString();
    if(index !== -1) {
        books[index] = {
            ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt,
        };
        const response = h.response ({
            status: "success",
            message: "Buku berhasil diperbarui"
        });
        response.code(200);
        return response;
    }
    const response = h.response ({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
}

const DeleteBookHandler = (request, h) => {
    const {bookId} = request.params;
    const index = books.findIndex((book) => book.id === bookId);
    if(index !== -1){
        books.splice(index, 1);
        const response = h.response ({
            status: "success",
            message: "Buku berhasil dihapus"
        });
        response.code(200);
        return response;
    }
    const response = h.response ({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    });
    response.code(404);
    return response;
}

module.exports = {AddBookHandler, GetAllBooksHandler, GetBookByIdHandler, EditBookHandler, DeleteBookHandler};
