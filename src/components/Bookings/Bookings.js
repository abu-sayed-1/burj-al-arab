 import React, { useContext, useEffect, useState } from 'react';
 import { UserContext } from '../../App';
 
 const Bookings = () => {
     const [bookings,setBookings] = useState([]);
     const [loggedInUser, setLoggedInUser] = useContext(UserContext);

     useEffect(() => {
         fetch('http://localhost:4000/bookings?email='+loggedInUser.email,{
          //   001
             method:'GET',
             headers: { 
                 'Content-type': 'application/json',
                 authorization: `Bearer ${sessionStorage.getItem('token')}`
 //user 001 login ^^ korar por tar info idToken ze info gula chilo oi info gula amra sessionStorage theke tar idToken niye nichi 
 //er por ze info gula paichi oi info gulo backed e pathai dichi..    
                }
         })
         .then(res => res.json())
         .then(data => setBookings(data));
     },[])

     return (
         <div>
             <h3>you have: {bookings.length} bookings</h3>
             {
                 bookings.map(book => <li key={book._id}> {book.name} from:{(new Date(book.checkIn).toDateString('dd/MM/yyy'))} to: {(new Date (book.checkOut).toDateString('dd/MM/yyy'))}</li>)
             //ei code diye tumi data take sting theke( normal ^^^ date e convert korte parba   ^^      ) --                    
             }
         </div>
     );
 };
 
 export default Bookings;