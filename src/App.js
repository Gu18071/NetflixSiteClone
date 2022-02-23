import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';




function App () {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //selecionando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Selecionando o filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      //função para deixar os filmes em destaques aleatorios
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);

    }
    loadAll();
    }
  , []);

  useEffect(()=>{
    const scrollListener = () => {
      if (window.scrollY > 90) {
        setBlackHeader(true);

      } else {
        setBlackHeader(false);
      }

    }
    window.addEventListener('scroll', scrollListener);

    return ()=> {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  


  return (
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData && 
      <FeaturedMovie item={featuredData}/>}
      
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        )) }

      </section>
      <footer>
        <div className="waves">
         <p className="fim">@2021 Gustavo Cianci | feito com ❤️</p>
         </div>
      </footer> 


      
    </div>
  )
}
export default App;



