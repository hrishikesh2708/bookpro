import React from "react";
import axios from 'axios';
const book = [
  ];

//   const db = indexedDB.open(STORE, 1);
//  openRequest.onupgradeneeded = function () {

//  }
 function appendinglib(){
    axios.get('http://localhost:4201/api/books/book')
    .then(res=> {
        // const transaction = db.transaction([STORE], IDBTransaction.READ_WRITE); 
        // const objstore = transaction.objectStore(STORE); 
    var i = 0;
    console.log(Object.keys(res.data).length,"length");
        for (i = 0; i < Object.keys(res.data).length; i++) { 
            book.push(res.data[i].title)

        } 
        console.log(book.length)
    })
    .catch(
        console.log("book not found")
    )
  }
  appendinglib();


function Search() {
 const [searchTerm, setSearchTerm] = React.useState("");
 const [searchResults, setSearchResults] = React.useState([]);
 const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  
 React.useEffect(() => {
    const results = book.filter(books =>
      books.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
         {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul> 
    </div>
  );
}
export default Search;