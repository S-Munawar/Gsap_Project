'use client'

import React from 'react'
import { useState, useRef } from 'react';
import {allCocktails} from '../../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Menu = () => {



	const [currentIndex, setCurrentIndex] = useState(0);
	const contentRef = useRef(null);

	const goToSlide = (index) => {
		const presentIndex = (index + allCocktails.length) % allCocktails.length;
		setCurrentIndex(presentIndex);
	}

	const getCocktailAt = (indexOffset) => {
		return allCocktails[(currentIndex + indexOffset + allCocktails.length) % allCocktails.length]
	}

	const prevCocktail = getCocktailAt(-1);
	const nextCocktail = getCocktailAt(1);
	const currentCocktail = getCocktailAt(0);

		useGSAP(() => {
		gsap.fromTo('#title', {opacity:0}, {opacity:1, duration:1})
		gsap.fromTo('.cocktail img', {xPercent:-100, opacity:0}, {xPercent:0, opacity:1})
		gsap.fromTo('.details h2', {yPercent:100, opacity:0}, {yPercent:0, opacity:100, ease:'power1.inOut'})
		gsap.fromTo('.details p', {yPercent:100, opacity:0}, {yPercent:0, opacity:100, ease:'power1.inOut'})
	}, [currentIndex])

  return (
	<section id='menu' aria-labelledby="menu-heading">
		<img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
		<img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

		<h2 id='menu-heading' className='sr-only'>
			Cocktail Menu
		</h2>

		<nav className='cocktail-tabs' aria-label="Cocktail Navigation">
			
			{allCocktails.map((cocktail ,index) => {
				
				const isActive = index === currentIndex;
				return (
					<button 
					key={cocktail.id} 
					onClick={() => goToSlide(index)}
					className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
					>
						{cocktail.name}
					</button>
				)


			})}

		</nav>

		<div className='content'>
			<div className='arrows'>
				<button 
				onClick={() => goToSlide(currentIndex - 1)}
				>
					<span>{prevCocktail.name}</span>
					<img src="/images/right-arrow.png" alt='right-arrow' aria-hidden='true' />
				</button>
				<button 
				onClick={() => goToSlide(currentIndex + 1)}
				>
					<span>{nextCocktail.name}</span>
					<img src="/images/left-arrow.png" alt='left-arrow' aria-hidden='true' />
				</button>
			</div>
			<div className='cocktail'>
				<img 
				src={currentCocktail.image}
				className='object-contain'
				/>
			</div>
			<div className='recipe'>
				<div ref={contentRef} className='info'>
					<p>Recipe for:</p>
					<p id="title">{currentCocktail.name}</p>
				</div>
				<div className='details'>
					<h2>{currentCocktail.title}</h2>
					<p>{currentCocktail.description}</p>
				</div>
			</div>
		</div>
	  
	</section>
  )
}

export default Menu