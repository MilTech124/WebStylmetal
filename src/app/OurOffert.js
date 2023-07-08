import React from 'react'

function OurOffert() {
  return (
	<div className='my-20'>
		<div className="bg-[url('/offert.webp')] bg-cover bg-no-repeat w-full h-[400px] py-10 md:px-[25%]  text-white text-center">
			<h2 className='text-xl font-bold py-5'> W NASZEJ OFERCIE</h2>
			<p>W naszej ofercie z garażami blaszanymi znajdziecie również różne rozmiary i konfiguracje, które pozwalają dostosować garaż do Waszych indywidualnych potrzeb. Bez względu na to, czy potrzebujecie pojedynczego garażu na samochód, czy większej konstrukcji na cele komercyjne, mamy odpowiednie rozwiązanie dla Was.</p>
		</div>
		<div className='flex justify-center md:mt-[-150px] gap-10 flex-wrap md:px-[10%]'>
			<div className='basis-1/4  min-w-[200px] shadow-lg'>
				<img src="/drewno.webp" className='w-full hover:scale-105 transition-all' alt='drewnodpodobne garaze' />
				<h3 className='text-center py-2'>Drewnopodobne</h3>
			</div>
			<div className='basis-1/4 min-w-[200px] shadow-lg'>
				<img src="/akryl.webp" className='w-full hover:scale-105 transition-all' alt='akrylowe garaze' />
				<h3 className='text-center py-2'>Akrylowe</h3>
			</div>
			<div className='basis-1/4 min-w-[200px] shadow-lg'>
				<img src="/skladzik.webp" className='w-full hover:scale-105 transition-all' alt='Składziki' />
				<h3 className='text-center py-2'>Składziki</h3>
			</div>
			<div className='basis-1/4 min-w-[200px] shadow-lg'>
				<img src="/hale.webp" className='w-full hover:scale-105 transition-all' alt='Hale' />
				<h3 className='text-center py-2'>Hale</h3>
			</div>
			<div className='basis-1/4 min-w-[200px] shadow-lg'>
				<img src="/wiaty.webp" className='w-full hover:scale-105 transition-all' alt='Garaż z wiatą' />
				<h3 className='text-center py-2'>Garaż z wiatą</h3>
			</div>
			<div className='basis-1/4 min-w-[200px] shadow-lg'>
				<img src="/smietnik.webp" className='w-full hover:scale-105 transition-all' alt='Śmietniki' />
				<h3 className='text-center py-2'>Śmietniki</h3>
			</div>
		</div>
	</div>
  )
}

export default OurOffert