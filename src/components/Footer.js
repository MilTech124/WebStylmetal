import React from 'react'

function Footer() {
  return (
	<footer>
		<div className='md:flex bg-yellow-500 p-10 justify-evenly'>
			<div className='flex gap-5'>
				<div className='flex gap-2 items-center hover:scale-105 transition-all'>
					<img src="/info.svg"/>
					<p className='text-white text-sm'>Polityka Prywatnosci</p>
				</div>
				<a className='hover:scale-110 transition-all' href='https://www.facebook.com/profile.php?id=100083640406301'><img src="/facebook.svg" alt='facebook'/></a>
				<a className='hover:scale-110 transition-all' href='#'><img src="/google.svg" alt='google'/></a>
			</div>
			<div className='flex gap-5 '>
				<div className='flex gap-2 items-center hover:scale-105 transition-all'>
					<img src="/phone.svg"/>
					<a href='tel:+48 792293364'> <p className='text-white text-sm'>792293364</p></a>
				</div>
				<div className='flex gap-2 items-center hover:scale-105 transition-all'>
					<img src="/Email.svg"/>
					<a href="mailto:biuro@stylmetal.pl"><p className='text-white text-sm'>biuro@stylmetal.pl</p></a>
				</div>
			</div>
		</div>
	<div className="bg-black text-white/80 md:flex justify-between md:px-10">
		<a href='https://www.mil-tech.pl'><p>Realizacja Mil-TECH</p></a>
		<p>
			© 2023 STYLMETAL. Wszelkie prawa zastrzeżone.
		</p>
	</div>
	</footer>
	
  )
}

export default Footer