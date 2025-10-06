import pool from "../db.js";

// Create a new book
export const createBook = async (
  title,
  description,
  publication_date,
  editorial,
  img_url,
  category_id,
  author_id
) => {
  const query = `
  INSERT INTO books (author_id, category_id, title, description, publication_date, editorial, img_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id, author_id, category_id, title, description, publication_date, editorial, img_url;
`;

  const values = [
    author_id,
    category_id,
    title,
    description,
    publication_date,
    editorial,
    img_url,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Create multiple books
export const createMultipleBooks = async (books) => {
  const values = [];
  const params = [];

  books.forEach((book, index) => {
    const i = index * 7;
    values.push(`($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5}, $${i + 6}, $${i + 7})`);
    params.push(
      book.author_id,
      book.category_id,
      book.title,
      book.description,
      book.publication_date,
      book.editorial,
      book.img_url
    );
  });

  const query = `
    INSERT INTO books (author_id, category_id, title, description, publication_date, editorial, img_url)
    VALUES ${values.join(", ")}
    RETURNING id, author_id, category_id, title, description, publication_date, editorial, img_url;
  `;

  const { rows } = await pool.query(query, params);
  return rows;
};

// Get book by id with category and author
export const getBookById = async (id) => {
  const query = `
        SELECT b.id, b.title, b.description, b.publication_date, b.editorial, b.img_url, 
               c.name AS category, a.name AS author_name, a.lastname AS author_lastname
        FROM books b
        JOIN categories c ON b.category_id = c.id
        JOIN authors a ON b.author_id = a.id
        WHERE b.id = $1;
    `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Get all books with category and author
export const getAllBooks = async () => {
  const query = `
        SELECT b.id, b.title, b.description, b.publication_date, b.editorial,
               c.name AS category, a.name AS author_name, a.lastname AS author_lastname
        FROM books b
        JOIN categories c ON b.category_id = c.id
        JOIN authors a ON b.author_id = a.id
        ORDER BY b.id DESC;
    `;
  const { rows } = await pool.query(query);
  return rows;
};

// Update book
export const updateBook = async (
  id,
  title,
  description,
  publication_date,
  img_url,
  editorial,
  category_id,
  author_id
) => {
  const query = `
        UPDATE books
        SET title=$1, description=$2, publication_date=$3, editorial=$4, img_url=$5, category_id=$6, author_id=$7
        WHERE id=$8
        RETURNING id, title, description, publication_date, editorial, img_url, category_id, author_id;
    `;
  const values = [
    title,
    description,
    publication_date,
    img_url,
    editorial,
    category_id,
    author_id,
    id,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Delete book
export const deleteBook = async (id) => {
  const query = `DELETE FROM books WHERE id=$1 RETURNING id;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
