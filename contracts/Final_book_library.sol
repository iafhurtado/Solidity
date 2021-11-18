// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract BookLibrary is Ownable {
    
    
    event NewBook(uint boookId, string name);
    
    struct Book {
        uint bookId;
        string name;
        uint copies;
        uint currentlyBorrowed;
    }
    
    struct Borrowed{
        uint bookId;
        string personName;
        address personAddress;
    }
    
    mapping (uint => Book) public Books;
    mapping (uint => Borrowed[]) public borrowedBooks;
    uint[] public bookIds;
    Borrowed[] public borrowHistory;
   
   
    function addBook(uint _bookId, string memory name, uint copies) external onlyOwner {
        require(_bookId != 0, "Booking ID can't be 0");
        require(Books[_bookId].bookId == 0, "booking ID should be empty");
        
        Book memory book = Book(_bookId, 'Learn Solidity', 10, 0);
        Books[_bookId] = book;
        bookIds.push(_bookId);

    }
    
    function borrowBook(uint bookId, string memory name) public {
        require(bookId != 0, "Booking ID can't be 0");
        Book storage book = Books[bookId];
        require(book.bookId != 0, "booking ID should not be empty");
        require(book.copies > book.currentlyBorrowed, "Need to have more copies");
        
        Borrowed[] storage bs = borrowedBooks[bookId];
        uint index = 0;
        bool found = false;
        
        for(index; index < bs.length; index++){
            if(bs[index].personAddress == msg.sender){
                found = true;
                break;
            }
        }
        
        require(found == false, "user should not have already borrowed this book");

        book.currentlyBorrowed++;
        Borrowed memory b = Borrowed(bookId, name, msg.sender);
        bs.push(b);
        borrowHistory.push(b);
    }
    
    function returnBook(uint bookId) public {
        require(bookId != 0, "Booking ID can't be 0");
        Book storage book = Books[bookId];
        require(book.bookId != 0, "booking ID should not be empty");
        require(0 < book.currentlyBorrowed, "Book needs to have been borrowed");
        
        Borrowed[] storage bs = borrowedBooks[bookId];
        uint index = 0;
        bool found = false;
        
        for(index; index < bs.length; index++){
            if(bs[index].personAddress == msg.sender){
                found = true;
                break;
            }
        }
        
        require(found, "The sender needs to have been a borrower");

        book.currentlyBorrowed--;
        for (uint i = index; i<bs.length-1; i++){
            bs[i] = bs[i+1];
        }
        delete bs[bs.length-1];
        bs.pop();
        
    }
}
