import React, { useMemo } from 'react'
import queryString from 'query-string';
import { heroes } from '../../data/heroes'
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroByName } from '../../selectors/getHeroByName';

export const SearchScreen = ({history}) => {

   const location = useLocation();
   const {q = ''} = queryString.parse( location.search);


    const [formValues,handleInputChange] = useForm({
        searchText: q
    });

   const {searchText} = formValues;


    const heroFilterd = useMemo(() => getHeroByName( q), [q])

    const handleSearch = (e) =>{
       e.preventDefault();
       history.push(`?q=${ searchText}`);
    }

    

    return (
        <div>
            <h1>Search</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Seach Form</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        placeholder="Find your hero"
                        className="form-control"
                        name="searchText"
                        autoComplete="of"
                        value={ searchText }
                        onChange={handleInputChange}/>
                          
                        <button 
                        type="submit"
                        className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>
                    {
                        (q==='')
                        &&
                        <div className="alert alert-info">
                            search a hero
                        </div>
                    }

                    {
                        (q !=='' && heroFilterd.length === 0)
                        &&
                        <div className = "alert alert-danger">
                                there is no a hero with{q}
                        </div>
                    }

                    {

                        heroFilterd.map(hero => (
                            <HeroCard
                            key={hero.id}
                            {...hero}/>
                        ))
                    }

                </div>

            </div>
        </div>
    )
}
