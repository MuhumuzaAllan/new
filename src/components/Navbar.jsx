import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

const Navbar = () => {

    const [lastScrollY, setLastScrollY] = useState(0)

    const [isNavVisible, setIsNavVisible] = useState(true)

    const navContainerRef = useRef(null);

    const audioElementRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();

    const [isAudioplaying, setIsAudioplaying] = useState(false);

    const [isIndicatorActive, setIsIndicatorActive] = useState(false);

    const toggleAudioIndicator = () => {
        setIsAudioplaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev)
    }

    useEffect(() => {
        if(currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav')
        } else if(currentScrollY > lastScrollY) {
            setIsNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')
        } else if(currentScrollY < lastScrollY) {
            setIsNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')

        }
        setLastScrollY(currentScrollY);
    },[currentScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        })
    },[isNavVisible])

    useEffect(() => {
        if(isAudioplaying) {
            audioElementRef.current.play()
        } else {
            audioElementRef.current.pause()
        }
    },[isAudioplaying])

  return (
    <div ref={navContainerRef}
    className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
    >
        <header className='absolute top-1/2 w-full -translate-y-1/2 '>
            <nav className='flex size-full items-center justify-between p-4' >
                <div className="flex items-center gap-7">
                    <img 
                    src='/img/logo.png'
                    alt='logo'
                    className='w-10'
                    />
                    <Button
                    id='product-button'
                    title='Products'
                    rightIcon={<TiLocationArrow />}
                    containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
                    />
                </div>

                <div className="flex h-full itens-center">
                    <div className="hidden md:block">
                        {navItems.map((item) => (
                            <a
                            href={`#${item.toLowerCase()}`}
                            key={item}
                            className='nav-hover-btn'>
                                {item}
                            </a>
                        ))}
                    </div>

                    <button 
                    onClick={toggleAudioIndicator}
                    className='ml-10 flex items-center space-x-0.5 '
                    >
                        <audio ref={audioElementRef}
                        className='hidden'
                        src='/audio/loop.mp3'
                        loop
                        />
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                key={bar} 
                                style={{animationDelay: `${bar * 0.1}s`}}
                                />
                                
                            ))}
                        
                    </button>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar