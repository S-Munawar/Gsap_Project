import { cocktailLists, mockTailLists } from '../../constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Cocktails = () => {

	useGSAP(() => {
		gsap.parallaxTimeline = gsap.timeline({
			scrollTrigger:{
				 trigger: '#cocktails',
				 start: 'top bottom',
				 end: 'bottom top',
				 scrub: true
			}
		})
		.from('#c-left-leaf',{
			x: -100, y: 100, duration: 1
		})
		.from('#c-right-leaf',{
			x: 100, y: 100
		})
	},[])

  return (
	<section id='cocktails' className='noisy'>

		<img src='/images/cocktail-left-leaf.png' id='c-left-leaf' />
		<img src='/images/cocktail-right-leaf.png' id='c-right-leaf' />

	  <div className='list'>
		<div className='popular'>
			<h2>Most Popular Cocktails</h2>
			<ul>
				{cocktailLists.map(({name, country, detail, price}) =>
				
				(
					<li key={name}>
						<div className='md:me-28'>
							<h3>{name}</h3>
							<p>{`${country} | ${detail}`}</p>
						</div>
						<span>- {price}</span>
					</li>
				))}
			</ul>
		</div>

		<div className='loved'>
			<h2>Most loved Cocktails</h2>
			<ul>
				{mockTailLists.map(({name, country, detail, price}) =>
				(
					<li key={name}>
						<div className='me-28'>
							<h3>{name}</h3>
							<p>{`${country} | ${detail}`}</p>
						</div>
						<span>- {price}</span>
					</li>
				))}
			</ul>
		</div>
	  </div>
	</section>
  )
}

export default Cocktails
