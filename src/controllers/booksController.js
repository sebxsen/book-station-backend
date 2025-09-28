import * as Books from "../models/booksModel.js";

// Create book
export const createBook = async (req, res) => {
  try {
    const {
      title,
      description,
      publication_date,
      editorial,
      img_url,
      category_id,
      author_id,
    } = req.body;


    const newbook = await Books.createBook(
      title,
      description,
      publication_date,
      editorial,
      img_url,
      category_id,
      author_id
    );
    res.status(201).json(newbook);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al crear el libro", details: err.message });
  }
};

// Get all books with category and author
export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.getAllBooks();
    res.json(books);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener libros", details: err.message });
  }
};

// Get book by ID with category and author
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.getBookById(id);

    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json(book);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error al obtener libro", details: err.message });
  }
};

// Update book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      publication_date,
      img_url,
      editorial,
      category_id,
      author_id,
    } = req.body;
    const book = await Books.updateBook(
      id,
      title,
      description,
      publication_date,
      img_url,
      editorial,
      category_id,
      author_id
    );

    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json(book);
  } catch (err) {
    res
      .status(500)
      .json({ errr: "Error al actualizar libro", details: err.message });
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.deleteBook(id);

    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json({ message: "Libro eliminado" });
  } catch (err) {
    res
      .status(500)
      .json({ errr: "Error al eliminar libro", details: err.message });
  }
};