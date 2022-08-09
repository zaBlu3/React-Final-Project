import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

function MoviesWatchedByMembers({id}) {
    const {findMovieById} = useContext(MovieContext);
    return (
        <div className='moviesWatchedByMembers'>
            <ul>
            {findMovieById(id).subscriptions.map(({name,_id,date}) => { 
              return (
                  <li key={name}>
                      <Link to={"/subscriptions/"+_id}>{name}</Link>, {new Date(date).toDateString()}
                  </li>
              )

          })}  
            </ul>
          
        </div>
    );
}

export default MoviesWatchedByMembers;