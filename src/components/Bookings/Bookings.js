 import React, { useContext, useEffect, useState } from 'react';
 import { UserContext } from '../../App';
 
 const Bookings = () => {
     const [bookings,setBookings] = useState([]);
     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
// 

     useEffect(() => {
         fetch('http://localhost:4000/bookings?email='+loggedInUser.email)
         .then(res => res.json())
         .then(data => setBookings(data));
     },[])

     return (
         <div>
             <h3>you have: {bookings.length} bookings</h3>
             {
                 bookings.map(book => <li>key={book._id} {book.name} from:{(new Date(book.checkIn).toDateString('dd/MM/yyy'))} to: {(new Date (book.checkOut).toDateString('dd/MM/yyy'))}</li>)
             //ei code diye tumi data take sting theke( normal ^^^ date e convert korte parba   ^^      ) --                    
             }
         </div>
     );
 };
 
 export default Bookings;