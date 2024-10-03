let changeSkin;
let removeLoader;
let scrollInto;
window.addEventListener("load", () => {
    const container = document.getElementById("container");
    const ireneContainer = document.getElementById("ireneContainer");
    const characterContainer = document.getElementById("characterContainer");
    const positionIrene = ireneContainer.getBoundingClientRect();
    const positionCharacter = characterContainer.getBoundingClientRect();
    const character = document.getElementById("character");
    const star = document.getElementById("star");
    const startBtn = document.getElementById("startBtn");

    let titleAudio = new Audio("/audio/title.mp3");
    let mainThemeAudio = new Audio("/audio/lobbytheme.mp3");

    startBtn.nextElementSibling.remove();
    startBtn.classList.remove("hidden");

    removeLoader = () => {
        titleAudio.play();
        titleAudio.addEventListener("ended", () => {
            mainThemeAudio.loop = true;
            mainThemeAudio.play()
        })

        gsap.to("#loading", {
            opacity: 0,
            onComplete() {
                    const loading = document.getElementById("loading");
                    loading.remove();
                    gsap.to("#header .pop-up", {
                        opacity: 1,
                        y: 0,
                    });
                
                    const observer = new IntersectionObserver(entries => {
                        entries.forEach(v => {
                            if (v.isIntersecting) {
                                gsap.to(`#${v.target.id} .pop-up`, {
                                    opacity: 1,
                                    y: 0,
                                    stagger: 0.25,
                                });

                                observer.unobserve(v.target)
                            }
                        })
                    }, {
                        rootMargin: "0px",
                        threshold: 1
                    });
                
                    const section = Array.from(document.getElementsByClassName("section"));
                    section.forEach(v => observer.observe(v));    
                }
            });
        };
        

    container.addEventListener("scroll", (e) => {
        const { scrollLeft } = e.target
        ireneContainer.style.transform = `translateX(${(scrollLeft - positionIrene.x) * .15}px)`
        characterContainer.style.transform = `translateX(${(scrollLeft - positionCharacter.x) * .25}px)`
        star.style.transform = `translateX(-${scrollLeft * .15}px)`
    })

    const skin = ["/img/irene.webp", "/img/irene.webp", "/img/irene2.png", "/img/skin.png"]
    
    changeSkin = num => character.src = skin[num];

    const targetBar = Array.from(document.getElementsByClassName("targetBar"));
    targetBar.forEach(v => {
        v.addEventListener("mousemove", ({clientX: x, clientY: y, target}) => {
            const bar = document.getElementById(`${target.id}bar`);
            bar.style.display = "flex"
            const barPosition = bar.getBoundingClientRect();
            const targetPosition = target.getBoundingClientRect();
            const left = (barPosition.x - barPosition.width >= 0 ? x - barPosition.width : x + 30) - 10;
            const bottom = (targetPosition.bottom - y + 100);
            bar.style.left = `${left}px`;
            bar.style.bottom = `${bottom}px`;
            bar.style.opacity = 1
        });
        
        v.addEventListener("mouseleave", ({target}) => {
            const bar = document.getElementById(`${target.id}bar`);
            bar.style.opacity = 0;
            bar.style.display = "none"
        })
    });

    scrollInto = target => {
        const {x} = document.getElementById(`${target}`).getBoundingClientRect();
        if (x) {
            container.scrollTo(x, 0)
        }
    }
})